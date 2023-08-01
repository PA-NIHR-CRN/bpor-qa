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

test("Study search endpoint returns a 200", async ({ request }) => {
  const emptySearch = await request.post(
    "https://bepartofresearch-api.nihr.ac.uk/search/json-params/cd",
    {
      data: {
        dist: 20,
        facetDef: {
          Gender: null,
          "Study Status": ["Recruiting"],
          "Updated Within": null,
          "Age Range": null,
          "Health Tag": null,
          "Health Category": null,
        },
        latLon: "",
        offset: 0,
        openurl: "yes",
        query: "*",
        rows: 1,
        sortBy: null,
        sortOrder: null,
      },
    }
  );

  expect(emptySearch.ok()).toBeTruthy();
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
