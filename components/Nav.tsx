"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Star, Shuffle, Settings, LayoutDashboard, ShoppingBag } from "lucide-react"

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/shop", label: "Magazin", icon: ShoppingBag },
  { href: "/grupuri", label: "Grupuri", icon: Shuffle },
  { href: "/setari", label: "Setări", icon: Settings },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 shadow-lg shadow-purple-900/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 bg-yellow-400 rounded-xl shadow-md rotate-3">
              <Star size={20} className="text-yellow-900 fill-yellow-900" />
            </div>
            <div className="leading-tight">
              <span className="text-white font-extrabold text-lg tracking-tight block">
                Clasa Steluțelor
              </span>
              <span className="text-purple-200 text-xs">✦ ✦ ✦ ✦ ✦</span>
            </div>
          </Link>

          <div className="flex gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-white/20 text-white shadow-inner"
                      : "text-purple-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={17} />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
