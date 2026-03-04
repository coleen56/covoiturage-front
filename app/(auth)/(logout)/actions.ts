'use server'

import {auth} from '@/lib/auth';
import {redirect} from "next/navigation";

export default async function logoutAction() {
    console.log("Logged out");
    await auth.logout()
    redirect('/login')
}