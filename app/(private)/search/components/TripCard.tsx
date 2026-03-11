import {Trip} from "@/types/carpool";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function TripCard( { trip }: Readonly<{trip: Trip}>) {
    const date = new Date(trip.departureDatetime)

    const formattedDate = date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })

    const remainingSeats = trip.seats - trip.bookings.filter((b) => !b.isCancelled).length;

    return (
        <div className="bg-gray-200 block w-100 p-6 rounded-lg shadow-xs hover:bg-neutral-secondary-medium">
            <h1 className="text-xl font-bold">{trip.departure!.city.name} → {trip.arrival!.city.name} </h1>
            <h2>Conducteur : <span className="bold">{trip.driver.firstname} {trip.driver.lastname}</span></h2>
            <p>Départ : {formattedDate}</p>
            <p>Distance : {trip.length == 0 ? "non renseignée" : trip.length + " km"}</p>
            <p>Places disponibles : {remainingSeats}</p>
            <Link className="flex flex-row justify-center items-center" href={`/trips/${trip.id}`}>
                <Button theme={"dark"} label={"Réserver"} type={"button"} />
            </Link>
        </div>
    )
}