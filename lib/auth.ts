import {fetchApi} from './api'
import {AuthCredentials, AuthResponse, RegisterResponse} from '@/types/auth'
import {cookies} from "next/headers";

export async function loginUser(credentials: AuthCredentials): Promise<AuthResponse> {
    const result = await fetchApi<AuthResponse>('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
    console.log('result', result);
    if(result.token) {
        auth.setToken(result.token);
        await auth.setServerToken(result.token);
    }
    return result;
}

export async function registerUser(credentials: AuthCredentials): Promise<RegisterResponse> {
    return await fetchApi<RegisterResponse>('/api/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

export const auth = {
    setToken(token: string) {
        console.log('setToken', token);
        if (globalThis.window === undefined) return;
        // stockage du jwt dans un cookie
        document.cookie = `jwt_token=${token}; path=/; SameSite=Strict; Secure`;
    },

    async setServerToken(token: string) {
        const cookieStore = await cookies();
        cookieStore.set('jwt_token', token, {
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, // inaccessible js
        });
    },

    async unsetServerToken() {
        const cookieStore = await cookies();
        cookieStore.set('jwt_token', '');
    },

    getToken(): string | null {
        if (globalThis.window === undefined) return null;
        const match = document.cookie.match(/(?:^|;\s*)jwt_token=([^;]*)/);
        return match ? match[1] : null;
    },

    removeToken() {
        if (globalThis.window === undefined) return;
        document.cookie = 'jwt_token=; path=/; max-age=0';
    },

    decodePayload(token: string) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    },

    async getCurrentUserIdServer(): Promise<number | null> {
        const cookieStore = await cookies()
        const token = cookieStore.get('jwt_token')?.value
        if (!token) return null
        const payload = this.decodePayload(token)
        return payload?.id ?? null
    },

    isTokenValid(): boolean {
        const token = this.getToken();
        if (!token) return false;
        const payload = this.decodePayload(token);
        if (!payload?.exp) return false;
        return payload.exp > Date.now() / 1000 + 30;
    },

    async logout() {
        this.removeToken();
        await this.unsetServerToken();
        if (globalThis.window !== undefined) {
            globalThis.location.href = '/login';
        }
    }
};