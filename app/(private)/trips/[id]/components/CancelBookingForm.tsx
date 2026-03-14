'use client'
import React, {useActionState, useEffect} from "react";
import { deleteBooking } from "../actions";
import { FaRegTrashAlt } from "react-icons/fa";
import {Booking, Trip} from "@/types/carpool";
import {useRouter} from "next/navigation";

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
    }, [state]);

    return (
        <form action={formAction}>
            <input type={"hidden"} name={"tripId"} value={trip.id}/>
            <input type={"hidden"} name={"driverId"} value={trip.driver.id}/>
            <input type={"hidden"} name={"bookingId"} value={booking.id}/>
            <button type={"submit"}><FaRegTrashAlt className={"inline ms-2 hover:cursor-pointer text-red-900"} /></button>
        </form>
    );
}