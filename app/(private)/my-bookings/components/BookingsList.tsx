import {Booking} from "@/types/carpool";
import Link from "next/link";
import Button from "@/components/ui/form-controls/Button";
import BookingCard from "@/app/(private)/my-bookings/components/BookingCard";

export default function BookingsList( { bookings }: Readonly<{ bookings: Booking[] }>) {
    if (!bookings || bookings.length === 0) {
        return (<div className="mt-4">
            <h1>Aucune réservation à afficher.</h1>
        </div>)
    }

    return (
        <div className="mt-4">
            {bookings
                .map((booking: Booking) => (
                    <BookingCard booking={booking} key={booking.id}>
                        <Link className="flex flex-row justify-center items-center" href={`/trips/${booking.trip.id}`}>
                            <Button theme={"dark"} label={"Détails"} type={"button"} />
                        </Link>
                    </BookingCard>
                ))}
        </div>
    )
}