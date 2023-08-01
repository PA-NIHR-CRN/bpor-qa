import { test, expect } from "@playwright/test";


test("contact form test @UATONLY", async ({ page }) => {
  // can be any page we start on
  await page.goto(process.env.URL + "about/#contact-form");

  await page.locator("#Name").fill("Test");
  await page.locator("#EmailAddress").fill("Thomas.kirkwood@paconsulting.com");
  await page
    .locator("#Category")
    .fill("I have a general question about this website");
  await page.locator("#TelephoneNumber").fill("08806224777");
  await page.locator("#ShortDescription").fill("testing, safe to ignore");
  await page.locator("#Howcanwehelp").fill("testing Feedback Form");
  await page.locator("#feedbackFormSubmitButton").click();

    await page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual(/Thank you for contacting Be Part of Research/);
    });
    
});

test("contact form special characters", async ({ page }) => {
  await page.goto(process.env.URL + "about/#contact-form");

    await page.locator("#Name").type("<>£$%^&()={}[]_-'@:;/?")
    expect(page.locator("#Name")).toHaveValue('£-');

    await page.locator('#EmailAddress').type("<>£$%^&()={}[]_-'@:;/?");
    expect(page.locator("#EmailAddress")).toHaveValue('£_-@');

    await page.locator('#Category').type("I have a general question about this website");

    await page.locator('#TelephoneNumber').type("abcd!*&^%~}{<>?12345");
    expect(page.locator("#TelephoneNumber")).toHaveValue('12345');

  await page.locator("#ShortDescription").type("<>£$%^&()={}[]_'@:;?/-");
  expect(page.locator("#ShortDescription")).toHaveValue("£/-");

  await page.locator("#Howcanwehelp").type("<>£$%^&()={}[]_'@:;?/-");
  await expect(page.locator("#Howcanwehelp")).toHaveValue("£()/-");
  await page.locator("#ShortDescription").type("<>£$%^&()={}[]_'@:;?/-");
  expect(page.locator("#ShortDescription")).toHaveValue("£/-");

  await page.locator("#Howcanwehelp").type("<>£$%^&()={}[]_'@:;?/-");
  await expect(page.locator("#Howcanwehelp")).toHaveValue("£()/-");
});

