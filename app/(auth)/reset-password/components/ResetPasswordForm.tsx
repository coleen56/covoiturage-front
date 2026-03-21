'use client'

import {useActionState} from "react";
import {ActionState, resetPasswordAction} from "@/app/(auth)/reset-password/actions";
import Button from "@/components/ui/form-controls/Button";
import Link from "next/link";
import StateAlerts from "@/components/ui/alerts/StateAlerts";
import InputGroup from "@/components/ui/form-controls/InputGroup";
import AuthForm from "@/components/ui/form-controls/AuthForm";

export default function ResetPasswordForm({token}: Readonly<{ token: string }>) {
    const [state, formAction] = useActionState<ActionState, FormData>(resetPasswordAction, null)

    return (
        <>
            <StateAlerts state={state} />

            <AuthForm action={formAction} >
                <input type={"hidden"} value={token} name={"token"}/>
                <InputGroup label={"Nouveau mot de passe"} name={"password"} id={"password"} type={"password"} placeholder={""}/>
                <InputGroup label={"Confirmation"} name={"password-confirm"} id={"password-confirm"} type={"password"} placeholder={""}/>
                <div className='flex flex-row items-center justify-between w-fit mt-5 space-x-6'>
                    <Button theme={"dark"} label={"Réinitialiser le mot de passe"} type={"submit"}/>
                </div>
                <div className={"mt-3"}>
                    <Link href={"/login"}><Button theme={"light"} label={"Connexion"} type={"button"} /></Link>
                </div>
            </AuthForm>
        </>
    )
}