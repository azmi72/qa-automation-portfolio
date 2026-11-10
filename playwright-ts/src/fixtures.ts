import { test as base, expect } from '@playwright/test';
import type { Booking, CreateBookingResponse } from './booking.types.ts';
import { buildBookingPayload, buildNewBookingPayload } from './booking-data.ts';
import { BASE_URL, CREDENTIALS } from './config.ts';
import { BookingClient } from './booking-client.ts';

type TestFixtures = { payload: Booking; newPayload: Booking; bookingId: number; bookingClient: BookingClient };
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

    bookingClient: async ({ request }, use) => {
        await use(new BookingClient(request));
    },

    bookingId: async ({ payload, token, bookingClient }, use) => {
        const response = await bookingClient.createBooking(payload);

        expect(response.status()).toBe(200);

        const body: CreateBookingResponse = await response.json();
        const bookingId: number = body.bookingid;
        await use(bookingId);
        await bookingClient.deleteBooking(bookingId, token);
    },

    token: [async ({ playwright }, use) => {
        const context = await playwright.request.newContext({ baseURL: BASE_URL });
        const bookingClient = new BookingClient(context);
        const response = await bookingClient.createToken(CREDENTIALS);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('token');

        const token: string = body.token;
        await use(token);
        await context.dispose();
    }, { scope: 'worker' }]
});

export { expect } from '@playwright/test';