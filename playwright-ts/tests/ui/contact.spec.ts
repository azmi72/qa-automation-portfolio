import { test, expect } from '@playwright/test';
import { buildMessage } from '../../src/message-data.ts';

test('contact form with valid data shows a thank you message', { tag: '@positive' }, async ({ page }) => {
    const contactMessage = buildMessage();

    await page.goto('/');
    await page.getByLabel('Name').fill(contactMessage.name);
    await page.getByLabel('Email').fill(contactMessage.email);
    await page.getByLabel('Phone').fill(contactMessage.phone);
    await page.getByLabel('Subject').fill(contactMessage.subject);
    await page.getByTestId('ContactDescription').fill(contactMessage.description);
    await page.getByRole('button', { name: 'Submit' }).click();

    const thanksTitleMessage = page.getByRole('heading', { name: `Thanks for getting in touch ${contactMessage.name}!` });
    const thanksSubjectMessage = page.getByText(contactMessage.subject);

    await expect(thanksTitleMessage).toBeVisible();
    await expect(thanksSubjectMessage).toBeVisible();
});

const contactMessageWithInvalidFormData = [
    { title: 'phone', overrides: { phone: '1234567890' }, error: 'Phone must be between 11 and 21 characters.' },
    { title: 'subject', overrides: { subject: 'abcd' }, error: 'Subject must be between 5 and 100 characters.' },
    { title: 'message', overrides: { description: 'abcdefghijklmnopqrs' }, error: 'Message must be between 20 and 2000 characters.' },
];

for (const testCase of contactMessageWithInvalidFormData) {
    test(`contact form with an invalid ${testCase.title} shows an error`, { tag: '@negative' }, async ({ page }) => {
        const contactMessage = buildMessage(testCase.overrides);

        await page.goto('/');
        await page.getByLabel('Name').fill(contactMessage.name);
        await page.getByLabel('Email').fill(contactMessage.email);
        await page.getByLabel('Phone').fill(contactMessage.phone);
        await page.getByLabel('Subject').fill(contactMessage.subject);
        await page.getByTestId('ContactDescription').fill(contactMessage.description);
        await page.getByRole('button', { name: 'Submit' }).click();

        const errorMessage = page.getByText(testCase.error);
        const thanksMessage = page.getByRole('heading', { name: `Thanks for getting in touch ${contactMessage.name}!` });

        await expect(errorMessage).toBeVisible();
        await expect(thanksMessage).toBeHidden();
    });
}