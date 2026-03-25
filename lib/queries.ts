import { readDb } from "./db"
import { StudentWithPoints, StudentStats } from "./types"

function getStartOfDay(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function getStartOfWeek(): Date {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const start = new Date(now.setDate(diff))
  start.setHours(0, 0, 0, 0)
  return start
}

function getStartOfMonth(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

export function getLeaderboardByPeriod(
  period: "all" | "day" | "week" | "month"
): StudentWithPoints[] {
  const db = readDb()

  let since: Date | null = null
  if (period === "day") since = getStartOfDay()
  if (period === "week") since = getStartOfWeek()
  if (period === "month") since = getStartOfMonth()

  const filteredEvents = since
    ? db.events.filter((e) => new Date(e.timestamp) >= since!)
    : db.events

  const pointsMap: Record<string, number> = {}
  for (const student of db.students) pointsMap[student.id] = 0
  for (const event of filteredEvents) {
    if (pointsMap[event.studentId] !== undefined) {
      pointsMap[event.studentId] += event.points
    }
  }

  const allTimeMap: Record<string, number> = {}
  for (const student of db.students) allTimeMap[student.id] = 0
  for (const event of db.events) {
    if (allTimeMap[event.studentId] !== undefined) {
      allTimeMap[event.studentId] += event.points
    }
  }

  const sorted = db.students
    .map((s) => ({
      ...s,
      totalPoints: pointsMap[s.id] ?? 0,
      shopBalance: (allTimeMap[s.id] ?? 0) - (s.spentPoints ?? 0),
      rank: 0,
    }))
    .sort((a, b) => b.shopBalance - a.shopBalance)

  return sorted.map((s, i) => ({ ...s, rank: i + 1 }))
}

export function getStudentStats(studentId: string): StudentStats | null {
  const db = readDb()

  const student = db.students.find((s) => s.id === studentId)
  if (!student) return null

  const startOfWeek = getStartOfWeek()
  const startOfMonth = getStartOfMonth()

  const studentEvents = db.events
    .filter((e) => e.studentId === studentId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const totalPoints = studentEvents.reduce((sum, e) => sum + e.points, 0)
  const weeklyPoints = studentEvents
    .filter((e) => new Date(e.timestamp) >= startOfWeek)
    .reduce((sum, e) => sum + e.points, 0)
  const monthlyPoints = studentEvents
    .filter((e) => new Date(e.timestamp) >= startOfMonth)
    .reduce((sum, e) => sum + e.points, 0)
  const shopBalance = totalPoints - (student.spentPoints ?? 0)

  return { student, totalPoints, weeklyPoints, monthlyPoints, shopBalance, events: studentEvents }
}

export function getAllStudents() {
  return readDb().students
}
