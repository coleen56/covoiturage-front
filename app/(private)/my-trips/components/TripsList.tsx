import {Trip} from "@/types/carpool";
import TripCard from "@/app/(private)/search/components/TripCard";
import {getDrivenTrips} from "@/app/(private)/my-trips/actions";

export default async function TripsList() {
    const trips = await getDrivenTrips();

    if (trips.length === 0) {
        return (<div className="mt-4">
            <h1>Aucun trajet à afficher.</h1>
        </div>)
    }

    return (
        <div className="mt-4">
            {trips
                .map((trip: Trip) => (
                    <TripCard trip={trip} key={trip.id}/>
                ))}
        </div>
    )
}