'use client'

import InputGroup from "@/components/ui/InputGroup";
import {ChangeEvent, useState} from "react";
import MessageBodyInput from "@/app/(private)/message/components/MessageBodyInput";
import Button from "@/components/ui/Button";

export default function MessageForm() {
    const [formData, setFormData] = useState({
        subject: "",
        body: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    return (
        <form className={"w-100"}>
            <InputGroup label={"Sujet du message"} value={formData.subject} name={"subject"} id={"subject"} type={"text"} placeholder={""} onChange={handleChange} />
            <MessageBodyInput label={"Message"} value={formData.body} name={"body"} id={"body"} placeholder={""} rows={8} onChange={handleChange}/>
            <Button theme={"dark"} label={"Envoyer"} type={"submit"} />
        </form>
    )
}