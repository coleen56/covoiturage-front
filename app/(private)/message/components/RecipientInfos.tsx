'use client'

import {Profile} from "@/types/carpool";
import {Mail, Phone, User} from "lucide-react";
import RecipientInfoLabel from "@/app/(private)/message/components/RecipientInfoLabel";

export default function RecipientInfos({recipient} : Readonly<{ recipient: Profile }>) {
    return (
        <div className={"bg-gray-200 w-100 rounded-lg p-4 mt-3 flex flex-col gap-3"}>
            <RecipientInfoLabel label={recipient.firstname && recipient.lastname ? recipient.firstname + " " + recipient.lastname : "inconnu"}>
                <User />
            </RecipientInfoLabel>
            <RecipientInfoLabel label={recipient.email}>
                <Mail />
            </RecipientInfoLabel>
            <RecipientInfoLabel label={recipient.phone ?? "inconnu"} >
                <Phone />
            </RecipientInfoLabel>
        </div>
    )
}