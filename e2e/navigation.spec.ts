import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should display homepage and navigate to courses", async ({ page }) => {
    await page.goto("/");

    // Check if the homepage loads
    await expect(page).toHaveTitle(/Learning Platform|Learn/i);

    // Navigate to courses page
    await page.click('a[href*="/courses"]');

    // Verify we're on the courses page
    await expect(page).toHaveURL(/.*courses/);
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/");

    // Look for login link
    const loginLink = page.locator('a[href*="/auth/login"]').first();
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/.*auth\/login/);
    }
  });

  test("should navigate to signup page", async ({ page }) => {
    await page.goto("/");

    // Look for signup link
    const signupLink = page.locator('a[href*="/auth/signup"]').first();
    if (await signupLink.isVisible()) {
      await signupLink.click();
      await expect(page).toHaveURL(/.*auth\/signup/);
    }
  });

  test("should be able to view courses page", async ({ page }) => {
    await page.goto("/courses");

    // Wait for courses to load
    await page.waitForLoadState("networkidle");

    // Check if page has content
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });
});
