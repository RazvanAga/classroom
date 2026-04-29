"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import { readDb, writeDb } from "./db"
import { SHOP_ITEMS } from "./shopItems"

export async function addEvent(
  studentId: string,
  points: number,
  note?: string
) {
  const db = await readDb()
  db.events.push({
    id: uuidv4(),
    studentId,
    points,
    timestamp: new Date().toISOString(),
    note,
  })
  await writeDb(db)
  revalidatePath("/")
  revalidatePath(`/elevi/${studentId}`)
  revalidatePath("/shop")
}

export async function undoLastEvent(studentId: string) {
  const db = await readDb()
  const idx = [...db.events].reverse().findIndex((e) => e.studentId === studentId)
  if (idx !== -1) {
    const realIdx = db.events.length - 1 - idx
    db.events.splice(realIdx, 1)
    await writeDb(db)
  }
  revalidatePath("/")
  revalidatePath(`/elevi/${studentId}`)
  revalidatePath("/shop")
}

export async function purchaseItem(
  studentId: string,
  itemId: string
): Promise<{ ok: boolean; message?: string }> {
  const item = SHOP_ITEMS.find((i) => i.id === itemId)
  if (!item) return { ok: false, message: "Articol inexistent." }

  const db = await readDb()
  const student = db.students.find((s) => s.id === studentId)
  if (!student) return { ok: false, message: "Elev inexistent." }

  const totalPoints = db.events
    .filter((e) => e.studentId === studentId)
    .reduce((sum, e) => sum + e.points, 0)
  const balance = totalPoints - (student.spentPoints ?? 0)

  if (balance < item.price) {
    return { ok: false, message: `Nu sunt suficiente stele. Ai nevoie de ${item.price}, ai ${balance}.` }
  }

  student.spentPoints = (student.spentPoints ?? 0) + item.price

  if (item.value !== "") {
    if (!student.purchasedItems) student.purchasedItems = []
    if (!student.purchasedItems.includes(itemId)) {
      student.purchasedItems.push(itemId)
    }
    if (!student.avatar) {
      student.avatar = { hairColor: "blonde", skinTone: "light", accessory: null, bgStyle: "default", object: null, logo: null, pet: null }
    }
    if (item.type === "hairColor") student.avatar.hairColor = item.value
    if (item.type === "accessory") student.avatar.accessory = item.value
    if (item.type === "bgStyle")   student.avatar.bgStyle   = item.value
    if (item.type === "kendama" && item.value) student.avatar.object = item.value
    if (item.type === "logo")      student.avatar.logo      = item.value
    if (item.type === "pet")       student.avatar.pet       = item.value
  }

  await writeDb(db)
  revalidatePath("/")
  revalidatePath(`/elevi/${studentId}`)
  revalidatePath("/shop")

  return { ok: true }
}

export async function equipItem(studentId: string, itemId: string) {
  const item = SHOP_ITEMS.find((i) => i.id === itemId)
  if (!item) return

  const db = await readDb()
  const student = db.students.find((s) => s.id === studentId)
  if (!student) return
  if (!student.purchasedItems?.includes(itemId)) return

  if (item.type === "hairColor") student.avatar.hairColor = item.value
  if (item.type === "accessory") student.avatar.accessory = item.value
  if (item.type === "bgStyle")   student.avatar.bgStyle   = item.value
  if (item.type === "kendama")   student.avatar.object    = item.value
  if (item.type === "logo")      student.avatar.logo      = item.value
  if (item.type === "pet")       student.avatar.pet       = item.value

  await writeDb(db)
  revalidatePath("/")
  revalidatePath(`/elevi/${studentId}`)
  revalidatePath("/shop")
}

export async function removeAccessory(studentId: string) {
  const db = await readDb()
  const student = db.students.find((s) => s.id === studentId)
  if (!student) return
  student.avatar.accessory = null
  await writeDb(db)
  revalidatePath("/")
  revalidatePath(`/elevi/${studentId}`)
  revalidatePath("/shop")
}

export async function addStudent(name: string, gender: "boy" | "girl" = "boy") {
  const db = await readDb()
  const trimmed = name.trim()
  if (!trimmed) return
  db.students.push({
    id: uuidv4(),
    name: trimmed,
    createdAt: new Date().toISOString(),
    gender,
    avatar: { hairColor: "blonde", skinTone: "light", accessory: null, bgStyle: "default", object: null, logo: null, pet: null },
    purchasedItems: [],
    spentPoints: 0,
  })
  await writeDb(db)
  revalidatePath("/")
  revalidatePath("/setari")
}

export async function addEventToAll(points: number, note?: string) {
  const db = await readDb()
  const timestamp = new Date().toISOString()
  for (const student of db.students) {
    db.events.push({
      id: uuidv4(),
      studentId: student.id,
      points,
      timestamp,
      note,
    })
  }
  await writeDb(db)
  revalidatePath("/")
  revalidatePath("/shop")
}

export async function deleteStudent(id: string) {
  const db = await readDb()
  db.students = db.students.filter((s) => s.id !== id)
  db.events = db.events.filter((e) => e.studentId !== id)
  await writeDb(db)
  revalidatePath("/")
  revalidatePath("/setari")
}
