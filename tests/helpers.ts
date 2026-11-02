import { expect, type Page } from "@playwright/test";

export const DEMO_USER = {
  name: "Demo Shopper",
  email: "demo@fashionstack.com",
  password: "Demo@123",
};

export async function openHome(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Featured Products" })).toBeVisible();
}

export async function openProduct(page: Page, name: string) {
  await openHome(page);
  const card = page.locator("div", { has: page.getByRole("heading", { name, exact: true }) })
    .filter({ has: page.getByRole("button", { name: "View Details" }) })
    .last();
  await card.getByRole("button", { name: "View Details" }).click();
  await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
}

export async function addProductToCart(page: Page, name: string, size: string) {
  await openProduct(page, name);
  await page.getByRole("button", { name: size, exact: true }).click();
  await page.getByRole("button", { name: /^Add to Cart/ }).click();
  await expect(page.getByTestId("header-cart-count")).toHaveText("1");
}

export async function search(page: Page, query: string) {
  const box = page.getByRole("textbox", { name: "Search..." });
  await box.fill(query);
  await box.press("Enter");
  await expect(page.getByRole("heading", { name: "Search Results" })).toBeVisible();
}
