import {useEffect, useRef, useState} from "react";
import {Address} from "@/types/carpool";
import {getAddresses} from "@/app/(private)/new-trip/actions";
import {inputDivStyle, inputLabelStyle, inputStyle, suggestionItemStyle, suggestionsContainerStyle} from "@/lib/styles";

interface AddressInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string
    onSelect: (number: string, streetname: string, zipCode: string, cityname: string, lat: number|null, lon: number|null) => void
}

export default function AddressAutocompleteInput(props: Readonly<AddressInputProps>) {
    const [query, setQuery] = useState(props.value)
    const [suggestions, setSuggestions] = useState<Address[]>([])
    const isSelecting = useRef(false)

    // taper au moins 2 caractères
    useEffect(() => {
        // pour bloquer le use effect à la selection
        if (isSelecting.current) {
            isSelecting.current = false
            return
        }
        if (query.length < 2) return

        getAddresses(query).then(setSuggestions)
    }, [query])

    return (
        <div className="relative">
            <label htmlFor={props.name} className={inputLabelStyle}>{props.label}</label>
            <div className={`${inputDivStyle} bg-gray-200 text-black`}>
                <input
                    name={props.name}
                    id={props.name}
                    type="text"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                        if (e.target.value.length < 2) setSuggestions([])
                    }}
                    placeholder={props.placeholder}
                    className={inputStyle}
                />
            </div>
            {suggestions.length > 0 && (
                <ul className={suggestionsContainerStyle}>
                    {suggestions.map(a => (
                        <li
                            key={a.id ?? a.city.name + a.streetname + a.number}
                            onClick={() => {
                                isSelecting.current = true
                                props.onSelect(a.number, a.streetname, a.city.zipCode, a.city.name, a.lat, a.lon)
                                setQuery(`${a.number ?? ''} ${a.streetname} ${a.city.zipCode} ${a.city.name}`)
                                setSuggestions([])
                            }}
                            className={suggestionItemStyle}
                        >{`${a.number ?? ''} ${a.streetname} ${a.city.zipCode} ${a.city.name}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}