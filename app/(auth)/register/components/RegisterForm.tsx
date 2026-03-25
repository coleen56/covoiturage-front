'use client'

import { registerAction } from "../actions";
import {useActionState} from "react";
import StateAlerts from "@/components/ui/alerts/StateAlerts";
import AuthContainer from "@/components/ui/display/AuthContainer";
import InputGroup from "@/components/ui/form-controls/InputGroup";
import Button from "@/components/ui/form-controls/Button";
import FormLink from "@/components/ui/form-controls/FormLink";
import AuthForm from "@/components/ui/form-controls/AuthForm";
import Loader from "@/components/ui/form-controls/Loader";


export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerAction, null)

    return (
        <AuthContainer title={"Créer un compte"}>
            <StateAlerts state={state} />

            <AuthForm action={formAction} >
                <InputGroup label={"Email"} name={"email"} id={"email"} type={"email"} placeholder={"example@gmail.com"} />
                <InputGroup label={"Mot de passe"} name={"password"} id={"password"} type={"password"} placeholder={""} />
                <InputGroup label={"Confirmation du mot de passe"} name={"password-conf"} id={"password-conf"} type={"password"} placeholder={""}/>
                <div className='flex flex-col items-center justify-center w-fit mt-5 space-x-6 space-y-2'>
                    <Button theme={"dark"} label={"Créer mon compte"} type={"submit"} />
                    <FormLink href={"/login"} text={"Déjà inscrit ? Connexion"} />
                </div>
                {isPending && <Loader />}
            </AuthForm>
        </AuthContainer>
    )
}