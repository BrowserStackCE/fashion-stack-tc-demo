import { test, expect } from "@playwright/test";
import { addProductToCart } from "./helpers";

test("TC-6435698 guest checkout places an order and shows confirmation", async ({ page }) => {
  await addProductToCart(page, "Leather Crossbody Bag", "One Size");
  await page.getByTestId("header-cart").click();
  await page.getByRole("button", { name: "Proceed to Checkout" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Checkout" })).toBeVisible();

  await page.getByRole("textbox", { name: "Email address" }).fill("jane.doe@example.com");
  await page.getByRole("textbox", { name: "First name" }).fill("Jane");
  await page.getByRole("textbox", { name: "Last name" }).fill("Doe");
  await page.getByRole("textbox", { name: "Address", exact: true }).fill("100 Market Street");
  await page.getByRole("textbox", { name: "City" }).fill("San Francisco");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "California" }).click();
  await page.getByRole("textbox", { name: "ZIP code" }).fill("94105");
  await page.getByRole("textbox", { name: "Phone" }).fill("4155550100");
  await page.getByRole("textbox", { name: "Card number" }).fill("4242424242424242");
  await page.getByRole("textbox", { name: "Name on card" }).fill("Jane Doe");
  await page.getByRole("textbox", { name: "Expiry date" }).fill("12/30");
  await page.getByRole("textbox", { name: "CVV" }).fill("123");
  await page.getByRole("button", { name: "Complete Order" }).click();

  await expect(page.getByRole("heading", { name: "Order Confirmed!" })).toBeVisible();
  await expect(page.getByText("Thank you for your purchase, Jane!")).toBeVisible();
  await expect(page.getByText(/#FS\d+/).first()).toBeVisible();
});
