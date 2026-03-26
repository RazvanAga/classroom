"use client"

import { useState } from "react"
import { X, RotateCcw, ShoppingBag, Star } from "lucide-react"
import Link from "next/link"
import { StudentWithPoints } from "@/lib/types"
import { addEvent, undoLastEvent } from "@/lib/actions"
import Avatar from "./Avatar"

interface Props {
  student: StudentWithPoints
  onClose: () => void
}

const QUICK_VALUES = [1, 2, 3, 5]

export default function QuickAction({ student, onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState("")

  async function handle(points: number) {
    setLoading(true)
    await addEvent(student.id, points, note || undefined)
    setLoading(false)
    onClose()
  }

  async function handleUndo() {
    setLoading(true)
    await undoLastEvent(student.id)
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
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
            <Avatar gender={student.gender} avatar={student.avatar} size={64} uid={`modal-${student.id}`} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-extrabold text-lg leading-tight">{student.name}</h2>
            <p className="text-purple-100 text-sm mt-0.5 flex items-center gap-1">
              <Star size={12} className="fill-yellow-300 text-yellow-300" />
              {student.shopBalance} stele disponibile
            </p>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <Link
              href={`/shop?student=${student.id}`}
              onClick={onClose}
              className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 text-white font-semibold px-2.5 py-1.5 rounded-xl transition-colors"
            >
              <ShoppingBag size={13} /> Shop
            </Link>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Note */}
          <input
            type="text"
            placeholder="✏️  Notă opțională..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border-2 border-slate-100 bg-slate-50 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-300 focus:bg-white transition-colors"
          />

          {/* Acordă stele */}
          <div>
            <p className="text-emerald-700 font-bold text-sm mb-2.5 flex items-center gap-1.5">
              <span className="text-base">⭐</span> Acordă stele
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

          {/* Scade stele */}
          <div>
            <p className="text-rose-700 font-bold text-sm mb-2.5 flex items-center gap-1.5">
              <span className="text-base">💢</span> Scade stele
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

          {/* Undo */}
          <button
            onClick={handleUndo}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 rounded-2xl py-3 text-sm font-semibold transition-all disabled:opacity-50"
          >
            <RotateCcw size={15} /> Anulează ultima acțiune
          </button>
        </div>
      </div>
    </div>
  )
}
