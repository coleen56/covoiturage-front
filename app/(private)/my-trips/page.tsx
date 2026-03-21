import Main from "@/components/ui/layout/Main";
import PageTitle from "@/components/ui/layout/PageTitle";
import {FaPlus} from "react-icons/fa";
import TripsList from "@/app/(private)/my-trips/components/TripsList";
import {getDrivenTrips} from "@/app/(private)/my-trips/actions";
import Button from "@/components/ui/form-controls/Button";
import Link from "next/link";
import {Metadata} from "next";
import NewTripFab from "@/app/(private)/my-trips/components/NewTripFab";

export const metadata: Metadata = { title: 'Mes trajets' }

export default async function MyTripsPage() {
    const trips = await getDrivenTrips();
    if(!trips || 'error' in trips) {
        return (
            <h1>Une erreur est survenue.</h1>
        )
    }
    return (
        <Main>
            <PageTitle>
                Mes trajets
            </PageTitle>
            <NewTripFab />
            <TripsList trips={trips} />
        </Main>
    )
}