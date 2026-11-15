import type { Booking } from './booking.types.ts';

// API helper
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

// API helper
export const OUT_OF_RANGE_BOOKING_IDS = [0, -1];