import {ReactNode} from "react";

export default function Main({children}: Readonly<{ children: ReactNode }>) {
    return (
        <main className='flex flex-col items-center justify-center'>
            {children}
        </main>
    )
}