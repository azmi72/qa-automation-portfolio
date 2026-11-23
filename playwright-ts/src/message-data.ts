// UI helper
export type ContactMessage = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    description: string;
};

// UI helper
export function buildMessage(overrides: Partial<ContactMessage> = {}): ContactMessage {
    return {
        name: 'Azmi',
        email: 'azmi@example.com',
        phone: '+628123456789',
        subject: `New message - ${Date.now()}`,
        description: 'Please say hooray to me',
        ...overrides,
    };
}