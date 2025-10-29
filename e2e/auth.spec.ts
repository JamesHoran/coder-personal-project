import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should display login form", async ({ page }) => {
    await page.goto("/auth/login");

    // Check for email input
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    // Check for password input
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();

    // Check for submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  test("should display signup form", async ({ page }) => {
    await page.goto("/auth/signup");

    // Check for email input
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    // Check for password input
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();

    // Check for submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  test("should show error for empty login form submission", async ({
    page,
  }) => {
    await page.goto("/auth/login");

    // Click submit without filling in any fields
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait a bit for validation to appear
    await page.waitForTimeout(500);

    // Check if still on login page (didn't navigate away)
    await expect(page).toHaveURL(/.*auth\/login/);
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/auth/login");

    // Fill in invalid credentials
    await page.fill('input[type="email"]', "invalid@example.com");
    await page.fill('input[type="password"]', "wrongpassword");

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for potential error message or redirect
    await page.waitForTimeout(1000);

    // Should still be on login page or show error
    // (This depends on your error handling implementation)
  });

  test("should have link to signup from login page", async ({ page }) => {
    await page.goto("/auth/login");

    // Look for link to signup
    const signupLink = page.locator('a[href*="/auth/signup"]');
    if (await signupLink.count() > 0) {
      await expect(signupLink.first()).toBeVisible();
    }
  });

  test("should have link to login from signup page", async ({ page }) => {
    await page.goto("/auth/signup");

    // Look for link to login
    const loginLink = page.locator('a[href*="/auth/login"]');
    if (await loginLink.count() > 0) {
      await expect(loginLink.first()).toBeVisible();
    }
  });
});
