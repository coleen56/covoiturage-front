'use client'

import { usePathname } from 'next/navigation'
import { Home, CarTaxiFront, Search, Ticket, User } from 'lucide-react'

const navItems = [
    { label: 'Accueil',       href: '/home',         icon: Home },
    { label: 'Mes trajets',   href: '/my-trips',     icon: CarTaxiFront },
    { label: 'Rechercher',    href: '/search',       icon: Search },
    { label: 'Réservations',  href: '/my-bookings',  icon: Ticket },
    { label: 'Profil',        href: '/profile',      icon: User },
]

export default function BottomNavbar() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex bg-white border-t border-gray-200 pb-safe">
            {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                <a
                    key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-1 flex-col items-center gap-1 pt-2 pb-3"
                    >
                    {isActive && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-black rounded-b-sm" />
                    )}
                <Icon
                    size={22}
                    strokeWidth={1.8}
                    className={isActive ? 'text-black' : 'text-gray-400'}
                />
                <span className={`text-[11px] ${isActive ? 'font-medium text-black' : 'text-gray-400'}`}>
              {item.label}
            </span>
            </a>
            )
            })}
        </nav>
    )
}