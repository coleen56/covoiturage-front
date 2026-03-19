'use client'

import InputGroup from "@/components/ui/form-controls/InputGroup";
import {useActionState} from "react";
import MessageBodyInput from "@/app/(private)/message/components/MessageBodyInput";
import Button from "@/components/ui/form-controls/Button";
import {ActionState, sendMessage} from "@/app/(private)/message/actions"
import StateAlerts from "@/components/ui/alerts/StateAlerts";

export default function MessageForm({ to, from }: Readonly<{ to: string, from: string }>) {
    const [state, formAction] = useActionState<ActionState, FormData>(sendMessage, null)

    return (
        <>
            <StateAlerts state={state} />
            <form className={"w-100"} action={formAction}>
                <input type={"hidden"} name={"senderId"} value={from}/>
                <input type={"hidden"} name={"recipientId"} value={to}/>
                <InputGroup label={"Sujet du message"} name={"subject"} id={"subject"} type={"text"} placeholder={"Sujet du message"} />
                <MessageBodyInput label={"Message"} name={"message"} id={"message"} placeholder={"Votre message"} rows={8}/>
                <Button theme={"dark"} label={"Envoyer"} type={"submit"} />
            </form>
        </>
    )
}