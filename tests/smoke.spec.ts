import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
	test('homepage loads successfully', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle(/Dejan Vasic - Software Engineer/);
		await expect(page.locator('body')).toBeVisible();
		await expect(page.getByRole('heading', { name: /Dejan Vasic/ })).toBeVisible();

		// Navigate to CV
		await page.getByRole('banner').getByRole('link', { name: 'CV' }).click();
		await expect(
			page.getByText('Staff Software Engineer at Open Universities Australia')
		).toBeVisible();
		await expect(page.getByText('Professional Summary')).toBeVisible();

		// Navigate to Projects
		await page.getByRole('banner').getByRole('link', { name: 'Projects' }).click();
		await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

		// Navigate to Blog
		await page.getByRole('banner').getByRole('link', { name: 'Blog' }).click();
		await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
		expect(page.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/rss.xml');

		// Test theme toggle accessibility and functionality
		const themeToggle = page.getByTestId('theme-toggle');
		await expect(themeToggle).toBeVisible();
		await expect(themeToggle).toHaveAttribute('role', 'switch');
		await expect(themeToggle).toHaveAttribute('aria-label');
		
		// Test theme toggle functionality
		const initialTheme = await page.getAttribute('html', 'data-theme');
		await themeToggle.click();
		const newTheme = await page.getAttribute('html', 'data-theme');
		expect(newTheme).not.toBe(initialTheme);
		
		// Verify aria-pressed state changes
		const ariaPressed = await themeToggle.getAttribute('aria-pressed');
		expect(ariaPressed).toBe(newTheme === 'dark' ? 'true' : 'false');
	});
});
