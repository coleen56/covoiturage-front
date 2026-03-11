import BookingCard from "@/components/ui/BookingCard";
import {getTripsAsPassengers} from "@/lib/carpool";
import Link from "next/link";
import {FaCar} from "react-icons/fa";

export default async function TripList() {
    let bookings;
    try {
        bookings = await getTripsAsPassengers();
    } catch (error) {
        console.log(error);
    }

    if(bookings) {
        const incomingBookings = bookings.filter(booking => new Date(booking.trip.departureDatetime) > new Date())

        if (incomingBookings.length > 0) {
            return (
                <>
                    <h1 className="mb-3 text-xl">Vos trajets à venir :</h1>
                    <ul>
                        {bookings
                            // on garde uniquement les trajets pas encore passés
                            .filter(booking => new Date(booking.trip.departureDatetime) > new Date())
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
                    <Link href={"/booking"} className="bg-gray-800 text-white px-3 py-1 rounded-lg flex flex-row items-center justify-center"><FaCar className="me-3" />Je réserve un trajet</Link>
                </>
            )
        }
    }
}