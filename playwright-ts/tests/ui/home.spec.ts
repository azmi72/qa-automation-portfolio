import { test, expect } from '../../src/ui-fixtures.ts';

test('home page shows the correct title and main heading', { tag: ['@smoke', '@positive'] }, async ({ homePage, page }) => {
    await homePage.goto();

    await expect(page).toHaveTitle('Restful-booker-platform demo');
    await expect(homePage.welcomeHeading).toBeVisible();
});

test('home page shows the Our Rooms section', { tag: '@positive' }, async ({ homePage }) => {
    await homePage.goto();

    await expect(homePage.ourRoomsHeading).toBeVisible();
});