import type { Booking } from './booking.types.ts';

export function buildBookingPayload(): Booking {
    return {
        firstname: 'Azmi',
        lastname: 'Lupinsky',
        totalprice: 72,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-10-02',
            checkout: '2026-10-07'
        },
        additionalneeds: 'Breakfast'
    };
}