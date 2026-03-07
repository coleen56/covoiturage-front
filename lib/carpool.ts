import {fetchApi} from "@/lib/api";
import {auth} from "@/lib/auth";
import {Booking, Car, User} from "@/types/carpool";

export async function getTripsAsPassengers(): Promise<Array<Booking>> {
    const userId = await auth.getCurrentUserIdServer();
    const result = await fetchApi<Array<Booking>>(`/api/persons/${userId}/trips-passenger`, {
        method: 'GET',
    });
    console.log('result', result);
    return result;
}

export async function getUserCar(): Promise<Car>  {
    const userId = await auth.getCurrentUserIdServer();
    const result = await fetchApi<Array<Booking>>(`/api/persons/${userId}/trips-passenger`, {
        method: 'GET',
    });
}