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

export function buildNewBookingPayload(): Booking {
    return {
        firstname: 'Uchiha',
        lastname: 'Sasuke',
        totalprice: 1,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-11-01',
            checkout: '2026-11-02'
        },
        additionalneeds: 'None'
    };
}

export const OUT_OF_RANGE_BOOKING_ID = 0;