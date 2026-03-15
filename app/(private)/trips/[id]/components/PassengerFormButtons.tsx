import Link from "next/link";
import Button from "@/components/ui/Button";
import {useActionState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {cancelBookingAction} from "@/app/(private)/trips/[id]/actions";
import {Booking} from "@/types/carpool";

export default function PassengerFormButtons({booking, onStateChange}: Readonly<{ booking: Booking, onStateChange: (success: { error: string; } | { success: string; }) => void }>) {
    const [cancelState, cancelAction] = useActionState(cancelBookingAction, null)
    const router = useRouter();
    const actionBlocked = booking.isCancelled;

    useEffect(() => {
        if (cancelState) {
            onStateChange(cancelState)
            if('success' in cancelState) {
                router.refresh();
            }
        }
    }, [cancelState]);

    return (
        <form action={cancelAction}>
            <input type={"hidden"} name={"passengerId"} value={booking.passenger.id}/>
            <input type={"hidden"} name={"bookingId"} value={booking.id}/>
            <div className={"flex flex-row justify-between w-100"}>
                <Link href={"/my-bookings"}><Button theme={"dark"} label={"Retour"} type={"button"} /></Link>
                {!actionBlocked && (
                    <Button theme={"danger"} label={"Annuler ma réservation"} type={"submit"} />
                )}
            </div>
        </form>
    )
}