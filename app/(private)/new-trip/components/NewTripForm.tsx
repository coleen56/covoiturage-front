'use client'

import React, {startTransition, useActionState, useEffect, useState} from "react";
import AddressAutocompleteInput from "@/app/(private)/new-trip/components/AddressAutocompleteInput";
import InputGroup from "@/components/ui/form-controls/InputGroup";
import Link from "next/link";
import Button from "@/components/ui/form-controls/Button";
import {ActionResult} from "next/dist/shared/lib/app-router-types";
import {calculateTripLength, saveNewTrip} from "@/app/(private)/new-trip/actions";
import StateAlerts from "@/components/ui/alerts/StateAlerts";
import Loader from "@/components/ui/form-controls/Loader";
import {useRouter} from "next/navigation";

export default function NewTripForm() {
    const [state, dispatch, isPending] = useActionState<ActionResult, typeof formData>(
        async (_, data) => await saveNewTrip(data),
        null
    )
    const router = useRouter();
    const [isCalculating, setIsCalculating] = useState(false);

    // hook pour rediriger l'utilisateur vers la page de ses trajets si l'ajout réussit
    useEffect(() => {
        // si state existe et l'opération reussit
        if (state?.success) {
            // 2 sec de timeout pour voir le message de succès
            const timer = setTimeout(() => {
                router.push('/my-trips');
                router.refresh();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [state, router]);

    const [formData, setFormData] = useState({
        fullStartingAddress: "",
        startingAddress: {
            number: "",
            streetname: "",
            lat: null as number | null,
            lon: null as number | null,
            city: {
                zipCode: "",
                name: "",
            }
        },
        fullArrivalAddress: "",
        arrivalAddress: {
            number: "",
            streetname: "",
            lat: null as number | null,
            lon: null as number | null,
            city: {
                zipCode: "",
                name: "",
            }
        },
        departureDatetime: "",
        length: "",
        seats: ""
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => dispatch(formData));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <>
            <StateAlerts state={state} />
        <form className={"w-100 space-y-3 mt-3"} onSubmit={handleSubmit}>
            <AddressAutocompleteInput name={"startingAddress"} label={"Adresse de départ"} placeholder={"1 place Charles de Gaulle"} value={formData.fullStartingAddress}
                                      onSelect={(number: string, streetname: string, zipCode: string, cityname: string, lat: number|null, lon: number|null) => {
                                          setFormData(prev => ({
                                              ...prev,
                                              fullStartingAddress: `${number ?? ''} ${streetname} ${zipCode} ${cityname}`,
                                              startingAddress: {
                                                  number,
                                                  streetname,
                                                  lat,
                                                  lon,
                                                  city: {
                                                      zipCode,
                                                      name: cityname,
                                                  }
                                              }
                                          }))
                                      }}/>

            <AddressAutocompleteInput name={"arrivalAddress"} label={"Adresse d'arrivée"} placeholder={"55 rue Winston Churchill"} value={formData.fullArrivalAddress}
                                      onSelect={(number: string, streetname: string, zipCode: string, cityname: string, lat: number|null, lon: number|null) => {
                                          setFormData(prev => ({
                                              ...prev,
                                              fullArrivalAddress: `${number} ${streetname} ${zipCode} ${cityname}`,
                                              arrivalAddress: {
                                                  number,
                                                  streetname,
                                                  lat,
                                                  lon,
                                                  city: {
                                                      zipCode,
                                                      name: cityname,
                                                  }
                                              }
                                          }))
                                      }}/>
            <InputGroup label={"Date et heure du trajet"} value={formData.departureDatetime} name={"departureDatetime"} id={"departureDatetime"} type={"datetime-local"} placeholder={""} onChange={handleChange} />
            <InputGroup label={"Nombre de places"} value={formData.seats.toString()} name={"seats"} id={"seats"} type={"number"} placeholder={"2"} min={1} max={10} step={1} onChange={handleChange} />
            <div className={"flex flex-row"}>
                <InputGroup label={"Distance"} value={formData.length.toString()} name={"length"} id={"length"} type={"number"} placeholder={"23"} onChange={handleChange} >
                    <div className={"mr-2"}><Button theme={"dark"} label={isCalculating ? "..." : "Calculer"} type={"button"}  onClick={async () => {
                        // appel api pour calculer la distance du trajet
                        if(formData.startingAddress.lon && formData.startingAddress.lat && formData.arrivalAddress.lon && formData.arrivalAddress.lat) {
                            setIsCalculating(true);
                            const res = await calculateTripLength(formData.startingAddress.lon,formData.startingAddress.lat, formData.arrivalAddress.lon,formData.arrivalAddress.lat)
                            setFormData(prev => ({ ...prev, length: res.toString() }));
                            setIsCalculating(false);
                        }
                    }}/></div>
                </InputGroup>

            </div>
            <div className={"flex flex-row w-100 gap-3"}>
                <Link href={"/my-trips"}><Button theme={"light"} label={"Retour"} type={"button"} /></Link>
                <Button theme={"dark"} label={"Créer le trajet"} type={"submit"} disabled={isPending || state?.success === true}/>
                {isPending && (
                    <Loader />
                )}
            </div>
        </form>
        </>
    )

}