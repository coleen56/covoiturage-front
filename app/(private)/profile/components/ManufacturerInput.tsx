import {useEffect, useState} from "react";
import {Manufacturer} from "@/types/carpool";
import {getManufacturers} from "@/app/(private)/profile/actions";

interface ManufacturerInputProps {
    value: string
    onSelect: (id: number, name: string) => void
}

export default function ManufacturerInput({value, onSelect}: Readonly<ManufacturerInputProps>) {
    const [query, setQuery] = useState(value)
    const [suggestions, setSuggestions] = useState<Manufacturer[]>([])

    // taper au moins 2 caractères
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([])
            return
        }
        // fetch à chaque frappe
        getManufacturers(query).then(setSuggestions)
    }, [query])
    return (
        <div className="relative">
            <label htmlFor={"car_manufacturer"} className="block text-sm/6 font-medium text-black">Marque</label>
                <input
                name={"car_manufacturer"}
                id={"car_manufacturer"}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Marque de votre voiture"
                className="block w-full rounded-md border py-1.5 px-3 text-sm text-black mt-2"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
                    {suggestions.map(m => (
                        <li
                            key={m.id}
                            onClick={() => {
                                onSelect(m.id, m.name!)
                                setQuery(m.name!)
                                setSuggestions([])
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >{m.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}