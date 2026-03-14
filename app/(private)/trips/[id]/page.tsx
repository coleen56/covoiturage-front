import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";
import {getTrip} from "@/app/(private)/trips/[id]/actions";
import TripDescription from "@/app/(private)/trips/[id]/components/TripDescription";
import {auth} from "@/lib/auth";
import {forEach} from "eslint-config-next";

export default async function TripPage({ params, searchParams }: Readonly<{ params: { id: string }, searchParams: { from: string } }>) {
    // récupération des paramètres
    const { id } = await params;
    const { from } = await searchParams;
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
    trip.bookings.forEach((booking) => {
        if(booking.passenger.id == currentUserId) {
            isPassenger = true;
        }
    })

    return (
        <Main>
            <PageTitle>
                Détails du trajet
            </PageTitle>
            <TripDescription trip={trip} isDriver={isDriver} isPassenger={isPassenger}/>

        </Main>
    )
}