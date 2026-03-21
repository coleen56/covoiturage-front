import React from "react";

export default function AuthContainer( {children, title}: Readonly<{ children: React.ReactNode, title: string }>) {
    return (
        <div className='flex flex-col items-center rounded-md justify-center h-fit m-auto p-8 shadow-2xl border border-gray-100 w-full'>
            <h2 className='text-4xl text-center'>{title}</h2>
            {children}
        </div>
    )
}