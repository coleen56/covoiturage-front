'use server'

import { redirect } from 'next/navigation'
import { loginUser } from '@/lib/auth'

export type ActionState = { error: string } | { success: string } | null

export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if(!email || !password) {
        return { error: "Email et mot de passe obligatoires"}
    }

    try {
        await loginUser({ email, password })
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }

    redirect('/home')
}