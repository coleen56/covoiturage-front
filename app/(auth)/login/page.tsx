import { Metadata } from 'next'
import LoginForm from './components/LoginForm'
import Main from "@/components/ui/layout/Main";
import AuthContainer from "@/components/ui/display/AuthContainer";

export const metadata: Metadata = { title: 'Se connecter' }

export default function LoginPage() {
    return (
    <Main>
        <AuthContainer  title={"Authentification"}>
            <LoginForm />
        </AuthContainer>
    </Main>);
}