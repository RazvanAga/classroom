import { getLeaderboardByPeriod } from "@/lib/queries"
import StudentGrid from "@/components/StudentGrid"
import Leaderboard from "@/components/Leaderboard"
import { Star } from "lucide-react"

export default async function DashboardPage() {
  const allTime = await getLeaderboardByPeriod("all")
  const daily   = await getLeaderboardByPeriod("day")
  const weekly  = await getLeaderboardByPeriod("week")
  const monthly = await getLeaderboardByPeriod("month")

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-violet-600 to-indigo-500 rounded-3xl p-6 text-white shadow-xl shadow-purple-900/20">
        <div className="flex items-center gap-3 mb-1">
          <Star size={28} className="fill-yellow-300 text-yellow-300" />
          <h1 className="text-3xl font-extrabold tracking-tight">Clasa Steluțelor</h1>
          <Star size={28} className="fill-yellow-300 text-yellow-300" />
        </div>
        <p className="text-purple-100 text-sm mt-1">
          Apasă pe un elev pentru a-i acorda sau scădea stele ✦
        </p>
        <div className="mt-3 flex gap-4 text-sm font-semibold">
          <span className="bg-white/20 rounded-xl px-3 py-1">
            👧 {allTime.length} elevi
          </span>
          <span className="bg-white/20 rounded-xl px-3 py-1">
            ⭐ {allTime.reduce((s, e) => s + Math.max(0, e.totalPoints), 0)} stele acordate
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <StudentGrid students={allTime} />
        </div>
        <div>
          <Leaderboard allTime={allTime} daily={daily} weekly={weekly} monthly={monthly} />
        </div>
      </div>
    </div>
  )
}
