import { test, expect } from "@playwright/test";
import { addProductToCart } from "./helpers";

test("TC-6435696 adding a product updates the cart badge and cart contents", async ({ page }) => {
  await addProductToCart(page, "Silk Wrap Dress", "M");

  await page.getByTestId("header-cart").click();
  await expect(page.getByRole("heading", { name: "Shopping Cart" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Silk Wrap Dress" })).toBeVisible();
  await expect(page.getByText("Size: M")).toBeVisible();
  await expect(page.getByTestId("cart-subtotal")).toHaveText("$189.99");
  await expect(page.getByTestId("cart-total")).toHaveText("$205.19");
});

test("TC-6435697 changing quantity recalculates totals and removing empties the cart", async ({ page }) => {
  await addProductToCart(page, "Essential Cotton Tee", "S");
  await page.getByTestId("header-cart").click();

  await page.getByTestId("cart-qty-increase").click();
  await expect(page.getByTestId("cart-item-qty")).toHaveText("2");
  await expect(page.getByTestId("cart-subtotal")).toHaveText("$79.98");
  await expect(page.getByTestId("cart-tax")).toHaveText("$6.40");
  await expect(page.getByTestId("cart-total")).toHaveText("$86.38");

  await page.getByTestId("cart-item-remove").click();
  await expect(page.getByRole("heading", { name: "Your cart is empty" })).toBeVisible();
});
