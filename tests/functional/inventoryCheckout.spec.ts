import { test, expect } from "@playwright/test";

/**
 * 1. Login as stanadrd user
 * 2. Get a list of products with its price
 * 3. Asserts that all products have non-zero dollar value
 */

test.describe("SauceDemo Inventory feature", () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    await page.context().clearCookies();

    //Launch URL and Login
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    //Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);

    const bagproduct = page.locator(".inventory_item").filter({
      hasText: "Sauce Labs Backpack",
    });

    const removeBtn = bagproduct.getByRole("button", { name: "Remove" });

    // safer check
    if ((await removeBtn.count()) > 0) {
      await removeBtn.click();
    }
  });
  test("Checkout the Sauce Labs Backpack item", async ({ page }) => {
    //Click the Add to Cart button - Sauce Labs Backpack item

    // const bagProduct = page.locator(".inventory_item").filter({
    //   has: page.locator(".inventory_item_name", {
    //     hasText: "Sauce Labs Backpack}",
    //   }),
    // });

    const bagproduct = page.locator(".inventory_item").filter({
      hasText: "Sauce Labs Backpack",
    });
    await bagproduct.getByRole("button", { name: "Add to cart" }).click();

    //Click on cart link option
    await page.getByTestId("shopping-cart-link").click();

    //Assert the Checkout button visibility
    await expect(page.getByTestId("checkout")).toBeVisible();

    //Click checkout button
    await page.getByTestId("checkout").click();

    // Fill Checkout user information
    await page.getByTestId("firstName").fill("John");
    await page.getByTestId("lastName").fill("Mike");
    await page.getByTestId("postalCode").fill("567809");

    //Click Continue
    await page.getByTestId("continue").click();

    //Aseert total price after filling user details
    const totalText = await page.getByTestId("total-label").textContent();
    const amount = parseFloat(totalText!.replace(/[^0-9.]/g, ""));
    expect(amount).toBeGreaterThanOrEqual(0);

    //Click on Finish button
    await page.getByTestId("finish").click();

    //Assert confirmation
    const successMsg = page.locator('[data-test="complete-header"]');

    // Check visible
    await expect(successMsg).toBeVisible();

    // Check exact text
    await expect(successMsg).toHaveText("Thank you for your order!");
  });
});
