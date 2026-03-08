'use server'

import {Manufacturer, Profile, User} from "@/types/carpool";
import {auth, getUserProfile} from "@/lib/auth";
import {createCar, getCarManufacturer, saveProfile, updateCar} from "@/lib/carpool";

export type ProfileFormData = {
    email: string
    firstname: string
    lastname: string
    phone: string
    car_id: number
    car_model: string
    car_licence_plate: string
    car_seats: number
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

export async function saveNewProfile(data: ProfileFormData): Promise<{error: string, success?: string} | {success: string, error?: string}> {
    const id = await auth.getCurrentUserIdServer();
    const profile: Profile = {
        "id": id!,
        "email": data.email,
        "firstname": data.firstname,
        "lastname": data.lastname,
        "phone": data.phone,
    }

    const car = {
        "id": data.car_id,
        "seats": data.car_seats,
        "model": data.car_model,
        "carregistration": data.car_licence_plate,
        "brand": data.car_manufacturer_id,
        "description": data.car_description
    }
    try {
        await saveProfile(profile)
        if(car.id) {
            await updateCar(car)
        } else {
            await createCar(car)
        }
        return { success : "Profil mis à jour avec succès !"}
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Une erreur est survenue' }
    }
}