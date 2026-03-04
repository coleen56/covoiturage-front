'use client'

import { registerAction } from "./action";
import {useActionState} from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import SuccessAlert from "@/components/ui/SuccessAlert";


export default function RegisterForm() {
    const [state, formAction] = useActionState(registerAction, null)

    return (
        <div className='flex flex-col items-center rounded-md justify-center w-fit h-fit m-auto p-8 shadow-2xl border border-gray-100'>
            <h2 className='text-3xl'>Créer un compte</h2>

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
                    <label htmlFor={'password'}>Mot de passe</label>
                    <input type={"password"} className='bg-gray-200 mt-1 rounded-md text-lg p-1' placeholder='••••••' name={'password'} id={"password"}/>
                </div>
                <div className='flex flex-col items-baseline justify-center w-fit mt-5'>
                    <label htmlFor={'password-conf'}>Confirmer le mot de passe</label>
                    <input type={"password"} className='bg-gray-200 mt-1 rounded-md text-lg p-1' placeholder='••••••' name={'password-conf'} id={"password-conf"}/>
                </div>
                <div className='flex flex-col items-center justify-center w-fit mt-5 space-x-6 space-y-2'>
                    <button type='submit' className='bg-black text-white px-4 py-1 rounded-md hover:cursor-pointer mx-0'>Créer mon compte</button>
                    <a href={"/login"} className='text-sm underline'>Déjà inscrit ? Je me connecte</a>
                </div>
            </form>
        </div>
    )
}