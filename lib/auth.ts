import { fetchApi } from './api'
import {AuthCredentials, AuthResponse, RegisterResponse} from '@/types/auth'

export async function loginUser(credentials: AuthCredentials): Promise<AuthResponse> {
    return fetchApi<AuthResponse>('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

// lib/auth.ts
export async function registerUser(credentials: AuthCredentials): Promise<RegisterResponse> {
    console.log('registerUser appelé avec :', credentials)

    const result = await fetchApi<RegisterResponse>('/api/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })

    console.log('registerUser résultat :', result)
    return result
}