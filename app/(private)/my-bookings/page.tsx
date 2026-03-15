import Main from "@/components/ui/Main";
import PageTitle from "@/components/ui/PageTitle";
import BookingsList from "@/app/(private)/my-bookings/components/BookingsList";
import {getUserBookings} from "@/app/(private)/my-bookings/actions";

export default async function MyBookings() {
    const bookings = await getUserBookings();
    return (
        <Main >
            <PageTitle>
                Mes réservations
            </PageTitle>
            {'error' in bookings &&
                (
                    <p>{bookings.error}</p>
                )}
            {!("error" in bookings) &&
                <BookingsList bookings={bookings}/>
            }

        </Main>
    )
}