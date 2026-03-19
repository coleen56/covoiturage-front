import {Trip} from "@/types/carpool";
import {ReactNode} from "react";

export default function TripCard( { trip, children }: Readonly<{trip: Trip, children: ReactNode}>) {
    const date = new Date(trip.departureDatetime)

    const formattedDate = date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })

    const isPast = date.getTime() < new Date().getTime();

    const remainingSeats = trip.seats - trip.bookings?.filter((b) => !b.isCancelled).length;

    return (
        <div className="bg-gray-200 block w-100 p-6 rounded-lg shadow-xs hover:bg-neutral-secondary-medium">
            {trip.isCancelled && (
                <span
                    className="inline-flex items-center rounded-md bg-red-800/10 px-2 py-1 text-md font-medium text-red-800 inset-ring inset-ring-red-800/20 mb-3">Annulé</span>
            )}
            {!trip.isCancelled && !isPast && (
                <span
                    className="inline-flex items-center rounded-md bg-green-800/10 px-2 py-1 text-md font-medium text-green-800 inset-ring inset-ring-green-800/20 mb-3">En cours</span>
            )}
            {isPast && !trip.isCancelled && (
                <span
                    className="inline-flex items-center rounded-md bg-yellow-800/10 px-2 py-1 text-md font-medium text-yellow-800 inset-ring inset-ring-yellow-800/20 mb-3">Passé</span>
            )}
            <h1 className="text-xl font-bold">{trip.departure!.city.name} → {trip.arrival!.city.name} </h1>
            <h2>Conducteur : <span className="bold">{trip.driver.firstname} {trip.driver.lastname}</span></h2>
            <p>Départ : {formattedDate}</p>
            <p>Distance : {trip.length == 0 ? "non renseignée" : trip.length + " km"}</p>
            <p>Places disponibles : {remainingSeats}</p>
            {children}
        </div>
    )
}