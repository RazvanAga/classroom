import { kv } from "@vercel/kv"
import fs from "fs"
import path from "path"
import { Db } from "./types"

const DB_KEY = "db"
const DB_PATH = path.join(process.cwd(), "data", "db.json")

const DEFAULT_DB: Db = { students: [], events: [] }

export async function readDb(): Promise<Db> {
  try {
    const data = await kv.get<Db>(DB_KEY)
    if (data) return data
    // Prima rulare: migrează automat din db.json
    const raw = fs.readFileSync(DB_PATH, "utf-8")
    const fromFile = JSON.parse(raw) as Db
    await kv.set(DB_KEY, fromFile)
    return fromFile
  } catch {
    return DEFAULT_DB
  }
}

export async function writeDb(db: Db): Promise<void> {
  await kv.set(DB_KEY, db)
}
