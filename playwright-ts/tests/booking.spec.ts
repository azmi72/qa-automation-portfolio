import { test, expect } from '@playwright/test';
import { buildBookingPayload } from '../src/booking-data.ts';
import type { CreateBookingResponse, Booking } from '../src/booking.types.ts';

test('create booking returns the created booking', async ({ request }) => {
    const payload = buildBookingPayload();
    const response = await request.post('/booking', { data: payload });

    expect(response.status()).toBe(200);

    const body: CreateBookingResponse = await response.json();

    expect(body.booking).toEqual(payload);
    expect(body.bookingid).toBeGreaterThan(0);
});


test('get booking by id returns the booking', async ({ request }) => {
    const payload = buildBookingPayload();
    const response = await request.post('/booking', { data: payload });

    expect(response.status()).toBe(200);

    const body: CreateBookingResponse = await response.json();
    const bookingId = body.bookingid;
    const fetchedResponse = await request.get(`/booking/${bookingId}`);

    expect(fetchedResponse.status()).toBe(200);

    const fetchedBooking: Booking = await fetchedResponse.json();

    expect(fetchedBooking.firstname).toBe(payload.firstname);
});


test('get booking returns the same data as the payload', async ({ request }) => {
    const payload = buildBookingPayload();
    const response = await request.post('/booking', { data: payload });

    expect(response.status()).toBe(200);

    const body: CreateBookingResponse = await response.json();
    const bookingId = body.bookingid;
    const fetchedResponse = await request.get(`/booking/${bookingId}`);

    expect(fetchedResponse.status()).toBe(200);

    const fetchedBooking: Booking = await fetchedResponse.json();

    expect(fetchedBooking).toEqual(payload);
});