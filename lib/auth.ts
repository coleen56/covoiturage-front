import {fetchApi} from './api'
import {ApiResponse, AuthCredentials, AuthResponse, RegisterResponse} from '@/types/auth'
import {cookies} from 'next/headers'
import {User} from "@/types/carpool";

export async function loginUser(credentials: AuthCredentials): Promise<AuthResponse> {
    const result = await fetchApi<AuthResponse>('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
    if (result.token) {
        await auth.setServerToken(result.token);
    }
    return result;
}

export async function resetPassword(email: string): Promise<ApiResponse> {
    return await fetchApi<ApiResponse>('/api/forgot-password', {
        method: 'POST',
        body: JSON.stringify({
            "email": email
        })
    });
}

export async function sendNewPassword(newPassword: string, token: string): Promise<ApiResponse> {
    return await fetchApi<ApiResponse>('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({
            "new_password": newPassword,
            "token": token
        })
    });
}

export async function registerUser(credentials: AuthCredentials): Promise<RegisterResponse> {
    return await fetchApi<RegisterResponse>('/api/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

export async function getUserProfile() {
    return await fetchApi<User>('/api/profile', {
        method: 'get',
    });
}

export const auth = {
    // Lecture et écriture via cookies() — fonctionne côté serveur
    async setServerToken(token: string) {
        const cookieStore = await cookies()
        cookieStore.set('jwt_token', token, {
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
        })
    },

    async getServerToken(): Promise<string | null> {
        const cookieStore = await cookies()
        return cookieStore.get('jwt_token')?.value ?? null
    },

    // Fonction pure — pas de document, utilisable partout
    decodePayload(token: string) {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch {
            return null
        }
    },

    async getCurrentUserIdServer(): Promise<number | null> {
        const token = await this.getServerToken()
        if (!token) return null
        const payload = this.decodePayload(token)
        return payload?.id ?? null
    },

    async isTokenValid(): Promise<boolean> {
        const token = await this.getServerToken()
        if (!token) return false
        const payload = this.decodePayload(token)
        if (!payload?.exp) return false
        return payload.exp > Date.now() / 1000 + 30
    },
}