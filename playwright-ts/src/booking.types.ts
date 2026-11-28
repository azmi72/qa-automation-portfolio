// API helper
export type BookingDates = {
    checkin: string;
    checkout: string;
};

// API helper
export type Booking = {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
};

// API helper
export type CreateBookingResponse = {
    bookingid: number;
    booking: Booking;
};

// Shared (API + UI)
export type Credentials = {
    username: string;
    password: string;
};