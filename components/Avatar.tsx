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
}

interface Props {
  gender: "boy" | "girl"
  avatar: AvatarConfig
  size?: number
  uid?: string
}

export default function Avatar({ gender, avatar, size = 64, uid = "a" }: Props) {
  const skin = SKIN[avatar.skinTone] ?? SKIN.light
  const hair = HAIR[avatar.hairColor] ?? HAIR.brown
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
      {avatar.bgStyle === "rainbow" && <circle cx="40" cy="40" r="39" fill={`url(#${bgId})`} />}
      {avatar.bgStyle === "gold"    && <circle cx="40" cy="40" r="39" fill={`url(#${goldId})`} />}
      {avatar.bgStyle === "stars"   && (
        <>
          <circle cx="40" cy="40" r="39" fill="#1a1a4e"/>
          {[[12,14],[68,18],[18,62],[62,66],[40,8],[22,38],[58,40],[40,72]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.7"/>
          ))}
          {[[26,24],[54,28],[40,68],[14,50],[66,52]].map(([x,y],i) => (
            <text key={i} x={x} y={y} fontSize="7" fill="#FFD700" textAnchor="middle">★</text>
          ))}
        </>
      )}
      {(!avatar.bgStyle || avatar.bgStyle === "default") &&
        <circle cx="40" cy="40" r="39" fill="#EDE9FE"/>
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
          <rect x="25" y="39" width="13" height="10" rx="4" fill="rgba(135,206,250,0.25)" stroke="#555" strokeWidth="2"/>
          <rect x="42" y="39" width="13" height="10" rx="4" fill="rgba(135,206,250,0.25)" stroke="#555" strokeWidth="2"/>
          <line x1="38" y1="44" x2="42" y2="44" stroke="#555" strokeWidth="2"/>
          <line x1="22" y1="43" x2="25" y2="43" stroke="#555" strokeWidth="1.5"/>
          <line x1="55" y1="43" x2="58" y2="43" stroke="#555" strokeWidth="1.5"/>
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
