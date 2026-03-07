import {Trip} from "@/types/carpool";
import {FaCalendarDays} from "react-icons/fa6";
import {FaFlagCheckered} from "react-icons/fa";
import {IoLocationOutline} from "react-icons/io5";
import {RiPinDistanceFill} from "react-icons/ri";
import {TbSteeringWheelFilled} from "react-icons/tb";

interface TripCardProps {
    trip: Trip
}

export default function TripCard({trip}: Readonly<TripCardProps>) {
    console.log(trip)
    const date = new Date(trip.departureDatetime)

    const formattedDate = date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })

    return (
        <a href="/preview" className="bg-gray-200 block max-w-sm p-6 rounded-lg shadow-xs hover:bg-neutral-secondary-medium">
            <div className="flex flex-row items-center py-2 space-x-2 text-3xl">
                <FaCalendarDays />
                <h5 className="font-semibold tracking-tight text-heading leading-8 underline underline-offset-5">{formattedDate}</h5>
            </div>
            <div className="flex flex-row items-center py-2 space-x-2 text-lg">
                <IoLocationOutline />
                <p>{trip.departure?.number}, {trip.departure?.streetname}, {trip.departure?.city.name} ({trip.departure?.city.zipCode})</p>
            </div>
            <div className="flex flex-row items-center py-2 space-x-2 text-lg">
                <FaFlagCheckered /><p>{trip.arrival?.number}, {trip.arrival?.streetname}, {trip.arrival?.city.name} ({trip.arrival?.city.zipCode})</p>
            </div>
            <div className="flex flex-row items-center py-2 space-x-2 text-lg">
                <RiPinDistanceFill />
                <p>{trip.length} km</p>
            </div>
            <div className="flex flex-row items-center py-2 space-x-2 text-lg">
                <TbSteeringWheelFilled />
                <p>{trip.driver.firstname} {trip.driver.lastname}</p>
            </div>
        </a>
    )
}