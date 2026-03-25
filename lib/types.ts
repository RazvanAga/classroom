export interface AvatarConfig {
  hairColor: string
  skinTone: string
  accessory: string | null
  bgStyle: string
}

export interface Student {
  id: string
  name: string
  createdAt: string
  gender: "boy" | "girl"
  avatar: AvatarConfig
  purchasedItems: string[]
  spentPoints: number
}

export interface Event {
  id: string
  studentId: string
  points: number
  timestamp: string
  note?: string
}

export interface ShopItem {
  id: string
  name: string
  emoji: string
  type: "hairColor" | "accessory" | "bgStyle"
  value: string
  price: number
}

export interface Db {
  students: Student[]
  events: Event[]
}

export interface StudentWithPoints extends Student {
  totalPoints: number
  rank: number
  shopBalance: number
}

export interface StudentStats {
  student: Student
  totalPoints: number
  weeklyPoints: number
  monthlyPoints: number
  shopBalance: number
  events: Event[]
}
