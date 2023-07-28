import { test, expect } from "@playwright/test";

test("header Logo links", async ({ page }) => {
  // can be any page we start on
  await page.goto(process.env.URL + "/results/a-z-conditions");
  const BPoRLogo = page.locator("#logoImg");
  // check the logo is appearing
  expect(BPoRLogo).toBeTruthy();
  BPoRLogo.click();
  await page.waitForLoadState("networkidle");
  expect(page.url()).toEqual(process.env.URL);
});

test("NHS Logo links", async ({ page }) => {
  // can be any page we start on
  await page.goto(process.env.URL + "");
  const nhsLogo = page.locator("#NHSlogo");
  // check the logo is appearing
  await expect(nhsLogo).toHaveClass(/site-header__logo/);
});

test("search button", async ({ page }) => {
  // can be any page we start on
  await page.goto(process.env.URL + "");
  const searchButton = page.getByRole("button", { name: /Search for study/ });
  // check the logo is appearing
  await expect(searchButton).toHaveClass(/btn--nav/);
  searchButton.click();
  await page.waitForLoadState("networkidle");
  expect(page.url()).toEqual(
    process.env.URL + "results/search-results?query=&location="
  );
});

test("view conditoions button", async ({ page }) => {
  // can be any page we start on
  await page.goto("https://bepartofresearch.nihr.ac.uk/");
  const viewConditionsButton = page.getByRole("link", {
    name: /View conditions/,
  });
  await expect(viewConditionsButton).toHaveClass(/btn--nav/);
  viewConditionsButton.click();
  await page.waitForLoadState("networkidle");
  expect(page.url()).toEqual(
    "https://bepartofresearch.nihr.ac.uk/results/a-z-conditions"
  );
});

test("search term and location input", async ({ page }) => {
  // note this is not a test of the filter search function, only that it correctly navigates with search term and location
  await page.goto(process.env.URL + "");
  // page.locator('input').filter({hasText:/keyword/}).fill("ISRCTN33951209");
  await page
    .getByPlaceholder(/Keyword e.g. cancer, drug name/)
    .fill("ISRCTN33951209");
  await page.locator("#location-search-field").fill("Strabane");
  page.getByRole("button", { name: /Search for study/ }).click();
  await page.waitForLoadState("networkidle");
  await expect(page.url()).toEqual(
    process.env.URL +
      "results/search-results?query=ISRCTN33951209&location=Strabane"
  );
});

test("invalid characters in searchbox", async ({ page }) => {
  await page.goto(process.env.URL + "");
  //search term box
  const searchBox = page.getByPlaceholder(/Keyword e.g. cancer, drug name/);
  await searchBox.type("\"<>$%^&()={}[]_'@:;/?age-*+");
  await expect(searchBox).toHaveValue("\"%()'age-*+");
  // location box
  const locationBox = page.locator("#location-search-field");
  await locationBox.type("<>$%^&()={}[]_@:;/?BT37 9+*");
  await expect(locationBox).toHaveValue("%()BT37 9+*");
});
