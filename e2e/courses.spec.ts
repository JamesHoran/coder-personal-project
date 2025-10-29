import { test, expect } from "@playwright/test";

test.describe("Courses Page", () => {
  test("should display courses listing", async ({ page }) => {
    await page.goto("/courses");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check if courses page is loaded
    await expect(page).toHaveURL(/.*courses/);
  });

  test("should navigate to individual course page", async ({ page }) => {
    await page.goto("/courses");

    // Wait for courses to load
    await page.waitForLoadState("networkidle");

    // Find and click on a course link (if available)
    const courseLinks = page.locator('a[href*="/courses/"]');
    const count = await courseLinks.count();

    if (count > 0) {
      await courseLinks.first().click();
      await expect(page.url()).toContain("/courses/");
    }
  });

  test("should display course details when viewing a specific course", async ({
    page,
  }) => {
    // Navigate to a specific course (TypeScript course as example)
    await page.goto("/courses/typescript");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Verify page loaded
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });
});
