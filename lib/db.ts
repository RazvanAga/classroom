import fs from "fs"
import path from "path"
import { Db } from "./types"

const DB_PATH = path.join(process.cwd(), "data", "db.json")

const DEFAULT_DB: Db = {
  students: [],
  events: [],
}

export function readDb(): Db {
  try {
    if (!fs.existsSync(DB_PATH)) {
      writeDb(DEFAULT_DB)
      return DEFAULT_DB
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8")
    return JSON.parse(raw) as Db
  } catch {
    return DEFAULT_DB
  }
}

export function writeDb(db: Db): void {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8")
}
