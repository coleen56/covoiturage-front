import {getTripById, getTripsAsPassenger} from "@/lib/carpool";

export async function getUserBookings() {
    try {
        return await getTripsAsPassenger();
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue." }
    }
}

export async  function getTrip(tripId: number) {
    try {
        return await getTripById(tripId.toString());
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue." }
    }
}