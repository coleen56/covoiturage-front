'use server'

import {getTripById, saveNewBooking} from "@/lib/carpool";
import {auth} from "@/lib/auth";

export type ActionState = { error: string } | { success: string } | null

export async function getTrip(id: string) {
    try {
        return await getTripById(id);
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Une erreur est survenue' }
    }
}

export async function bookTrip(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const tripId = Number(formData.get('tripId'));
        const passengerId = await auth.getCurrentUserIdServer();

        if (!passengerId) {
            return { error: "Impossible de retrouver le passager" };
        }

        await saveNewBooking(passengerId, tripId);
        return { success: "Réservation confirmée !" };

    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Une erreur est survenue' }
    }
}