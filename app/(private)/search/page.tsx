'use client'
import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import SearchContainer from "@/app/(private)/search/components/SearchContainer";

export default function Search() {
    return (
        <Main>
            <PageTitle>
                Rechercher un trajet
            </PageTitle>
            <SearchContainer />
        </Main>
    )
}