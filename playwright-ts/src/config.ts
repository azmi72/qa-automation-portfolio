import type { Credentials } from './booking.types.ts';

// API helper
export const BASE_URL = process.env.BASE_URL ?? 'https://restful-booker.herokuapp.com';

// UI helper
export const UI_BASE_URL = process.env.UI_BASE_URL ?? 'https://automationintesting.online';

// API helper
export const CREDENTIALS: Credentials = { username: 'admin', password: 'password123' };

// UI helper
export const PLATFORM_CREDENTIALS: Credentials = { username: 'admin', password: 'password' };