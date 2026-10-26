# Test Companion Demo Runbook — FashionStack (15–20 min)

**Story:** a fashion store ships a small feature (promo codes). Test Companion
picks the tests that matter, explains the failure the change causes, heals the
test, writes tests for the new feature, and catches the visual and
accessibility issues the feature added.

## Repo map

| Ref | What it is |
|---|---|
| `main` / tag `v1` | Baseline store + 10 Playwright tests (TC-01..TC-10), all green |
| `feature/promo-code` / tag `v2` | Promo code feature (SAVE10 = 10% off) + CTA renamed to "Secure Checkout" |
| `demo/v2-tests-backup` | Fallback: 5 promo tests (TC-11..TC-15) + healed TC-08 — use if a live step runs long |
| `docs/v2-promo-code-prd.md` | PRD fed to the test-case generator in Act 4 |

Demo login: `demo@fashionstack.com` / `Demo@123` · OTP is always `123456`.

### Problems v2 deliberately introduces (so each agent has something real to find)

| Problem | Where | Agent that finds it |
|---|---|---|
| "Proceed to Checkout" → "Secure Checkout" breaks **TC-08** | `ShoppingCartPage.tsx` | RCA → Test Fixer |
| Promo input has only a placeholder, no label | `ShoppingCartPage.tsx` | A11y Fixer |
| "Invalid promo code" error is `text-red-300` on white (~2:1 contrast), not announced | `ShoppingCartPage.tsx` | A11y Fixer |
| Cart Order Summary layout changes (new field + discount row) | cart page | Percy visual diff |

The base app also has pre-existing a11y issues (icon-only cart/qty/remove/wishlist
buttons with no accessible name) — good bonus findings.

---

## Prep (do the day before, then again 30 min before)

```bash
cd ~/Downloads/Ecommerce-BS-App-main
git checkout main && npm install
tc auth whoami                       # must show your BrowserStack user
npm test                             # 10 passed locally (~10s)
```

1. **Baseline green build on BrowserStack** — run `tc test` on `main`. Keep the
   build URL/number; this is the "last known good" build.
2. **Pre-record the failing v2 build** — `git checkout feature/promo-code`, run
   `tc test` once. Note the build number (call it `<FAILED_BUILD>`). Live RCA
   on a fresh build can take a few minutes; having one ready keeps the clock.
3. **Percy baseline** (visual act) — see Act 5. Needs a Percy project token.
4. Reset: `git checkout main`, start `npm run dev` (http://localhost:5000).
5. Open tabs: the store, BrowserStack Automate build list, Test Reporting &
   Analytics, Percy project, the terminal sized large (font 18+).

---

## Run of show

### Act 0 — Context (1:30) · `main`
- Click through the store: home → Silk Wrap Dress → add size M → cart → checkout.
- Show `tests/`: 10 Playwright tests. Show the green BrowserStack build
  (Windows/Chrome + macOS/Safari, via Local tunnel).

**How the 10 cases were authored** (show the prompt; run live only if time allows):

```bash
tc generate --url http://localhost:5000 --local --coverage happy-path \
  "Generate exactly 10 end-to-end test cases for the FashionStack store. One case each for:
   1) homepage shows navigation, promo banner and featured products
   2) search for 'denim' shows matching products
   3) search for an unknown term shows 'No results found'
   4) Men category shows only men's products
   5) product details page shows price, reviews and selectable sizes
   6) adding a product updates the cart badge and cart contents
   7) changing cart quantity recalculates totals; removing empties the cart
   8) guest checkout places an order and shows the confirmation
   9) demo user signs in and reaches My Account (demo@fashionstack.com / Demo@123)
   10) sign in with a wrong password shows an error.
   Do not generate more than 10."
```

### Act 1 — A feature lands (1:00)

```bash
git checkout feature/promo-code
git diff main --stat
```
Show the cart: apply `SAVE10`, see the discount; try `FREESTUFF`, see the error.
Say: "Small feature, 4 files touched. Which of my tests should I run?"

### Act 2 — Test selection (2:30)

```bash
tc run "Compare branch feature/promo-code against main. From the Playwright tests in tests/,
select only the tests impacted by this change, explain in one line why each is or isn't
impacted, then run just the selected tests on BrowserStack using browserstack.yml."
```
**Expected:** selects TC-06, TC-07 (cart totals), TC-08 (checkout via cart CTA);
skips home/search/category/product/auth. 3 of 10 tests → faster feedback.
**Expected result:** TC-08 fails — the "Proceed to Checkout" button no longer exists.

### Act 3 — RCA, then Fix (5:00)

```bash
tc rca --build <FAILED_BUILD>
```
**Expected:** root cause = test locator, not a product bug. The CTA text changed
from "Proceed to Checkout" to "Secure Checkout" in the v2 commit; the checkout
flow itself works.

```bash
tc fix --build <FAILED_BUILD>
```
**Expected:** updates `tests/checkout.spec.ts` to `"Secure Checkout"` and re-runs
TC-08 green. Show the one-line diff: `git diff tests/`.

> Fallback: `git checkout demo/v2-tests-backup -- tests/checkout.spec.ts`

### Act 4 — Authoring tests for the new feature (4:00)

Test cases from the PRD (keep it to 5):

```bash
tc generate --url http://localhost:5000 --local --coverage balanced \
  "Using the PRD in docs/v2-promo-code-prd.md, generate exactly 5 test cases for the
   cart promo code feature: (1) SAVE10 applies 10% off and updates the total,
   (2) an invalid code shows 'Invalid promo code' and no discount,
   (3) the code is case-insensitive and ignores spaces,
   (4) removing the code restores the original total,
   (5) the discount carries through to the checkout order summary.
   Do not generate more than 5."
```

Automate them:

```bash
tc run --app-url http://localhost:5000 \
  "Automate the 5 promo code test cases as Playwright tests in tests/promo-code.spec.ts.
   Reuse tests/helpers.ts (addProductToCart) and the existing data-testid conventions
   (cart-subtotal, cart-tax, cart-total, cart-discount, checkout-total).
   Number them TC-11 to TC-15, run them locally, and make sure all 5 pass."
```
**Expected values** (Silk Wrap Dress, size M): subtotal $189.99 → discount
−$19.00, tax $13.68, total $184.67 (without code: $205.19).

> Fallback: `git checkout demo/v2-tests-backup -- tests/promo-code.spec.ts`

### Act 5 — Visual + Accessibility (4:00)

**Visual (Percy):** the cart page changed. Show the Percy build comparing v1 vs
v2 cart: the new promo field and discount row are highlighted, while other
pages show no changes. The setup is below.

**Accessibility:**

```bash
tc run --app-url http://localhost:5000 \
  "Scan the shopping cart page with a product in the cart for WCAG 2.1 AA issues,
   focusing on the new promo code section. List each issue with severity, then fix
   them in src/components/ShoppingCartPage.tsx."
```
**Expected:** promo input has no accessible label; error text fails color
contrast and isn't announced (no `role="alert"`); icon-only buttons
(remove/quantity) have no accessible names. Fix adds `aria-label`s, a visible or
sr-only label, `role="alert"`, and a darker red.
Also show the BrowserStack Accessibility report from the Automate build
(`accessibility: true` in browserstack.yml).

### Wrap (1:00)
Recap on one slide: **selected 3/10 tests → RCA'd the failure as a test change,
not a bug → healed it → authored 5 new tests from a PRD → caught a visual diff
and 3 a11y issues before merge.** Then `tc pr` to open the PR with everything.

---

## Timing

| Act | Time | Running total |
|---|---|---|
| 0 Context | 1:30 | 1:30 |
| 1 Feature lands | 1:00 | 2:30 |
| 2 Test selection | 2:30 | 5:00 |
| 3 RCA + Fix | 5:00 | 10:00 |
| 4 Authoring | 4:00 | 14:00 |
| 5 Visual + A11y | 4:00 | 18:00 |
| Wrap | 1:00 | 19:00 |

If you're behind at minute 10: show Act 4's generated cases live, but skip live
automation — check out the backup tests and run `npm test`.

## Reset between demos

```bash
git checkout -- . && git clean -fd tests/ && git checkout main
```
