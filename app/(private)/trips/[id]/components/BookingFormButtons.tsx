import Link from "next/link";
import Button from "@/components/ui/Button";
import React, {useActionState, useEffect} from "react";
import {ActionState} from "@/app/(auth)/login/actions";
import {bookTrip} from "@/app/(private)/trips/[id]/actions";
import {useRouter} from "next/navigation";

export default function BookingFormButtons({ tripId, onStateChange }: Readonly<{ tripId: number, onStateChange: (success: { error: string; } | { success: string; }) => void }>) {
    const [state, bookTripAction] = useActionState<ActionState, FormData>(bookTrip, null)

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
        <form action={bookTripAction}>
            <input type="hidden" name="tripId" value={tripId} />
            <div className={"flex flex-row justify-between w-100"}>
                <Link href={"/search"}><Button theme={"danger"} label={"Annuler"} type={"button"} /></Link>
                <Link href={"/message"}><Button theme={"light"} label={"Envoyer un message"} type={"button"} /></Link>
                <Button theme={"dark"} label={"Confirmer"} type={"submit"} />
            </div>
        </form>
    )
}