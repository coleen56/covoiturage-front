'use client'

import {useActionState} from "react";
import Button from "@/components/ui/form-controls/Button";
import {forgottenPasswordAction, ActionState} from "@/app/(auth)/forgot-password/actions";
import AuthContainer from "@/components/ui/display/AuthContainer";
import StateAlerts from "@/components/ui/alerts/StateAlerts";
import InputGroup from "@/components/ui/form-controls/InputGroup";


export default function ForgotPasswordForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(forgottenPasswordAction, null)

    return (
        <AuthContainer>

            <StateAlerts state={state} />

            <form className='flex flex-col items-center justify-center min-w-fit max-w-100' action={formAction}>
                <InputGroup label={"Email"} name={"email"} id={"email"} type={"email"} placeholder={"example@gmail.com"} />
                <div className='flex flex-row items-center justify-between w-fit mt-4 space-x-6'>
                    <Button theme={"dark"} label={"Réinitialiser le mot de passe"} type={"submit"}/>
                </div>
            </form>
        </AuthContainer>
    )
}