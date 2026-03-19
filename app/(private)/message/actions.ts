'use server'

import {sendEmail} from "@/lib/carpool";

export type ActionState = { error: string } | { success: string } | null

export async function sendMessage(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const recipientId = formData.get('recipientId') as string;
    const senderId = formData.get('senderId') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    try {
        await sendEmail(recipientId, senderId, subject, message);
        return { success: "Votre message a bien été envoyé." }
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Une erreur est survenue." }
    }
}