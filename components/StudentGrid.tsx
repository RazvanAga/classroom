"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Users } from "lucide-react"
import { StudentWithPoints } from "@/lib/types"
import QuickAction from "./QuickAction"
import Avatar from "./Avatar"
import { addEventToAll } from "@/lib/actions"

interface Props {
  students: StudentWithPoints[]
}

function AllStudentsModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)

  async function handle(points: number) {
    setLoading(true)
    await addEventToAll(points)
    setLoading(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Users size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-extrabold text-lg leading-tight">Toți elevii</h2>
            <p className="text-purple-100 text-sm mt-0.5">Acțiune pentru întreaga clasă</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <Star size={20} />
          </button>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              disabled={loading}
              onClick={() => handle(1)}
              className="flex flex-col items-center justify-center bg-emerald-50 hover:bg-emerald-100 active:scale-95 border-2 border-emerald-200 text-emerald-700 rounded-2xl py-6 font-extrabold text-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <Star size={24} className="fill-amber-400 text-amber-400 mb-1" />
              +1
            </button>
            <button
              disabled={loading}
              onClick={() => handle(-1)}
              className="flex flex-col items-center justify-center bg-rose-50 hover:bg-rose-100 active:scale-95 border-2 border-rose-200 text-rose-700 rounded-2xl py-6 font-extrabold text-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <span className="text-xl mb-1">💢</span>
              -1
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentGrid({ students }: Props) {
  const [selected, setSelected] = useState<StudentWithPoints | null>(null)
  const [allOpen, setAllOpen] = useState(false)

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
      <div className="flex justify-center mb-3">
        <button
          onClick={() => setAllOpen(true)}
          className="flex items-center gap-2 bg-violet-100 hover:bg-violet-200 text-violet-700 font-bold text-sm px-4 py-2 rounded-2xl transition-colors"
        >
          <Users size={16} /> Toți elevii
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {students.map((s) => {
          const pts = s.shopBalance
          const isPositive = pts > 0
          const isNegative = pts < 0
          const bg = s.avatar?.bgStyle

          const starsSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%231a1a4e'/%3E%3Ccircle cx='12' cy='14' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='68' cy='18' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='18' cy='62' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='62' cy='66' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='40' cy='8' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='22' cy='38' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='58' cy='40' r='1.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='40' cy='72' r='1.5' fill='white' opacity='0.7'/%3E%3Ctext x='26' y='24' font-size='7' fill='%23FFD700' text-anchor='middle'%3E%E2%98%85%3C/text%3E%3Ctext x='54' y='28' font-size='7' fill='%23FFD700' text-anchor='middle'%3E%E2%98%85%3C/text%3E%3Ctext x='40' y='68' font-size='7' fill='%23FFD700' text-anchor='middle'%3E%E2%98%85%3C/text%3E%3Ctext x='14' y='50' font-size='7' fill='%23FFD700' text-anchor='middle'%3E%E2%98%85%3C/text%3E%3Ctext x='66' y='52' font-size='7' fill='%23FFD700' text-anchor='middle'%3E%E2%98%85%3C/text%3E%3C/svg%3E")`

          const cardStyle: React.CSSProperties =
            bg === "rainbow" ? { background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 33%, #6BCB77 66%, #4D96FF 100%)" }
            : bg === "gold"  ? { background: "radial-gradient(circle, #FFF176 0%, #CC8800 100%)" }
            : bg === "stars" ? { backgroundImage: starsSvg, backgroundSize: "cover" }
            : {}

          const hasBg = bg && bg !== "default"
          const isDark = bg === "stars"

          return (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              style={cardStyle}
              className={`group relative flex flex-col items-center justify-center gap-1.5 border-2 rounded-2xl p-2 pt-3 cursor-pointer transition-all duration-150 hover:scale-105 hover:shadow-lg ${
                hasBg
                  ? "border-white/30 hover:border-white/60"
                  : s.gender === "girl"
                    ? "bg-pink-50 border-pink-200 hover:border-pink-400"
                    : "bg-sky-50 border-sky-200 hover:border-sky-400"
              }`}
            >
              {/* Rank badge */}
              <span className={`absolute top-1.5 left-2 text-[10px] font-bold ${isDark ? "text-white/60" : "text-slate-400"}`}>
                #{s.rank}
              </span>

              {/* Avatar */}
              <Avatar gender={s.gender} avatar={s.avatar} size={56} uid={s.id} />

              {/* Name */}
              <span className={`text-xs font-bold text-center leading-tight line-clamp-2 px-0.5 ${isDark ? "text-white" : "text-slate-700"}`}>
                {s.name.split(" ")[0]}
              </span>

              {/* Points */}
              <div className={`flex items-center gap-0.5 text-xs font-extrabold ${
                isDark
                  ? isPositive ? "text-emerald-300" : isNegative ? "text-rose-300" : "text-white/40"
                  : isPositive ? "text-emerald-600" : isNegative ? "text-rose-600" : "text-slate-400"
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

      {allOpen && <AllStudentsModal onClose={() => setAllOpen(false)} />}
    </>
  )
}
