'use server'

import Main from "@/components/ui/Main";
import PageTitle from "@/components/ui/PageTitle";
import {FaPlus} from "react-icons/fa";
import TripsList from "@/app/(private)/my-trips/components/TripsList";
import {getDrivenTrips} from "@/app/(private)/my-trips/actions";

export default async function MyTripsPage() {
    const trips = await getDrivenTrips();
    return (
        <Main>
            <PageTitle>
                Mes trajets
            </PageTitle>
            <button className={"absolute bg-gray-900 right-4 bottom-4 p-5 rounded-lg"}>
                <FaPlus className={"text-4xl text-white"} />
            </button>
            <TripsList trips={trips} />
        </Main>
    )
}