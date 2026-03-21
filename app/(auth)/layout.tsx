import { Metadata } from 'next'
import React from "react";

export const metadata: Metadata = {
    title: {
        template: '%s | Covoiturage',
        default: 'Covoiturage',
    },
}

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 turututu">
            {children}
        </div>
    )
}