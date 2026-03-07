'use client'

import {User} from "@/types/carpool";
import InputGroup from "@/app/profile/input-group";
import {useState} from "react";

export default function ProfileForm({user} : Readonly<{ user: User }>) {
    const [formData, setFormData] = useState({
        email: user.email ?? '',
        firstname: user.firstname ?? '',
        lastname: user.lastname ?? '',
        phone: user.phone ?? '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const date = new Date(user.registrationDatetime!)

    const formattedDate = date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })
    
    return (
        <>
            <p>Date d&#39;inscription : {formattedDate}</p>
            <p>Statut du profil : {user.accountStatus}</p>
            <form className="w-100 space-y-3">
                <InputGroup label={"Email"} value={formData.email} name={"email"} id={"email"} type={"email"} placeholder={"Entrez votre email"} onChange={handleChange}/>
                <InputGroup label={"Prénom"} value={formData.firstname} name={"firstname"} id={"firstname"} type={"text"} placeholder={"Entrez votre prénom"} onChange={handleChange} />
                <InputGroup label={"Nom"} value={formData.lastname} name={"lastname"} id={"lastname"} type={"text"} placeholder={"Entrez votre nom"} onChange={handleChange} />
                <InputGroup label={"Téléphone"} value={formData.phone} name={"phone"} id={"phone"} type={"phone"} placeholder={"Entrez votre téléphone"} onChange={handleChange} />
            </form>
        </>
    )
}