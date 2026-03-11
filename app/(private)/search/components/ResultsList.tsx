'use client'

import {ActionResult} from "@/app/(private)/search/actions";
import {Trip} from "@/types/carpool";
import BookingCard from "@/components/ui/BookingCard";

interface ResultsListProps {
    state: ActionResult
}

export default function ResultsList({ state }: Readonly<ResultsListProps>) {
    if (!state || 'error' in state) {
        return <div className="mt-4"><p>{state?.error ?? ''}</p></div>
    }

    const incomingTrips = state.trips.filter(trip => new Date(trip.departureDatetime) > new Date())

    if (incomingTrips?.length === 0) {
        return <div className="mt-4">
            <h1>Aucun trajet ne correspond à votre recherche.</h1>
        </div>
    }

    return (
        <div className="mt-4">
            {incomingTrips
                .map((trip: Trip) => (
            <BookingCard key={trip.id} trip={trip} />
            ))}
        </div>
    )
}