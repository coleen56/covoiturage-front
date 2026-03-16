'use client'

import Main from "@/components/ui/Main";
import PageTitle from "@/components/ui/PageTitle";
import MessageForm from "@/app/(private)/message/components/MessageForm";

export default function MessagePage() {
    return (
        <Main>
            <PageTitle>
                Envoyer un message
            </PageTitle>
            <MessageForm />
        </Main>
    )
}