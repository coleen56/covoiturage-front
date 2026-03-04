import { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = { title: 'Créer un compte' }

export default function RegisterPage() {
    return <RegisterForm />
}