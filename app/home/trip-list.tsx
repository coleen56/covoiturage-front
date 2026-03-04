import TripCard from "@/app/home/trip-card";

export default function TripList() {
    return (
        <>
            <h1>Vos prochains trajets :</h1>
            <ul>
                <TripCard/>
            </ul>
        </>
    )
}