'use client'

import {Trip} from "@/types/carpool";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {bookTrip} from "@/app/(private)/trips/[id]/actions";
import ErrorAlert from "@/components/ui/ErrorAlert";
import SuccessAlert from "@/components/ui/SuccessAlert";
import {useActionState} from "react";
import {ActionState, loginAction} from "@/app/(auth)/login/actions";

export default function TripDescription({trip}: Readonly<{ trip: Trip }>) {
    const [state, formAction] = useActionState<ActionState, FormData>(bookTrip, null)
    // filtrage des réservations non annulées
    const currentBookings = trip.bookings.filter(booking => !booking.isCancelled);

    // date du trajet
    const date = new Date(trip.departureDatetime)
    const formattedDate = date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })

    const car = trip.driver.car;

    return (
        <>
            {'error' in (state ?? {}) && (
                <ErrorAlert message={(state as { error: string }).error} />
            )}
            {'success' in (state ?? {}) && (
                <SuccessAlert message={(state as unknown as { success: string }).success} />
            )}
            <div className={"bg-gray-200 w-100 rounded-lg p-4 mt-5"}>
                <h1>Conducteur : {trip.driver.firstname + ' ' + trip.driver.lastname}</h1>
                <p>Date et heure de départ : {formattedDate}</p>
                <p>De : {trip.departure?.number} {trip.departure?.streetname}, {trip.departure?.city.zipCode} {trip.departure?.city.name}</p>
                <p>A : {trip.arrival?.number} {trip.arrival?.streetname}, {trip.arrival?.city.zipCode} {trip.arrival?.city.name}</p>
                <p>Distance : {trip.length ? trip.length + ' km': 'non renseignée'}</p>
                <p>Nombre de réservations : {currentBookings.length}</p>
                <p>Nombre de places disponibles : {trip.seats - currentBookings.length}</p>
            </div>
            <div className={"bg-gray-200 w-100 rounded-lg p-4 mt-3"}>
                <h1 className={"font-bold underline underline-offset-4 mb-2"}>Voiture : {car.manufacturer.name} {car.model}</h1>
                <p>Immatriculation : {car.licencePlate}</p>
                <p>Description : {car.description}</p>
            </div>
            <div className={"bg-gray-200 w-100 rounded-lg p-4 mt-3"}>
                <h1 className={"font-bold underline underline-offset-4 mb-2"}>Passagers : </h1>
                <ul>
                {currentBookings.map(booking => (
                    <li key={booking.id}>{booking.passenger.firstname + ' ' + booking.passenger.lastname}</li>
                ))}
                </ul>
            </div>
            <form action={formAction}>
                <input type="hidden" name="tripId" value={trip.id} />
                <div className={"flex flex-row justify-between w-100"}>
                    <Link href={"/search"}><Button theme={"danger"} label={"Annuler"} type={"button"} /></Link>
                    <Button theme={"light"} label={"Envoyer un message"} type={"button"} />
                    <Button theme={"dark"} label={"Confirmer"} type={"submit"} />
                </div>
            </form>
        </>
    )
}