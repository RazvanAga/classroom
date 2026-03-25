import { getAllStudents } from "@/lib/queries"
import GrupuriClient from "./GrupuriClient"

export default function GrupuriPage() {
  const students = getAllStudents()
  return <GrupuriClient students={students} />
}
