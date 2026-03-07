import TripList from "@/app/home/trip-list";
import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";

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