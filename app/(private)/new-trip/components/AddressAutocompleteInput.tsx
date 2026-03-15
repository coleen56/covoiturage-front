import {useEffect, useState} from "react";
import {Address} from "@/types/carpool";
import {getAddresses} from "@/app/(private)/new-trip/actions";

interface AddressInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string
    onSelect: (number: string, streetname: string, zipCode: string, cityname: string) => void
}

export default function AddressAutocompleteInput(props: Readonly<AddressInputProps>) {
    const [query, setQuery] = useState(props.value)
    const [suggestions, setSuggestions] = useState<Address[]>([])

    // taper au moins 2 caractères
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([])
            return
        }
        // fetch à chaque frappe
        getAddresses(query).then(setSuggestions)
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
                className="block w-full rounded-md border py-1.5 px-3 text-sm text-black"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
                    {suggestions.map(a => (
                        <li
                            key={a.id ?? a.city.zipCode}
                            onClick={() => {
                                props.onSelect(a.number, a.streetname, a.city.zipCode, a.city.name)
                                setQuery(`${a.number ?? ''} ${a.streetname} ${a.city.zipCode} ${a.city.name}`)
                                setSuggestions([])
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >{`${a.number ?? ''} ${a.streetname} ${a.city.zipCode} ${a.city.name}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}