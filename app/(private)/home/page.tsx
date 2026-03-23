import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import {Metadata} from "next";
import TripTabs from "@/app/(private)/home/components/TripTabs";
import {isBookingArray, isTripArray} from "@/types/guards";
import {getUserTripsAsDriver, getUserTripsAsPassenger} from "@/app/(private)/home/actions";

export const metadata: Metadata = { title: 'Accueil' }

export default async function HomePage() {
    const [driverTrips, passengerTrips] = await Promise.all([
        getUserTripsAsDriver(),
        getUserTripsAsPassenger(),
    ])

    return (
        <Main>
            <PageTitle>
                Bienvenue !
            </PageTitle>
            <TripTabs
                driverTrips={isTripArray(driverTrips) ? driverTrips : []}
                passengerTrips={isBookingArray(passengerTrips) ? passengerTrips : []}
            />
        </Main>
    )
}