import {ReactNode} from "react";

export default function AuthForm({children, action} : Readonly<{
    children: ReactNode,
    action: (payload: FormData) => void
}>) {
    return (
        <form className='flex flex-col items-center justify-center w-full gap-4' action={action}>
            {children}
        </form>
    )
}