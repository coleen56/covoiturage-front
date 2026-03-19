'use client'

import {useActionState} from "react";
import {ActionState, resetPasswordAction} from "@/app/(auth)/reset-password/actions";
import AuthContainer from "@/components/ui/AuthContainer";
import ErrorAlert from "@/components/ui/ErrorAlert";
import SuccessAlert from "@/components/ui/SuccessAlert";
import Button from "@/components/ui/Button";

export default function ResetPasswordForm({token}: Readonly<{ token: string }>) {
    const [state, formAction] = useActionState<ActionState, FormData>(resetPasswordAction, null)

    return (
        <AuthContainer>

            {'error' in (state ?? {}) && (
                <ErrorAlert message={(state as { error: string }).error} />
            )}
            {'success' in (state ?? {}) && (
                <SuccessAlert message={(state as unknown as { success: string }).success} />
            )}

            <form className='flex flex-col items-center justify-center min-w-fit' action={formAction}>
                <input type={"hidden"} value={token} name={"token"}/>
                <div className='flex flex-col items-baseline justify-center w-fit mt-5'>
                    <label htmlFor={'password'}>Nouveau de passe</label>
                    <input type={"password"} name={'password'} id={"password"} className='bg-gray-200 mt-1 rounded-md text-lg p-1'/>
                </div>
                <div className='flex flex-col items-baseline justify-center w-fit mt-5'>
                    <label htmlFor={'password-confirm'}>Nouveau de passe</label>
                    <input type={"password"} name={'password-confirm'} id={"password-confirm"} className='bg-gray-200 mt-1 rounded-md text-lg p-1'/>
                </div>
                <div className='flex flex-row items-center justify-between w-fit mt-4 space-x-6'>
                    <Button theme={"dark"} label={"Réinitialiser le mot de passe"} type={"submit"}/>
                </div>
            </form>
        </AuthContainer>
    )
}