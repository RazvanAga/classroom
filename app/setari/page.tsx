import { getAllStudents } from "@/lib/queries"
import SetariClient from "./SetariClient"

export default async function SetariPage() {
  const students = await getAllStudents()
  return <SetariClient students={students} />
}
