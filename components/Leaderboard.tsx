"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Crown } from "lucide-react"
import { StudentWithPoints } from "@/lib/types"

interface Props {
  allTime: StudentWithPoints[]
  daily: StudentWithPoints[]
  weekly: StudentWithPoints[]
  monthly: StudentWithPoints[]
}

type Period = "all" | "day" | "week" | "month"

const MEDALS = [
  { icon: "🥇", color: "text-amber-500", bg: "bg-amber-50 border-amber-200" },
  { icon: "🥈", color: "text-slate-500", bg: "bg-slate-50 border-slate-200" },
  { icon: "🥉", color: "text-orange-500", bg: "bg-orange-50 border-orange-200" },
]

export default function Leaderboard({ allTime, daily, weekly, monthly }: Props) {
  const [period, setPeriod] = useState<Period>("day")

  const data =
    period === "all" ? allTime :
    period === "day" ? daily :
    period === "week" ? weekly : monthly
  const top3 = data.slice(0, 3)
  const rest = data.slice(3, 10)

  const tabs: { key: Period; label: string }[] = [
    { key: "day", label: "Azi" },
    { key: "week", label: "Săptămâna" },
    { key: "month", label: "Luna" },
    { key: "all", label: "Total" },
  ]

  return (
    <div className="bg-white rounded-3xl border border-purple-100 shadow-md shadow-purple-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Crown size={20} className="text-amber-500 fill-amber-400" />
        <h2 className="font-extrabold text-slate-800 flex-1">Clasament</h2>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1 bg-violet-50 rounded-2xl p-1 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setPeriod(t.key)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              period === t.key
                ? "bg-violet-600 text-white shadow"
                : "text-violet-500 hover:text-violet-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {data.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-6">
          <Star size={32} className="mx-auto mb-2 opacity-20" />
          Nicio activitate în perioada selectată.
        </p>
      ) : (
        <>
          {/* Top 3 podium */}
          <div className="space-y-2 mb-3">
            {top3.map((s, i) => {
              const medal = MEDALS[i]
              return (
                <Link
                  key={s.id}
                  href={`/elevi/${s.id}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl border transition-all hover:scale-[1.02] ${medal.bg}`}
                >
                  <span className="text-xl">{medal.icon}</span>
                  <span className="flex-1 font-bold text-slate-700 text-sm truncate">
                    {s.name}
                  </span>
                  <span className={`flex items-center gap-0.5 font-extrabold text-sm ${
                    s.shopBalance >= 0 ? "text-emerald-600" : "text-rose-500"
                  }`}>
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {s.shopBalance > 0 ? `+${s.shopBalance}` : s.shopBalance}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Rest of top 10 */}
          {rest.length > 0 && (
            <div className="space-y-1 border-t border-slate-100 pt-3">
              {rest.map((s) => (
                <Link
                  key={s.id}
                  href={`/elevi/${s.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-violet-50 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-400 w-5 text-right">
                    {s.rank}
                  </span>
                  <span className="flex-1 text-sm text-slate-600 truncate">{s.name}</span>
                  <span className={`text-xs font-bold ${
                    s.shopBalance >= 0 ? "text-emerald-500" : "text-rose-500"
                  }`}>
                    {s.shopBalance > 0 ? `+${s.shopBalance}` : s.shopBalance}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
