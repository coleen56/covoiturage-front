'use client'

import {Trip} from "@/types/carpool";
import ErrorAlert from "@/components/ui/ErrorAlert";
import SuccessAlert from "@/components/ui/SuccessAlert";
import React, {useState} from "react";
import {ActionState} from "@/app/(auth)/login/actions";
import CancelBookingForm from "@/app/(private)/trips/[id]/components/CancelBookingForm";
import BookingFormButtons from "@/app/(private)/trips/[id]/components/BookingFormButtons";
import DriverFormButtons from "@/app/(private)/trips/[id]/components/DriverFormButtons";

export default function TripDescription({trip, isDriver, isPassenger}: Readonly<{ trip: Trip, isDriver: boolean, isPassenger: boolean }>) {
    const [cancelState, setCancelState] = useState<ActionState>(null);
    const [bookingState, setBookingState] = useState<ActionState>(null);
    const [cancelTripState, setCancelTripState] = useState<ActionState>(null);
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

    const isPast = date.getTime() < new Date().getTime();

    return (
        <>
            {/*divs d'affichage erreur/success*/}
            {'error' in (bookingState ?? {}) && (
                <ErrorAlert message={(bookingState as { error: string }).error} />
            )}
            {'success' in (bookingState ?? {}) && (
                <SuccessAlert message={(bookingState as unknown as { success: string }).success} />
            )}

            {'error' in (cancelState ?? {}) && (
                <ErrorAlert message={(cancelState as { error: string }).error} />
            )}
            {'success' in (cancelState ?? {}) && (
                <SuccessAlert message={(cancelState as unknown as { success: string }).success} />
            )}

                {'error' in (cancelTripState ?? {}) && (
                    <ErrorAlert message={(cancelTripState as { error: string }).error} />
                )}
                {'success' in (cancelTripState ?? {}) && (
                    <SuccessAlert message={(cancelTripState as unknown as { success: string }).success} />
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
                {car && (
                    <div className={"bg-gray-200 w-100 rounded-lg p-4 mt-3"}>
                        <h1 className={"font-bold underline underline-offset-4 mb-2"}>
                            Voiture : {car.manufacturer?.name} {car.model}
                        </h1>
                        <p>Immatriculation : {car.licencePlate}</p>
                        <p>Description : {car.description}</p>
                    </div>
                )}
            {/*    affichage des passagers + formulaire d'annulation pour driver*/}
            <div className={"bg-gray-200 w-100 rounded-lg p-4 mt-3"}>
                <h1 className={"font-bold underline underline-offset-4 mb-2"}>Passagers : </h1>
                <ul>
                { currentBookings.map(booking => (
                    <li key={booking.id} className={"flex flex-row items-center"}>{booking.passenger.firstname + ' ' + booking.passenger.lastname}
                        {isDriver && (
                            <CancelBookingForm booking={booking} onStateChange={setCancelState} trip={trip}/>
                        )}</li>
                ))}
                    {/*si pas de passager*/}
                    {currentBookings.length == 0 && (
                        <li>Aucun passager pour le moment.</li>
                    )}
                </ul>
            </div>
            {/*    form pour user ni passager ni driver */}
                {!isDriver && !isPassenger && (
                    <BookingFormButtons tripId={trip.id} onStateChange={setBookingState}/>
                )}
                {/*form pour driver*/}
                {isDriver && (
                    <DriverFormButtons driverId={trip.driver.id} tripId={trip.id} onStateChange={setCancelTripState} actionBlocked={isPast || trip.isCancelled} />
                )}
        </>
    )
}