import { auth } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL  // url backend
const PUBLIC_ROUTES = new Set(['/login', '/api/register']);

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // vérifie validité du token avant chaque requête SAUF sur les routes publiques
    if (!PUBLIC_ROUTES.has(endpoint) && !auth.isTokenValid()) {
        auth.logout();
        throw new Error('Session expirée');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`,
        ...options?.headers
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
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