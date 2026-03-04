'use server'

import { registerUser } from '@/lib/auth'
import {RegisterResponse} from "@/types/auth";

type ActionState = { error: string } | { success: string } | null

export async function registerAction(prevState: ActionState,formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('password-conf') as string

    if(!email || !password) {
        return { error: 'Veuillez remplir tous les champs' }
    }

    if (password !== confirmPassword) {
        return { error: 'Les mots de passe ne correspondent pas' }
    }

    // action.ts
    try {
        const result: RegisterResponse = await registerUser({ email, password })
        return { success: result.message }
    } catch (error) {
        console.log('Erreur :', error)
        return { error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
}