import { getLeaderboardByPeriod } from "@/lib/queries"
import { SHOP_ITEMS } from "@/lib/shopItems"
import ShopClient from "./ShopClient"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string }>
}) {
  const students = await getLeaderboardByPeriod("all")
  return <ShopClient students={students} shopItems={SHOP_ITEMS} />
}
