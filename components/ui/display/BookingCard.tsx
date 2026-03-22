import {Booking} from "@/types/carpool";
import {ReactNode} from "react";
import {getTrip} from "@/app/(private)/my-bookings/actions";

export default async function BookingCard( { booking, children }: Readonly<{booking: Booking, children: ReactNode}>) {
    const trip = await getTrip(booking.trip.id);
    const tripDate = new Date(booking.trip.departureDatetime)

    const formattedTripDate = tripDate.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })

    const bookingDate = new Date(booking.bookingDatetime)

    const formattedBookingDate = bookingDate.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })

    const isPast = tripDate.getTime() < new Date().getTime();

    if (!trip || 'error' in trip) {
        return <h1>Une erreur est survenue.</h1>
    }

    return (
        <div className="bg-gray-200 block w-100 p-6 rounded-lg shadow-xs hover:bg-neutral-secondary-medium">
            {booking.trip.isCancelled && (
                <span
                    className="inline-flex items-center rounded-md bg-red-800/10 px-2 py-1 text-md font-medium text-red-800 inset-ring inset-ring-red-800/20 mb-3">Trajet annulé</span>
            )}
            {booking.isCancelled && (
                <span
                    className="inline-flex items-center rounded-md bg-red-800/10 px-2 py-1 text-md font-medium text-red-800 inset-ring inset-ring-red-800/20 mb-3">Réservation annulée</span>
            )}
            {!booking.isCancelled && !isPast && !booking.trip.isCancelled && (
                <span
                    className="inline-flex items-center rounded-md bg-green-800/10 px-2 py-1 text-md font-medium text-green-800 inset-ring inset-ring-green-800/20 mb-3">Trajet maintenu</span>
            )}
            {isPast && !booking.isCancelled && (
                <span
                    className="inline-flex items-center rounded-md bg-yellow-800/10 px-2 py-1 text-md font-medium text-yellow-800 inset-ring inset-ring-yellow-800/20 mb-3">Trajet passé</span>
            )}

            <h1 className="text-xl font-bold">{trip.departure!.city.name} → {trip.arrival!.city.name} </h1>
            <h2>Conducteur : <span className="bold">{trip.driver.firstname} {trip.driver.lastname}</span></h2>
            <p>Départ : {formattedTripDate}</p>
            <p>Distance : {trip.length == 0 ? "non renseignée" : trip.length + " km"}</p>
            <p>Réservé le : {formattedBookingDate}</p>
            <div className={"mt-3"}>{children}</div>
        </div>
    )

}