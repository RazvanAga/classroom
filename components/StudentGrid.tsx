"use client"

import { useState } from "react"
import Link from "next/link"
import { Star } from "lucide-react"
import { StudentWithPoints } from "@/lib/types"
import QuickAction from "./QuickAction"
import Avatar from "./Avatar"

interface Props {
  students: StudentWithPoints[]
}

export default function StudentGrid({ students }: Props) {
  const [selected, setSelected] = useState<StudentWithPoints | null>(null)

  if (students.length === 0) {
    return (
      <div className="text-center py-16 text-purple-400">
        <Star size={48} className="mx-auto mb-3 opacity-30" />
        <p className="text-lg font-semibold">Niciun elev adăugat.</p>
        <p className="text-sm mt-1">
          Mergi la{" "}
          <Link href="/setari" className="text-violet-600 underline font-semibold">
            Setări
          </Link>{" "}
          pentru a adăuga elevi.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {students.map((s) => {
          const pts = s.shopBalance
          const isPositive = pts > 0
          const isNegative = pts < 0

          return (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={`group relative flex flex-col items-center justify-center gap-1.5 border-2 rounded-2xl p-2 pt-3 cursor-pointer transition-all duration-150 hover:scale-105 hover:shadow-lg ${
                s.gender === "girl"
                  ? "bg-pink-50 border-pink-200 hover:border-pink-400"
                  : "bg-sky-50 border-sky-200 hover:border-sky-400"
              }`}
            >
              {/* Rank badge */}
              <span className="absolute top-1.5 left-2 text-[10px] font-bold text-slate-400">
                #{s.rank}
              </span>

              {/* Avatar */}
              <Avatar gender={s.gender} avatar={s.avatar} size={56} uid={s.id} />

              {/* Name */}
              <span className="text-xs font-bold text-center text-slate-700 leading-tight line-clamp-2 px-0.5">
                {s.name.split(" ")[0]}
              </span>

              {/* Points */}
              <div className={`flex items-center gap-0.5 text-xs font-extrabold ${
                isPositive ? "text-emerald-600" : isNegative ? "text-rose-600" : "text-slate-400"
              }`}>
                <Star size={10} className={isPositive ? "fill-amber-400 text-amber-400" : isNegative ? "text-rose-300" : "text-slate-200"} />
                {isPositive ? `+${pts}` : pts}
              </div>
            </button>
          )
        })}
      </div>

      {selected && (
        <QuickAction
          student={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
