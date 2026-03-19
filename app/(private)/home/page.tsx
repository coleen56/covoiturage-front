import TripList from "@/app/(private)/home/components/TripList";
import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";

export default function HomePage() {
    return (
        <Main>
            <PageTitle>
                Bienvenue !
            </PageTitle>
            <TripList />
        </Main>
    )
}