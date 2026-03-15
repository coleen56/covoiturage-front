'use client'

import InputGroup from "@/components/ui/InputGroup";
import React, {startTransition, useState} from "react";
import CityAutocompleteInput from "@/components/ui/CityAutocompleteInput";
import {TripFormData} from "@/app/(private)/search/actions";
import Button from "@/components/ui/Button";

interface SearchTripFormProps {
    dispatch: (data: TripFormData) => void
    isPending: boolean
}

export default function SearchTripForm({dispatch, isPending}: Readonly<SearchTripFormProps>) {
    const [formData, setFormData] = useState({
        startingCity: "",
        arrivalCity: "",
        tripDate: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        startTransition(() => {
            dispatch(formData)
        })
    }

    return (
        <form className="w-100" onSubmit={handleSubmit}>
            <CityAutocompleteInput name={"startingCity"} label={"Ville de départ"} placeholder={"Ville de départ"} value={formData.startingCity}
                                   onSelect={(name) => setFormData(prev => ({
                           ...prev,
                           startingCity: name,
                       }))}/>

            <CityAutocompleteInput name={"arrivalCity"} label={"Ville d'arrivée"} placeholder={"Ville d'arrivée"} value={formData.arrivalCity}
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