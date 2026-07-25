import { test, expect } from "@playwright/test";
test("Should load home page with correct title", async ({ page }) => {
  // Go to the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com");

  //Assert the Page title
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //Assert header
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Test Some thing", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.locator("//h1").click();
});

test.only("Test Demo Locator", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //let makeApptBtn = page.getByRole("link", { name: "Make Appointment" });
  let makeApptBtn = page.getByRole("link", { name: "Invalid Locator" });
  await makeApptBtn.click();
  //console.log(`>> Type of locator: ${typeof makeApptBtn}, The value of the locator is: ${JSON.stringify(makeApptBtn)}`);
  //await expect(page.getByText("Please login to make")).toBeVisible();
});
