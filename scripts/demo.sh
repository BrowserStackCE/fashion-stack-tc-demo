#!/usr/bin/env bash
# Guided Test Companion demo (FashionStack). One step at a time: shows the talking
# points and the next command, waits for a key, runs it.
#
# Usage:
#   scripts/demo.sh <ID>              start (or resume) demo run <ID>
#   scripts/demo.sh <ID> --from <N>   jump straight to step N
#   scripts/demo.sh --steps           list the steps
#
# At each step:  Enter = run   s = skip   f = run fallback (if any)   b = shell   q = quit
#
# Each run gets its own TM project ("FashionStack <ID>") and its own branches:
#   demo/<ID>/main        baseline; the scripts get mapped to this run's TM IDs here
#   demo/<ID>/promo-code  the feature, opened as a PR into demo/<ID>/main
# Per-run state (TM project, build numbers, PR URL) is kept in .git/demo/<ID>.env.
#
# Env: PERCY_URL  Percy project/build URL to open in the visual step
#      APP_URL    default http://localhost:5000

set -uo pipefail

cd "$(dirname "$0")/.."
APP_URL="${APP_URL:-http://localhost:5000}"
PERCY_URL="${PERCY_URL:-}"
TM_URL="https://test-management.browserstack.com/"
SOURCE_MAIN="main"
SOURCE_FEATURE="feature/promo-code"
BACKUP_BRANCH="demo/v2-tests-backup"
CSV="docs/fashionstack-test-cases-v1.csv"

if [[ -t 1 ]]; then
  B=$'\e[1m'; DIM=$'\e[2m'; CYAN=$'\e[36m'; GREEN=$'\e[32m'; YELLOW=$'\e[33m'; RED=$'\e[31m'; R=$'\e[0m'
else
  B=; DIM=; CYAN=; GREEN=; YELLOW=; RED=; R=
fi

STEP=0
FROM=1
LIST_ONLY=0

# ---------------------------------------------------------------- step runner

act() {  # act "Act 2 — Test selection" "2:30"
  ((LIST_ONLY)) && { echo; echo "${B}$1${R}"; return; }
  ((STEP + 1 < FROM)) && return
  echo; echo "${B}${CYAN}════════  $1  ${DIM}($2)${R}"
}

# step "title" "talking points" "command" ["fallback command"]
step() {
  local title="$1" notes="$2" cmd="$3" fallback="${4:-}"
  STEP=$((STEP + 1))
  if ((LIST_ONLY)); then printf '  %2d. %s\n' "$STEP" "$title"; return; fi
  ((STEP < FROM)) && return

  echo
  echo "${B}[$STEP] $title${R}"
  [[ -n "$notes" ]] && echo "$notes" | sed "s/^/  ${DIM}│${R} /"
  echo
  echo "${GREEN}\$ $cmd${R}"
  [[ -n "$fallback" ]] && echo "${DIM}  fallback (f): $fallback${R}"

  while true; do
    printf '%s' "${YELLOW}↵ run · s skip · ${fallback:+f fallback · }b shell · q quit > ${R}"
    local key; IFS= read -rsn1 key; echo
    case "$key" in
      "")  run "$cmd" || offer_fallback "$fallback"; break ;;
      s|S) echo "${DIM}skipped${R}"; break ;;
      f|F) [[ -n "$fallback" ]] && { run "$fallback"; break; } ;;
      b|B) echo "${DIM}Sub-shell — type 'exit' to come back to step $STEP.${R}"; "${SHELL:-bash}" ;;
      q|Q) echo "Stopped. Resume with: $0 $ID --from $STEP"; exit 0 ;;
    esac
  done
}

run() {
  echo
  eval "$1"
  local rc=$?
  ((rc == 0)) || echo "${RED}✗ exited with $rc${R}"
  return $rc
}

offer_fallback() {
  [[ -n "$1" ]] || return 0
  printf '%s' "${YELLOW}Run the fallback instead? [y/N] ${R}"
  local key; IFS= read -rsn1 key; echo
  [[ "$key" == [yY] ]] && run "$1"
  return 0
}

# ---------------------------------------------------------------- per-run state

save_state() {  # save_state KEY value
  mkdir -p "$(dirname "$STATE_FILE")"
  touch "$STATE_FILE"
  grep -v "^$1=" "$STATE_FILE" >"$STATE_FILE.tmp"; mv "$STATE_FILE.tmp" "$STATE_FILE"
  printf '%s=%q\n' "$1" "$2" >>"$STATE_FILE"
  printf -v "$1" '%s' "$2"
}

ask_state() {  # ask_state KEY "prompt" — asks only if KEY is still empty
  ((LIST_ONLY)) && return
  [[ -n "${!1:-}" ]] && return
  local v; read -r -p "${YELLOW}$2: ${R}" v
  [[ -n "$v" ]] && save_state "$1" "$v"
}

# ---------------------------------------------------------------- demo actions

tm_create_project() {
  if [[ -n "${PROJECT:-}" ]]; then echo "Already created for this run: $PROJECT"; return; fi
  local out; out="$(tc tm create-project "$1" --description "Test Companion demo run $ID" 2>&1)"
  echo "$out"
  local id; id="$(grep -oE 'PR-[0-9]+' <<<"$out" | head -1)"
  [[ -n "$id" ]] || { echo "${RED}Couldn't read the project id from the output.${R}"; ask_state PROJECT "TM project id (PR-…)"; return; }
  save_state PROJECT "$id"
  echo "${GREEN}Project $PROJECT saved for this run.${R}"
}

open_feature_pr() {
  if ! git show-ref --verify --quiet "refs/heads/$FEAT"; then
    local commits; commits="$(git rev-list --reverse --no-merges "$SOURCE_MAIN..$SOURCE_FEATURE")"
    git checkout -b "$FEAT" "$BASE" || return 1
    # shellcheck disable=SC2086
    git cherry-pick $commits || { git cherry-pick --abort; return 1; }
  else
    git checkout "$FEAT" || return 1
  fi
  git --no-pager diff --stat "$BASE"
  # The store is served from a production build: rebuild so it shows the feature.
  npx vite build --logLevel warn || return 1
  git push -u origin "$FEAT" || return 1
  if [[ -z "${PR_URL:-}" ]]; then
    local url
    url="$(gh pr create --base "$BASE" --head "$FEAT" \
      --title "Promo codes in the shopping cart" \
      --body "Adds a promo code field to the cart (SAVE10 = 10% off) and carries the discount through checkout. Renames the cart CTA to \"Secure Checkout\".")" || return 1
    save_state PR_URL "$url"
  fi
  echo "${GREEN}PR: $PR_URL${R}"
  open "$PR_URL"
}

automate_new_cases() {
  local ids; read -r -p "${YELLOW}TM IDs of the 5 new promo cases (space-separated): ${R}" ids
  [[ -n "$ids" ]] || { echo "No IDs given."; return 1; }
  # shellcheck disable=SC2086
  tc automate $ids --project "$PROJECT"
}

# ---------------------------------------------------------------- setup

ensure_base_branch() {
  if git show-ref --verify --quiet "refs/heads/$BASE"; then
    echo "${DIM}Resuming run '$ID' (state: ${STATE_FILE#./})${R}"
  else
    git branch "$BASE" "$SOURCE_MAIN" && echo "${DIM}Created $BASE from $SOURCE_MAIN${R}"
  fi
  git remote get-url origin >/dev/null 2>&1 \
    || echo "${RED}No 'origin' remote — add your GitHub repo (git remote add origin …) before the PR steps.${R}"
}

ensure_dev_server() {
  if curl -s -o /dev/null --max-time 2 "$APP_URL"; then
    echo "${DIM}Store already running at $APP_URL${R}"; return
  fi
  echo "${DIM}Building + serving the store (log: log/dev-server.log)…${R}"
  mkdir -p log
  npm run serve >log/dev-server.log 2>&1 &
  DEV_PID=$!
  # npm → sh → vite: stop whatever we started listening on the app port, not just npm.
  local port="${APP_URL##*:}"; port="${port%%/*}"
  trap 'lsof -ti "tcp:'"$port"'" -sTCP:LISTEN | xargs kill 2>/dev/null; kill "$DEV_PID" 2>/dev/null' EXIT
  for _ in $(seq 1 30); do
    curl -s -o /dev/null --max-time 1 "$APP_URL" && { echo "${DIM}Store up at $APP_URL${R}"; return; }
    sleep 1
  done
  echo "${RED}Dev server didn't come up — check log/dev-server.log${R}"
}

# ---------------------------------------------------------------- the demo

steps() {
  local P="${PROJECT:-<PR-id>}"

  act "Prep" "before the audience joins"
  step "Check BrowserStack login" \
"Must show your BrowserStack user. If TM calls say 'session expired', run: tc auth login" \
"tc auth whoami"

  act "Act 1 — Test cases into Test Management" "2:00"
  step "Create this run's Test Management project" \
"\"We start where most teams are: manual test cases in a spreadsheet.\"" \
"tm_create_project \"FashionStack $ID\""
  P="${PROJECT:-<PR-id>}"

  step "Import the CSV in Test Management" \
"In TM: open project 'FashionStack $ID' ($P) → Import → CSV → pick $CSV.
Map Title / Steps / Expected Result; the Folder column creates FashionStack/Home, /Cart, …
10 cases land with real TM IDs." \
"open $TM_URL && open -R $CSV"

  step "Confirm the import from the CLI" "" \
"tc tm folders -p $P"

  act "Act 2 — Map the existing scripts to TM" "2:00"
  step "Test Companion maps each Playwright test to its TM case" \
"\"We already have 10 automated tests — we just need them linked to the cases.\"
Expected: every test title gets its TM ID; the cases flip to Automated." \
"git checkout $BASE && tc run \"Map the existing Playwright tests in tests/*.spec.ts to the test cases in BrowserStack Test Management project $P. Each test title starts with TC-01..TC-10 and matches the TM case whose title starts with the same prefix. Rename each test so its title starts with the matched case's TM ID instead of TC-0x/TC-10, keep the rest of the title unchanged, and mark the matched TM cases as Automated. Show the mapping as a table. Do not change anything else.\""

  step "Commit the mapping to this run's main" "" \
"git --no-pager diff --stat && git commit -qam \"Map tests to TM project $P\" && git push -u origin $BASE"

  act "Act 3 — Baseline build" "1:30"
  step "Run the full suite on BrowserStack" \
"Windows/Chrome over BrowserStack Local. All 10 green — the last known good build.
Show the results flowing into the TM project against each case." \
"tc test"

  act "Act 4 — A feature PR lands" "1:30"
  step "Open the promo-code PR" \
"\"A developer opens a PR: promo codes in the cart. 4 files touched.\"" \
"open_feature_pr   # $FEAT from $SOURCE_FEATURE → PR into $BASE"

  step "Show the feature in the store" \
"Cart: apply SAVE10 → 10% off. Try FREESTUFF → error." \
"open $APP_URL"

  act "Act 5 — Test selection" "2:30"
  step "Select and run only the impacted tests" \
"Expected: picks the cart + checkout tests (3 of 10), skips home/search/category/product/auth.
Expected result: checkout fails — 'Proceed to Checkout' no longer exists. Note the build number." \
"tc run \"Compare branch $FEAT against $BASE. From the Playwright tests in tests/, select only the tests impacted by this change, explain in one line why each is or isn't impacted, then run just the selected tests on BrowserStack using browserstack.yml.\""

  act "Act 6 — RCA, fix, heal" "5:00"
  if ((STEP + 2 >= FROM)); then ask_state FAILED_BUILD "Failing build from the test-selection run (number or URL)"; fi
  step "Root-cause the failure" \
"Expected: test locator issue, not a product bug — the CTA became 'Secure Checkout' in this PR." \
"tc rca --build \"\$FAILED_BUILD\""

  step "Fix the test" \
"Expected: updates tests/checkout.spec.ts to the new button name." \
"tc fix --build \"\$FAILED_BUILD\"" \
"sed -i '' 's/\"Proceed to Checkout\"/\"Secure Checkout\"/' tests/checkout.spec.ts"

  step "Show the one-line fix" "" \
"git --no-pager diff tests/"

  step "Heal: re-run what failed" \
"The healed checkout test goes green on BrowserStack." \
"tc test --only-failed"

  act "Act 7 — Authoring tests for the new feature" "4:00"
  step "Generate 5 test cases from the PRD into TM" \
"Source: docs/v2-promo-code-prd.md. Note the 5 new TM IDs." \
"tc generate --url $APP_URL --local --coverage balanced --save-to-tm \"Using the PRD in docs/v2-promo-code-prd.md, generate exactly 5 test cases for the cart promo code feature in TM project $P, folder FashionStack/Promo Code: (1) SAVE10 applies 10% off and updates the total, (2) an invalid code shows 'Invalid promo code' and no discount, (3) the code is case-insensitive and ignores spaces, (4) removing the code restores the original total, (5) the discount carries through to the checkout order summary. Do not generate more than 5.\""

  step "Automate them from TM" \
"Expected (Silk Wrap Dress, M): subtotal \$189.99 → discount −\$19.00, tax \$13.68, total \$184.67." \
"automate_new_cases   # tc automate <5 TM IDs> --project $P" \
"git checkout $BACKUP_BRANCH -- tests/promo-code.spec.ts && npx playwright test tests/promo-code.spec.ts"

  act "Act 8 — Visual + accessibility" "4:00"
  step "Percy: baseline vs PR cart" \
"New promo field + discount row highlighted; other pages unchanged." \
"${PERCY_URL:+open $PERCY_URL}${PERCY_URL:-echo 'Set PERCY_URL to open the Percy build here'}"

  step "Accessibility scan of the cart" \
"Expected: promo input unlabeled; error text low contrast and not announced; icon-only buttons unnamed.
Also show the Accessibility report from the Automate build." \
"tc run --app-url $APP_URL \"Scan the shopping cart page with a product in the cart for WCAG 2.1 AA issues, focusing on the new promo code section. List each issue with severity and WCAG criterion. Do not change any code.\""

  act "Act 9 — Accessibility remediation" "2:00"
  step "Fix the accessibility issues" \
"Expected: aria-labels, a label for the promo input, role=\"alert\", a darker red." \
"tc run --app-url $APP_URL \"Fix the WCAG 2.1 AA issues on the shopping cart page in src/components/ShoppingCartPage.tsx: label the promo code input, make the error message meet contrast and announce it, and give icon-only buttons accessible names. Re-scan to confirm they're resolved.\""

  step "Show the remediation diff" "" \
"git --no-pager diff src/"

  act "Wrap" "1:00"
  step "Update the PR with everything" \
"Mapped 10 scripts to TM → selected 3/10 → RCA'd as a test change → healed →
5 new tests from a PRD → visual diff + a11y fixes, all on one PR." \
"tc pr"

  step "Back to main (clean up later: scripts/demo-branches.sh --clean $ID)" "" \
"git checkout $SOURCE_MAIN"
}

# ---------------------------------------------------------------- main

case "${1:-}" in
  ""|-h|--help) sed -n '2,19p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
  --steps) LIST_ONLY=1; ID="<ID>"; BASE="demo/<ID>/main"; FEAT="demo/<ID>/promo-code"; steps; exit 0 ;;
  -*) echo "unknown option $1" >&2; exit 1 ;;
esac

ID="$1"; shift
[[ "${1:-}" == "--from" ]] && FROM="${2:?--from needs a step number}"
git check-ref-format --branch "demo/$ID/main" >/dev/null 2>&1 || { echo "invalid ID '$ID'" >&2; exit 1; }
BASE="demo/$ID/main"
FEAT="demo/$ID/promo-code"
STATE_FILE="$(git rev-parse --git-dir)/demo/$ID.env"
PROJECT= FAILED_BUILD= PR_URL=
# shellcheck disable=SC1090
[[ -f "$STATE_FILE" ]] && source "$STATE_FILE"

echo "${B}FashionStack × Test Companion — demo run '$ID'${R}"
ensure_base_branch
ensure_dev_server
steps
echo; echo "${B}${GREEN}Demo complete.${R}"
