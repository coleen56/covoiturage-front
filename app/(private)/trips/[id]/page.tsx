import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import {getTrip} from "@/app/(private)/trips/[id]/actions";
import TripDescription from "@/app/(private)/trips/[id]/components/TripDescription";
import {auth} from "@/lib/auth";
import {Metadata} from "next";

export const metadata: Metadata = { title: 'Détails du trajet' }

export default async function TripPage({ params }: Readonly<{ params: { id: string }}>) {
    // récupération des paramètres
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
    const currentUserId = await auth.getCurrentUserIdServer();

    const isDriver = trip.driver.id == currentUserId;
    let isPassenger = false;
    let userBooking = null
    trip.bookings.forEach((booking) => {
        if(booking.passenger.id == currentUserId) {
            isPassenger = true;
            userBooking = booking;
        }
    })

    return (
        <Main>
            <PageTitle>
                Détails du trajet
            </PageTitle>
            <TripDescription trip={trip} isDriver={isDriver} isPassenger={isPassenger} userBooking={userBooking ?? undefined} currentUserId={currentUserId} />

        </Main>
    )
}