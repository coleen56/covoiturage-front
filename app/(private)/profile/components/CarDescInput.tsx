import React from "react";
import {inputDivStyle, inputLabelStyle, inputNoHeightStyle} from "@/lib/styles";

interface CarDescInputProps {
    label: string;
    value: string;
    name: string;
    id: string;
    placeholder: string;
    rows: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function CarDescInput(props: Readonly<CarDescInputProps>) {
    return (
        <>
            <label htmlFor={props.name} className={inputLabelStyle}>{props.label}</label>
            <div className="mt-2">
                <div
                    className={`${inputDivStyle} bg-gray-200 text-black`}>
                    <textarea id={props.id} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} rows={props.rows}
                           className={inputNoHeightStyle}/>
                </div>
            </div>
        </>
    )
}