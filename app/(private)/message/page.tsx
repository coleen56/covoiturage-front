import Main from "@/components/ui/layout/Main";
import PageTitle from "@/components/ui/layout/PageTitle";
import MessageForm from "@/app/(private)/message/components/MessageForm";
import {auth} from "@/lib/auth";
import {Metadata} from "next";
import {getUserProfileById} from "@/app/(private)/message/actions";
import RecipientInfos from "@/app/(private)/message/components/RecipientInfos";

export const metadata: Metadata = { title: 'Envoyer un message' }

export default async function MessagePage({ searchParams }: Readonly<{ searchParams: Promise<{ to: string }> }>) {
    const { to } = await searchParams;
    const from = await auth.getCurrentUserIdServer();

    const recipient = await getUserProfileById(to)

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
            {recipient.success && (
                <RecipientInfos recipient={recipient.data} />
            )}
            {!recipient.success && (
                <h1>{recipient.error}</h1>
            )}

            <MessageForm to={to} from={from.toString()} />
        </Main>
    )
}