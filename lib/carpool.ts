import {fetchApi} from "@/lib/api";
import {auth} from "@/lib/auth";
import {Address, Booking, City, Manufacturer, Profile, Trip} from "@/types/carpool";
import {ApiResponse} from "@/types/auth";
import {TripFormData} from "@/app/(private)/search/actions";

interface CarApi {
    id: number | null,
    seats: number,
    model: string,
    carregistration: string,
    brand: number | null,
    description: string
}

interface CityApi {
    code: string
    nom: string
    _score?: number
}

interface TripApi {
    "person_id": number | null,
    "trip_datetime": string,
    "kms": string,
    "available_seats": string,
    "starting_address": {
        "street_name": string,
        "street_number": string,
        "city_name": string,
        "postal_code": string
    },
    "arrival_address": {
        "street_name": string,
        "street_number": string,
        "city_name": string,
        "postal_code": string

    }
}

const CITY_API_URL = process.env.NEXT_PUBLIC_CITY_API_URL
const ADDRESS_API_URL = process.env.NEXT_PUBLIC_ADDRESS_API_URL

export async function getTripsAsPassenger(): Promise<Array<Booking>> {
    const userId = await auth.getCurrentUserIdServer();
    return await fetchApi<Array<Booking>>(`/api/persons/${userId}/trips-passenger`, {
        method: 'GET',
    });
}

export async function getTripsAsDriver(): Promise<Array<Trip>> {
    const driverId = await auth.getCurrentUserIdServer();
    return await fetchApi<Array<Trip>>(`/api/persons/${driverId}/trips-driver`, {
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

export async function saveNewBooking(passengerId: number, tripId: number): Promise<ApiResponse> {
    return await fetchApi<ApiResponse>(`/api/trips/${tripId}/person`, {
        method: 'POST',
        body: JSON.stringify({
            "person_id": passengerId
        }),
    })
}

export async function cancelPassengerBooking(bookingId: string): Promise<ApiResponse> {
    return await fetchApi<ApiResponse>(`/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
    })
}

export async function cancelTrip(tripId: string): Promise<ApiResponse> {
    return await fetchApi<ApiResponse>(`/api/trips/${tripId}/cancel`, {
        method: 'PATCH',
    })
}

export async function getAddressSuggestions(query: string, limit: number): Promise<Address[]> {
    const data = await fetchApi<never>(`q=${query}&limit=${limit}`, {
        method: 'GET',
    }, ADDRESS_API_URL);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const results: Address[] = data.features.map((f: any) => ({
        number: f.properties.housenumber,
        streetname: f.properties.street,
        city: {
            zipCode: f.properties.postcode,
            name: f.properties.city,
        }
    }))
    console.log(results)

    return results;
}

export async function saveTrip(trip : TripApi): Promise<ApiResponse> {
    console.log(trip)
    return await fetchApi<ApiResponse>(`/api/trips`, {
        method: 'POST',
        body: JSON.stringify(trip)
    })

}