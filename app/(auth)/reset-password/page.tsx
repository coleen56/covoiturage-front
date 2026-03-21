import Main from "@/components/ui/layout/Main";
import ResetPasswordForm from "@/app/(auth)/reset-password/components/ResetPasswordForm";
import {Metadata} from "next";
import AuthContainer from "@/components/ui/display/AuthContainer";

export const metadata: Metadata = { title: 'Réinitialiser un mot de passe' }

export default async function ResetPasswordPage({searchParams}: Readonly<{ searchParams: { token?: string } }>) {
    const {token} = await searchParams;
    return(
        <Main>
            <AuthContainer title={"Réinitialisation du mot de passe"}>
            {token && (
                <ResetPasswordForm token={token}/>
            )}
            {!token && (
                <h2 className={"mt-2 text-center"}>Une erreur est survenue : le token est introuvable.</h2>
            )}
            </AuthContainer>
        </Main>
    )
}