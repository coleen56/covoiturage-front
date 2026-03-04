'use client'

import { Metadata } from 'next'
import Link from "next/link";
import {useActionState} from "react";
import { loginAction, ActionState } from "./actions";
import ErrorAlert from "@/components/ui/ErrorAlert";
import SuccessAlert from "@/components/ui/SuccessAlert";

export const metadata: Metadata = { title: 'Connexion' }

export default function LoginForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(loginAction, null)

    return (
        <div className='flex flex-col items-center rounded-md justify-center w-fit h-fit m-auto p-8 shadow-2xl border border-gray-100'>
            <h2 className='text-3xl'>Authentification</h2>

            {'error' in (state ?? {}) && (
                <ErrorAlert message={(state as { error: string }).error} />
            )}
            {'success' in (state ?? {}) && (
                <SuccessAlert message={(state as unknown as { success: string }).success} />
            )}

            <form className='flex flex-col items-center justify-center min-w-fit' action={formAction}>
                <div className='flex flex-col items-baseline justify-center w-fit mt-5'>
                    <label htmlFor={'email'}>Email</label>
                    <input type={"text"} placeholder='example@gmail.com' name={'email'} id={"email"} className='bg-gray-200 mt-1 rounded-md text-lg p-1'/>
                </div>
                <div className='flex flex-col items-baseline justify-center w-fit mt-5'>
                    <label htmlFor={'password'}>Password</label>
                    <input type={"password"} className='bg-gray-200 mt-1 rounded-md text-lg p-1' placeholder='•••••••••' name={'password'} id={"password"}/>
                    <a className='mt-2 text-sm underline' href={"#"}>Mot de passe oublié ?</a>
                </div>
                <div className='flex flex-row items-center justify-between w-fit mt-4 space-x-6'>
                    <button type='submit' className='mt-5 bg-black text-white px-4 py-1 rounded-md hover:cursor-pointer'>Login</button>
                    <Link type='button'
                          className='mt-5 bg-white text-black border hover:bg-neutral-700 hover:text-white hover:cursor-pointer border-black px-4 py-1 rounded-md'
                          href={"/register"}>Register</Link>
                </div>
            </form>
        </div>
    )
}