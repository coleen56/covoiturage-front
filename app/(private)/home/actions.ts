'use server'

import {getTripsAsDriver, getTripsAsPassenger} from "@/lib/carpool";

export async function getUserTripsAsDriver() {
    try {
        return await getTripsAsDriver();
    } catch (e) {
        return { error: e instanceof Error ? e.message : "Une erreur est survenue."}
    }
}

export async function getUserTripsAsPassenger() {
    try {
        return await getTripsAsPassenger();
    } catch (e) {
        return { error: e instanceof Error ? e.message : "Une erreur est survenue."}
    }
}