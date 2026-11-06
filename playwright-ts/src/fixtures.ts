import { test as base, expect } from '@playwright/test';
import type { Booking, CreateBookingResponse } from './booking.types.ts';
import { buildBookingPayload, buildNewBookingPayload } from './booking-data.ts';
import { BASE_URL, CREDENTIALS } from './config.ts';
import { buildAuthHeaders } from './auth.ts';

type TestFixtures = { payload: Booking; newPayload: Booking; bookingId: number };
type WorkerFixtures = { token: string };

export const test = base.extend<TestFixtures, WorkerFixtures>({
    payload: async ({}, use) => {
        const payload: Booking = buildBookingPayload();
        await use(payload);
    },

    newPayload: async ({}, use) => {
        const newPayload: Booking = buildNewBookingPayload();
        await use(newPayload);
    },

    bookingId: async ({ request, payload, token }, use) => {
        const response = await request.post('/booking', { data: payload });

        expect(response.status()).toBe(200);

        const body: CreateBookingResponse = await response.json();
        const bookingId: number = body.bookingid;
        await use(bookingId);
        await request.delete(`/booking/${bookingId}`, { headers: buildAuthHeaders(token) });
    },

    token: [async ({ playwright }, use) => {
        const context = await playwright.request.newContext({ baseURL: BASE_URL });
        const response = await context.post('/auth', { data: CREDENTIALS });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('token');

        const token: string = body.token;
        await use(token);
        await context.dispose();
    }, { scope: 'worker' }]
});

export { expect } from '@playwright/test';