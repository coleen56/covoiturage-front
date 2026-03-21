import {useEffect, useRef, useState} from "react";
import {Manufacturer} from "@/types/carpool";
import {getManufacturers} from "@/app/(private)/profile/actions";
import {inputDivStyle, inputLabelStyle, inputStyle, suggestionItemStyle, suggestionsContainerStyle} from "@/lib/styles";

interface ManufacturerInputProps {
    value: string
    onSelect: (id: number | null, name: string) => void
}

export default function ManufacturerInput({value, onSelect}: Readonly<ManufacturerInputProps>) {
    const [query, setQuery] = useState(value)
    const [suggestions, setSuggestions] = useState<Manufacturer[]>([])
    const isSelecting = useRef(true)

    // taper au moins 2 caractères
    useEffect(() => {
        if (isSelecting.current) {
            isSelecting.current = false
            return
        }

        if (query.length < 2) {
            return
        }
        // fetch à chaque frappe
        getManufacturers(query).then(setSuggestions)
    }, [query])

    function handleBlur() {
        setSuggestions([])
        const match = suggestions.find(m => m.name?.toLowerCase() === query.toLowerCase())
        if (!match) {
            onSelect(null, query)
        }
    }

    return (
        <div className="relative">
            <label htmlFor={"car_manufacturer"} className={inputLabelStyle}>Marque*</label>
            <div className={`${inputDivStyle} bg-gray-200 text-black`}>
                <input
                    onBlur={handleBlur}
                    name={"car_manufacturer"}
                    id={"car_manufacturer"}
                    type="text"
                    value={query}
                    onChange={e => {
                        setSuggestions([])
                        setQuery(e.target.value)
                    }}
                    placeholder="Marque de votre voiture"
                    className={inputStyle}
                />
            </div>
            {suggestions.length > 0 && (
                <ul className={suggestionsContainerStyle}>
                    {suggestions.map(m => (
                        <li
                            key={m.id}
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => {
                                isSelecting.current = true
                                onSelect(m.id, m.name!)
                                setQuery(m.name!)
                                setSuggestions([])
                            }}
                            className={suggestionItemStyle}
                        >{m.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}