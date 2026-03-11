import {fetchApi} from "@/lib/api";
import {auth} from "@/lib/auth";
import {Booking, City, Manufacturer, Profile, Trip} from "@/types/carpool";
import {ApiResponse} from "@/types/auth";
import {TripFormData} from "@/app/(private)/search/actions";

interface CarApi {
    id: number,
    seats: number,
    model: string,
    carregistration: string,
    brand: number,
    description: string
}

interface CityApi {
    code: string
    nom: string
    _score?: number
}

const CITY_API_URL = process.env.NEXT_PUBLIC_CITY_API_URL

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

export async function getCitiesByName(query: string): Promise<City[]> {
    const results = await fetchApi<CityApi[]>(`nom=${query}&fields=code,nom&limit=5`, {
        method: 'GET',
    }, CITY_API_URL)

    return results.map((city: CityApi) => ({
        name: city.nom,
        zipCode: city.code,
    }))
}

export async function searchForTrips(data: TripFormData): Promise<Trip[]> {
    return await fetchApi<Trip[]>(
        `/api/trips?startingcity=${data.startingCity}&arrivalcity=${data.arrivalCity}&tripdate=${data.tripDate}`, {
            method: 'GET',
        }
    );
}

export async function getTripById(id: string): Promise<Trip> {
    return await fetchApi<Trip>(`/api/trips/${id}`, {
        method: 'GET',
    })
}