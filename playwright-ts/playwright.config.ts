import { defineConfig } from '@playwright/test';
import { BASE_URL } from './src/config.ts';

export default defineConfig({
    testDir: './tests',
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: BASE_URL,
    },
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
});
