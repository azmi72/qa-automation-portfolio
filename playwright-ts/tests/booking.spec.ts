import { test, expect } from '../src/fixtures.ts';
import type { CreateBookingResponse, Booking } from '../src/booking.types.ts';
import { buildBookingPayload, OUT_OF_RANGE_BOOKING_IDS } from '../src/booking-data.ts';

test('create booking returns the created booking', { tag: ['@smoke', '@positive'] }, async ({ bookingClient, payload, token }) => {
    const response = await bookingClient.createBooking(payload);
    let bookingId: number | undefined;

    try {
        expect(response.status()).toBe(200);

        const body: CreateBookingResponse = await response.json();
        bookingId = body.bookingid;

        expect(body.booking).toEqual(payload);
        expect(body.bookingid).toBeGreaterThan(0);
    } finally {
        if (bookingId !== undefined) {
            await bookingClient.deleteBooking(bookingId, token);
        }
    }
});


test('get booking by id returns the booking', { tag: '@positive' }, async ({ bookingClient, bookingId, payload }) => {
    const response = await bookingClient.getBooking(bookingId);

    expect(response.status()).toBe(200);

    const fetchedBooking: Booking = await response.json();

    expect(fetchedBooking.firstname).toBe(payload.firstname);
});


test('get booking returns the same data as the payload', { tag: '@positive' }, async ({ bookingClient, bookingId, payload }) => {
    const response = await bookingClient.getBooking(bookingId);

    expect(response.status()).toBe(200);

    const fetchedBooking: Booking = await response.json();

    expect(fetchedBooking).toEqual(payload);
});


test('update booking with PUT returns the updated booking', { tag: '@positive' }, async ({ bookingClient, bookingId, newPayload, token }) => {
    const response = await bookingClient.updateBooking(bookingId, newPayload, token);

    expect(response.status()).toBe(200);

    const updatedBooking: Booking = await response.json();

    expect(updatedBooking).toEqual(newPayload);
});


test('partial update with PATCH changes only the firstname', { tag: '@positive' }, async ({ bookingClient, bookingId, payload, token }) => {
    const patchPayload = { firstname: 'Uchiha' };
    const expectedBooking = { ...payload, ...patchPayload };
    const response = await bookingClient.partiallyUpdateBooking(bookingId, patchPayload, token);

    expect(response.status()).toBe(200);

    const updatedBooking: Booking = await response.json();

    expect(updatedBooking).toEqual(expectedBooking);
});


test('delete booking removes the booking', { tag: '@positive' }, async ({ bookingClient, bookingId, token }) => {
    const response = await bookingClient.deleteBooking(bookingId, token);

    expect(response.status()).toBe(201);

    const responseAfterDelete = await bookingClient.getBooking(bookingId);

    expect(responseAfterDelete.status()).toBe(404);
    expect(await responseAfterDelete.text()).toBe('Not Found');
});


test('update booking without token returns forbidden', { tag: '@negative' }, async ({ bookingClient, bookingId, payload, newPayload }) => {
    const response = await bookingClient.updateBooking(bookingId, newPayload);

    expect(response.status()).toBe(403);
    expect(await response.text()).toBe('Forbidden');

    const fetchedResponse = await bookingClient.getBooking(bookingId);

    expect(fetchedResponse.status()).toBe(200);

    const fetchedBooking: Booking = await fetchedResponse.json();

    expect(fetchedBooking).toEqual(payload);
});

const { firstname, ...withoutFirstname } = buildBookingPayload();

const createBookingWithInvalidBodyCases = [
    { title: 'without firstname', payload: withoutFirstname },
    { title: 'with an empty body', payload: {} },
];

for (const testCase of createBookingWithInvalidBodyCases) {
    test(`create booking ${testCase.title} returns internal server error`, { tag: '@negative' }, async ({ bookingClient }) => {
        const response = await bookingClient.createBookingWithPartialPayload(testCase.payload);

        expect(response.status()).toBe(500);
        expect(await response.text()).toBe('Internal Server Error');
    });
}

for (const outOfRangeId of OUT_OF_RANGE_BOOKING_IDS) {
    test(`get booking with out-of-range id ${outOfRangeId} returns not found`, { tag: '@negative' }, async ({ bookingClient }) => {
        const response = await bookingClient.getBooking(outOfRangeId);

        expect(response.status()).toBe(404);
        expect(await response.text()).toBe('Not Found');
    });
}