import { test, expect } from "@playwright/test";

// the id of the study ISRCTN13072268 on prod and uat
let trialId = 9570;
if (process.env.URL != null && process.env.URL.includes("uat")) {
  trialId = 9858;
}

test("advert appears on page", async ({ page }) => {
  // using a dementia study for the JDR adverts
  await page.goto(
    process.env.URL +
      "trial-details/trial-detail?trialId=" +
      trialId +
      "&location=&distance="
  );

  const advert = page.locator(".bpor-advert").first();

  // Expect there to be an advert on the page
  await expect(advert).toBeTruthy();
});

test("JDR advert points to correct URL", async ({ page }) => {
  // using a dementia study for the JDR adverts
  await page.goto(
    process.env.URL +
      "trial-details/trial-detail?trialId=" +
      trialId +
      "&location=&distance="
  );

  const advertLink = page.locator("#bpor-advert-condition").first();

  // Expect the JDR advert to point to JDR
  await expect(advertLink).toHaveAttribute(
    "href",
    "https://www.joindementiaresearch.nihr.ac.uk"
  );
});

test("check study sites button", async ({ page }) => {
  // using a dementia study for the JDR adverts
  await page.goto(
    process.env.URL +
      "trial-details/trial-detail?trialId=" +
      trialId +
      "&location=&distance="
  );

  // check the study sites button shows the location list and that it contains the correct locations
  const locationList = page.locator(".location-list");
  await expect(locationList).toHaveClass(/d-none/);
  page.locator(".location-toggle").click();
  await expect(locationList).not.toHaveClass(/d-none/);
  const studySite = locationList.getByText(/Wickford/);
  expect(studySite).toBeTruthy();
});

test("summary collapsable link", async ({ page }) => {
  // using a dementia study for the JDR adverts
  await page.goto(
    process.env.URL +
      "trial-details/trial-detail?trialId=" +
      trialId +
      "&location=&distance="
  );

  // check the collapable links
  const collapsableLink = page.locator(".collapsable__action").first();
  const collapsableTitle = page.locator(".collapsable__title").first();
  const collapsableContent = page.locator(".collapsable__content").first();
  await expect(collapsableTitle).toHaveText(/Study summary/);
  await expect(collapsableContent).toHaveClass(/d-none/);
  collapsableLink.click();
  await expect(collapsableContent).not.toHaveClass(/d-none/);
  await expect(collapsableContent).toHaveText(
    /This information is provided directly by researchers and we recognise that it isn't always easy to understand./
  );
});
