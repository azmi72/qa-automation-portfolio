import { test, expect } from '../../src/ui-fixtures.ts';
import { buildMessage } from '../../src/message-data.ts';

test('contact form with valid data shows a thank you message', { tag: '@positive' }, async ({ homePage }) => {
    const contactMessage = buildMessage();

    await homePage.goto();
    await homePage.sendMessage(contactMessage);

    const thanksTitleMessage = homePage.thanksHeading(contactMessage.name);
    const thanksSubjectMessage = homePage.sentSubject(contactMessage.subject);

    await expect(thanksTitleMessage).toBeVisible();
    await expect(thanksSubjectMessage).toBeVisible();
});

const contactMessageWithInvalidFormData = [
    { title: 'phone', overrides: { phone: '1234567890' }, error: 'Phone must be between 11 and 21 characters.' },
    { title: 'subject', overrides: { subject: 'abcd' }, error: 'Subject must be between 5 and 100 characters.' },
    { title: 'message', overrides: { description: 'abcdefghijklmnopqrs' }, error: 'Message must be between 20 and 2000 characters.' },
];

for (const testCase of contactMessageWithInvalidFormData) {
    test(`contact form with an invalid ${testCase.title} shows an error`, { tag: '@negative' }, async ({ homePage }) => {
        const contactMessage = buildMessage(testCase.overrides);

        await homePage.goto();
        await homePage.sendMessage(contactMessage);

        const errorMessage = homePage.errorMessage(testCase.error);
        const thanksMessage = homePage.thanksHeading(contactMessage.name);

        await expect(errorMessage).toBeVisible();
        await expect(thanksMessage).toBeHidden();
    });
}