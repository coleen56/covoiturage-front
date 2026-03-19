import React from "react";

export default function AuthContainer( {children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='flex flex-col items-center rounded-md justify-center w-fit h-fit m-auto p-8 shadow-2xl border border-gray-100'>
            <h2 className='text-3xl'>Mot de passe oublié</h2>
            {children}
        </div>
    )
}