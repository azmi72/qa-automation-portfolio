import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Booking, Credentials } from './booking.types.ts';
import { buildAuthHeaders } from './auth.ts';

export class BookingClient {
    constructor(private readonly request: APIRequestContext) {}

    async checkHealth(): Promise<APIResponse> {
        return this.request.get('/ping');
    }

    async getBookingIds(): Promise<APIResponse> {
        return this.request.get('/booking');
    }

    async getBooking(id: number): Promise<APIResponse> {
        return this.request.get(`/booking/${id}`);
    }

    async createBooking(payload: Booking): Promise<APIResponse> {
        return this.request.post('/booking', { data: payload });
    }

    async createToken(credentials: Credentials): Promise<APIResponse> {
        return this.request.post('/auth', { data: credentials });
    }

    async updateBooking(id: number, payload: Booking, token?: string): Promise<APIResponse> {
        return this.request.put(`/booking/${id}`, { headers: buildAuthHeaders(token), data: payload });
    }

    async partiallyUpdateBooking(id: number, payload: Partial<Booking>, token?: string): Promise<APIResponse> {
        return this.request.patch(`/booking/${id}`, { headers: buildAuthHeaders(token), data: payload });
    }

    async deleteBooking(id: number, token?: string): Promise<APIResponse> {
        return this.request.delete(`/booking/${id}`, { headers: buildAuthHeaders(token) });
    }

    async createBookingWithPartialPayload(payload: Partial<Booking>): Promise<APIResponse> {
        return this.request.post('/booking', { data: payload });
    }
}