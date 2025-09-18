import { defineConfig, devices } from '@playwright/test';

const baseURL =
	process.env.PLAYWRIGHT_TEST_BASE_URL ||
	(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:4321');

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	globalTimeout: 5 * 60 * 1000,
	reporter: 'html',
	use: {
		baseURL,
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	],
	webServer: process.env.CI
		? undefined
		: {
				command: 'npm run dev',
				url: 'http://localhost:4321',
				reuseExistingServer: !process.env.CI
			}
});
