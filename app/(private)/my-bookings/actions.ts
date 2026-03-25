import {getTripsAsPassenger} from "@/lib/carpool";

export async function getUserBookings() {
    try {
        return await getTripsAsPassenger();
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue." }
    }
}