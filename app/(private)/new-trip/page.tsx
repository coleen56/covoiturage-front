import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import NewTripFormContainer from "@/app/(private)/new-trip/components/NewTripFormContainer";

export default function NewTrip() {
    return (
        <Main>
            <PageTitle>
                Créer un trajet
            </PageTitle>
            <NewTripFormContainer />
        </Main>
    )
}