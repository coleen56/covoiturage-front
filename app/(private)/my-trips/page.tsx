'use server'

import Main from "@/components/ui/Main";
import PageTitle from "@/components/ui/PageTitle";
import {FaPlus} from "react-icons/fa";
import TripsList from "@/app/(private)/my-trips/components/TripsList";
import {getDrivenTrips} from "@/app/(private)/my-trips/actions";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default async function MyTripsPage() {
    const trips = await getDrivenTrips();
    return (
        <Main>
            <PageTitle>
                Mes trajets
            </PageTitle>
            <div className={"w-100 flex flex-row justify-end"}>
                <Link href={"new-trip"}>
                    <Button theme={"dark"} label={"Créer un trajet"} type={"button"} >
                        <FaPlus className={"inline mr-2"}/>
                    </Button>
                </Link>
            </div>
            <TripsList trips={trips} />
        </Main>
    )
}