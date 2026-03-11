import { getTripById } from "@/lib/carpool";

export async function getTrip(id: string) {
    try {
        return await getTripById(id);
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Une erreur est survenue' }
    }
}