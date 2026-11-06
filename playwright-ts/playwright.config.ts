import { defineConfig } from '@playwright/test';
import { BASE_URL } from './src/config.ts';

export default defineConfig({
    testDir: './tests',
    reporter: 'list',
    use: {
        baseURL: BASE_URL,
    },
});