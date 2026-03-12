import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";
import {getTrip} from "@/app/(private)/trips/[id]/actions";
import TripDescription from "@/app/(private)/trips/[id]/components/TripDescription";

export default async function TripPage({ params }: Readonly<{ params: { id: string } }>) {
    const { id } = await params;
    const trip = await getTrip(id)
    if(!trip || 'error' in trip) {
        return (
            <Main>
                <PageTitle>
                    Une erreur est survenue.
                    <p>{trip.error}</p>
                </PageTitle>
            </Main>
        )
    }

    return (
        <Main>
            <PageTitle>
                Détails du trajet
            </PageTitle>
            <TripDescription trip={trip} />

        </Main>
    )
}