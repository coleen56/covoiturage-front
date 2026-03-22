import BookingCard from "@/components/ui/display/BookingCard";
import {getTripsAsPassenger} from "@/lib/carpool";
import Link from "next/link";
import Button from "@/components/ui/form-controls/Button";

export default async function TripList() {
    let bookings;
    try {
        bookings = await getTripsAsPassenger();
    } catch (error) {
        return (
            <>
                <h1>Une erreur est survenue.</h1>
                <p>{error instanceof Error ? error.message : null}</p>
            </>
        )
    }

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
                    <h1 className="mb-3 text-xl text-center">Vous n&#39;avez pas de trajet prévu pour le moment.</h1>
                    <Link href={"/search"} className={"inline-block"}><Button theme={"dark"} label={"Je réserve un trajet !"} type={"button"} /></Link>
                </div>
            )
        }
    }
}