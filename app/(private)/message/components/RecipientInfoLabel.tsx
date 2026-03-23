import React from "react";

export default function RecipientInfoLabel({children, label}: Readonly<{ children: React.ReactNode, label: string }>) {
    return (
    <h1 className={"flex flex-row items-center gap-2"}>{children}{label}</h1>
    )
}