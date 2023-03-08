import { test, expect } from "@playwright/test";

test("CSS has loaded on homepage", async ({ page }) => {
  await page.goto("https://bepartofresearch.nihr.ac.uk/");

  const article = page.locator(".article-carousel__article").first();

  // Expect the background of the article card to have the colour #fdebd8 applied.
  await expect(article).toHaveCSS("background-color", "rgb(253, 235, 216)");
});

test("Studies exist", async ({ page }) => {
  await page.goto(
    "https://bepartofresearch.nihr.ac.uk/results/search-results?query=&location="
  );

  const studySearchResults = page.locator(".search-results");

  expect(studySearchResults).toBeTruthy();
});

test("Specific study data loads", async ({ page }) => {
  await page.goto(
    "https://bepartofresearch.nihr.ac.uk/trial-details/trial-detail?trialId=1&location=&distance="
  );

  await page.waitForSelector(".primary-heading");

  const studyTitle = page.locator(".primary-heading");

  await expect(studyTitle).toHaveText(
    /A comparison of pictures vs. text for the explanation of cancer statistics to the general public/
  );
});
