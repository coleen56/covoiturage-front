import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import SearchContainer from "@/app/(private)/search/components/SearchContainer";
import {Metadata} from "next";
import {auth} from "@/lib/auth";

export const metadata: Metadata = { title: 'Rechercher un trajet' }

export default async function Search() {
    const currentUserId = await auth.getCurrentUserIdServer();
    return (
        <Main>
            <PageTitle>
                Rechercher un trajet
            </PageTitle>
            <SearchContainer currentUserId={currentUserId}/>
        </Main>
    )
}