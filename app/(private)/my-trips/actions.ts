'use server'

import {getTripsAsDriver} from "@/lib/carpool";

export async function getDrivenTrips() {
    try {
        return await getTripsAsDriver();
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue." };
    }

}