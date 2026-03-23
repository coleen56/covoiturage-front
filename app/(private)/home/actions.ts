'use server'

import {getTripsAsDriver, getTripsAsPassenger} from "@/lib/carpool";

export default async function getTripsByRole(role: "driver" | "passenger") {
    try {
        if(role === "driver") {
            return await getTripsAsDriver();
        }
        if(role === "passenger") {
            return await getTripsAsPassenger();
        }
    } catch (e) {
        return { error: e instanceof Error ? e.message : "Une erreur est survenue."}
    }
}