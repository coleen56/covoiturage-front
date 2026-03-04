'use server'

import { registerUser } from '@/lib/auth'
import {RegisterResponse} from "@/types/auth";

type ActionState = { error: string } | { success: string } | null

export async function registerAction(prevState: ActionState,formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('password-conf') as string

    // verification de complétion des 3 champs obligatoires
    if(!email || !password || !confirmPassword) {
        return { error: 'Veuillez remplir tous les champs' }
    }

    // verifie que les deux champs password sont les mêmes
    if (password !== confirmPassword) {
        return { error: 'Les mots de passe ne correspondent pas' }
    }

    // verification des conditions du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(!passwordRegex.test(password)) {
        return { error: 'Le mot de passe doit contenir au moins : 8 caractères, 1 lettre minuscule, 1 lettre majuscule, 1 chiffre.' }
    }
    
    try {
        const result: RegisterResponse = await registerUser({ email, password })
        return { success: result.message }
    } catch (error) {
        console.log('Erreur :', error)
        return { error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
}