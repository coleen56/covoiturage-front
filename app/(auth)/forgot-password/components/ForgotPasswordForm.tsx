'use client'

import {useActionState} from "react";
import Button from "@/components/ui/form-controls/Button";
import {forgottenPasswordAction, ActionState} from "@/app/(auth)/forgot-password/actions";
import StateAlerts from "@/components/ui/alerts/StateAlerts";
import InputGroup from "@/components/ui/form-controls/InputGroup";
import FormLink from "@/components/ui/form-controls/FormLink";
import AuthForm from "@/components/ui/form-controls/AuthForm";


export default function ForgotPasswordForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(forgottenPasswordAction, null)

    return (
        <>
            <StateAlerts state={state} />

            <AuthForm action={formAction} >
                <InputGroup label={"Email"} name={"email"} id={"email"} type={"email"} placeholder={"example@gmail.com"} />
                <div className='flex flex-row items-center justify-between w-fit mt-5 space-x-6'>
                    <Button theme={"dark"} label={"Réinitialiser"} type={"submit"}/>
                </div>
                <FormLink href={"/login"} text={"← Retour à la page de connexion"} />
            </AuthForm>
        </>
    )
}