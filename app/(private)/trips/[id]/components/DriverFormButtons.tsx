import Button from "@/components/ui/Button";
import Link from "next/link";
import {useActionState, useEffect} from "react";
import {cancelTripAction} from "@/app/(private)/trips/[id]/actions";
import {useRouter} from "next/navigation";

export default function DriverFormButtons({ driverId, tripId, onStateChange, actionBlocked }: Readonly<{
    actionBlocked?: boolean,
    driverId: number,
    tripId: number,
    onStateChange: (success: { error: string; } | { success: string; }) => void
}>) {
    const [cancelState, cancelAction] = useActionState(cancelTripAction, null)
    const router = useRouter();

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
            <input type={"hidden"} name={"driverId"} value={driverId}/>
            <input type={"hidden"} name={"tripId"} value={tripId}/>
            <div className={"flex flex-row justify-between w-100"}>
                <Link href={"/my-trips"}><Button theme={"dark"} label={"Retour"} type={"button"} /></Link>
                {!actionBlocked && (
                    <Button theme={"danger"} label={"Annuler le trajet"} type={"submit"} />
                )}
            </div>
        </form>
    )
}