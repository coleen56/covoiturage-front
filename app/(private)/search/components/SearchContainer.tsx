'use client'

import { useActionState } from "react"
import SearchTripForm from "./SearchTripForm"
import ResultsList from "./ResultsList"
import {ActionResult, getTripsFromFormData, TripFormData} from "../actions"

export default function SearchContainer({currentUserId}: Readonly<{ currentUserId: number | null }>) {
    const [state, dispatch, isPending] = useActionState<ActionResult, TripFormData>(
        async (_, data) => await getTripsFromFormData(data),
        null
    )

    return (
        <>
            <SearchTripForm dispatch={dispatch} isPending={isPending} />
            <ResultsList state={state} currentUserId={currentUserId} />
        </>
    )
}