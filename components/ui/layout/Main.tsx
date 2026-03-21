import {ReactNode} from "react";

export default function Main({children}: Readonly<{ children: ReactNode }>) {
    return (
        <main className='flex flex-col items-center justify-center w-[90%] m-auto my-10 pb-16'>
            {children}
        </main>
    )
}