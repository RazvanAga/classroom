import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, TrendingUp, TrendingDown, Minus, Calendar, ShoppingBag } from "lucide-react"
import { getStudentStats } from "@/lib/queries"
import Avatar from "@/components/Avatar"

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const stats = getStudentStats(id)
  if (!stats) notFound()

  const { student, totalPoints, weeklyPoints, monthlyPoints, shopBalance, events } = stats

  const statCards = [
    { label: "Total stele", value: totalPoints, icon: "⭐" },
    { label: "Luna aceasta", value: monthlyPoints, icon: "📅" },
    { label: "Săptămâna", value: weeklyPoints, icon: "✨" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-2.5 rounded-xl bg-white border border-purple-100 hover:bg-violet-50 text-violet-600 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-3xl px-5 py-4 flex items-center gap-4 shadow-lg shadow-purple-200">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
            <Avatar gender={student.gender} avatar={student.avatar} size={80} uid={`profile-${student.id}`} />
          </div>
          <div className="flex-1">
            <h1 className="text-white font-extrabold text-xl leading-tight">{student.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-xl">
                <Star size={11} className="fill-yellow-300 text-yellow-300" />
                {totalPoints > 0 ? `+${totalPoints}` : totalPoints} puncte
              </span>
              <span className="flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-xl">
                💰 {shopBalance} în magazin
              </span>
            </div>
          </div>
          <Link
            href={`/shop?student=${student.id}`}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-bold px-3 py-2 rounded-xl transition-colors"
          >
            <ShoppingBag size={15} /> Magazin
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white rounded-3xl border border-purple-100 shadow-sm p-4 text-center"
          >
            <span className="text-2xl">{icon}</span>
            <p className="text-xs text-slate-500 mt-1 mb-1 font-medium">{label}</p>
            <p className={`text-3xl font-extrabold ${
              value > 0 ? "text-emerald-500" : value < 0 ? "text-rose-500" : "text-slate-300"
            }`}>
              {value > 0 ? `+${value}` : value}
            </p>
          </div>
        ))}
      </div>

      {/* Avatar customizations */}
      {student.purchasedItems && student.purchasedItems.length > 0 && (
        <div className="bg-white rounded-3xl border border-purple-100 shadow-sm px-5 py-4">
          <p className="font-extrabold text-slate-700 text-sm mb-1">
            🛍️ Articole deținute: {student.purchasedItems.length}
          </p>
        </div>
      )}

      {/* Istoric */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-5">
        <h2 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-violet-500" />
          Istoric evenimente
        </h2>
        {events.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Star size={40} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">Niciun eveniment înregistrat.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {events.map((e) => (
              <div
                key={e.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  e.points > 0
                    ? "bg-emerald-50 border-emerald-100"
                    : "bg-rose-50 border-rose-100"
                }`}
              >
                <span className="text-lg">{e.points > 0 ? "⭐" : "💢"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {e.points > 0 ? `+${e.points} stele acordate` : `${e.points} stele scăzute`}
                  </p>
                  {e.note && (
                    <p className="text-xs text-slate-400 truncate italic">{e.note}</p>
                  )}
                </div>
                <span className={`flex items-center gap-0.5 font-extrabold text-sm ${
                  e.points > 0 ? "text-emerald-600" : "text-rose-600"
                }`}>
                  {e.points > 0 ? <TrendingUp size={14} /> : e.points < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
                  {e.points > 0 ? `+${e.points}` : e.points}
                </span>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(e.timestamp).toLocaleDateString("ro-RO", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
