'use server'

import {Manufacturer, User} from "@/types/carpool";
import {getUserProfile} from "@/lib/auth";
import {getCarManufacturer} from "@/lib/carpool";

export async function getProfile(): Promise<User> {
    return await getUserProfile();
}

export async function getManufacturers(query: string): Promise<Manufacturer[]> {
    return await getCarManufacturer(query);
}