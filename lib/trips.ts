import {fetchApi} from "@/lib/api";
import {auth} from "@/lib/auth";
import {Trip} from "@/types/carpool";

export async function getTripsAsPassengers(): Promise<Array<Trip>> {
    const userId = await auth.getCurrentUserIdServer();
    const result = await fetchApi<Array<Trip>>(`/api/persons/${userId}/trips-passenger`, {
        method: 'GET',
    });
    console.log('result', result);
    return result;
}