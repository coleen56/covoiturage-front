import BookingCard from "@/components/ui/display/BookingCard";
import {getTripsAsPassenger} from "@/lib/carpool";
import Link from "next/link";
import {FaCar} from "react-icons/fa";

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
                    <ul>
                        {incomingBookings
                            .map(booking =>
                                <BookingCard key={booking.id} trip={booking.trip}/>
                            )}
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    <h1 className="mb-3 text-xl">Aucun trajet à venir pour le moment.</h1>
                    <Link href={"/search"} className="bg-gray-800 text-white px-3 py-1 rounded-lg flex flex-row items-center justify-center"><FaCar className="me-3" />Je réserve un trajet</Link>
                </>
            )
        }
    }
}