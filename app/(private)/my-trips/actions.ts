import {getTripsAsDriver} from "@/lib/carpool";

export async function getDrivenTrips() {
    return await getTripsAsDriver();
}