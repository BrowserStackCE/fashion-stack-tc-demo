import { test, expect } from "@playwright/test";
import { openHome } from "./helpers";

test("TC-01 homepage shows navigation, promo banner and featured products", async ({ page }) => {
  await openHome(page);

  await expect(page.getByRole("heading", { level: 1, name: "FashionStack" })).toBeVisible();
  for (const category of ["New", "Men", "Women", "Sale"]) {
    await expect(page.getByRole("button", { name: category, exact: true }).first()).toBeVisible();
  }
  await expect(page.getByRole("heading", { name: "Summer Collection 2024" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Silk Wrap Dress" })).toBeVisible();
  await expect(page.getByRole("button", { name: "View Details" })).toHaveCount(6);
});
