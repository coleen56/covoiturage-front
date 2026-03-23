'use client'

import BookingCard from "@/components/ui/display/BookingCard";
import Link from "next/link";
import Button from "@/components/ui/form-controls/Button";
import {Booking, Trip} from "@/types/carpool";
import TripCard from "@/components/ui/display/TripCard";

interface TripListProps {
    role: "driver" | "passenger";
    bookings?: Booking[]
    trips?: Trip[]
}

export default function TripList(props: Readonly<TripListProps>) {
    const bookings = props.bookings;
    const trips = props.trips;

    if(bookings) {
        const incomingBookings = bookings
            // on garde uniquement les trajets pas encore passés, pas annulés et réservation pas annulée non plus
            .filter(booking => new Date(booking.trip.departureDatetime) > new Date())
            .filter(booking => !booking.trip.isCancelled && !booking.isCancelled)

        if (incomingBookings.length > 0) {
            return (
                <>
                    <h1 className="mb-3 text-xl">Vos trajets à venir :</h1>
                    <ul className={"mt-4 flex flex-col gap-3"}>
                        {incomingBookings
                            .map(booking =>
                                <BookingCard key={booking.id} booking={booking}>
                                    <Link href={`/trips/${booking.trip.id}`} className={"flex flex-row justify-center items-center"}><Button theme={"dark"} label={"Détails"} type={"submit"} /></Link>
                                </BookingCard>
                            )}
                    </ul>
                </>
            )
        } else {
            return (
                <div className={"flex flex-col items-center gap-6"}>
                    <h1 className="mb-3 text-xl text-center">Vous n&#39;avez pas de trajet en tant que passager prévu pour le moment.</h1>
                    <Link href={"/search"} className={"inline-block"}><Button theme={"dark"} label={"Je réserve un trajet !"} type={"button"} /></Link>
                </div>
            )
        }
    }

    if(trips) {
        const incomingTrips = trips
            // on garde uniquement les trajets pas encore passés, pas annulés et réservation pas annulée non plus
            .filter(trip => new Date(trip.departureDatetime) > new Date())
            .filter(trip => trip.isCancelled)

        if (incomingTrips.length > 0) {
            return (
                <>
                    <h1 className="mb-3 text-xl">Vos trajets à venir :</h1>
                    <ul className={"mt-4 flex flex-col gap-3"}>
                        {incomingTrips
                            .map(trip =>
                                <TripCard key={trip.id} trip={trip}>
                                    <Link href={`/trips/${trip.id}`} className={"flex flex-row justify-center items-center"}><Button theme={"dark"} label={"Détails"} type={"button"} /></Link>
                                </TripCard>
                            )}
                    </ul>
                </>
            )
        } else {
            return (
                <div className={"flex flex-col items-center gap-6"}>
                    <h1 className="mb-3 text-xl text-center">Vous n&#39;avez pas de trajet en tant que conducteur prévu pour le moment.</h1>
                    <Link href={"/my-trips"} className={"inline-block"}><Button theme={"dark"} label={"Voir tous mes trajets"} type={"button"} /></Link>
                </div>
            )
        }
    }
}