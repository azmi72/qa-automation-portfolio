import { test, expect } from '@playwright/test';

test('home page shows the correct title and main heading', { tag: ['@smoke', '@positive'] }, async ({ page }) => {
    await page.goto('/');
    const heading = page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' });

    await expect(page).toHaveTitle('Restful-booker-platform demo');
    await expect(heading).toBeVisible();
});

test('home page shows the Our Rooms section', { tag: '@positive' }, async ({ page }) => {
    await page.goto('/');
    const ourRooms = page.getByRole('heading', { name: 'Our Rooms' });

    await expect(ourRooms).toBeVisible();
});