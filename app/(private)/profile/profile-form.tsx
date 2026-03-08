'use client'

import {User} from "@/types/carpool";
import InputGroup from "@/app/(private)/profile/input-group";
import React, {startTransition, useActionState, useState} from "react";
import ManufacturerInput from "@/app/(private)/profile/manufacturer-input";
import CarDescInput from "@/app/(private)/profile/car-desc-input";
import Button from "@/components/ui/Button";
import {ActionResult} from "next/dist/shared/lib/app-router-types";
import {ProfileFormData, saveNewProfile} from "@/app/(private)/profile/actions";
import ErrorAlert from "@/components/ui/ErrorAlert";
import SuccessAlert from "@/components/ui/SuccessAlert";

export default function ProfileForm({user} : Readonly<{ user: User }>) {
    const [state, dispatch, isPending] = useActionState<ActionResult, ProfileFormData>(
        async (_, data) => await saveNewProfile(data),
        null
    )

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        startTransition(() => {
            dispatch(formData)
        })
    }

    const [formData, setFormData] = useState({
        email: user.email ?? '',
        firstname: user.firstname ?? '',
        lastname: user.lastname ?? '',
        phone: user.phone ?? '',
        car_id: user.car?.id ?? null,
        car_model: user.car?.model ?? '',
        car_seats: user.car?.seats ?? 0,
        car_licence_plate: user.car?.licencePlate ?? '',
        car_manufacturer_id: user.car?.manufacturer?.id ?? '',
        car_manufacturer_name: user.car?.manufacturer?.name ?? '',
        car_description: user.car?.description ?? '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            {'error' in (state ?? {}) && (
                <ErrorAlert message={(state as { error: string }).error} />
            )}
            {'success' in (state ?? {}) && (
                <SuccessAlert message={(state as unknown as { success: string }).success} />
            )}
            <div className="mb-3"></div>
            <p>Date d&#39;inscription : {formattedDate}</p>
            <p>Statut du profil : {user.accountStatus}</p>
            <form className="w-100 space-y-3 mb-5" onSubmit={handleSubmit}>
                <InputGroup label={"Email"} value={formData.email} name={"email"} id={"email"} type={"email"} placeholder={"Entrez votre email"} onChange={handleChange} disabled={true} classes={"bg-gray-900"}/>
                <InputGroup label={"Prénom"} value={formData.firstname} name={"firstname"} id={"firstname"} type={"text"} placeholder={"Entrez votre prénom"} onChange={handleChange} />
                <InputGroup label={"Nom"} value={formData.lastname} name={"lastname"} id={"lastname"} type={"text"} placeholder={"Entrez votre nom"} onChange={handleChange} />
                <InputGroup label={"Téléphone"} value={formData.phone} name={"phone"} id={"phone"} type={"phone"} placeholder={"Entrez votre téléphone"} onChange={handleChange} />
                <hr/>
                <InputGroup label={"Modèle de voiture"} value={formData.car_model} name={"car_model"} id={"car_model"} type={"text"} placeholder={"Modèle de votre voiture"} onChange={handleChange} />
                <InputGroup label={"Nombre de sièges"} value={formData.car_seats.toString()} name={"car_seats"} id={"car_seats"} type={"number"} placeholder={"Nombre de sièges"} min={0} max={12} step={1} onChange={handleChange} />
                <InputGroup label={"Immatriculation"} value={formData.car_licence_plate} name={"car_licence_plate"} id={"car_licence_plate"} type={"text"} placeholder={"Immatriculation de votre voiture"} onChange={handleChange} />
                <ManufacturerInput value={formData.car_manufacturer_name}
                       onSelect={(id, name) => setFormData(prev => ({
                        ...prev,
                        car_manufacturer_id: id,
                        car_manufacturer_name: name,
                    }))}
                />
                <CarDescInput label={"Description de la voiture"} value={formData.car_description} name={"car_description"} id={"car_description"} placeholder={"Décrivez votre voiture..."} rows={5} onChange={handleChange}/>
                <div className="flex flex-row justify-between">
                    <Button theme={"danger"} label={"Supprimer mes données"} type={"button"} />
                    <Button theme={"dark"} label={isPending ? "Enregistrement..." : "Enregistrer"} type={"submit"} />
                </div>
            </form>
        </>
    )
}