'use server'

import {getCitiesByName, getTripsAsPassengers, searchForTrips} from "@/lib/carpool";

export type TripFormData = {
    startingCity: string,
    arrivalCity: string,
    tripDate: string
}

export async function getCities(query:string) {
    return await getCitiesByName(query);
}

export async function getTripsFromFormData(data: TripFormData) {
    const trips = await searchForTrips(data);
    console.log(trips);
    return trips;
}