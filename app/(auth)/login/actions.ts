'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { loginUser } from '@/lib/auth'

export type ActionState = { error: string } | { success: string } | null

export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
        const { token } = await loginUser({ email, password })

        // cookies().set('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'lax',
        //     maxAge: 60 * 60 * 24 * 7,
        //     path: '/',
        // })
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }

    redirect('/dashboard')
}