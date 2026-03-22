'use client'
import React, {useActionState, useEffect} from "react";
import { deleteBooking } from "../actions";
import {Booking, Trip} from "@/types/carpool";
import {useRouter} from "next/navigation";
import {Trash} from "lucide-react";

export default function CancelBookingForm({ booking, onStateChange, trip }: Readonly<{ booking: Booking, onStateChange: (success: { error: string; } | { success: string; }) => void, trip: Trip }>) {
    const [state, formAction] = useActionState(deleteBooking, null);
    const router = useRouter();

    useEffect(() => {
        if (state) {
            onStateChange(state)
            if('success' in state) {
                router.refresh();
            }
        }
    }, [onStateChange, router, state]);

    return (
        <form action={formAction}>
            <input type={"hidden"} name={"tripId"} value={trip.id}/>
            <input type={"hidden"} name={"driverId"} value={trip.driver.id}/>
            <input type={"hidden"} name={"bookingId"} value={booking.id}/>
            <button type={"submit"} className={"bg-red-800 rounded-md shadow-lg"}><Trash className={"inline m-2 hover:cursor-pointer text-white text-3xl"} /></button>
        </form>
    );
}