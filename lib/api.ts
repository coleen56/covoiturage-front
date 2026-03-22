'use server'

import { auth } from "./auth";
import logoutAction from "@/app/(auth)/(logout)/actions";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL  // url backend
const PUBLIC_ROUTES = new Set(['/login', '/api/register', '/api/forgot-password', '/api/reset-password']);

export async function fetchApi<T>(endpoint: string, options?: RequestInit, baseUrl?: string): Promise<T> {
    // vérifie validité du token avant chaque requête SAUF sur les routes publiques
    const validToken = await auth.isTokenValid();
    if (!PUBLIC_ROUTES.has(endpoint) && !validToken) {
        await logoutAction();
        throw new Error('Session expirée');
    }

    const token = await auth.getServerToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options?.headers
    }

    const url = baseUrl ? baseUrl + endpoint : BASE_URL + endpoint;
    // console.log(url)

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.log('Réponse erreur backend :', error)
        throw new Error(error.error ?? error.message ?? `Erreur ${res.status}`)
    }

    return res.json()
}