import ForgotPasswordForm from "@/app/(auth)/forgot-password/components/ForgotPasswordForm";
import Main from "@/components/ui/layout/Main";
import {Metadata} from "next";
import AuthContainer from "@/components/ui/display/AuthContainer";

export const metadata: Metadata = { title: 'Mot de pase oublié' }

export default function ForgotPasswordPage() {
    return (
        <Main>
            <AuthContainer title={"Mot de passe oublié"}>
                <ForgotPasswordForm />
            </AuthContainer>
        </Main>
    )
}