'use client'

import {User} from "@/types/carpool";
import InputGroup from "@/components/ui/form-controls/InputGroup";
import React, {startTransition, useActionState, useEffect, useState} from "react";
import ManufacturerInput from "@/app/(private)/profile/components/ManufacturerInput";
import CarDescInput from "@/app/(private)/profile/components/CarDescInput";
import Button from "@/components/ui/form-controls/Button";
import {ActionResult} from "next/dist/shared/lib/app-router-types";
import {UserFormData, saveNewProfile, saveNewCar, CarFormData, deleteUser} from "@/app/(private)/profile/actions";
import StateAlerts from "@/components/ui/alerts/StateAlerts";
import Loader from "@/components/ui/form-controls/Loader";
import {LogOut} from "lucide-react";
import logoutAction from "@/app/(auth)/(logout)/actions";
import {useRouter} from "next/navigation";
import ConfirmationModal from "@/app/(private)/profile/components/ConfirmationModal";

export default function ProfileForm({user} : Readonly<{ user: User }>) {
    const router = useRouter()
    // affichage de la modale de confirmation
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [userState, dispatchUser, isPendingUser] = useActionState<ActionResult, UserFormData>(
        async (_, data) => await saveNewProfile(data),
        null
    )

    const [carState, dispatchCar, isPendingCar] = useActionState<ActionResult, CarFormData>(
        async (_, data) => await saveNewCar(data),
        null
    )

    // refresh la page si le submit de l'un des formulaire réussit
    useEffect(() => {
        if (carState?.success || userState?.success) {
            router.refresh()
        }
    }, [carState, userState, router])


    function handleUserSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        startTransition(() => {
            dispatchUser(userFormData)
        })
    }

    function handleCarSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        startTransition(() => {
            dispatchCar(carFormData)
        })
    }

    const [userFormData, setUserFormData] = useState({
        email: user.email ?? '',
        firstname: user.firstname ?? '',
        lastname: user.lastname ?? '',
        phone: user.phone ?? '',
    })

    const [carFormData, setCarFormData] = useState<
        {
            car_id: number | null,
            car_manufacturer_id: number | null,
            car_model: string,
            car_seats: number,
            car_licence_plate: string,
            car_manufacturer_name: string,
            car_description: string,
        }
        >({
        car_id: user.car?.id ?? null,
        car_model: user.car?.model ?? '',
        car_seats: user.car?.seats ?? 0,
        car_licence_plate: user.car?.licencePlate ?? '',
        car_manufacturer_id: user.car?.manufacturer?.id ?? '',
        car_manufacturer_name: user.car?.manufacturer?.name ?? '',
        car_description: user.car?.description ?? '',
    })

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCarChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCarFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const date = new Date(user.registrationDatetime!)

    const formattedDate = date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        dateStyle: 'long',
        timeStyle: 'short',
    })
    
    return (
        <>
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={async () => {
                    const res = await deleteUser()
                    if(res.success) {
                        await logoutAction()
                    }
                    setIsModalOpen(false)
                }}
                onCancel={() => setIsModalOpen(false)}
            />
            <form action={logoutAction}>
                <button type={"submit"} className="fixed top-4 right-4 z-40 bg-red-800 text-white rounded-full p-4 shadow-lg hover:cursor-pointer">
                    <LogOut size={24} />
                </button>
            </form>
            <StateAlerts state={userState} />
            <div className="mb-3"></div>
            <p>Date d&#39;inscription : {formattedDate}</p>
            <p>Statut du profil : {user.accountStatus}</p>
            <form className="w-100 space-y-3 mb-5" onSubmit={handleUserSubmit}>
                <InputGroup label={"Email"} value={userFormData.email} name={"email"} id={"email"} type={"email"} placeholder={"Entrez votre email"} onChange={handleUserChange} disabled={true} classes={"bg-gray-900"}/>
                <InputGroup label={"Prénom"} value={userFormData.firstname} name={"firstname"} id={"firstname"} type={"text"} placeholder={"Entrez votre prénom"} onChange={handleUserChange} />
                <InputGroup label={"Nom"} value={userFormData.lastname} name={"lastname"} id={"lastname"} type={"text"} placeholder={"Entrez votre nom"} onChange={handleUserChange} />
                <InputGroup label={"Téléphone"} value={userFormData.phone} name={"phone"} id={"phone"} type={"phone"} placeholder={"Entrez votre téléphone"} onChange={handleUserChange} />
                <div className="flex flex-row gap-2">
                    <Button theme={"danger"} label={"Supprimer"} type={"button"} onClick={() => setIsModalOpen(true)}/>
                    <Button theme={"dark"} label={"Enregistrer"} type={"submit"} />
                    {isPendingUser && (
                        <Loader />
                    )}
                </div>
                <hr/>
            </form>
            <form className="w-100 space-y-3 mb-5" onSubmit={handleCarSubmit}>
                <StateAlerts state={carState} />
                <InputGroup label={"Modèle de voiture*"} value={carFormData.car_model} name={"car_model"} id={"car_model"} type={"text"} placeholder={"Modèle de votre voiture"} onChange={handleCarChange} />
                <InputGroup label={"Nombre de sièges*"} value={carFormData.car_seats.toString()} name={"car_seats"} id={"car_seats"} type={"number"} placeholder={"Nombre de sièges"} min={0} max={12} step={1} onChange={handleCarChange} />
                <InputGroup label={"Immatriculation*"} value={carFormData.car_licence_plate} name={"car_licence_plate"} id={"car_licence_plate"} type={"text"} placeholder={"Immatriculation de votre voiture"} onChange={handleCarChange} />
                <ManufacturerInput value={carFormData.car_manufacturer_name}
                       onSelect={(id, name) => setCarFormData(prev => ({
                        ...prev,
                        car_manufacturer_id: id,
                        car_manufacturer_name: name,
                    }))}
                />
                <CarDescInput label={"Description de la voiture"} value={carFormData.car_description} name={"car_description"} id={"car_description"} placeholder={"Décrivez votre voiture..."} rows={5} onChange={handleCarChange}/>
                <div className="flex flex-row">
                    <Button theme={"dark"} label={"Enregistrer"} type={"submit"} />
                    {isPendingCar && (
                        <Loader />
                    )}
                </div>
            </form>
        </>
    )
}