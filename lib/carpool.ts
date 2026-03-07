import {fetchApi} from "@/lib/api";
import {auth} from "@/lib/auth";
import {Booking, Car, Manufacturer, User} from "@/types/carpool";

export async function getTripsAsPassengers(): Promise<Array<Booking>> {
    const userId = await auth.getCurrentUserIdServer();
    const result = await fetchApi<Array<Booking>>(`/api/persons/${userId}/trips-passenger`, {
        method: 'GET',
    });
    console.log('result', result);
    return result;
}

export async function getCarManufacturer(query: string): Promise<Manufacturer[]> {
    const result = await fetchApi<Array<Manufacturer>>(`/api/brands?name=${query}`, {
        method: 'GET',
    });
    console.log('result', result);
    return result;
}