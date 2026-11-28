import { test as base } from '@playwright/test';
import { HomePage } from './pages/home-page.ts';
import { AdminLoginPage } from './pages/admin-login-page.ts';

type TestFixtures = { homePage: HomePage, adminLoginPage: AdminLoginPage };

// UI helper
export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    adminLoginPage: async ({ page }, use) => {
        await use(new AdminLoginPage(page));
    }
});

// UI helper
export { expect } from '@playwright/test';