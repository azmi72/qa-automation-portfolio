export const buildAuthHeaders = (token?: string): Record<string, string> | undefined => {
    if (!token) {
        return undefined;
    }
    return { Cookie: `token=${token}` };
};