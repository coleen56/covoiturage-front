'use client'

import { useState } from "react"
import TripList from "@/app/(private)/home/components/TripList"
import {Booking, Trip} from "@/types/carpool";

type Tab = 'driver' | 'passenger'

export default function TripTabs({driverTrips, passengerTrips} : Readonly<{
    driverTrips: Trip[],
    passengerTrips: Booking[],
}>) {
    const [activeTab, setActiveTab] = useState<Tab>('driver')

    return (
        <div>
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('driver')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'driver'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Conducteur
                </button>
                <button
                    onClick={() => setActiveTab('passenger')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'passenger'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Passager
                </button>
            </div>

            {activeTab === 'driver' && <TripList role="driver" trips={driverTrips} />}
            {activeTab === 'passenger' && <TripList role="passenger" bookings={passengerTrips}/>}
        </div>
    )
}