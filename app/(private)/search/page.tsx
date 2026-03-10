import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";
import SearchTripForm from "@/app/(private)/search/search-trip-form";

export default function Search() {
    return (
        <Main>
            <PageTitle>
                Rechercher un trajet
            </PageTitle>
            <SearchTripForm />
        </Main>
    )
}