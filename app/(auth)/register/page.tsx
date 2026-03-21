import { Metadata } from 'next'
import RegisterForm from './components/RegisterForm'
import Main from "@/components/ui/layout/Main";

export const metadata: Metadata = { title: 'Créer un compte' }

export default function RegisterPage() {
    return (
        <Main>
            <RegisterForm />
        </Main>
    )
}