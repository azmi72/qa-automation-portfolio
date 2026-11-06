export const buildAuthHeaders = (token: string): Record<string, string> => ({
    Cookie: `token=${token}`
});