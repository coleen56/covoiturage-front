import React from "react";
import {inputDivStyle, inputLabelStyle, inputStyle} from "@/lib/styles";

interface InputGroupProps {
    label: string;
    value?: string;
    name: string;
    id: string;
    type: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    classes?: string;
    min?: number;
    max?: number;
    step?: number;
}

export default function InputGroup(props: Readonly<InputGroupProps>) {
    const inputClasses = inputStyle
    // input grisé si disabled pour ux (email pas modifiable)
    const divClasses = `${inputDivStyle} ${props.disabled ? "bg-gray-300 text-gray-500" : "bg-gray-200 text-black"}`;
    return(
            <div className="mt-2 w-full">
                <label htmlFor={props.name} className={inputLabelStyle}>{props.label}</label>
                <div
                    className={divClasses}>
                    <input id={props.id} type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} disabled={props.disabled} min={props.min} max={props.max} step={props.step}
                           className={inputClasses}/>
                </div>
            </div>
    )
}