import Link from "next/link"
import Avatar from "@/components/Avatar"
import { SHOP_ITEMS } from "@/lib/shopItems"

const ACCESSORIES = SHOP_ITEMS.filter(i => i.type === "accessory")
const LOGOS       = SHOP_ITEMS.filter(i => i.type === "logo")
const BG_STYLES   = SHOP_ITEMS.filter(i => i.type === "bgStyle")
const HAIR_COLORS = SHOP_ITEMS.filter(i => i.type === "hairColor")
const OBIECTE     = SHOP_ITEMS.filter(i => i.type === "kendama")
const PETS        = SHOP_ITEMS.filter(i => i.type === "pet")

const SKIN_TONES = [
  { value: "light",  label: "Deschis" },
  { value: "medium", label: "Mediu" },
  { value: "warm",   label: "Cald" },
  { value: "dark",   label: "Închis" },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider mb-3">{title}</h2>
      <div className="flex flex-wrap gap-4">{children}</div>
    </section>
  )
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {children}
      <span className="text-xs text-slate-500 font-medium text-center max-w-[72px] leading-tight">{label}</span>
    </div>
  )
}

export default function DevPage() {
  return (
    <div className="space-y-10 pb-16">
      <div className="flex items-center gap-4">
        <Link
          href="/shop"
          className="p-2.5 rounded-xl bg-white border border-purple-100 hover:bg-violet-50 text-violet-600 transition-colors shadow-sm"
        >
          ←
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Preview accesorii</h1>
          <p className="text-sm text-slate-400 mt-0.5">Pagină de development — toate combinațiile de avatar</p>
        </div>
      </div>

      {/* Accesorii */}
      <Section title="Accesorii">
        <Card label="Niciunul">
          <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: "default" }} size={72} uid="prev-none" />
        </Card>
        {ACCESSORIES.map(item => (
          <Card key={item.id} label={`${item.emoji} ${item.name}`}>
            <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: item.value, bgStyle: "default" }} size={72} uid={`prev-${item.id}`} />
          </Card>
        ))}
      </Section>

      {/* Accesorii pe fată */}
      <Section title="Accesorii (fată)">
        <Card label="Niciunul">
          <Avatar gender="girl" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: "default" }} size={72} uid="prev-girl-none" />
        </Card>
        {ACCESSORIES.map(item => (
          <Card key={item.id} label={`${item.emoji} ${item.name}`}>
            <Avatar gender="girl" avatar={{ hairColor: "brown", skinTone: "light", accessory: item.value, bgStyle: "default" }} size={72} uid={`prev-girl-${item.id}`} />
          </Card>
        ))}
      </Section>

      {/* Animale de companie */}
      <Section title="Animale de companie">
        {PETS.map(item => (
          <Card key={item.id} label={`${item.emoji} ${item.name}`}>
            <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: "default", pet: item.value }} size={72} uid={`prev-${item.id}`} />
          </Card>
        ))}
      </Section>

      {/* Logos jocuri */}
      <Section title="Logos jocuri">
        {LOGOS.map(item => (
          <Card key={item.id} label={item.name}>
            <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: "default", logo: item.value }} size={72} uid={`prev-${item.id}`} />
          </Card>
        ))}
      </Section>

      {/* Fundaluri */}
      <Section title="Fundaluri">
        <Card label="Default">
          <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: "default" }} size={72} uid="prev-bg-default" />
        </Card>
        {BG_STYLES.map(item => (
          <Card key={item.id} label={`${item.emoji} ${item.name}`}>
            <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: item.value }} size={72} uid={`prev-${item.id}`} />
          </Card>
        ))}
      </Section>

      {/* Obiecte */}
      <Section title="Obiecte">
        {OBIECTE.map(item => (
          <Card key={item.id} label={item.name}>
            <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: "default", object: item.value }} size={72} uid={`prev-${item.id}`} />
          </Card>
        ))}
      </Section>

      {/* Culori de păr */}
      <Section title="Culori de păr">
        <Card label="Maro (default)">
          <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: null, bgStyle: "default" }} size={72} uid="prev-hair-brown" />
        </Card>
        {HAIR_COLORS.map(item => (
          <Card key={item.id} label={`${item.emoji} ${item.name}`}>
            <Avatar gender="boy" avatar={{ hairColor: item.value, skinTone: "light", accessory: null, bgStyle: "default" }} size={72} uid={`prev-${item.id}`} />
          </Card>
        ))}
      </Section>

      {/* Tonuri de piele */}
      <Section title="Tonuri de piele">
        {SKIN_TONES.map(skin => (
          <Card key={skin.value} label={skin.label}>
            <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: skin.value, accessory: null, bgStyle: "default" }} size={72} uid={`prev-skin-${skin.value}`} />
          </Card>
        ))}
      </Section>

      {/* Combinații accesoriu + fundal */}
      <Section title="Combinații accesoriu + fundal">
        {ACCESSORIES.flatMap(acc =>
          BG_STYLES.map(bg => (
            <Card key={`${acc.id}-${bg.id}`} label={`${acc.emoji}+${bg.emoji}`}>
              <Avatar gender="boy" avatar={{ hairColor: "brown", skinTone: "light", accessory: acc.value, bgStyle: bg.value }} size={72} uid={`prev-combo-${acc.id}-${bg.id}`} />
            </Card>
          ))
        )}
      </Section>
    </div>
  )
}
