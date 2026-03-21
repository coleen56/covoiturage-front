'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function NewTripFab() {
    return (
        <Link href="/new-trip">
            <button className="fixed bottom-20 right-4 z-40 bg-black text-white rounded-full p-4 shadow-lg hover:cursor-pointer">
                <Plus size={24} />
            </button>

        </Link>
    )
}