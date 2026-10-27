import { test, expect } from "@playwright/test";
import { openHome, search } from "./helpers";

test("TC-6435692 searching for a product shows matching results", async ({ page }) => {
  await openHome(page);
  await search(page, "denim");

  await expect(page.getByRole("heading", { name: "Heritage Denim Jacket" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Silk Wrap Dress" })).toHaveCount(0);
});

test("TC-6435693 searching for an unknown term shows the empty state", async ({ page }) => {
  await openHome(page);
  await search(page, "spaceship");

  await expect(page.getByRole("heading", { name: "No results found" })).toBeVisible();
});
