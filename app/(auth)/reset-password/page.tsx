import Main from "@/components/ui/layout/Main";
import ResetPasswordForm from "@/app/(auth)/reset-password/components/ResetPasswordForm";

export default async function ResetPasswordPage({searchParams}: Readonly<{ searchParams: { token?: string } }>) {
    const {token} = await searchParams;
    return(
        <Main>
            {token && (
                <ResetPasswordForm token={token}/>
            )}
        </Main>
    )
}