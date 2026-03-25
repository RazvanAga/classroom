"use client"

import { useState, useTransition } from "react"
import { Trash2, Plus, UserPlus, Star } from "lucide-react"
import { Student } from "@/lib/types"
import { addStudent, deleteStudent } from "@/lib/actions"

interface Props {
  students: Student[]
}

function getInitials(name: string) {
  const parts = name.trim().split(" ")
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2)
}

const AVATAR_COLORS = [
  "bg-violet-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500",
  "bg-pink-500", "bg-orange-500", "bg-teal-500", "bg-rose-500",
]

export default function SetariClient({ students }: Props) {
  const [newName, setNewName] = useState("")
  const [newGender, setNewGender] = useState<"boy" | "girl">("boy")
  const [isPending, startTransition] = useTransition()

  function handleAddStudent(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    startTransition(() => addStudent(newName, newGender))
    setNewName("")
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-500 rounded-3xl p-5 text-white shadow-lg shadow-purple-200">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Star size={24} className="fill-yellow-300 text-yellow-300" /> Setări
        </h1>
        <p className="text-purple-100 text-sm mt-1">Gestionează elevii clasei ✦</p>
      </div>

      <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-5">
        <h2 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2 text-lg">
          <UserPlus size={20} className="text-violet-600" />
          Elevi
          <span className="ml-1 bg-violet-100 text-violet-700 text-sm font-bold px-2.5 py-0.5 rounded-full">
            {students.length}
          </span>
        </h2>

        <form onSubmit={handleAddStudent} className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Numele elevului"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 border-2 border-slate-100 bg-slate-50 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-300 focus:bg-white transition-colors"
          />
          <select
            value={newGender}
            onChange={(e) => setNewGender(e.target.value as "boy" | "girl")}
            className="border-2 border-slate-100 bg-slate-50 rounded-2xl px-3 py-2.5 text-sm focus:outline-none focus:border-violet-300 font-medium"
          >
            <option value="boy">👦 Băiat</option>
            <option value="girl">👧 Fată</option>
          </select>
          <button
            type="submit"
            disabled={isPending || !newName.trim()}
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-2.5 rounded-2xl text-sm transition-colors disabled:opacity-50 shadow-sm"
          >
            <Plus size={16} /> Adaugă
          </button>
        </form>

        {students.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Star size={36} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">Niciun elev adăugat.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {students.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center gap-2 border-2 rounded-2xl px-3 py-2 ${
                  s.gender === "girl"
                    ? "bg-pink-50 border-pink-100"
                    : "bg-sky-50 border-sky-100"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                  {getInitials(s.name)}
                </div>
                <span className="text-sm font-medium text-slate-700 truncate flex-1">
                  {s.name}
                </span>
                <button
                  onClick={() => startTransition(() => deleteStudent(s.id))}
                  disabled={isPending}
                  className="text-slate-300 hover:text-rose-500 transition-colors flex-shrink-0 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
