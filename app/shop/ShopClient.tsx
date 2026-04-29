"use client"

import { useState, useTransition } from "react"
import { ShoppingBag, Star, Check, Lock, RefreshCw, Eye } from "lucide-react"
import Link from "next/link"
import { StudentWithPoints, ShopItem } from "@/lib/types"
import { purchaseItem, equipItem, removeAccessory } from "@/lib/actions"
import Avatar from "@/components/Avatar"

interface Props {
  students: StudentWithPoints[]
  shopItems: ShopItem[]
}

const KENDAMA_CSS_FILTERS: Record<string, string> = {
  "kendama-blue":   "hue-rotate(240deg) saturate(1.5)",
  "kendama-pink":   "hue-rotate(300deg) saturate(1.5)",
  "kendama-green":  "hue-rotate(120deg) saturate(1.5)",
  "kendama-yellow": "saturate(0) sepia(1) saturate(5)",
  "kendama-white":  "saturate(0) brightness(2.5) contrast(0.4)",
  "kendama-black":  "saturate(0) brightness(0.2)",
  "kendama-purple": "hue-rotate(270deg) saturate(2)",
}

const CATEGORY_LABELS: Record<string, string> = {
  hairColor: "💇 Culori de păr",
  accessory: "🎭 Accesorii",
  bgStyle:   "🖼️ Fundaluri",
  logo:      "🎮 Logos jocuri",
  pet:       "🐾 Animale de companie",
  kendama:   "🎁 Obiecte",
}

const LOGO_IMAGES: Record<string, string> = {
  "badge-fortnite":   "/Fortnite.png",
  "badge-brawlstars": "/brawlstars.png",
  "badge-roblox":     "/roblox.webp",
  "badge-minecraft":  "/minecraft.svg",
}

export default function ShopClient({ students, shopItems }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null)

  const student = students.find((s) => s.id === selectedId) ?? null

  async function handleBuy(item: ShopItem) {
    if (!student) return
    setFeedback(null)
    startTransition(async () => {
      const res = await purchaseItem(student.id, item.id)
      setFeedback({ ok: res.ok, msg: res.message ?? (res.ok ? "Cumpărat cu succes! 🎉" : "Eroare.") })
    })
  }

  async function handleEquip(item: ShopItem) {
    if (!student) return
    startTransition(async () => {
      await equipItem(student.id, item.id)
      setFeedback({ ok: true, msg: "Articol echipat! ✨" })
    })
  }

  async function handleRemoveAcc() {
    if (!student) return
    startTransition(async () => {
      await removeAccessory(student.id)
      setFeedback({ ok: true, msg: "Accesoriu îndepărtat." })
    })
  }

  const grouped = Object.entries(
    shopItems.reduce<Record<string, ShopItem[]>>((acc, item) => {
      acc[item.type] = acc[item.type] ?? []
      acc[item.type].push(item)
      return acc
    }, {})
  )

  function isOwned(item: ShopItem) {
    return student?.purchasedItems?.includes(item.id) ?? false
  }

  function isEquipped(item: ShopItem) {
    if (!student) return false
    if (item.type === "hairColor") return student.avatar.hairColor        === item.value
    if (item.type === "accessory") return student.avatar.accessory        === item.value
    if (item.type === "bgStyle")   return student.avatar.bgStyle          === item.value
    if (item.type === "kendama")   return (student.avatar.object  ?? null) === item.value
    if (item.type === "logo")      return (student.avatar.logo    ?? null) === item.value
    if (item.type === "pet")       return (student.avatar.pet     ?? null) === item.value
    return false
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-500 rounded-3xl p-5 text-white shadow-lg shadow-purple-200">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <ShoppingBag size={26} /> Magazinul Steluțelor
        </h1>
        <p className="text-purple-100 text-sm mt-1">
          Cumpără lucruri speciale cu stelele câștigate! ✦
        </p>
        <Link
          href="/dev"
          className="inline-flex items-center gap-2 mt-3 bg-white/20 hover:bg-white/30 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
        >
          <Eye size={15} /> Vezi tot ce poți cumpăra
        </Link>
      </div>

      {/* Student selector */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-5">
        <h2 className="font-extrabold text-slate-700 mb-4 text-base">Selectează elevul care cumpără:</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {students.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSelectedId(s.id); setFeedback(null) }}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-all cursor-pointer hover:scale-105 ${
                selectedId === s.id
                  ? "border-violet-500 bg-violet-50 shadow-md shadow-violet-100"
                  : "border-slate-100 bg-white hover:border-violet-200"
              }`}
            >
              <Avatar gender={s.gender} avatar={s.avatar} size={44} uid={`shop-sel-${s.id}`} />
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight line-clamp-1">
                {s.name.split(" ")[0]}
              </span>
              <span className="text-[10px] font-extrabold text-amber-500 flex items-center gap-0.5">
                <Star size={8} className="fill-amber-400 text-amber-400" />
                {s.shopBalance}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Shop area */}
      {student && (
        <>
          {/* Student info bar */}
          <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-5 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-violet-50 flex-shrink-0">
              <Avatar gender={student.gender} avatar={student.avatar} size={80} uid={`shop-main-${student.id}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-slate-800 text-lg">{student.name}</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-sm px-3 py-1 rounded-xl">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  Sold magazin: {student.shopBalance} stele
                </span>
                <span className="flex items-center gap-1 bg-violet-50 border border-violet-200 text-violet-700 font-bold text-sm px-3 py-1 rounded-xl">
                  🛍️ {student.purchasedItems?.length ?? 0} articole deținute
                </span>
              </div>
            </div>
            {student.avatar.accessory && (
              <button
                onClick={handleRemoveAcc}
                disabled={isPending}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-500 border border-slate-200 hover:border-rose-200 rounded-xl px-3 py-2 transition-colors"
              >
                <RefreshCw size={14} /> Scoate accesoriu
              </button>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`rounded-2xl px-4 py-3 font-semibold text-sm ${
              feedback.ok
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-rose-50 border border-rose-200 text-rose-700"
            }`}>
              {feedback.msg}
            </div>
          )}

          {/* Shop items by category */}
          {grouped.map(([type, items]) => (
            <div key={type} className="bg-white rounded-3xl border border-purple-100 shadow-sm p-5">
              <h3 className="font-extrabold text-slate-800 mb-4 text-base">
                {CATEGORY_LABELS[type] ?? type}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {items.map((item) => {
                  const owned    = isOwned(item)
                  const equipped = isEquipped(item)
                  const canAfford = student.shopBalance >= item.price

                  return (
                    <div
                      key={item.id}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        equipped
                          ? "border-violet-400 bg-violet-50"
                          : owned
                          ? "border-emerald-300 bg-emerald-50"
                          : canAfford
                          ? "border-slate-200 bg-white hover:border-violet-200"
                          : "border-slate-100 bg-slate-50 opacity-60"
                      }`}
                    >
                      {/* Equipped badge */}
                      {equipped && (
                        <span className="absolute top-2 right-2 bg-violet-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          Echipat
                        </span>
                      )}

                      {item.type === "kendama" && item.value.startsWith("kendama-") ? (
                        <img
                          src="/kendama.png"
                          alt={item.name}
                          className="w-10 h-10 object-contain"
                          style={{ filter: KENDAMA_CSS_FILTERS[item.value] }}
                        />
                      ) : item.type === "logo" ? (
                        <img src={LOGO_IMAGES[item.value]} alt={item.name} className="w-10 h-10 object-contain"/>
                      ) : (
                        <span className="text-3xl">{item.emoji}</span>
                      )}
                      <span className="text-xs font-bold text-slate-700 text-center leading-tight">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1 text-amber-600 font-extrabold text-sm">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        {item.price}
                      </div>

                      {false ? (
                        canAfford ? (
                          <button
                            onClick={() => handleBuy(item)}
                            disabled={isPending}
                            className="text-xs bg-violet-600 hover:bg-violet-700 text-white font-bold px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50 w-full"
                          >
                            Cumpără
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Lock size={11} /> Insuficient
                          </span>
                        )
                      ) : equipped ? (
                        <span className="flex items-center gap-1 text-xs text-violet-600 font-bold">
                          <Check size={12} /> Activ
                        </span>
                      ) : owned ? (
                        <button
                          onClick={() => handleEquip(item)}
                          disabled={isPending}
                          className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50 w-full"
                        >
                          Echipează
                        </button>
                      ) : canAfford ? (
                        <button
                          onClick={() => handleBuy(item)}
                          disabled={isPending}
                          className="text-xs bg-violet-600 hover:bg-violet-700 text-white font-bold px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50 w-full"
                        >
                          Cumpără
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Lock size={11} /> Insuficient
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </>
      )}

      {!student && (
        <div className="text-center py-16 text-purple-300">
          <ShoppingBag size={56} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold text-lg">Selectează un elev pentru a deschide magazinul.</p>
        </div>
      )}
    </div>
  )
}
