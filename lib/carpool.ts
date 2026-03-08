import {fetchApi} from "@/lib/api";
import {auth} from "@/lib/auth";
import {Booking, Car, Manufacturer, Profile} from "@/types/carpool";
import {ApiResponse} from "@/types/auth";

interface CarApi {
    id: number,
    seats: number,
    model: string,
    carregistration: string,
    brand: number,
    description: string
}

export async function getTripsAsPassengers(): Promise<Array<Booking>> {
    const userId = await auth.getCurrentUserIdServer();
    return await fetchApi<Array<Booking>>(`/api/persons/${userId}/trips-passenger`, {
        method: 'GET',
    });
}

export async function getCarManufacturer(query: string): Promise<Manufacturer[]> {
    return await fetchApi<Array<Manufacturer>>(`/api/brands?name=${query}`, {
        method: 'GET',
    });
}

export async function saveProfile(profile: Profile): Promise<ApiResponse> {
    return await fetchApi<ApiResponse>(`/api/persons`, {
        method: 'POST',
        body: JSON.stringify({
            "id": profile.id,
            "firstname": profile.firstname,
            "lastname": profile.lastname,
            "phone": profile.phone,
            "email": profile.email,
        })
    });
}

export async function createCar(car: CarApi): Promise<ApiResponse> {
    const bodyContent = JSON.stringify(car);
    return await fetchApi<ApiResponse>(`/api/cars`, {
        method: 'POST',
        body: bodyContent
    });
}

export async function updateCar(car: CarApi): Promise<ApiResponse> {
    const bodyContent = JSON.stringify(car);
    return await fetchApi<ApiResponse>(`/api/cars/${car.id}`, {
        method: 'PUT',
        body: bodyContent
    });
}