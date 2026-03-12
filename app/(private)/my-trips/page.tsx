'use client'

import Main from "@/components/ui/Main";
import PageTitle from "@/components/ui/PageTitle";
import {FaPlus} from "react-icons/fa";

export default function MyTripsPage() {
    return (
        <Main>
            <PageTitle>
                Mes trajets
            </PageTitle>
            <button className={"absolute bg-gray-900 right-4 bottom-4 p-5 rounded-lg"}>
                <FaPlus className={"text-4xl text-white"} />
            </button>
        </Main>
    )
}