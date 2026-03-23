'use client'

import {ActionResult} from "@/app/(private)/search/actions";
import {Trip} from "@/types/carpool";
import TripCard from "@/components/ui/display/TripCard";
import Button from "@/components/ui/form-controls/Button";
import Link from "next/link";

interface ResultsListProps {
    state: ActionResult
    currentUserId: number | null
}

export default function ResultsList({ state, currentUserId }: Readonly<ResultsListProps>) {
    if (!state || 'error' in state) {
        return <div className="mt-4"><h1>{state?.error ?? ''}</h1></div>
    }

    // on garde les trajets non passés, non annulés, et dont le nombre de places restantes est supérieur à 0
    const incomingTrips = state.trips.filter(trip => new Date(trip.departureDatetime) > new Date())
        .filter((trip) => trip.seats - trip.bookings.filter((b) => !b.isCancelled).length > 0)
        .filter((trip) => !trip.isCancelled)
        .filter((trip) => trip.driver.id !== currentUserId);

    if (incomingTrips?.length === 0) {
        return <div className="mt-4">
            <h1>Aucun trajet ne correspond à votre recherche.</h1>
        </div>
    }

    return (
        <>
            {incomingTrips
                .map((trip: Trip) => (
                    <div className="mt-4" key={trip.id}>
                        <TripCard trip={trip}>
                            <Link className="flex flex-row justify-center items-center mt-3" href={`/trips/${trip.id}`}>
                                <Button theme={"dark"} label={"Réserver"} type={"button"} />
                            </Link>
                        </TripCard>
                    </div>
            ))}
        </>
    )
}