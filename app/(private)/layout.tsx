import React, {ReactNode} from "react";
import Navbar from "@/components/ui/Navbar";

export default function PrivateLayout({children}: Readonly<{ children: ReactNode }>) {
    return(
        <>
            <Navbar />
            {children}
        </>
    )
}