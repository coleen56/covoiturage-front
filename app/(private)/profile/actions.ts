'use server'

import {Manufacturer, Profile, User} from "@/types/carpool";
import {auth, getUserProfile} from "@/lib/auth";
import {createCar, getCarManufacturer, saveProfile, softDeleteUser, updateCar} from "@/lib/carpool";
import logoutAction from "@/app/(auth)/(logout)/actions";

export type UserFormData = {
    email: string
    firstname: string
    lastname: string
    phone: string
}

export type CarFormData = {
    car_id: number | null,
    car_manufacturer_id: number | null,
    car_model: string,
    car_seats: number,
    car_licence_plate: string,
    car_manufacturer_name: string,
    car_description: string,
}

export async function getProfile(): Promise<User> {
    return await getUserProfile();
}

export async function getManufacturers(query: string): Promise<Manufacturer[]> {
    return await getCarManufacturer(query);
}

export async function saveNewProfile(data: UserFormData): Promise<{error: string, success?: string} | {success: string, error?: string}> {
    const id = await auth.getCurrentUserIdServer();
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

export async function saveNewCar(data: CarFormData): Promise<{error: string, success?: string} | {success: string, error?: string}> {
    const car = {
        "id": data.car_id,
        "seats": data.car_seats,
        "model": data.car_model,
        "carregistration": data.car_licence_plate,
        "brand": data.car_manufacturer_id,
        "description": data.car_description
    }
    // console.log(car)

    if(!car.seats || !car.model || !car.carregistration) {
        return { error: "Les champs marqués d'un * ne peuvent être vides."}
    }

    try {
        if(car.id) {
            await updateCar(car)
        } else {
            await createCar(car)
        }
        return { success : "Voiture enregistrée avec succès !"}
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue" }
    }
}

export async function deleteUser() {
    const currentUserId = await auth.getCurrentUserIdServer();
    try {
        if(currentUserId) {
            await softDeleteUser(currentUserId)
        }
        return { success : "Votre compte a bien été supprimé."}
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue" }
    }
}