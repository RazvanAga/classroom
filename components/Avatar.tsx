import { AvatarConfig } from "@/lib/types"

const SKIN: Record<string, string> = {
  light:  "#FFE0BD",
  medium: "#F1C27D",
  dark:   "#C68642",
  warm:   "#FFCD94",
}

const HAIR: Record<string, string> = {
  brown:  "#6B3A2A",
  black:  "#1C1C1C",
  blonde: "#E8C840",
  red:    "#B03020",
  blue:   "#2980B9",
  pink:   "#E91E8C",
  white:  "#DCDCDC",
  green:  "#2ECC40",
}

interface Props {
  gender: "boy" | "girl"
  avatar: AvatarConfig
  size?: number
  uid?: string
}

const KENDAMA_VARIANTS = new Set([
  "kendama-blue", "kendama-pink", "kendama-green", "kendama-yellow",
  "kendama-white", "kendama-black", "kendama-purple",
  "phone", "books", "televizor", "manusi-box", "minge-fotbal",
])

function KendamaFilter({ id, variant }: { id: string; variant: string }) {
  if (variant === "kendama-yellow") return (
    <filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix type="saturate" values="0" result="g"/>
      <feColorMatrix in="g" type="matrix" values="1 0 0 0 0  1 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    </filter>
  )
  if (variant === "kendama-white") return (
    <filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix type="saturate" values="0" result="g"/>
      <feComponentTransfer in="g">
        <feFuncR type="linear" slope="1.6" intercept="0.15"/>
        <feFuncG type="linear" slope="1.6" intercept="0.15"/>
        <feFuncB type="linear" slope="1.6" intercept="0.15"/>
      </feComponentTransfer>
    </filter>
  )
  if (variant === "kendama-black") return (
    <filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix type="saturate" values="0" result="g"/>
      <feComponentTransfer in="g">
        <feFuncR type="linear" slope="0.3"/>
        <feFuncG type="linear" slope="0.3"/>
        <feFuncB type="linear" slope="0.3"/>
      </feComponentTransfer>
    </filter>
  )
  if (variant === "kendama-purple") return (
    <filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix type="saturate" values="0" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0.6 0 0 0 0  0 0 0 0 0  1 0 0 0 0  0 0 0 1 0"/>
    </filter>
  )
  const hues: Record<string, number> = { "kendama-blue": 240, "kendama-pink": 300, "kendama-green": 120 }
  return (
    <filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix type="hueRotate" values={String(hues[variant] ?? 0)}/>
    </filter>
  )
}

export default function Avatar({ gender, avatar, size = 64, uid = "a" }: Props) {
  const skin = SKIN[avatar.skinTone] ?? SKIN.light
  const hair = HAIR[avatar.hairColor] ?? HAIR.brown
  const currentObject = avatar.object ?? null
  const currentLogo   = avatar.logo   ?? null
  const currentPet    = avatar.pet    ?? null
  const isObject = currentObject != null && KENDAMA_VARIANTS.has(currentObject)
  const clipId = `hc-${uid}`
  const bgId   = `bg-${uid}`
  const goldId = `gd-${uid}`

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ display: "block" }}>
      <defs>
        {/* Clip hair to top half of head */}
        <clipPath id={clipId}>
          <rect x="0" y="0" width="80" height="50" />
        </clipPath>
        {/* Rainbow bg gradient */}
        <linearGradient id={bgId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FF6B6B"/>
          <stop offset="33%"  stopColor="#FFE66D"/>
          <stop offset="66%"  stopColor="#6BCB77"/>
          <stop offset="100%" stopColor="#4D96FF"/>
        </linearGradient>
        {/* Gold bg gradient */}
        <radialGradient id={goldId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF176"/>
          <stop offset="100%" stopColor="#CC8800"/>
        </radialGradient>
      </defs>

      {/* ── Background ── */}
      {avatar.bgStyle === "rainbow" && <rect x="0" y="0" width="80" height="80" fill={`url(#${bgId})`} />}
      {avatar.bgStyle === "gold"    && <rect x="0" y="0" width="80" height="80" fill={`url(#${goldId})`} />}
      {avatar.bgStyle === "stars"   && (
        <>
          <rect x="0" y="0" width="80" height="80" fill="#1a1a4e"/>
          {[[12,14],[68,18],[18,62],[62,66],[40,8],[22,38],[58,40],[40,72]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.7"/>
          ))}
          {[[26,24],[54,28],[40,68],[14,50],[66,52]].map(([x,y],i) => (
            <text key={i} x={x} y={y} fontSize="7" fill="#FFD700" textAnchor="middle">★</text>
          ))}
        </>
      )}
      {avatar.bgStyle === "glitter" && (
        <>
          <rect x="0" y="0" width="80" height="80" fill="#fce4f3"/>
          {[[10,10],[70,8],[20,70],[65,72],[40,5],[5,40],[75,45],[35,75],[55,20],[15,55],[62,35],[50,50],[28,28]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.2" fill="#FFD700" opacity="0.85"/>
          ))}
          {[[25,15],[55,12],[8,60],[72,62],[42,78],[18,32],[68,28],[38,60]].map(([x,y],i) => (
            <text key={i} x={x} y={y} fontSize="7" fill="#FFD700" textAnchor="middle" opacity="0.9">✦</text>
          ))}
          {[[35,40],[60,55],[15,45],[50,70],[22,20],[68,48]].map(([x,y],i) => (
            <text key={i} x={x} y={y} fontSize="5" fill="#FF69B4" textAnchor="middle" opacity="0.75">✧</text>
          ))}
        </>
      )}
      {(!avatar.bgStyle || avatar.bgStyle === "default") &&
        <rect x="0" y="0" width="80" height="80" fill="#EDE9FE"/>
      }

      {/* ── Girl side hair (behind head) ── */}
      {gender === "girl" && (
        <>
          <ellipse cx="14" cy="57" rx="7" ry="18" fill={hair} />
          <ellipse cx="66" cy="57" rx="7" ry="18" fill={hair} />
        </>
      )}

      {/* ── Hair (clipped to top, drawn BEFORE head so face is on top) ── */}
      <circle cx="40" cy="40" r="28" fill={hair} clipPath={`url(#${clipId})`} />

      {/* ── Ears ── */}
      <circle cx="17" cy="46" r="5.5" fill={skin} />
      <circle cx="63" cy="46" r="5.5" fill={skin} />
      <circle cx="17" cy="46" r="3"   fill={skin} opacity="0.6" />
      <circle cx="63" cy="46" r="3"   fill={skin} opacity="0.6" />

      {/* ── Head ── */}
      <circle cx="40" cy="46" r="24" fill={skin} />

      {/* ── Eyebrows ── */}
      <path d="M 29,38 Q 33,35 37,37" stroke="#3a2010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 43,37 Q 47,35 51,38" stroke="#3a2010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* ── Eyes ── */}
      <circle cx="33" cy="43" r="4" fill="#2C1810"/>
      <circle cx="47" cy="43" r="4" fill="#2C1810"/>
      {/* Iris colour */}
      <circle cx="33" cy="43" r="2.5" fill="#5B3A29"/>
      <circle cx="47" cy="43" r="2.5" fill="#5B3A29"/>
      {/* Shine */}
      <circle cx="35" cy="41.5" r="1.3" fill="white"/>
      <circle cx="49" cy="41.5" r="1.3" fill="white"/>

      {/* ── Girl lashes ── */}
      {gender === "girl" && (
        <>
          <line x1="29.5" y1="39.5" x2="28"   y2="37.5" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="33"   y1="39"   x2="33"   y2="36.8" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="36.5" y1="39.5" x2="38"   y2="37.5" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="43.5" y1="39.5" x2="42"   y2="37.5" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="47"   y1="39"   x2="47"   y2="36.8" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="50.5" y1="39.5" x2="52"   y2="37.5" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round"/>
        </>
      )}

      {/* ── Nose ── */}
      <ellipse cx="40" cy="50" rx="2" ry="1.5" fill="#C8956C" opacity="0.5"/>

      {/* ── Smile ── */}
      <path d="M 32,55 Q 40,63 48,55" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* ── Cheeks ── */}
      <circle cx="27" cy="52" r="5" fill="#FFB6C1" opacity="0.35"/>
      <circle cx="53" cy="52" r="5" fill="#FFB6C1" opacity="0.35"/>

      {/* ── Accessories ── */}
      {avatar.accessory === "bow" && (
        <>
          <path d="M 40,15 Q 28,7 24,15 Q 28,23 40,15" fill="#FF69B4"/>
          <path d="M 40,15 Q 52,7 56,15 Q 52,23 40,15" fill="#FF69B4"/>
          <circle cx="40" cy="15" r="4" fill="#FF1493"/>
          <circle cx="40" cy="15" r="2" fill="#FF69B4"/>
        </>
      )}
      {avatar.accessory === "glasses" && (
        <>
          <rect x="25" y="39" width="13" height="10" rx="4" fill="rgba(0,0,0,0.85)" stroke="#555" strokeWidth="2"/>
          <rect x="42" y="39" width="13" height="10" rx="4" fill="rgba(0,0,0,0.85)" stroke="#555" strokeWidth="2"/>
          <line x1="38" y1="39" x2="42" y2="39" stroke="#555" strokeWidth="2"/>
          <line x1="22" y1="40" x2="25" y2="40" stroke="#555" strokeWidth="1.5"/>
          <line x1="55" y1="40" x2="58" y2="40" stroke="#555" strokeWidth="1.5"/>
        </>
      )}
      {avatar.accessory === "hat" && (
        <>
          <ellipse cx="40" cy="27" rx="22" ry="5" fill="#222"/>
          <rect x="26" y="6" width="28" height="23" rx="3" fill="#222"/>
          <rect x="26" y="24" width="28" height="4"  rx="1" fill="#CC0000"/>
        </>
      )}
      {avatar.accessory === "crown" && (
        <>
          <path d="M 20,28 L 20,16 L 30,22 L 40,10 L 50,22 L 60,16 L 60,28 Z" fill="#FFD700"/>
          <rect x="18" y="26" width="44" height="7" rx="2" fill="#FFD700"/>
          <circle cx="40" cy="18" r="3.5" fill="#FF4444"/>
          <circle cx="28" cy="25" r="2.5" fill="#4488FF"/>
          <circle cx="52" cy="25" r="2.5" fill="#44CC44"/>
          {/* Shine */}
          <circle cx="40" cy="18" r="1.2" fill="white" opacity="0.7"/>
        </>
      )}
      {avatar.accessory === "halo" && (
        <ellipse cx="40" cy="14" rx="20" ry="6" fill="none" stroke="#FFD700" strokeWidth="3.5" opacity="0.9"/>
      )}
      {/* ── Animale de companie ── */}
      {currentPet === "cat" && (
        <>
          <path d="M 18,73 Q 28,65 24,58" stroke="#FF8C42" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <ellipse cx="10" cy="73" rx="9" ry="5" fill="#FF8C42"/>
          <circle cx="10" cy="63" r="7" fill="#FF8C42"/>
          <path d="M 5,57 L 4,51 L 9,56 Z" fill="#FF8C42"/>
          <path d="M 15,57 L 16,51 L 11,56 Z" fill="#FF8C42"/>
          <path d="M 5.5,56.5 L 5,52 L 9,56 Z" fill="#FFB6C1"/>
          <path d="M 14.5,56.5 L 15,52 L 11,56 Z" fill="#FFB6C1"/>
          <ellipse cx="7.5" cy="63" rx="2" ry="2.2" fill="#2a2a2a"/>
          <ellipse cx="12.5" cy="63" rx="2" ry="2.2" fill="#2a2a2a"/>
          <circle cx="8" cy="62.5" r="0.7" fill="white"/>
          <circle cx="13" cy="62.5" r="0.7" fill="white"/>
          <ellipse cx="10" cy="66" rx="1.2" ry="0.8" fill="#FF69B4"/>
          <line x1="4" y1="65.5" x2="8.5" y2="66.5" stroke="#aaa" strokeWidth="0.7"/>
          <line x1="4" y1="67" x2="8.5" y2="67.5" stroke="#aaa" strokeWidth="0.7"/>
          <line x1="11.5" y1="66.5" x2="16" y2="65.5" stroke="#aaa" strokeWidth="0.7"/>
          <line x1="11.5" y1="67.5" x2="16" y2="67" stroke="#aaa" strokeWidth="0.7"/>
        </>
      )}
      {currentPet === "dog" && (
        <>
          <path d="M 19,72 Q 27,64 23,59" stroke="#C68642" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <ellipse cx="10" cy="73" rx="9" ry="5" fill="#C68642"/>
          <ellipse cx="4"  cy="65" rx="3" ry="5" fill="#A0522D"/>
          <ellipse cx="16" cy="65" rx="3" ry="5" fill="#A0522D"/>
          <circle cx="10" cy="63" r="7" fill="#C68642"/>
          <circle cx="7.5" cy="62" r="2" fill="#2a2a2a"/>
          <circle cx="12.5" cy="62" r="2" fill="#2a2a2a"/>
          <circle cx="8"   cy="61.5" r="0.7" fill="white"/>
          <circle cx="13"  cy="61.5" r="0.7" fill="white"/>
          <ellipse cx="10" cy="66"   rx="2.5" ry="1.5" fill="#1a1a1a"/>
          <ellipse cx="10" cy="69"   rx="2"   ry="2.5" fill="#FF69B4"/>
        </>
      )}
      {currentPet === "panda" && (
        <>
          <ellipse cx="11" cy="73" rx="9" ry="5.5" fill="white"/>
          <ellipse cx="5"  cy="72" rx="3.5" ry="4"  fill="#1a1a1a"/>
          <ellipse cx="17" cy="72" rx="3.5" ry="4"  fill="#1a1a1a"/>
          <circle cx="6"  cy="56" r="4" fill="#1a1a1a"/>
          <circle cx="16" cy="56" r="4" fill="#1a1a1a"/>
          <circle cx="11" cy="63" r="8" fill="white"/>
          <ellipse cx="7.5"  cy="62" rx="3"   ry="2.5" fill="#1a1a1a"/>
          <ellipse cx="14.5" cy="62" rx="3"   ry="2.5" fill="#1a1a1a"/>
          <circle cx="7.5"  cy="62" r="1.3" fill="white"/>
          <circle cx="14.5" cy="62" r="1.3" fill="white"/>
          <circle cx="7.8"  cy="62" r="0.7" fill="#1a1a1a"/>
          <circle cx="14.8" cy="62" r="0.7" fill="#1a1a1a"/>
          <ellipse cx="11" cy="66" rx="1.5" ry="1" fill="#1a1a1a"/>
        </>
      )}
      {currentPet === "koala" && (
        <>
          <ellipse cx="11" cy="73" rx="9" ry="5.5" fill="#9E9E9E"/>
          <circle cx="5"  cy="56" r="5.5" fill="#9E9E9E"/>
          <circle cx="17" cy="56" r="5.5" fill="#9E9E9E"/>
          <circle cx="5"  cy="56" r="3.5" fill="#BDBDBD"/>
          <circle cx="17" cy="56" r="3.5" fill="#BDBDBD"/>
          <circle cx="11" cy="64" r="8" fill="#9E9E9E"/>
          <ellipse cx="11" cy="67.5" rx="3.5" ry="2.5" fill="#424242"/>
          <circle cx="7"   cy="62"   r="2"   fill="#1a1a1a"/>
          <circle cx="15"  cy="62"   r="2"   fill="#1a1a1a"/>
          <circle cx="7.5" cy="61.5" r="0.8" fill="white"/>
          <circle cx="15.5" cy="61.5" r="0.8" fill="white"/>
        </>
      )}
      {currentPet === "capybara" && (
        <>
          <rect x="2"  y="67" width="20" height="12" rx="4" fill="#C19A6B"/>
          <ellipse cx="7"  cy="57" rx="3"  ry="2.5" fill="#C19A6B"/>
          <ellipse cx="15" cy="57" rx="3"  ry="2.5" fill="#C19A6B"/>
          <rect x="3"  y="58" width="18" height="13" rx="4" fill="#C19A6B"/>
          <rect x="5"  y="65" width="14" height="7"  rx="3" fill="#A0785A"/>
          <circle cx="9"   cy="68"   r="1.2" fill="#7A5C44"/>
          <circle cx="13"  cy="68"   r="1.2" fill="#7A5C44"/>
          <circle cx="7"   cy="62"   r="1.8" fill="#1a1a1a"/>
          <circle cx="15"  cy="62"   r="1.8" fill="#1a1a1a"/>
          <circle cx="7.4" cy="61.5" r="0.7" fill="white"/>
          <circle cx="15.4" cy="61.5" r="0.7" fill="white"/>
        </>
      )}
      {currentPet === "stitch" && (
        <>
          <ellipse cx="11" cy="73" rx="9" ry="5.5" fill="#4FC3F7"/>
          <ellipse cx="5"  cy="55" rx="4" ry="6.5" fill="#4FC3F7" transform="rotate(-15 5 55)"/>
          <ellipse cx="17" cy="55" rx="4" ry="6.5" fill="#4FC3F7" transform="rotate(15 17 55)"/>
          <ellipse cx="5"  cy="55" rx="2" ry="4.5" fill="#81D4FA" opacity="0.6" transform="rotate(-15 5 55)"/>
          <ellipse cx="17" cy="55" rx="2" ry="4.5" fill="#81D4FA" opacity="0.6" transform="rotate(15 17 55)"/>
          <circle cx="11" cy="64" r="8" fill="#4FC3F7"/>
          <circle cx="7.5"  cy="62" r="3"   fill="#1a237e"/>
          <circle cx="14.5" cy="62" r="3"   fill="#1a237e"/>
          <circle cx="8"    cy="61.5" r="1.2" fill="white"/>
          <circle cx="15"   cy="61.5" r="1.2" fill="white"/>
          <ellipse cx="11" cy="66.5" rx="1.5" ry="1" fill="#1565C0"/>
          <path d="M 7,69 Q 11,73 15,69" stroke="#1565C0" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <line x1="9"  y1="69.5" x2="9"  y2="71"   stroke="white" strokeWidth="1"/>
          <line x1="11" y1="70"   x2="11" y2="71.5"  stroke="white" strokeWidth="1"/>
          <line x1="13" y1="69.5" x2="13" y2="71"    stroke="white" strokeWidth="1"/>
        </>
      )}
      {currentPet === "bunny" && (
        <>
          <ellipse cx="7"  cy="57" rx="3"   ry="8"   fill="#f0f0f0"/>
          <ellipse cx="13" cy="57" rx="3"   ry="8"   fill="#f0f0f0"/>
          <ellipse cx="7"  cy="57" rx="1.5" ry="6.5" fill="#FFB6C1"/>
          <ellipse cx="13" cy="57" rx="1.5" ry="6.5" fill="#FFB6C1"/>
          <ellipse cx="10" cy="74" rx="9"   ry="5.5" fill="#f0f0f0"/>
          <circle cx="10" cy="64" r="7" fill="#f0f0f0"/>
          <circle cx="7.5" cy="63" r="2" fill="#FF69B4"/>
          <circle cx="12.5" cy="63" r="2" fill="#FF69B4"/>
          <circle cx="8"    cy="62.5" r="0.8" fill="#2a2a2a"/>
          <circle cx="13"   cy="62.5" r="0.8" fill="#2a2a2a"/>
          <ellipse cx="10" cy="66.5" rx="1" ry="0.7" fill="#FF69B4"/>
          <line x1="4" y1="66" x2="9"  y2="67" stroke="#ccc" strokeWidth="0.7"/>
          <line x1="11" y1="67" x2="16" y2="66" stroke="#ccc" strokeWidth="0.7"/>
        </>
      )}
      {currentPet === "puisor" && (
        <>
          {/* Mot/creastă portocalie */}
          <path d="M 7,56 L 6,51 L 10,55 Z" fill="#FF8C00"/>
          <path d="M 10,55 L 10,50 L 13,55 Z" fill="#FF8C00"/>
          <path d="M 13,56 L 14,51 L 16,56 Z" fill="#FF8C00"/>
          {/* Corp */}
          <ellipse cx="10" cy="73" rx="9" ry="6" fill="#FFD700"/>
          {/* Aripi */}
          <ellipse cx="2"  cy="70" rx="2.5" ry="5" fill="#FFC200" transform="rotate(15 2 70)"/>
          <ellipse cx="19" cy="70" rx="2.5" ry="5" fill="#FFC200" transform="rotate(-15 19 70)"/>
          {/* Cap */}
          <circle cx="10" cy="63" r="7" fill="#FFD700"/>
          {/* Ochi */}
          <circle cx="7.5"  cy="62" r="2" fill="#1a1a1a"/>
          <circle cx="12.5" cy="62" r="2" fill="#1a1a1a"/>
          <circle cx="8"    cy="61.5" r="0.7" fill="white"/>
          <circle cx="13"   cy="61.5" r="0.7" fill="white"/>
          {/* Cioc */}
          <path d="M 15,63.5 L 19,65 L 15,66" fill="#FF8C00"/>
        </>
      )}
      {currentPet === "arici" && (
        <>
          {/* Țepi */}
          <path d="M 2,67 L 0,59 L 5,66 Z" fill="#4E342E"/>
          <path d="M 5,63 L 3,55 L 8,62 Z" fill="#4E342E"/>
          <path d="M 9,60 L 8,52 L 12,61 Z" fill="#4E342E"/>
          <path d="M 13,61 L 14,53 L 17,61 Z" fill="#4E342E"/>
          <path d="M 17,64 L 19,56 L 21,64 Z" fill="#4E342E"/>
          {/* Corp */}
          <ellipse cx="10" cy="73" rx="9" ry="5.5" fill="#795548"/>
          {/* Cap */}
          <circle cx="10" cy="64" r="8" fill="#795548"/>
          {/* Burtă deschisă */}
          <ellipse cx="10" cy="68" rx="6" ry="4.5" fill="#D7CCC8"/>
          {/* Bot */}
          <ellipse cx="14" cy="64" rx="3" ry="2.5" fill="#A1887F"/>
          <ellipse cx="15.5" cy="63.5" rx="1.2" ry="1" fill="#1a1a1a"/>
          {/* Ochi */}
          <circle cx="9"   cy="62" r="1.8" fill="#1a1a1a"/>
          <circle cx="9.4" cy="61.5" r="0.7" fill="white"/>
        </>
      )}
      {currentPet === "peste" && (
        <>
          {/* Coadă */}
          <path d="M 3,65 L 7,59 L 7,71 Z" fill="#E64A19"/>
          {/* Corp */}
          <ellipse cx="14" cy="65" rx="9" ry="6" fill="#FF7043"/>
          {/* Burtă */}
          <ellipse cx="14" cy="67" rx="7" ry="4" fill="#FFCCBC"/>
          {/* Înotătoare dorsală */}
          <path d="M 10,59 Q 14,54 18,59 Z" fill="#E64A19"/>
          {/* Înotătoare ventrală */}
          <path d="M 12,71 L 11,75 L 16,71 Z" fill="#E64A19"/>
          {/* Ochi */}
          <circle cx="19"   cy="63" r="2.5" fill="white"/>
          <circle cx="19.5" cy="63" r="1.5" fill="#1a1a1a"/>
          <circle cx="20"   cy="62.5" r="0.5" fill="white"/>
          {/* Solzi */}
          <path d="M 12,62 Q 14,60 16,62" stroke="#BF360C" strokeWidth="0.8" fill="none"/>
          <path d="M 10,65 Q 12,63 14,65" stroke="#BF360C" strokeWidth="0.8" fill="none"/>
        </>
      )}

      {/* ── Logo joc ── */}
      {currentLogo === "badge-fortnite" && (
        <image href="/Fortnite.png"    x="2" y="2" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
      )}
      {currentLogo === "badge-brawlstars" && (
        <image href="/brawlstars.png"  x="2" y="2" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
      )}
      {currentLogo === "badge-roblox" && (
        <image href="/roblox.webp"     x="2" y="2" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
      )}
      {currentLogo === "badge-minecraft" && (
        <image href="/minecraft.svg"   x="2" y="2" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
      )}

      {isObject && currentObject === "books" && (
        <>
          {/* Carte de jos - roșie */}
          <rect x="57" y="70" width="22" height="6" rx="1" fill="#e53935"/>
          <rect x="57" y="70" width="3"  height="6" rx="1" fill="#b71c1c"/>
          {/* Carte mijloc - albastră */}
          <rect x="58" y="64" width="20" height="6" rx="1" fill="#1e88e5"/>
          <rect x="58" y="64" width="3"  height="6" rx="1" fill="#1565c0"/>
          {/* Carte de sus - galbenă */}
          <rect x="59" y="58" width="18" height="6" rx="1" fill="#fdd835"/>
          <rect x="59" y="58" width="3"  height="6" rx="1" fill="#f9a825"/>
          {/* Linii pagini */}
          <line x1="63" y1="59.5" x2="76" y2="59.5" stroke="white" strokeWidth="0.6" opacity="0.5"/>
          <line x1="63" y1="61"   x2="76" y2="61"   stroke="white" strokeWidth="0.6" opacity="0.5"/>
          <line x1="63" y1="62.5" x2="76" y2="62.5" stroke="white" strokeWidth="0.6" opacity="0.5"/>
        </>
      )}
      {isObject && currentObject === "phone" && (
        <>
          {/* Corp telefon */}
          <rect x="61" y="53" width="16" height="25" rx="3" fill="#1a1a1a"/>
          {/* Ecran */}
          <rect x="63" y="57" width="12" height="17" rx="1" fill="#1e3a5f"/>
          {/* Cameră */}
          <circle cx="69" cy="55.5" r="1.2" fill="#333"/>
          {/* Linie status bar */}
          <rect x="64" y="58.5" width="10" height="1" rx="0.5" fill="#4a90d9" opacity="0.6"/>
          {/* Buton home */}
          <circle cx="69" cy="76.5" r="1.5" fill="#333"/>
        </>
      )}
      {isObject && currentObject === "televizor" && (
        <>
          {/* Ramă TV */}
          <rect x="50" y="55" width="29" height="20" rx="2" fill="#212121"/>
          {/* Ecran */}
          <rect x="52" y="57" width="25" height="16" rx="1" fill="#1565C0"/>
          {/* Conținut ecran */}
          <rect x="53" y="58" width="10" height="14" fill="#42A5F5" opacity="0.35"/>
          <rect x="64" y="58" width="12" height="14" fill="#66BB6A" opacity="0.35"/>
          {/* Picior */}
          <rect x="62" y="75" width="5" height="3" fill="#424242"/>
          {/* Soclu */}
          <rect x="57" y="78" width="15" height="2" rx="1" fill="#424242"/>
        </>
      )}
      {isObject && currentObject === "manusi-box" && (
        <>
          {/* Mănușă stânga */}
          <rect x="51" y="58" width="13" height="14" rx="6" fill="#E53935"/>
          <ellipse cx="57" cy="58" rx="5" ry="3.5" fill="#EF5350"/>
          <rect x="53" y="71" width="9"  height="5" rx="2" fill="#B71C1C"/>
          {/* Mănușă dreapta (puțin mai jos) */}
          <rect x="65" y="63" width="13" height="14" rx="6" fill="#E53935"/>
          <ellipse cx="71" cy="63" rx="5" ry="3.5" fill="#EF5350"/>
          <rect x="67" y="76" width="9"  height="5" rx="2" fill="#B71C1C"/>
        </>
      )}
      {isObject && currentObject === "minge-fotbal" && (
        <image href="/football.svg" x="54" y="52" width="26" height="26"/>
      )}
      {isObject && currentObject !== "phone" && currentObject !== "books" && currentObject !== "televizor" && currentObject !== "manusi-box" && currentObject !== "minge-fotbal" && (
        <>
          <defs>
            <KendamaFilter id={`kdf-${uid}`} variant={currentObject!}/>
          </defs>
          <image
            href="/kendama.png"
            x="50" y="42"
            width="30" height="30"
            filter={`url(#kdf-${uid})`}
          />
        </>
      )}

      {avatar.accessory === "mask" && (
        <>
          {/* Mască de bal mascat */}
          <path d="M 18,40 Q 18,33 26,33 Q 33,33 33,38 Q 40,35 47,38 Q 47,33 54,33 Q 62,33 62,40 Q 62,47 54,47 Q 47,47 47,42 Q 40,45 33,42 Q 33,47 26,47 Q 18,47 18,40 Z" fill="#9B1B9B"/>
          {/* Ochelari decupați */}
          <ellipse cx="29" cy="40" rx="7" ry="5.5" fill="rgba(135,206,250,0.15)" stroke="#7B008B" strokeWidth="1"/>
          <ellipse cx="51" cy="40" rx="7" ry="5.5" fill="rgba(135,206,250,0.15)" stroke="#7B008B" strokeWidth="1"/>
          {/* Punte */}
          <path d="M 36,39 Q 40,37 44,39" stroke="#7B008B" strokeWidth="1.5" fill="none"/>
          {/* Bețișor */}
          <line x1="62" y1="40" x2="72" y2="52" stroke="#7B008B" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Decorațiuni */}
          <circle cx="26" cy="34" r="2" fill="#FFD700"/>
          <circle cx="54" cy="34" r="2" fill="#FFD700"/>
        </>
      )}
      {avatar.accessory === "star" && (
        <>
          <path d="M 40,4 L 42.5,11 L 50,11 L 44,15.5 L 46.5,23 L 40,18.5 L 33.5,23 L 36,15.5 L 30,11 L 37.5,11 Z"
            fill="#FFD700" stroke="#FFA500" strokeWidth="0.5"/>
          <circle cx="40" cy="14" r="2" fill="white" opacity="0.6"/>
        </>
      )}
    </svg>
  )
}
