import React from "react";

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
            <label htmlFor={props.name} className="block text-sm/6 font-medium text-black">{props.label}</label>
            <div className="">
                <div
                    className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 border">
                        <textarea id={props.id} name={props.name} placeholder={props.placeholder} value={props.value}
                                  onChange={props.onChange} rows={props.rows}
                                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-black placeholder:text-gray-500 focus:outline-none sm:text-sm/6"/>
                </div>
            </div>
        </div>
    )
}