import { test, expect } from "@playwright/test";
import { openProduct } from "./helpers";

test("TC-05 product details page shows price, reviews and selectable sizes", async ({ page }) => {
  await openProduct(page, "Silk Wrap Dress");

  await expect(page.getByText("$189.99").first()).toBeVisible();
  await expect(page.getByText("(124 reviews)")).toBeVisible();
  await page.getByRole("button", { name: "L", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Size: L" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Add to Cart - $189.99" })).toBeEnabled();
});
