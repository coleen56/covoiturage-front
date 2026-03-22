import Link from "next/link";
import Button from "@/components/ui/form-controls/Button";
import React, {useActionState, useEffect} from "react";
import {ActionState} from "@/app/(auth)/login/actions";
import {bookTrip} from "@/app/(private)/trips/[id]/actions";
import {useRouter} from "next/navigation";

export default function BookingFormButtons({ tripId, driverId, onStateChange, onGoBackClick }: Readonly<{ tripId: number, driverId: number, onStateChange: (success: { error: string; } | { success: string; }) => void , onGoBackClick: () => void}>) {
    const [state, bookTripAction] = useActionState<ActionState, FormData>(bookTrip, null)

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
        <form action={bookTripAction}>
            <input type="hidden" name="tripId" value={tripId} />
            <div className={"flex flex-row justify-between w-100"}>
                <Button theme={"danger"} label={"Annuler"} type={"button"} onClick={() => onGoBackClick()}/>
                <Link href={`/message?to=${driverId}`}><Button theme={"light"} label={"Message"} type={"button"} /></Link>
                <Button theme={"dark"} label={"Confirmer"} type={"submit"} />
            </div>
        </form>
    )
}