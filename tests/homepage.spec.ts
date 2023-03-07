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

  const studiesFoundNumber = page.locator(".search-results");

  expect(studiesFoundNumber).toBeTruthy();
});
