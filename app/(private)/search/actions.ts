'use server'

import {searchForTrips} from "@/lib/carpool";
import {Trip} from "@/types/carpool";

export type TripFormData = {
    startingCity: string,
    arrivalCity: string,
    tripDate: string
}

export type ActionResult =
    | { trips: Trip[] }
    | { error: string }
    | null

export async function getTripsFromFormData(data: TripFormData) {
    try {
        const trips = await searchForTrips(data);
        return {trips};
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Une erreur est survenue' }
    }
}