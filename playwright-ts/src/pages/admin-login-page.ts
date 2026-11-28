import type { Locator, Page } from '@playwright/test';
import type { Credentials } from '../booking.types.ts';

// UI helper
export class AdminLoginPage {
    // Static locators: declare the properties
    readonly adminUsername: Locator;
    readonly adminPassword: Locator;
    readonly loginButton: Locator;

    constructor(private readonly page: Page) {
        // Static locators: assign the properties
        this.adminUsername = page.getByLabel('Username');
        this.adminPassword = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    // Dynamic locators
    errorAlert(text: string): Locator {
        return this.page.getByRole('alert').filter({ hasText: text });
    }

    async goto(): Promise<void> {
        await this.page.goto('/admin');
    }

    async login(credentials: Credentials): Promise<void> {
        await this.adminUsername.fill(credentials.username);
        await this.adminPassword.fill(credentials.password);
        await this.loginButton.click();
    }
}