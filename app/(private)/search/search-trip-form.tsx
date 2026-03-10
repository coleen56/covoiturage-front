'use client'

import InputGroup from "@/components/ui/input-group";
import React, {startTransition, useActionState, useState} from "react";
import CityInput from "@/app/(private)/search/city-input";
import {ActionResult} from "next/dist/shared/lib/app-router-types";
import {getTripsFromFormData, TripFormData} from "@/app/(private)/search/actions";
import Button from "@/components/ui/Button";

export default function SearchTripForm() {
    const [formData, setFormData] = useState({
        startingCity: "",
        arrivalCity: "",
        tripDate: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const [state, dispatch, isPending] = useActionState<ActionResult, TripFormData>(
        async (_, data) => await getTripsFromFormData(data),
        null
    )

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        startTransition(() => {
            dispatch(formData)
        })
    }

    return (
        <form className="w-100" onSubmit={handleSubmit}>
            <CityInput name={"startingCity"} label={"Ville de départ"} placeholder={"Ville de départ"} value={formData.startingCity}
                       onSelect={(name) => setFormData(prev => ({
                           ...prev,
                           startingCity: name,
                       }))}/>

            <CityInput name={"arrivalCity"} label={"Ville d'arrivée"} placeholder={"Ville d'arrivée"} value={formData.arrivalCity}
                       onSelect={(name) => setFormData(prev => ({
                           ...prev,
                           arrivalCity: name,
                       }))}/>
            <InputGroup label={"Date du trajet"} value={formData.tripDate} name={"tripDate"} id={"tripDate"} type={"date"} placeholder={"Date du trajet"} onChange={handleChange}/>
            <Button theme={"dark"} label={"Rechercher"} type={"submit"} />
            <p hidden={!isPending}>Recherche en cours...</p>
        </form>
    )
}