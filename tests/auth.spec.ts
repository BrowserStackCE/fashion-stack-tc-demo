import { test, expect } from "@playwright/test";
import { DEMO_USER, openHome } from "./helpers";

test.beforeEach(async ({ page }) => {
  await openHome(page);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
});

test("TC-09 registered user can sign in and reach My Account", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email Address" }).fill(DEMO_USER.email);
  await page.getByRole("textbox", { name: "Password" }).fill(DEMO_USER.password);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();

  await expect(page.getByRole("heading", { name: "My Account" })).toBeVisible();
  await expect(page.getByText(DEMO_USER.email).first()).toBeVisible();
});

test("TC-10 sign in with a wrong password shows an error", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email Address" }).fill(DEMO_USER.email);
  await page.getByRole("textbox", { name: "Password" }).fill("WrongPass1!");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();

  const dialog = page.getByRole("alertdialog");
  await expect(dialog.getByText("Login Error")).toBeVisible();
  await expect(dialog.getByText("Invalid email or password")).toBeVisible();
});
