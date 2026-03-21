'use server'

import {Address} from "@/types/carpool";
import {getAddressSuggestions, saveTrip} from "@/lib/carpool";
import {auth} from "@/lib/auth";

export type ActionState = { error: string } | { success: string } | null

export type NewTripFormData = {
    fullStartingAddress: string,
    startingAddress: {
        number: string,
        streetname: string,
        city: {
            zipCode: string,
            name: string,
        }
    },
    fullArrivalAddress: string,
    arrivalAddress: {
        number: string,
        streetname: string,
        city: {
            zipCode: string,
            name: string,
        }
    },
    departureDatetime: string,
    length: string,
    seats: string
}

export async function getAddresses(query: string): Promise<Address[]> {
    return await getAddressSuggestions(query, 3);
}

export async function saveNewTrip(formData: NewTripFormData): Promise<ActionState> {
    const { startingAddress, arrivalAddress, departureDatetime, length, seats } = formData

    if (!startingAddress.streetname || !startingAddress.city.name || !startingAddress.city.zipCode) {
        return { error: "L'adresse de départ est incomplète." }
    }
    if (!arrivalAddress.streetname || !arrivalAddress.city.name || !arrivalAddress.city.zipCode) {
        return { error: "L'adresse d'arrivée est incomplète." }
    }
    if (!departureDatetime) {
        return { error: "La date et l'heure de départ sont obligatoires." }
    }
    if (!length || Number(length) <= 0) {
        return { error: "La distance doit être supérieure à 0." }
    }
    if (!seats || Number(seats) <= 0 || Number(seats) > 10) {
        return { error: "Le nombre de places doit être compris entre 1 et 10." }
    }

    const currentUserId = await auth.getCurrentUserIdServer();
    const newTrip = {
        "person_id": currentUserId,
        "trip_datetime": formData.departureDatetime,
        "kms": formData.length,
        "available_seats": formData.seats,
        "starting_address": {
            "street_name": formData.startingAddress.streetname,
            "street_number": formData.startingAddress.number,
            "city_name": formData.startingAddress.city.name,
            "postal_code": formData.startingAddress.city.zipCode
        },
        "arrival_address": {
            "street_name": formData.arrivalAddress.streetname,
            "street_number": formData.arrivalAddress.number,
            "city_name": formData.arrivalAddress.city.name,
            "postal_code": formData.arrivalAddress.city.zipCode

        }
    }
    console.log(newTrip);
    try {
        await saveTrip(newTrip);
        return { success : "Le trajet a été enregistré avec succès !"}
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue lors de l'enregistrement du trajet." }
    }
}