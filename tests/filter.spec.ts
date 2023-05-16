import { test, expect } from "@playwright/test";




test("filter app simple search", async ({ page }) => {
    // can be any page we start on
    await page.goto(process.env.URL+"results/search-results?query=ISRCTN33951209&location=Strabane");
    page.locator('#Recruiting').uncheck();
    // check the logo is appearing
    await expect(page.locator('article')).toHaveCount(1);
});

test("distance check", async ({ page }) => {
    // can be any page we start on
    await page.goto(process.env.URL+"results/search-results?query=ISRCTN33951209&location=londonderry");
    page.locator('#Recruiting').uncheck();
    // check the logo is appearing
    await expect(page.locator('article')).toHaveCount(1);

    page.locator('#FilterItemRadioButton10').click();
    await expect(page.locator('article')).toHaveCount(0);
    page.locator('#FilterItemRadioButton1000').click();
    await expect(page.locator('article')).toHaveCount(1);
});