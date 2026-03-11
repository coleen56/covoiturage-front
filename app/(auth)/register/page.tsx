import { Metadata } from 'next'
import RegisterForm from './components/RegisterForm'

export const metadata: Metadata = { title: 'Créer un compte' }

export default function RegisterPage() {
    return <RegisterForm />
}