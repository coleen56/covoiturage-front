import React from "react";

interface InputGroupProps {
    label: string;
    value: string;
    name: string;
    id: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    classes?: string;
    min?: number;
    max?: number;
    step?: number;
}

export default function InputGroup(props: Readonly<InputGroupProps>) {
    const inputClasses = `block min-w-0 grow py-1.5 pr-3 pl-1 text-base  placeholder:text-gray-500 focus:outline-none sm:text-sm/6 bg-transparent`
    // input grisé si disabled pour ux (email pas modifiable)
    const divClasses = `flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 
    focus-within:outline-indigo-500 border ${props.disabled ? "bg-gray-300 text-gray-500" : "bg-white/5 text-black"}`;
    return(
        <>
            <label htmlFor={props.name} className="block text-sm/6 font-medium text-black">{props.label}</label>
            <div className="mt-2">
                <div
                    className={divClasses}>
                    <input id={props.id} type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} disabled={props.disabled} min={props.min} max={props.max} step={props.step}
                           className={inputClasses}/>
                </div>
            </div>
        </>
    )
}