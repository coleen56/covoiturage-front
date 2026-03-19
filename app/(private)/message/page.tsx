'use server'

import Main from "@/components/ui/layout/Main";
import PageTitle from "@/components/ui/layout/PageTitle";
import MessageForm from "@/app/(private)/message/components/MessageForm";
import {auth} from "@/lib/auth";

export default async function MessagePage({ searchParams }: Readonly<{ searchParams: Promise<{ to: string }> }>) {
    const { to } = await searchParams;
    const from = await auth.getCurrentUserIdServer();

    if (!to || !from) {
        return (
            <Main>
                <PageTitle>Erreur : destinataire manquant.</PageTitle>
            </Main>
        )
    }

    return (
        <Main>
            <PageTitle>Envoyer un message</PageTitle>
            <MessageForm to={to} from={from.toString()} />
        </Main>
    )
}