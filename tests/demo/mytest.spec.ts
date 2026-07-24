import {test, expect} from '@playwright/test';
test("Should load home page with correct title", async({page}) => {
    // Go to the home page
    await page.goto("https://katalon-demo-cura.herokuapp.com")

    //Assert the Page title
    await expect(page).toHaveTitle("CURA Healthcare Service")

    //Assert header
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")
})