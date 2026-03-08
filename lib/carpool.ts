import {fetchApi} from "@/lib/api";
import {auth} from "@/lib/auth";
import {Booking, Manufacturer, Profile} from "@/types/carpool";
import {ApiResponse} from "@/types/auth";

export async function getTripsAsPassengers(): Promise<Array<Booking>> {
    const userId = await auth.getCurrentUserIdServer();
    const result = await fetchApi<Array<Booking>>(`/api/persons/${userId}/trips-passenger`, {
        method: 'GET',
    });
    // console.log('result', result);
    return result;
}

export async function getCarManufacturer(query: string): Promise<Manufacturer[]> {
    const result = await fetchApi<Array<Manufacturer>>(`/api/brands?name=${query}`, {
        method: 'GET',
    });
    // console.log('result', result);
    return result;
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