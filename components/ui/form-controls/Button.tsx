interface ButtonProps {
    theme : "dark" | "light" | "danger",
    label : string,
    type : "submit" | "reset" | "button" | undefined,
    onClick?: () => void,
    children?: React.ReactNode
}

export default function Button( { theme, label, type, onClick, children }: Readonly<ButtonProps>) {
    let classes;
    switch(theme) {
        case "dark": classes = 'mt-5 bg-black text-white px-4 py-1 rounded-md hover:cursor-pointer flex flex-row items-center justify-center';
        break;
        case "light": classes = 'mt-5 bg-white text-black border hover:bg-neutral-700 hover:text-white hover:cursor-pointer border-black px-4 py-1 rounded-md flex flex-row items-center justify-center';
        break;
        case "danger": classes = 'mt-5 bg-red-800 text-white px-4 py-1 rounded-md flex flex-row items-center justify-center';
    }
    return (
        <button type={type} className={classes} onClick={onClick} >{children} {label}</button>
    )
}