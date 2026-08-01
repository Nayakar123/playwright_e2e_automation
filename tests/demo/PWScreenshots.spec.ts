import { test, expect } from "@playwright/test";

/**
 * 1. Login as stanadrd user
 * 2. Get a list of products with its price
 * 3. Asserts that all products have non-zero dollar value
 */

test.describe("SauceDemo Inventory feature", () => {
  test.beforeEach(
    "Login with valid credentials",
    async ({ page }, TestInfo) => {
      //Launch URL and Login
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').fill("standard_user");
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();

      //Add Screenshot for the login page
      let loginPageFullscreenshot = await page.screenshot({
        fullPage: true,
      });
      await TestInfo.attach("Login Page Screenshot", {
        body: loginPageFullscreenshot,
        contentType: "image/png",
      });

      //Assertion
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page).toHaveURL(/.*\/inventory/);
    },
  );

  test("Should confirm all prices are non-zero values", async ({ page }) => {
    //Get the list of products
    let productElements = page.locator(".inventory_item");
    await expect(productElements).toHaveCount(6);

    let priceArr = [];
    //Get the Product name and prices
    let totalProducts = await productElements.count();
    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productElements.nth(i);

      //Product Name
      let productName = await eleNode
        .locator(".inventory_item_name")
        .innerText();

      //Product Price
      let price = await eleNode.locator(".inventory_item_price").innerText();

      //Print the Results
      console.log(`Product: ${productName}, Price: ${price}`);

      priceArr.push(price);
    }
    console.log(`The Original Price Array: ${priceArr}`);

    let modifiedPrice = priceArr.map((item) =>
      parseFloat(item.replace("$", "")),
    );
    console.log(`>>Modified arr ${modifiedPrice}`);

    let invalidPrice = modifiedPrice.filter((item) => item <= 0);
    if (invalidPrice.length > 0) {
      console.log(`Error: Zero price found, ${invalidPrice} `);
    } else {
      {
        console.log(`Info: All prices are non-zero, ${invalidPrice}`);
      }
    }
    expect(invalidPrice).toHaveLength(0);
  });
});
