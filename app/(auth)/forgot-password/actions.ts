'use server'

import {resetPassword} from "@/lib/auth";
import {isRedirectError} from "next/dist/client/components/redirect-error";

export type ActionState = { error: string } | { success: string } | null

export async function forgottenPasswordAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    if(!email) {
        return {error: 'Vous devez saisir une adresse email.'};
    }
    try {
        await resetPassword(email);
        return { success: "Vérifiez votre boîte mail !" }
    } catch (error) {
        if (isRedirectError(error)) throw error
        return { error: `Une erreur est survenue : ${error}` }
    }
}