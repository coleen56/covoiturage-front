import React from "react";

interface ButtonProps {
    theme : "dark" | "light" | "danger",
    label : string,
    type : "submit" | "reset" | "button" | undefined,
    onClick?: () => void,
    children?: React.ReactNode
    disabled?: boolean
}

export default function Button( { theme, label, type, onClick, children, disabled }: Readonly<ButtonProps>) {
    const commonClasses = 'ms-0 me-0 px-4 py-1 flex flex-row items-center justify-center text-xl rounded-md hover:cursor-pointer';
    let classes;
    switch(theme) {
        case "dark": classes = `${commonClasses} bg-black text-white `;
        break;
        case "light": classes = `${commonClasses} bg-white text-black border hover:bg-neutral-700 hover:text-white border-black`;
        break;
        case "danger": classes = `${commonClasses} bg-red-800 text-white `;
    }
    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled}>{children} {label}</button>
    )
}