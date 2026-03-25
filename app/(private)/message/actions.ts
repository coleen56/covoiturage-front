'use server'

import {findUserProfileById, sendEmail} from "@/lib/carpool";
import {Profile} from "@/types/carpool";

export type ActionState = { error: string } | { success: string } | null

type ProfileResult = | { success: true; data: Profile }
    | { success: false; error: string }

export async function sendMessage(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const recipientId = formData.get('recipientId') as string;
    const senderId = formData.get('senderId') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    if(!message || !subject) {
        return { error : "Veuillez remplir tous les champs."}
    }
    try {
        await sendEmail(recipientId, senderId, subject, message);
        return { success: "Votre message a bien été envoyé." }
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue." }
    }
}

export async function getUserProfileById(id: string): Promise<ProfileResult> {
    try {
        const profile = await findUserProfileById(id);
        return {success: true, data: profile};
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Profil du destinataire introuvable." };
    }
}