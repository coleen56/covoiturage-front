import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";
import {getTrip} from "@/app/(private)/trips/[id]/actions";

export default async function TripPage({ params }: Readonly<{ params: { id: string } }>) {
    const { id } = await params;
    const trip = await getTrip(id)
    if(!trip || 'error' in trip) {
        return (
            <Main>
                <PageTitle>
                    Une erreur est survenue.
                </PageTitle>
                <p>{trip.error}</p>

            </Main>
        )
    }
    const currentBookings = trip.bookings.filter(booking => !booking.isCancelled);
    return (
        <Main>
            <PageTitle>
                Détails du trajet
            </PageTitle>
            <h1>Conducteur : {trip.driver.lastname}</h1>
        </Main>
    )
}