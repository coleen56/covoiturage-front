'use server'

import {Manufacturer, Profile, User} from "@/types/carpool";
import {auth, getUserProfile} from "@/lib/auth";
import {getCarManufacturer, saveProfile} from "@/lib/carpool";

export type ProfileFormData = {
    email: string
    firstname: string
    lastname: string
    phone: string
    car_model: string
    car_licence_plate: string
    car_manufacturer_id: number
    car_manufacturer_name: string
    car_description: string
}

export async function getProfile(): Promise<User> {
    return await getUserProfile();
}

export async function getManufacturers(query: string): Promise<Manufacturer[]> {
    return await getCarManufacturer(query);
}

export async function saveNewProfile(data: ProfileFormData): Promise<{error: string, success?: undefined} | {success: string, error?: undefined}> {
    const id = await auth.getCurrentUserIdServer();
    console.log(id)
    const profile: Profile = {
        "id": id!,
        "email": data.email,
        "firstname": data.firstname,
        "lastname": data.lastname,
        "phone": data.phone,
    }
    try {
        await saveProfile(profile)
        return { success : "Profil mis à jour avec succès !"}
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Une erreur est survenue' }
    }
}