interface ButtonProps {
    theme : "dark" | "light",
    label : string,
    type : "submit" | "reset" | "button" | undefined,
}

export default function Button( { theme, label, type }: Readonly<ButtonProps>) {
    const classes = theme == 'dark' ? 'mt-5 bg-black text-white px-4 py-1 rounded-md hover:cursor-pointer' :
        'mt-5 bg-white text-black border hover:bg-neutral-700 hover:text-white hover:cursor-pointer border-black px-4 py-1 rounded-md';
    return (
        <button type={type} className={classes}>{label}</button>
    )
}