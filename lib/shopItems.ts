import { ShopItem } from "./types"

export const SHOP_ITEMS: ShopItem[] = [
  // --- Culori de păr ---
  { id: "hair-black",  name: "Păr negru",    emoji: "🖤", type: "hairColor", value: "black",  price: 5  },
  { id: "hair-blonde", name: "Păr blond",    emoji: "✨", type: "hairColor", value: "blonde", price: 10 },
  { id: "hair-red",    name: "Păr roșcat",   emoji: "🔥", type: "hairColor", value: "red",    price: 15 },
  { id: "hair-blue",   name: "Păr albastru", emoji: "💙", type: "hairColor", value: "blue",   price: 20 },
  { id: "hair-pink",   name: "Păr roz",      emoji: "🩷", type: "hairColor", value: "pink",   price: 20 },
  { id: "hair-white",  name: "Păr alb",      emoji: "⬜", type: "hairColor", value: "white",  price: 25 },

  // --- Accesorii ---
  { id: "acc-bow",     name: "Fundiță",       emoji: "🎀", type: "accessory", value: "bow",     price: 10 },
  { id: "acc-glasses", name: "Ochelari cool", emoji: "😎", type: "accessory", value: "glasses", price: 15 },
  { id: "acc-hat",     name: "Pălărie",       emoji: "🎩", type: "accessory", value: "hat",     price: 20 },
  { id: "acc-crown",   name: "Coroană",       emoji: "👑", type: "accessory", value: "crown",   price: 30 },
  { id: "acc-halo",    name: "Nimb",          emoji: "😇", type: "accessory", value: "halo",    price: 35 },
  { id: "acc-star",    name: "Stea de aur",   emoji: "⭐", type: "accessory", value: "star",    price: 40 },

  // --- Fundaluri ---
  { id: "bg-stars",    name: "Fundal stele",    emoji: "🌌", type: "bgStyle", value: "stars",   price: 20 },
  { id: "bg-rainbow",  name: "Fundal curcubeu", emoji: "🌈", type: "bgStyle", value: "rainbow", price: 25 },
  { id: "bg-gold",     name: "Fundal auriu",    emoji: "🌟", type: "bgStyle", value: "gold",    price: 40 },
]
