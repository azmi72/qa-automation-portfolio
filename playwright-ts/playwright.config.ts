import { defineConfig, devices } from '@playwright/test';
import { BASE_URL, UI_BASE_URL } from './src/config.ts';

export default defineConfig({
    projects: [
        // API helper
        {
            name: 'api',
            testDir: './tests/api',
            use: { baseURL: BASE_URL },
        },
        // UI helper
        {
            name: 'ui',
            testDir: './tests/ui',
            use: { ...devices['Desktop Chrome'], baseURL: UI_BASE_URL },
        },
    ],
    reporter: [['list'], ['html', { open: 'never' }]], // Shared (API + UI)
    forbidOnly: !!process.env.CI, // Shared (API + UI)
    retries: process.env.CI ? 1 : 0, // Shared (API + UI)
});
