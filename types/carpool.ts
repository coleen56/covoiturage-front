export interface User {
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
    departure: string | null
    arrival: string | null
}

export interface Booking {
    id: number
    bookingDatetime: string
    isCancelled: boolean
    trip: Trip
    passenger: User
}