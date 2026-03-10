export interface Car {
    id: number
    model: string
    seats: number
    licencePlate: string
    manufacturer: Manufacturer
    description: string
}

export interface Manufacturer {
    id: number
    name?: string
}

export interface User extends Profile{
    id: number
    email: string
    firstname: string | null
    lastname: string | null
    phone: string | null
    registrationDatetime: string | null
    accountStatus: string | null
    car: Car
}

export interface Profile {
    id: number
    email: string
    firstname: string | null
    lastname: string | null
    phone: string | null
}

export interface Trip {
    id: number
    departureDatetime: string
    length: number
    seats: number
    isCancelled: boolean
    driver: User
    departure: Address | null
    arrival: Address | null
    bookings: Booking[]
}

export interface Address {
    number: string
    streetname: string
    city: City
}

export interface City {
    id?: number
    name: string
    zipCode: string
}

export interface Booking {
    id: number
    bookingDatetime: string
    isCancelled: boolean
    trip: Trip
    passenger: User
}