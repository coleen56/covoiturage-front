'use client'

import InputGroup from "@/components/ui/form-controls/InputGroup";
import React, {startTransition, useState} from "react";
import CityAutocompleteInput from "@/app/(private)/search/components/CityAutocompleteInput";
import {TripFormData} from "@/app/(private)/search/actions";
import Button from "@/components/ui/form-controls/Button";
import Loader from "@/components/ui/form-controls/Loader";

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
                       }))} onChange={(value) => setFormData(prev => ({ ...prev, startingCity: value }))}/>

            <CityAutocompleteInput name={"arrivalCity"} label={"Ville d'arrivée"} placeholder={"Ville d'arrivée"} value={formData.arrivalCity}
                                   onSelect={(name) => setFormData(prev => ({
                           ...prev,
                           arrivalCity: name,
                       }))} onChange={(value) => setFormData(prev => ({ ...prev, arrivalCity: value }))}/>
            <InputGroup label={"Date du trajet"} value={formData.tripDate} name={"tripDate"} id={"tripDate"} type={"date"} placeholder={"Date du trajet"} onChange={handleChange}/>
            <div className={"mt-4 mx-auto flex flex-row items-start align-middle"}>
                <Button theme={"dark"} label={"Rechercher"} type={"submit"} />

            {isPending && (
                <Loader />
            )}
            </div>
        </form>
    )
}