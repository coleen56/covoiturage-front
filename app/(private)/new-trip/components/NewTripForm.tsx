'use client'

import React, {FormEvent, startTransition, useActionState, useState} from "react";
import AddressAutocompleteInput from "@/app/(private)/new-trip/components/AddressAutocompleteInput";
import InputGroup from "@/components/ui/InputGroup";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {ActionResult} from "next/dist/shared/lib/app-router-types";
import {saveNewTrip} from "@/app/(private)/new-trip/actions";
import ErrorAlert from "@/components/ui/ErrorAlert";
import SuccessAlert from "@/components/ui/SuccessAlert";

export default function NewTripForm() {
    const [state, dispatch, isPending] = useActionState<ActionResult, typeof formData>(
        async (_, data) => await saveNewTrip(data),
        null
    )

    const [formData, setFormData] = useState({
        fullStartingAddress: "",
        startingAddress: {
            number: "",
            streetname: "",
            city: {
                zipCode: "",
                name: "",
            }
        },
        fullArrivalAddress: "",
        arrivalAddress: {
            number: "",
            streetname: "",
            city: {
                zipCode: "",
                name: "",
            }
        },
        departureDatetime: "",
        length: "",
        seats: ""
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => dispatch(formData));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <>
            {'error' in (state ?? {}) && (
                <ErrorAlert message={(state as { error: string }).error} />
            )}
            {'success' in (state ?? {}) && (
                <SuccessAlert message={(state as unknown as { success: string }).success} />
            )}
        <form className={"w-100 space-y-3"} onSubmit={handleSubmit}>
            <AddressAutocompleteInput name={"startingAddress"} label={"Adresse de départ"} placeholder={"1 place Charles de Gaulle"} value={formData.fullStartingAddress}
                                      onSelect={(number: string, streetname: string, zipCode: string, cityname: string) => {
                                          setFormData(prev => ({
                                              ...prev,
                                              fullStartingAddress: `${number ?? ''} ${streetname} ${zipCode} ${cityname}`,
                                              startingAddress: {
                                                  number,
                                                  streetname,
                                                  city: {
                                                      zipCode,
                                                      name: cityname,
                                                  }
                                              }
                                          }))
                                      }}/>

            <AddressAutocompleteInput name={"arrivalAddress"} label={"Adresse d'arrivée"} placeholder={"55 rue Winston Churchill"} value={formData.fullArrivalAddress}
                                      onSelect={(number: string, streetname: string, zipCode: string, cityname: string) => {
                                          setFormData(prev => ({
                                              ...prev,
                                              fullArrivalAddress: `${number} ${streetname} ${zipCode} ${cityname}`,
                                              arrivalAddress: {
                                                  number,
                                                  streetname,
                                                  city: {
                                                      zipCode,
                                                      name: cityname,
                                                  }
                                              }
                                          }))
                                      }}/>
            <InputGroup label={"Date et heure du trajet"} value={formData.departureDatetime} name={"departureDatetime"} id={"departureDatetime"} type={"datetime-local"} placeholder={""} onChange={handleChange} />
            <InputGroup label={"Nombre de places"} value={formData.seats.toString()} name={"seats"} id={"seats"} type={"number"} placeholder={"2"} min={1} max={10} step={1} onChange={handleChange} />
            <InputGroup label={"Distance"} value={formData.length.toString()} name={"length"} id={"length"} type={"number"} placeholder={"23"} onChange={handleChange} />
            <div className={"flex flex-row justify-between w-100"}>
                <Link href={"/my-trips"}><Button theme={"light"} label={"Retour"} type={"button"} /></Link>
                <Button theme={"dark"} label={isPending ? "Enregistrement..." : "Créer le trajet"} type={"submit"} />
            </div>
        </form>
        </>
    )

}