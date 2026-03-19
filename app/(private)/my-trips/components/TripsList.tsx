'use client'

import {Trip} from "@/types/carpool";
import TripCard from "@/components/ui/display/TripCard";
import Button from "@/components/ui/form-controls/Button";
import Link from "next/link";

export default function TripsList({ trips }: Readonly<{ trips: Trip[] }>) {

    if (!trips || trips.length === 0) {
        return (<div className="mt-4">
            <h1>Aucun trajet à afficher.</h1>
        </div>)
    }

    return (
        <div className="mt-4">
            {trips
                .map((trip: Trip) => (
                    <TripCard trip={trip} key={trip.id}>
                        <Link className="flex flex-row justify-center items-center" href={`/trips/${trip.id}`}>
                            <Button theme={"dark"} label={"Détails"} type={"button"} />
                        </Link>
                    </TripCard>
                ))}
        </div>
    )
}