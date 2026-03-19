'use client'

import {useActionState} from "react";
import ErrorAlert from "@/components/ui/alerts/ErrorAlert";
import SuccessAlert from "@/components/ui/alerts/SuccessAlert";
import Button from "@/components/ui/form-controls/Button";
import {forgottenPasswordAction, ActionState} from "@/app/(auth)/forgot-password/actions";
import AuthContainer from "@/components/ui/display/AuthContainer";


export default function ForgotPasswordForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(forgottenPasswordAction, null)

    return (
        <AuthContainer>

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
                <div className='flex flex-row items-center justify-between w-fit mt-4 space-x-6'>
                    <Button theme={"dark"} label={"Réinitialiser le mot de passe"} type={"submit"}/>
                </div>
            </form>
        </AuthContainer>
    )
}