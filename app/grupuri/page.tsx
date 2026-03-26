import { getAllStudents } from "@/lib/queries"
import GrupuriClient from "./GrupuriClient"

export default async function GrupuriPage() {
  const students = await getAllStudents()
  return <GrupuriClient students={students} />
}
