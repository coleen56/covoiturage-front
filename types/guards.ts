import { Booking, Trip } from "@/types/carpool"

export function isTripArray(value: unknown): value is Trip[] {
    return Array.isArray(value) && (value.length === 0 || 'departure' in value[0])
}

export function isBookingArray(value: unknown): value is Booking[] {
    return Array.isArray(value) && (value.length === 0 || 'bookingDatetime' in value[0])
}