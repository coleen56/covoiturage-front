'use server'

import {cancelPassengerBooking, cancelTrip, getTripById, saveNewBooking} from "@/lib/carpool";
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

export async function deleteBooking(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const bookingId = formData.get('bookingId') as string;

    // vérification que l'utilisateur est bien le conducteur
    const userId = await auth.getCurrentUserIdServer();
    const driverId = formData.get('driverId') as string;

    if (driverId !== userId!.toString()) {
        return { error: "Non autorisé" };
    }

    const result = await cancelPassengerBooking(bookingId);
    if (!result.success) return { error: "Erreur lors de l'annulation de la réservation." };

    return { success: "La réservation a bien été annulée." };
}

export async function cancelTripAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const userId = await auth.getCurrentUserIdServer();
    const driverId = formData.get('driverId') as string;
    if (driverId != userId!.toString()) {
        console.log(driverId);
        console.log(userId)
        return { error: "Non autorisé" };
    }
    const tripId = formData.get('tripId') as string;
    const result = await cancelTrip(tripId);

    if (!result.success) return { error: "Erreur lors de l'annulation du trajet." };

    return { success: "Le trajet a bien été annulé." };
}