import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";
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