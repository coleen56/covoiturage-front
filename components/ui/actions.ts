'use server'

import {getCitiesByName} from "@/lib/carpool";

export async function getCities(query:string) {
    return await getCitiesByName(query);
}