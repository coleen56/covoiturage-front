import {useEffect, useRef, useState} from "react";
import {City} from "@/types/carpool";
import {inputDivStyle, inputLabelStyle, inputStyle, suggestionItemStyle, suggestionsContainerStyle} from "@/lib/styles";
import {getCities} from "@/app/(private)/search/actions";

interface CityInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string
    onSelect: (name: string) => void
    onChange?: (value: string) => void
}

export default function CityAutocompleteInput(props: Readonly<CityInputProps>) {
    const [query, setQuery] = useState(props.value)
    const [suggestions, setSuggestions] = useState<City[]>([])
    const isSelecting = useRef(false)

    // taper au moins 2 caractères
    useEffect(() => {
        // pour bloquer le use effect à la selection
        if (isSelecting.current) {
            isSelecting.current = false
            return
        }
        if (query.length < 2) {
            return
        }
        // fetch à chaque frappe
        getCities(query).then(setSuggestions)
    }, [query])
    return (
        <div className="mt-2 w-full relative">
            <label htmlFor={props.name} className={inputLabelStyle}>{props.label}</label>
            <div className={`${inputDivStyle} bg-gray-200 text-black`}>
                <input
                    name={props.name}
                    id={props.name}
                    type="text"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        props.onChange?.(e.target.value);
                    }}
                    placeholder={props.placeholder}
                    className={inputStyle}
                />
            </div>
            {suggestions.length > 0 && (
                <ul className={suggestionsContainerStyle}>
                    {suggestions.map(c => (
                        <button key={c.id ?? c.zipCode} onClick={() => {
                            isSelecting.current = true
                            props.onSelect(c.name)
                            setQuery(c.name)
                            setSuggestions([])
                        }}>
                            <li className={suggestionItemStyle}>{c.name} ({c.zipCode})</li>
                        </button>
                    ))}
                </ul>
            )}
        </div>
    )
}