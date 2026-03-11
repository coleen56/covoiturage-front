import {useEffect, useState} from "react";
import {City} from "@/types/carpool";
import {getCities} from "@/app/(private)/search/actions";

interface CityInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string
    onSelect: (name: string) => void
}

export default function CityInput(props: Readonly<CityInputProps>) {
    const [query, setQuery] = useState(props.value)
    const [suggestions, setSuggestions] = useState<City[]>([])

    // taper au moins 2 caractères
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([])
            return
        }
        // fetch à chaque frappe
        getCities(query).then(setSuggestions)
    }, [query])
    return (
        <div className="relative">
            <label htmlFor={props.name} className="block text-sm/6 font-medium text-black">{props.label}</label>
            <input
                name={props.name}
                id={props.name}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={props.placeholder}
                className="block w-full rounded-md border py-1.5 px-3 text-sm text-black mt-2"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
                    {suggestions.map(c => (
                        <li
                            key={c.id ?? c.zipCode}
                            onClick={() => {
                                props.onSelect(c.name)
                                setQuery(c.name)
                                setSuggestions([])
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >{c.name} ({c.zipCode})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}