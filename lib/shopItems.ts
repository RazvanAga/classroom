import { ShopItem } from "./types"

export const SHOP_ITEMS: ShopItem[] = [
  // --- Culori de păr ---
  { id: "hair-black",  name: "Păr negru",    emoji: "🖤", type: "hairColor", value: "black",  price: 5  },
  { id: "hair-blonde", name: "Păr blond",    emoji: "✨", type: "hairColor", value: "blonde", price: 10 },
  { id: "hair-red",    name: "Păr roșcat",   emoji: "🔥", type: "hairColor", value: "red",    price: 15 },
  { id: "hair-blue",   name: "Păr albastru", emoji: "💙", type: "hairColor", value: "blue",   price: 20 },
  { id: "hair-pink",   name: "Păr roz",      emoji: "🩷", type: "hairColor", value: "pink",   price: 20 },
  { id: "hair-white",  name: "Păr alb",      emoji: "⬜", type: "hairColor", value: "white",  price: 25 },
  { id: "hair-green",  name: "Păr verde",    emoji: "💚", type: "hairColor", value: "green",  price: 20 },

  // --- Accesorii ---
  { id: "acc-bow",              name: "Fundiță",        emoji: "🎀", type: "accessory", value: "bow",              price: 10 },
  { id: "acc-glasses",          name: "Ochelari cool",  emoji: "😎", type: "accessory", value: "glasses",          price: 15 },
  { id: "acc-hat",              name: "Pălărie",        emoji: "🎩", type: "accessory", value: "hat",              price: 20 },
  { id: "phys-masca",           name: "Mască",          emoji: "🎭", type: "accessory", value: "mask",             price: 20 },
  { id: "acc-crown",            name: "Coroană",        emoji: "👑", type: "accessory", value: "crown",            price: 30 },
  { id: "acc-halo",             name: "Nimb",           emoji: "😇", type: "accessory", value: "halo",             price: 35 },
  { id: "acc-star",             name: "Stea de aur",    emoji: "⭐", type: "accessory", value: "star",             price: 40 },
  { id: "acc-badge-fortnite",   name: "Logo Fortnite",    emoji: "🎮", type: "logo", value: "badge-fortnite",   price: 50 },
  { id: "acc-badge-brawlstars", name: "Logo Brawl Stars",  emoji: "🎮", type: "logo", value: "badge-brawlstars", price: 50 },
  { id: "acc-badge-roblox",     name: "Logo Roblox",       emoji: "🎮", type: "logo", value: "badge-roblox",     price: 50 },
  { id: "acc-badge-minecraft",  name: "Logo Minecraft",    emoji: "🎮", type: "logo", value: "badge-minecraft",  price: 50 },

  // --- Fundaluri ---
  { id: "bg-stars",   name: "Fundal stele",    emoji: "🌌", type: "bgStyle", value: "stars",   price: 20 },
  { id: "bg-rainbow", name: "Fundal curcubeu", emoji: "🌈", type: "bgStyle", value: "rainbow", price: 25 },
  { id: "bg-glitter", name: "Fundal sclipici", emoji: "✨", type: "bgStyle", value: "glitter", price: 30 },
  { id: "bg-gold",    name: "Fundal auriu",    emoji: "🌟", type: "bgStyle", value: "gold",    price: 40 },

  // --- Animale de companie ---
  { id: "pet-cat",      name: "Pisică",   emoji: "🐱", type: "pet", value: "cat",      price: 30 },
  { id: "pet-dog",      name: "Câine",    emoji: "🐶", type: "pet", value: "dog",      price: 30 },
  { id: "pet-bunny",    name: "Iepure",   emoji: "🐰", type: "pet", value: "bunny",    price: 30 },
  { id: "pet-panda",    name: "Panda",    emoji: "🐼", type: "pet", value: "panda",    price: 35 },
  { id: "pet-koala",    name: "Koala",    emoji: "🐨", type: "pet", value: "koala",    price: 35 },
  { id: "pet-capybara", name: "Capybara", emoji: "🐾", type: "pet", value: "capybara", price: 35 },
  { id: "pet-stitch",   name: "Stitch",   emoji: "💙", type: "pet", value: "stitch",   price: 50 },
  { id: "pet-puisor",   name: "Puișor",   emoji: "🐣", type: "pet", value: "puisor",   price: 30 },
  { id: "pet-arici",    name: "Arici",    emoji: "🦔", type: "pet", value: "arici",    price: 35 },
  { id: "pet-peste",    name: "Pește",    emoji: "🐟", type: "pet", value: "peste",    price: 30 },

  // --- Obiecte ---
  { id: "phys-telefon",   name: "Telefon",          emoji: "📱", type: "kendama", value: "phone",          price: 40 },
  { id: "phys-carti",     name: "Teanc cărți",      emoji: "📚", type: "kendama", value: "books",          price: 25 },
  { id: "obj-televizor",  name: "Televizor",         emoji: "📺", type: "kendama", value: "televizor",      price: 35 },
  { id: "obj-manusi-box", name: "Mănuși de box",     emoji: "🥊", type: "kendama", value: "manusi-box",     price: 40 },
  { id: "obj-minge",      name: "Minge de fotbal",   emoji: "⚽", type: "kendama", value: "minge-fotbal",   price: 25 },
  { id: "kendama-blue",   name: "Kendama albastru", emoji: "🪀", type: "kendama", value: "kendama-blue",   price: 30 },
  { id: "kendama-pink",   name: "Kendama roz",      emoji: "🪀", type: "kendama", value: "kendama-pink",   price: 30 },
  { id: "kendama-green",  name: "Kendama verde",    emoji: "🪀", type: "kendama", value: "kendama-green",  price: 30 },
  { id: "kendama-yellow", name: "Kendama galben",   emoji: "🪀", type: "kendama", value: "kendama-yellow", price: 30 },
  { id: "kendama-white",  name: "Kendama alb",      emoji: "🪀", type: "kendama", value: "kendama-white",  price: 30 },
  { id: "kendama-black",  name: "Kendama negru",    emoji: "🪀", type: "kendama", value: "kendama-black",  price: 30 },
  { id: "kendama-purple", name: "Kendama mov",      emoji: "🪀", type: "kendama", value: "kendama-purple", price: 30 },
]
