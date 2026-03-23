import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import {Metadata} from "next";
import TripTabs from "@/app/(private)/home/components/TripTabs";
import getTripsByRole from "@/app/(private)/home/actions";
import {isBookingArray, isTripArray} from "@/types/guards";

export const metadata: Metadata = { title: 'Accueil' }

export default async function HomePage() {
    const [driverTrips, passengerTrips] = await Promise.all([
        getTripsByRole('driver'),
        getTripsByRole('passenger'),
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