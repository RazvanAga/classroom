"use client"

import { useState, useRef } from "react"
import { Shuffle, Users, Star } from "lucide-react"
import { Student } from "@/lib/types"

interface Props {
  students: Student[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getInitials(name: string) {
  const parts = name.trim().split(" ")
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2)
}

const GROUP_COLORS = [
  { card: "bg-violet-50 border-violet-300", avatar: "bg-violet-500", title: "text-violet-700", emoji: "🔵" },
  { card: "bg-emerald-50 border-emerald-300", avatar: "bg-emerald-500", title: "text-emerald-700", emoji: "🟢" },
  { card: "bg-amber-50 border-amber-300", avatar: "bg-amber-500", title: "text-amber-700", emoji: "🟡" },
  { card: "bg-rose-50 border-rose-300", avatar: "bg-rose-500", title: "text-rose-700", emoji: "🔴" },
  { card: "bg-sky-50 border-sky-300", avatar: "bg-sky-500", title: "text-sky-700", emoji: "🩵" },
  { card: "bg-pink-50 border-pink-300", avatar: "bg-pink-500", title: "text-pink-700", emoji: "🩷" },
]

export default function GrupuriClient({ students }: Props) {
  const [pickedStudent, setPickedStudent] = useState<Student | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [groups, setGroups] = useState<Student[][] | null>(null)
  const [numGroups, setNumGroups] = useState(4)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function pickRandom() {
    if (students.length === 0 || isSpinning) return
    setIsSpinning(true)
    setPickedStudent(null)
    let count = 0
    const total = 25
    intervalRef.current = setInterval(() => {
      const random = students[Math.floor(Math.random() * students.length)]
      setPickedStudent(random)
      count++
      if (count >= total) {
        clearInterval(intervalRef.current!)
        setIsSpinning(false)
      }
    }, 80)
  }

  function buildGroups() {
    if (students.length === 0) return
    const shuffled = shuffle(students)
    const result: Student[][] = Array.from({ length: numGroups }, () => [])
    shuffled.forEach((s, i) => result[i % numGroups].push(s))
    setGroups(result)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-500 rounded-3xl p-5 text-white shadow-lg shadow-purple-200">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Shuffle size={24} /> Grupuri & Alegere aleatorie
        </h1>
        <p className="text-purple-100 text-sm mt-1">Împarte clasa sau alege un elev la întâmplare ✦</p>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-16 text-purple-400">
          <Star size={48} className="mx-auto mb-3 opacity-30" />
          <p>Nu există elevi. Adaugă din pagina Setări.</p>
        </div>
      ) : (
        <>
          {/* Random picker */}
          <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6">
            <h2 className="font-extrabold text-slate-800 flex items-center gap-2 mb-6 text-lg">
              <span className="text-2xl">🎲</span> Alege un elev aleatoriu
            </h2>
            <div className="flex flex-col items-center gap-6">
              {/* Spinning circle */}
              <div
                className={`relative w-52 h-52 rounded-full flex items-center justify-center border-4 transition-all duration-200 shadow-lg ${
                  isSpinning
                    ? "border-violet-400 bg-violet-50 shadow-violet-200 scale-105"
                    : pickedStudent
                    ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-emerald-200"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                {/* Stars around the circle when picked */}
                {pickedStudent && !isSpinning && (
                  <>
                    <Star size={16} className="absolute top-3 left-8 fill-yellow-400 text-yellow-400 animate-bounce" />
                    <Star size={12} className="absolute top-6 right-8 fill-yellow-300 text-yellow-300 animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <Star size={14} className="absolute bottom-5 left-6 fill-amber-400 text-amber-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <Star size={10} className="absolute bottom-4 right-10 fill-yellow-400 text-yellow-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
                  </>
                )}

                {pickedStudent ? (
                  <div className="text-center px-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-2 shadow">
                      {getInitials(pickedStudent.name)}
                    </div>
                    <span className="text-base font-extrabold text-slate-800 leading-tight">
                      {pickedStudent.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl opacity-30">⭐</span>
                )}
              </div>

              <button
                onClick={pickRandom}
                disabled={isSpinning}
                className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-extrabold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-purple-300 disabled:opacity-60 active:scale-95 text-base"
              >
                <Shuffle size={20} />
                {isSpinning ? "Se alege..." : "✨ Alege!"}
              </button>
            </div>
          </div>

          {/* Group builder */}
          <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6">
            <h2 className="font-extrabold text-slate-800 flex items-center gap-2 mb-5 text-lg">
              <span className="text-2xl">👥</span> Împarte în grupuri
            </h2>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-slate-600">Număr de grupuri:</span>
              <div className="flex items-center gap-3 bg-violet-50 rounded-2xl p-1">
                <button
                  onClick={() => setNumGroups((n) => Math.max(2, n - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-violet-200 hover:bg-violet-100 font-extrabold text-violet-700 transition-colors shadow-sm text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center font-extrabold text-violet-800 text-lg">
                  {numGroups}
                </span>
                <button
                  onClick={() => setNumGroups((n) => Math.min(Math.floor(students.length / 2), n + 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-violet-200 hover:bg-violet-100 font-extrabold text-violet-700 transition-colors shadow-sm text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={buildGroups}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-extrabold px-6 py-2.5 rounded-2xl transition-all shadow shadow-purple-200 active:scale-95"
              >
                <Shuffle size={17} /> Împarte!
              </button>
            </div>

            {groups && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {groups.map((group, i) => {
                  const c = GROUP_COLORS[i % GROUP_COLORS.length]
                  return (
                    <div key={i} className={`border-2 rounded-2xl p-4 ${c.card}`}>
                      <p className={`font-extrabold text-sm mb-3 flex items-center gap-1.5 ${c.title}`}>
                        <span className="text-base">{c.emoji}</span> Grupa {i + 1}
                      </p>
                      <ul className="space-y-2">
                        {group.map((s) => (
                          <li key={s.id} className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg ${c.avatar} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                              {getInitials(s.name)}
                            </div>
                            <span className="text-sm text-slate-700 font-medium leading-tight">
                              {s.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
