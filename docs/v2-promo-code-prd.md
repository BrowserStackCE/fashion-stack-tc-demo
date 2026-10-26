# PRD: Promo Code in Shopping Cart (FashionStack v2)

## Summary
Shoppers can enter a promo code in the cart's Order Summary to get a percentage
discount. The discount is reflected in the cart total and carried through to
checkout.

## Scope
- Cart page → Order Summary gets a **Promo code** field and an **Apply** button.
- One active code: `SAVE10` = 10% off the merchandise subtotal.
- Only one code can be applied at a time.

## Requirements
1. Entering `SAVE10` and clicking **Apply** shows the confirmation
   "SAVE10 applied — 10% off" and adds a **Discount** line (negative amount) to
   the Order Summary.
2. Tax (8%) is calculated on the discounted subtotal; **Total** = subtotal −
   discount + shipping + tax.
3. Codes are case-insensitive and ignore surrounding spaces (`" save10 "` works).
4. An unknown code shows the error "Invalid promo code" and no discount is
   applied.
5. An applied code can be removed with **Remove**, which restores the original
   totals.
6. The discount line and discounted total appear in the Checkout page's Order
   Summary and in the order that is placed.

## Also in this release
- The cart's primary button copy changes from "Proceed to Checkout" to
  **"Secure Checkout"** (conversion experiment).

## Out of scope
- Multiple codes, fixed-amount codes, expiry dates, per-product exclusions.
