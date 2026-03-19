import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import SearchContainer from "@/app/(private)/search/components/SearchContainer";
import {Metadata} from "next";

export const metadata: Metadata = { title: 'Rechercher un trajet' }

export default async function Search() {
    return (
        <Main>
            <PageTitle>
                Rechercher un trajet
            </PageTitle>
            <SearchContainer />
        </Main>
    )
}