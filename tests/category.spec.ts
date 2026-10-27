import { test, expect } from "@playwright/test";
import { openHome } from "./helpers";

test("TC-6435694 Men category lists only men's products", async ({ page }) => {
  await openHome(page);
  await page.getByRole("button", { name: "Men", exact: true }).first().click();

  await expect(page.getByRole("heading", { level: 1, name: "Men's Fashion" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heritage Denim Jacket" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Silk Wrap Dress" })).toHaveCount(0);
});
