'use client'

import { Metadata } from 'next'
import Link from "next/link";
import {useActionState} from "react";
import { loginAction, ActionState } from "../actions";
import Button from "@/components/ui/form-controls/Button";
import StateAlerts from "@/components/ui/alerts/StateAlerts";
import InputGroup from "@/components/ui/form-controls/InputGroup";
import FormLink from "@/components/ui/form-controls/FormLink";
import AuthForm from "@/components/ui/form-controls/AuthForm";
import Loader from "@/components/ui/form-controls/Loader";

export const metadata: Metadata = { title: 'Connexion' }

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState<ActionState, FormData>(loginAction, null)

    return (
        <>
            <StateAlerts state={state} />

            <AuthForm action={formAction}>
                <InputGroup label={"Email"} name={"email"} id={"email"} type={"email"} placeholder={"example@gmail.com"} />
                <InputGroup label={"Mot de passe"} name={"password"} id={"password"} type={"password"} placeholder={""} />
                <FormLink href={"/forgot-password"} text={"Mot de passe oublié ?"}/>
                <div className='flex flex-row items-center justify-between w-fit mt-4 gap-4'>
                    <Link href={"/register"} className="inline-block"><Button theme={"light"} label={"Register"} type={"button"} /></Link>
                    <Button theme={"dark"} label={"Login"} type={"submit"} />
                </div>
                {isPending && <Loader />}
            </AuthForm>
        </>

    )
}