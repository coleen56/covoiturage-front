'use client'

import {ActionResult} from "@/app/(private)/search/actions";
import {Trip} from "@/types/carpool";
import TripCard from "@/components/ui/TripCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface ResultsListProps {
    state: ActionResult
}

export default function ResultsList({ state }: Readonly<ResultsListProps>) {
    console.log("state", state)
    if (!state || 'error' in state) {
        return <div className="mt-4"><p>{state?.error ?? ''}</p></div>
    }

    // on garde les trajets non passés, non annulés, et dont le nombre de places restantes est supérieur à 0
    const incomingTrips = state.trips.filter(trip => new Date(trip.departureDatetime) > new Date())
        .filter((trip) => trip.seats - trip.bookings.filter((b) => !b.isCancelled).length > 0)
        .filter((trip) => !trip.isCancelled)

    if (incomingTrips?.length === 0) {
        return <div className="mt-4">
            <h1>Aucun trajet ne correspond à votre recherche.</h1>
        </div>
    }

    return (
        <div className="mt-4">
            {incomingTrips
                .map((trip: Trip) => (
                    <TripCard trip={trip} key={trip.id}>
                        <Link className="flex flex-row justify-center items-center" href={`/trips/${trip.id}`}>
                            <Button theme={"dark"} label={"Réserver"} type={"button"} />
                        </Link>
                    </TripCard>
            ))}
        </div>
    )
}