import type { Booking } from './booking.types.ts';

export function buildBookingPayload(overrides: Partial<Booking> = {}): Booking {
    return {
        firstname: 'Azmi',
        lastname: 'Lupinsky',
        totalprice: 72,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-10-02',
            checkout: '2026-10-07',
        },
        additionalneeds: 'Breakfast',
        ...overrides,
    };
}

export const OUT_OF_RANGE_BOOKING_ID = 0;