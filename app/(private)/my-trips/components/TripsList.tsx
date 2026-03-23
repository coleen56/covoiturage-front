'use client'

import {Trip} from "@/types/carpool";
import TripCard from "@/components/ui/display/TripCard";
import Button from "@/components/ui/form-controls/Button";
import Link from "next/link";
import {useState} from "react";
import {CalendarArrowDown, CalendarArrowUp} from "lucide-react";

export default function TripsList({ trips }: Readonly<{ trips: Trip[] }>) {
    trips.sort((a, b) =>  new Date(b.departureDatetime).getTime() - new Date(a.departureDatetime).getTime())

    const [sortedTrips, setSortedTrips] = useState(trips);
    const [isAscendingOrder, setIsAscendingOrder] = useState(false);

    if (!trips || trips.length === 0) {
        return (<div className="mt-4">
            <h1>Aucun trajet à afficher.</h1>
        </div>)
    }

    function invertOrder() {
        const newOrder = !isAscendingOrder;
        setIsAscendingOrder(newOrder);
        setSortedTrips(trips.toSorted((a, b) => {
            const diff = new Date(a.departureDatetime).getTime() - new Date(b.departureDatetime).getTime();
            return newOrder ? diff : -diff;
        }));
    }

    return (
        <>
            {isAscendingOrder && (
                <Button theme={"dark"} label={"Ancien ‭→ récent"} type={"button"} onClick={() => {
                    invertOrder();
                }}>
                    <CalendarArrowDown className={"mr-2"}/>
                </Button>
            )}
            {!isAscendingOrder && (
                <Button theme={"light"} label={"Récent ‭→ ancien"} type={"button"} onClick={() => {
                    invertOrder();
                }}>
                    <CalendarArrowUp className={"mr-2"}/>
                </Button>
            )}
            <div className="mt-4 space-y-3">
                {sortedTrips
                    .map((trip: Trip) => (
                        <TripCard trip={trip} key={trip.id}>
                            <Link className="flex flex-row justify-center items-center mt-3" href={`/trips/${trip.id}`}>
                                <Button theme={"dark"} label={"Détails"} type={"button"} />
                            </Link>
                        </TripCard>
                    ))}
            </div>
        </>
    )
}