import { test, expect } from '../../src/ui-fixtures.ts';
import { PLATFORM_CREDENTIALS } from '../../src/config.ts';

test('admin login with valid credentials opens the rooms page', { tag: ['@smoke', '@positive'] }, async ({ adminLoginPage, page }) => {
    await adminLoginPage.goto();
    await adminLoginPage.login(PLATFORM_CREDENTIALS);

    await expect(page).toHaveURL(/\/admin\/rooms$/);
});

test('admin login with a wrong password shows an error', { tag: '@negative' }, async ({ adminLoginPage, page }) => {
    const wrongCredentials = { ...PLATFORM_CREDENTIALS, password: 'wrong' };

    await adminLoginPage.goto();
    await adminLoginPage.login(wrongCredentials);

    await expect(adminLoginPage.errorAlert('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/admin$/);
});