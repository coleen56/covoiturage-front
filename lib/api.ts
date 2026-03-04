const BASE_URL = process.env.API_URL  // backend

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    })

    // lib/api.ts
    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.log('Réponse erreur backend :', error) // ← ajoute ça
        throw new Error(error.error ?? error.message ?? `Erreur ${res.status}`)
    }

    return res.json()
}