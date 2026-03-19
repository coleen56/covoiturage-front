'use server'
import {sendNewPassword} from "@/lib/auth";

export type ActionState = { error: string } | { success: string } | null

export async function resetPasswordAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const newPassword = formData.get("password") as string;
    const newPasswordConfirm = formData.get("password-confirm") as string;
    const token = formData.get("token") as string;
    if(!newPassword || !newPasswordConfirm) {
        return { error: "Veuillez remplir tous les champs"};
    }
    if(newPassword != newPasswordConfirm) {
        return { error: "Les mots de passe ne correspondent pas" };
    }
    // verification des conditions du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(!passwordRegex.test(newPassword)) {
        return { error: 'Le mot de passe doit contenir au moins : 8 caractères, 1 lettre minuscule, 1 lettre majuscule, 1 chiffre.' }
    }
    try {
        await sendNewPassword(newPassword, token);
        return { success: "Votre mot de passe a été réinitialisé avec succès !" }
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
}