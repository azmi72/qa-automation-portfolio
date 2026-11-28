import type { Locator, Page } from '@playwright/test';
import type { ContactMessage } from '../message-data.ts';

// UI helper
export class HomePage {
    // Static locators: declare the properties
    readonly welcomeHeading: Locator;
    readonly ourRoomsHeading: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly phoneField: Locator;
    readonly subjectField: Locator;
    readonly messageField: Locator;
    readonly submitButton: Locator;

    constructor(private readonly page: Page) {
        // Static locators: assign the properties
        this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' });
        this.ourRoomsHeading = page.getByRole('heading', { name: 'Our Rooms' });
        this.nameField = page.getByLabel('Name');
        this.emailField = page.getByLabel('Email');
        this.phoneField = page.getByLabel('Phone');
        this.subjectField = page.getByLabel('Subject');
        this.messageField = page.getByTestId('ContactDescription');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    // Dynamic locators
    thanksHeading(name: string): Locator {
        return this.page.getByRole('heading', { name: `Thanks for getting in touch ${name}!` });
    }

    sentSubject(subject: string): Locator {
        return this.page.getByText(subject);
    }
 
    errorMessage(text: string): Locator {
        return this.page.getByText(text);
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async sendMessage(message: ContactMessage): Promise<void> {
        await this.nameField.fill(message.name);
        await this.emailField.fill(message.email);
        await this.phoneField.fill(message.phone);
        await this.subjectField.fill(message.subject);
        await this.messageField.fill(message.description);
        await this.submitButton.click();
    }
}