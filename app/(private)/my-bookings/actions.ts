import {getTripById, getTripsAsPassenger} from "@/lib/carpool";

export async function getUserBookings() {
    try {
        return await getTripsAsPassenger();
    } catch (error) {
        return { error : "Une erreur est survenue." }
    }
}

export async  function getTrip(tripId: number) {
    return await getTripById(tripId.toString());
}