'use server'

import {getTripsAsPassenger} from "@/lib/carpool";

export default async function getUserTrips() {
    try {
        return await getTripsAsPassenger();
    } catch (e) {
        return { error: e instanceof Error ? e.message : "Une erreur est survenue."}
    }
}