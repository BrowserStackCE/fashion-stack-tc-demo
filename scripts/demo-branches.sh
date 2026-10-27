#!/usr/bin/env bash
# Create a fresh, isolated pair of branches for one run of the Test Companion demo,
# so the demo can be repeated without touching the canonical main / feature/promo-code.
#
#   demo/<ID>/main        <- copy of main (the "user's main" the feature merges into)
#   demo/<ID>/promo-code  <- feature/promo-code commits replayed on top of demo/<ID>/main
#
# Usage:
#   scripts/demo-branches.sh <ID> [--push]   create branches for run <ID> and check out the feature branch
#   scripts/demo-branches.sh --list          list existing demo runs
#   scripts/demo-branches.sh --clean <ID>    delete run <ID>'s branches (local, and remote if pushed)
#
# Env overrides: BASE_BRANCH (default main), FEATURE_BRANCH (default feature/promo-code), REMOTE (default origin)

set -euo pipefail

BASE_BRANCH="${BASE_BRANCH:-main}"
FEATURE_BRANCH="${FEATURE_BRANCH:-feature/promo-code}"
REMOTE="${REMOTE:-origin}"

die() { echo "error: $*" >&2; exit 1; }

usage() {
  sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

has_remote() { git remote get-url "$REMOTE" >/dev/null 2>&1; }

branch_exists() { git show-ref --verify --quiet "refs/heads/$1"; }

validate_id() {
  [[ -n "$1" ]] || die "missing <ID>"
  git check-ref-format --branch "demo/$1/main" >/dev/null 2>&1 \
    || die "'$1' is not a valid branch name component (use letters, digits, - or _)"
}

cmd_list() {
  git for-each-ref --format='%(refname:short)' 'refs/heads/demo/*/main' \
    | sed -E 's#^demo/(.*)/main$#\1#'
}

cmd_clean() {
  local id="$1"; validate_id "$id"
  local main="demo/$id/main" feat="demo/$id/promo-code"
  local current; current="$(git symbolic-ref --quiet --short HEAD || true)"
  if [[ "$current" == "$main" || "$current" == "$feat" ]]; then
    git checkout --quiet "$BASE_BRANCH"
  fi
  for b in "$feat" "$main"; do
    branch_exists "$b" && git branch -D "$b"
    if has_remote && git ls-remote --exit-code --heads "$REMOTE" "$b" >/dev/null 2>&1; then
      git push "$REMOTE" --delete "$b"
    fi
  done
  echo "Cleaned demo run '$id'."
}

cmd_create() {
  local id="$1" push="$2"; validate_id "$id"
  local main="demo/$id/main" feat="demo/$id/promo-code"

  git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "run this inside the repo"
  branch_exists "$BASE_BRANCH"    || die "base branch '$BASE_BRANCH' not found"
  branch_exists "$FEATURE_BRANCH" || die "feature branch '$FEATURE_BRANCH' not found"
  branch_exists "$main" && die "'$main' already exists — pick another ID or run: $0 --clean $id"
  branch_exists "$feat" && die "'$feat' already exists — pick another ID or run: $0 --clean $id"

  if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
    die "working tree has uncommitted changes to tracked files. Commit them to $BASE_BRANCH
       (if they belong in the demo baseline) or stash them, then re-run."
  fi

  # 1. User's main: snapshot of the base branch.
  git branch "$main" "$BASE_BRANCH"

  # 2. Feature branch: replay only the feature commits onto the new main, so it
  #    merges cleanly even if $BASE_BRANCH has moved on since the feature was cut.
  local commits; commits="$(git rev-list --reverse --no-merges "$BASE_BRANCH..$FEATURE_BRANCH")"
  [[ -n "$commits" ]] || die "'$FEATURE_BRANCH' has no commits beyond '$BASE_BRANCH'"
  git checkout --quiet -b "$feat" "$main"
  # shellcheck disable=SC2086
  if ! git cherry-pick $commits >/dev/null; then
    git cherry-pick --abort || true
    git checkout --quiet "$BASE_BRANCH"
    git branch -D "$feat" "$main" >/dev/null
    die "feature commits don't apply cleanly on '$BASE_BRANCH' — rebase '$FEATURE_BRANCH' first"
  fi

  if [[ "$push" == 1 ]]; then
    has_remote || die "no '$REMOTE' remote configured; branches created locally only"
    git push --quiet -u "$REMOTE" "$main" "$feat"
  fi

  cat <<EOF

Demo run '$id' ready (now on $feat):
  base     $main      $(git rev-parse --short "$main")
  feature  $feat  $(git rev-parse --short "$feat")   (+$(echo "$commits" | wc -l | tr -d ' ') commit(s))

Use these names in the runbook commands, e.g.:
  git diff $main --stat
  tc run "Compare branch $feat against $main. From the Playwright tests in tests/, ..."
  tc pr   # open the PR $feat -> $main

When done:  $0 --clean $id
EOF
}

case "${1:-}" in
  ""|-h|--help) usage ;;
  --list)  cmd_list ;;
  --clean) cmd_clean "${2:-}" ;;
  -*)      usage 1 ;;
  *)
    id="$1"; push=0
    [[ "${2:-}" == "--push" ]] && push=1
    cmd_create "$id" "$push"
    ;;
esac
