import type { CreateBookingResponse } from '../src/booking.types.ts';
import { buildBookingPayload } from '../src/booking-data.ts';

const PING_URL = 'https://restful-booker.herokuapp.com/ping';
const BOOKING_URL = 'https://restful-booker.herokuapp.com/booking';


type BookingSummary = {
    status: number;
    total: number;
};

async function getPingStatus(): Promise<number> {
    const response = await fetch(PING_URL);
    return response.status;
}


async function getBookingSummary(): Promise<BookingSummary> {
    const response = await fetch(BOOKING_URL);
    const bookings = (await response.json()) as { bookingid: number }[];
    return { status: response.status, total: bookings.length };
}


async function createBooking(): Promise<CreateBookingResponse> {
    const response = await fetch(BOOKING_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(buildBookingPayload()),
    });
    if (response.status === 200) {
        return response.json();
    }
    throw new Error(`Expected status 200, but got ${response.status}`);
}


const pingStatus = await getPingStatus();
const bookingSummary = await getBookingSummary();
const newBooking = await createBooking();

console.log(`Ping status: ${pingStatus}`);
console.log(`Booking status: ${bookingSummary.status}`);
console.log(`Total bookings: ${bookingSummary.total}`);
console.log(`New booking id: ${newBooking.bookingid}`);