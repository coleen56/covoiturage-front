import React from "react";
import {inputDivStyle, inputLabelStyle, inputNoHeightStyle} from "@/lib/styles";

interface MessageBodyInputProps {
    label: string;
    value?: string;
    name: string;
    id: string;
    placeholder: string;
    rows: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function MessageBodyInput(props: Readonly<MessageBodyInputProps>) {
    return (
        <div className={"mt-3"}>
            <label htmlFor={props.name} className={inputLabelStyle}>{props.label}</label>
            <div className="">
                <div
                    className={`${inputDivStyle} bg-gray-200 text-black`}>
                        <textarea id={props.id} name={props.name} placeholder={props.placeholder} value={props.value}
                                  onChange={props.onChange} rows={props.rows}
                                  className={inputNoHeightStyle}/>
                </div>
            </div>
        </div>
    )
}