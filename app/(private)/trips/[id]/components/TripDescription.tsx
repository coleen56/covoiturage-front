'use client'

import {Booking, Trip} from "@/types/carpool";
import ErrorAlert from "@/components/ui/alerts/ErrorAlert";
import SuccessAlert from "@/components/ui/alerts/SuccessAlert";
import React, {useState} from "react";
import {ActionState} from "@/app/(auth)/login/actions";
import CancelBookingForm from "@/app/(private)/trips/[id]/components/CancelBookingForm";
import BookingFormButtons from "@/app/(private)/trips/[id]/components/BookingFormButtons";
import DriverFormButtons from "@/app/(private)/trips/[id]/components/DriverFormButtons";
import PassengerFormButtons from "@/app/(private)/trips/[id]/components/PassengerFormButtons";
import Link from "next/link";
import {FaRegEnvelope} from "react-icons/fa";
import StateAlerts from "@/components/ui/alerts/StateAlerts";

export default function TripDescription({trip, isDriver, isPassenger, userBooking}: Readonly<{ trip: Trip, isDriver: boolean, isPassenger: boolean, userBooking?: Booking }>) {
    const [cancelState, setCancelState] = useState<ActionState>(null);
    const [bookingState, setBookingState] = useState<ActionState>(null);
    const [cancelTripState, setCancelTripState] = useState<ActionState>(null);
    const [cancelBookingState, setCancelBookingState] = useState<ActionState>(null);
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
            <StateAlerts state={bookingState} />
            <StateAlerts state={cancelState} />
            <StateAlerts state={cancelTripState} />
            <StateAlerts state={cancelBookingState} />

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
                        )}
                        <Link href={`/message?to=${booking.passenger.id}`} className={"ms-5 text-3xl"}>
                            <FaRegEnvelope />
                        </Link>
                    </li>
                ))}
                    {/*si pas de passager*/}
                    {currentBookings.length == 0 && (
                        <li>Aucun passager pour le moment.</li>
                    )}
                </ul>
            </div>
            <div className={"mt-5"}>
                {/*    form pour user ni passager ni driver */}
                {!isDriver && !isPassenger && (
                    <BookingFormButtons tripId={trip.id} driverId={trip.driver.id} onStateChange={setBookingState}/>
                )}
                {/*form pour driver*/}
                {isDriver && (
                    <DriverFormButtons driverId={trip.driver.id} tripId={trip.id} onStateChange={setCancelTripState} actionBlocked={isPast || trip.isCancelled} />
                )}
                {/*form pour passager*/}
                {isPassenger && userBooking != undefined && (
                    <PassengerFormButtons booking={userBooking} onStateChange={setCancelBookingState}/>
                )}
            </div>
        </>
    )
}