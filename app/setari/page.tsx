import { getAllStudents } from "@/lib/queries"
import SetariClient from "./SetariClient"

export default function SetariPage() {
  const students = getAllStudents()
  return <SetariClient students={students} />
}
