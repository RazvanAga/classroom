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

const QUICK_VALUES = [1, 2, 3, 5]

function AllStudentsModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState("")

  async function handle(points: number) {
    setLoading(true)
    await addEventToAll(points, note || undefined)
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
            <p className="text-purple-100 text-sm mt-0.5">{/* placeholder */}Acțiune pentru întreaga clasă</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <Star size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <input
            type="text"
            placeholder="✏️  Notă opțională..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border-2 border-slate-100 bg-slate-50 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-300 focus:bg-white transition-colors"
          />

          <div>
            <p className="text-emerald-700 font-bold text-sm mb-2.5 flex items-center gap-1.5">
              <span className="text-base">⭐</span> Acordă tuturor
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUICK_VALUES.map((v) => (
                <button
                  key={v}
                  disabled={loading}
                  onClick={() => handle(v)}
                  className="flex flex-col items-center justify-center bg-emerald-50 hover:bg-emerald-100 active:scale-95 border-2 border-emerald-200 text-emerald-700 rounded-2xl py-4 font-extrabold text-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Star size={18} className="fill-amber-400 text-amber-400 mb-0.5" />
                  +{v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-rose-700 font-bold text-sm mb-2.5 flex items-center gap-1.5">
              <span className="text-base">💢</span> Scade tuturor
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUICK_VALUES.map((v) => (
                <button
                  key={v}
                  disabled={loading}
                  onClick={() => handle(-v)}
                  className="flex flex-col items-center justify-center bg-rose-50 hover:bg-rose-100 active:scale-95 border-2 border-rose-200 text-rose-700 rounded-2xl py-4 font-extrabold text-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span className="text-base mb-0.5">💢</span>
                  -{v}
                </button>
              ))}
            </div>
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
      <div className="flex justify-end mb-3">
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

      {allOpen && <AllStudentsModal onClose={() => setAllOpen(false)} />}
    </>
  )
}
