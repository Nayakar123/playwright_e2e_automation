import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Login URL
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  //Click On Make an Appointment
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();

  //Login
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  //Assert a text
  await expect(page.locator("h2")).toContainText("Make Appointment");

  //Logout
  await page.locator('#menu-toggle').click();
  await page.getByRole('link', { name: 'Logout' }).click();
});