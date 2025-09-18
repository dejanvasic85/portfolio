import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
	test('homepage loads successfully', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle(/Dejan Vasic - Software Engineer/);
		await expect(page.locator('body')).toBeVisible();
		await expect(page.locator('nav')).toBeVisible();
	});
});
