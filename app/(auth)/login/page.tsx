import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'Se connecter' }

export default function LoginPage() {
    return <LoginForm />
}