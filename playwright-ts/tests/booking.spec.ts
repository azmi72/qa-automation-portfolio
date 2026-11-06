import { test, expect } from '../src/fixtures.ts';
import type { CreateBookingResponse, Booking } from '../src/booking.types.ts';
import { buildAuthHeaders } from '../src/auth.ts';
import { OUT_OF_RANGE_BOOKING_ID } from '../src/booking-data.ts';

test('create booking returns the created booking', async ({ request, payload, token }) => {
    const response = await request.post('/booking', { data: payload });
    let bookingId: number | undefined;

    try {
        expect(response.status()).toBe(200);

        const body: CreateBookingResponse = await response.json();
        bookingId = body.bookingid;

        expect(body.booking).toEqual(payload);
        expect(body.bookingid).toBeGreaterThan(0);
    } finally {
        if (bookingId !== undefined) {
            await request.delete(`/booking/${bookingId}`, { headers: buildAuthHeaders(token) });
        }
    }
});


test('get booking by id returns the booking', async ({ request, bookingId, payload }) => {
    const response = await request.get(`/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const fetchedBooking: Booking = await response.json();

    expect(fetchedBooking.firstname).toBe(payload.firstname);
});


test('get booking returns the same data as the payload', async ({ request, bookingId, payload }) => {
    const response = await request.get(`/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const fetchedBooking: Booking = await response.json();

    expect(fetchedBooking).toEqual(payload);
});


test('update booking with PUT returns the updated booking', async ({ request, bookingId, newPayload, token }) => {
    const response = await request.put(`/booking/${bookingId}`, { headers: buildAuthHeaders(token), data: newPayload });

    expect(response.status()).toBe(200);

    const updatedBooking: Booking = await response.json();

    expect(updatedBooking).toEqual(newPayload);
});


test('partial update with PATCH changes only the firstname', async ({ request, bookingId, payload, token }) => {
    const patchPayload = { firstname: 'Uchiha' };
    const expectedBooking = { ...payload, ...patchPayload };
    const response = await request.patch(`/booking/${bookingId}`, { headers: buildAuthHeaders(token), data: patchPayload });

    expect(response.status()).toBe(200);

    const updatedBooking: Booking = await response.json();

    expect(updatedBooking).toEqual(expectedBooking);
});


test('delete booking removes the booking', async ({ request, bookingId, token }) => {
    const response = await request.delete(`/booking/${bookingId}`, { headers: buildAuthHeaders(token) });

    expect(response.status()).toBe(201);

    const responseAfterDelete = await request.get(`/booking/${bookingId}`);

    expect(responseAfterDelete.status()).toBe(404);
    expect(await responseAfterDelete.text()).toBe('Not Found');
});


test('update booking without token returns forbidden', async ({ request, bookingId, payload, newPayload }) => {
    const response = await request.put(`/booking/${bookingId}`, { data: newPayload });

    expect(response.status()).toBe(403);
    expect(await response.text()).toBe('Forbidden');

    const fetchedResponse = await request.get(`/booking/${bookingId}`);

    expect(fetchedResponse.status()).toBe(200);

    const fetchedBooking: Booking = await fetchedResponse.json();

    expect(fetchedBooking).toEqual(payload);
});


test('get booking with an out-of-range id returns not found', async ({ request }) => {
    const response = await request.get(`/booking/${OUT_OF_RANGE_BOOKING_ID}`);

    expect(response.status()).toBe(404);
    expect(await response.text()).toBe('Not Found');
});