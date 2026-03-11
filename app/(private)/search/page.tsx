import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";
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