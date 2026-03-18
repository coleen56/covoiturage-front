import { Metadata } from 'next'
import LoginForm from './components/LoginForm'
import Main from "@/components/ui/Main";

export const metadata: Metadata = { title: 'Se connecter' }

export default function LoginPage() {
    return (
    <Main>
        <LoginForm />
    </Main>);
}