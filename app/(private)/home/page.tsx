import TripList from "@/app/(private)/home/components/TripList";
import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import {Metadata} from "next";

export const metadata: Metadata = { title: 'Accueil' }

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