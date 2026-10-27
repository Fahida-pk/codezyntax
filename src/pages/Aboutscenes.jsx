import './Aboutscenes.css'

/* =========================================================================
   AboutScenes: professional 3D-style illustrations for the About page.
     <DoScene />     -> "What we do"        (laptop, phone, web, marketing growth)
     <StepsScene />  -> "Working principles" (four-step staircase to launch)
   Pure SVG + CSS: no WebGL, no image files, never cropped, light + dark mode.
   Same visual language as TechScene (blue glass platform, glossy tiles, cubes).
   ========================================================================= */

const FONT = 'Inter, system-ui, -apple-system, "Segoe UI", Arial, sans-serif'
const fl = (d, dl = 0) => ({ className: 'as-f', style: { '--d': `${d}s`, '--dl': `${dl}s` } })

/* shared gradients / filters, ids prefixed so two SVGs never clash */
function Defs({ p }) {
  return (
    <defs>
      <radialGradient id={`${p}Glow`} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#60a5fa" stopOpacity=".45" />
        <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${p}Plat`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" className="as-plat-a" stopColor="#ffffff" />
        <stop offset="1" className="as-plat-b" stopColor="#cfe3ff" />
      </linearGradient>
      <linearGradient id={`${p}Blue`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7db4ff" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id={`${p}Cyan`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#67e8f9" />
        <stop offset="1" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id={`${p}Scr`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#12306d" />
        <stop offset="1" stopColor="#1e40af" />
      </linearGradient>
      <radialGradient id={`${p}Orb`} cx=".32" cy=".28" r=".8">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".3" stopColor="#bfdbfe" />
        <stop offset=".7" stopColor="#3b82f6" />
        <stop offset="1" stopColor="#1d4ed8" />
      </radialGradient>
      <filter id={`${p}Sh`} x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#1d4ed8" floodOpacity=".28" />
      </filter>
    </defs>
  )
}

function Platform({ p, cx = 260, cy = 346, rx = 214, ry = 56 }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 10} rx={rx} ry={ry} className="as-plat-rim" fill="#9fc3f7" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${p}Plat)`} stroke="#bcd6fb" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.75} ry={ry * 0.71} fill="none" className="as-ring" strokeWidth="1.5" strokeDasharray="4 7" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.48} ry={ry * 0.46} fill="none" className="as-ring" strokeWidth="1.5" />
    </g>
  )
}

function IsoCube({ x, y, s, top, left, right }) {
  return (
    <g>
      <polygon points={`${x},${y} ${x + s},${y + s / 2} ${x},${y + s} ${x - s},${y + s / 2}`} fill={top} />
      <polygon points={`${x - s},${y + s / 2} ${x},${y + s} ${x},${y + 2 * s} ${x - s},${y + 1.5 * s}`} fill={left} />
      <polygon points={`${x},${y + s} ${x + s},${y + s / 2} ${x + s},${y + 1.5 * s} ${x},${y + 2 * s}`} fill={right} />
    </g>
  )
}

/* glossy rounded tile with a thick lower edge; children are drawn in 0..size space */
function Tile({ p, size = 46, fill, children }) {
  return (
    <g>
      <rect x="0" y="6" width={size} height={size} rx={size * 0.3} fill="#1e40af" opacity=".9" />
      <rect x="0" y="0" width={size} height={size} rx={size * 0.3} fill={fill || `url(#${p}Blue)`} filter={`url(#${p}Sh)`} />
      <rect x="0" y="0" width={size} height={size} rx={size * 0.3} fill="none" stroke="#fff" strokeOpacity=".5" />
      <g fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">{children}</g>
    </g>
  )
}

/* =========================================================================
   WHAT WE DO
   ========================================================================= */
export function DoScene() {
  const p = 'ds'
  const lerp = (a, b, t) => a + (b - a) * t
  return (
    <svg
      className="as-svg" viewBox="0 0 520 440" role="img"
      aria-label="3D illustration of a laptop with code, a mobile app, a web page and a growth chart, representing custom software, web and mobile apps and digital marketing"
    >
      <Defs p={p} />
      <ellipse cx="260" cy="210" rx="250" ry="200" fill={`url(#${p}Glow)`} opacity=".7" />
      <Platform p={p} />
      <ellipse cx="240" cy="290" rx="150" ry="30" fill="#1d4ed8" opacity=".14" />

      {/* ---------- laptop (custom software) ---------- */}
      <g filter={`url(#${p}Sh)`}>
        {/* base */}
        <polygon points="136,246 299,276 299,285 136,255" fill="#8fb3ee" />
        <polygon points="299,276 345,252 345,261 299,285" fill="#6f98e3" />
        <polygon points="182,222 345,252 299,276 136,246" fill="#dbe9fd" stroke="#fff" strokeOpacity=".8" />
        {[0.3, 0.5, 0.7].map(t => (
          <line
            key={t} x1={lerp(182, 136, t)} y1={lerp(222, 246, t)} x2={lerp(345, 299, t)} y2={lerp(252, 276, t)}
            stroke="#b9d0f2" strokeWidth="2" strokeLinecap="round"
          />
        ))}
        {/* screen */}
        <g transform="matrix(1 .184 0 1 182 112)">
          <rect width="163" height="110" rx="9" fill="#0f2a5c" />
          <rect x="6" y="6" width="151" height="98" rx="5" fill={`url(#${p}Scr)`} />
          <rect x="16" y="20" width="46" height="5" rx="2.5" fill="#67e8f9" />
          <rect x="24" y="32" width="58" height="5" rx="2.5" fill="#fff" opacity=".85" />
          <rect x="24" y="44" width="38" height="5" rx="2.5" fill="#c4b5fd" />
          <rect x="16" y="56" width="52" height="5" rx="2.5" fill="#fcd34d" />
          <rect x="24" y="68" width="44" height="5" rx="2.5" fill="#fff" opacity=".6" />
          <rect x="16" y="80" width="30" height="5" rx="2.5" fill="#67e8f9" />
          <rect x="96" y="18" width="52" height="46" rx="6" fill="#fff" opacity=".1" />
          <polyline points="102,54 114,44 124,48 136,32 144,26" fill="none" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={98 + i * 13} y={92 - [8, 14, 11, 20][i]} width="8" height={[8, 14, 11, 20][i]} rx="2" fill={i % 2 ? '#a78bfa' : '#22d3ee'} />
          ))}
        </g>
      </g>

      {/* ---------- phone (mobile apps) ---------- */}
      <g transform="matrix(1 .1 0 1 44 174)">
        <g {...fl(6.6, -2)}>
          <g filter={`url(#${p}Sh)`}>
            <rect width="74" height="138" rx="15" fill="#0f2a5c" />
            <rect x="5" y="5" width="64" height="128" rx="11" fill="#fff" />
            <circle cx="20" cy="22" r="6.5" fill="#3b82f6" />
            <rect x="32" y="19" width="30" height="6" rx="3" fill="#cbdcf5" />
            {[0, 1].map(i => (
              <g key={i}>
                <rect x="12" y={38 + i * 28} width="50" height="22" rx="7" fill="#eef4ff" stroke="#d6e4f6" />
                <circle cx="24" cy={49 + i * 28} r="5" fill={i ? '#22d3ee' : '#7b61e8'} />
                <rect x="34" y={45 + i * 28} width="22" height="4" rx="2" fill="#3b82f6" />
                <rect x="34" y={52 + i * 28} width="14" height="3.5" rx="1.75" fill="#cbdcf5" />
              </g>
            ))}
            {[0, 1, 2, 3].map(i => (
              <rect key={i} x={14 + i * 12} y={104 - [8, 14, 10, 18][i]} width="8" height={[8, 14, 10, 18][i]} rx="2" fill="#60a5fa" />
            ))}
            <rect x="12" y="112" width="50" height="12" rx="6" fill="#2563eb" />
          </g>
        </g>
      </g>

      {/* ---------- web page card (websites) ---------- */}
      <g transform="matrix(1 -.1 0 1 262 30)">
        <g {...fl(7, -1)}>
          <rect width="106" height="74" rx="14" className="as-glass" filter={`url(#${p}Sh)`} />
          {[0, 1, 2].map(i => <circle key={i} cx={13 + i * 10} cy="12" r="3" fill={['#f472b6', '#fbbf24', '#22d3ee'][i]} />)}
          <rect x="10" y="22" width="86" height="26" rx="7" fill="#3b82f6" />
          <rect x="18" y="29" width="38" height="4" rx="2" fill="#fff" opacity=".9" />
          <rect x="18" y="37" width="24" height="3.5" rx="1.75" fill="#fff" opacity=".6" />
          {[0, 1, 2].map(i => <rect key={i} x={10 + i * 30} y="54" width="26" height="12" rx="4" className="as-soft" />)}
        </g>
      </g>

      {/* ---------- marketing growth card ---------- */}
      <g transform="matrix(1 -.1 0 1 366 112)">
        <g {...fl(6.2, -3)}>
          <rect width="124" height="112" rx="16" className="as-glass" filter={`url(#${p}Sh)`} />
          <rect x="14" y="14" width="42" height="6" rx="3" className="as-soft" />
          {[26, 40, 54, 72].map((h, i) => (
            <rect key={i} x={16 + i * 25} y={100 - h} width="17" height={h} rx="5" fill={`url(#${p}Blue)`} />
          ))}
          <polyline points="24,76 49,62 74,50 99,28" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="99" cy="28" r="6" fill="#22d3ee" />
          <circle cx="99" cy="28" r="11" fill="#22d3ee" opacity=".25" />
        </g>
      </g>

      {/* ---------- megaphone tile ---------- */}
      <g transform="matrix(1 -.1 0 1 396 244)">
        <g {...fl(5.6, -2)}>
          <Tile p={p} size={64}>
            <path d="M17 29 H28 L48 17 V47 L28 35 H17 Z" fill="#fff" />
            <path d="M54 25 q8 7 0 14" />
          </Tile>
        </g>
      </g>

      {/* ---------- code tile ---------- */}
      <g transform="matrix(1 .1 0 1 70 70)">
        <g {...fl(5.8, -1)}>
          <Tile p={p} size={58}>
            <path d="M24 20 L13 29 L24 38 M34 20 L45 29 L34 38" />
          </Tile>
        </g>
      </g>

      {/* ---------- cubes & spheres ---------- */}
      <g {...fl(5.5, -1)}><IsoCube x={116} y={346} s={15} top="#cfe3ff" left="#5b95f0" right="#2f66d6" /></g>
      <g {...fl(6.4, -3)}><IsoCube x={452} y={352} s={13} top="#eef6ff" left="#b9d4fb" right="#8fb7f3" /></g>
      <g {...fl(5, -2)}><IsoCube x={200} y={52} s={11} top="#e3d9ff" left="#a78bfa" right="#7c5be0" /></g>
      <g {...fl(5.2, -2)}><circle cx="420" cy="62" r="10" fill={`url(#${p}Orb)`} /></g>
      <g {...fl(6, -4)}><circle cx="150" cy="150" r="7" fill={`url(#${p}Orb)`} /></g>
    </svg>
  )
}

/* =========================================================================
   WORKING PRINCIPLES
   ========================================================================= */
const STEP_COLORS = [
  { top: '#f1f7ff', left: '#d6e6fc', right: '#b4cff5', num: '#1e3a8a' },
  { top: '#cfe3ff', left: '#9fc3f7', right: '#78a7f0', num: '#1e3a8a' },
  { top: '#93c5fd', left: '#4f8ff0', right: '#2563eb', num: '#ffffff' },
  { top: '#a5b4fc', left: '#6a7de6', right: '#4a56d6', num: '#ffffff' },
]

export function StepsScene() {
  const p = 'ps'
  const steps = [0, 1, 2, 3].map(i => {
    const cx = 112 + i * 100
    const yb = 340 - i * 16
    const h = 40 + i * 38
    return { i, cx, yb, h, tileY: yb - h - 18 - 62 }
  })
  const icons = [
    <g key="s"><circle cx="21" cy="21" r="8.5" /><path d="M27.5 27.5 L35 35" /></g>,
    <g key="d"><rect x="11" y="11" width="24" height="24" rx="4.5" /><path d="M11 20 H35 M21 20 V35" /></g>,
    <g key="c"><path d="M19 14 L10 23 L19 32 M27 14 L36 23 L27 32" /></g>,
    <g key="k"><path d="M12 24 L20 32 L35 15" /></g>,
  ]
  return (
    <svg
      className="as-svg" viewBox="0 0 520 440" role="img"
      aria-label="3D illustration of a four-step staircase with icons for understand, design, build and launch, representing the working principles"
    >
      <Defs p={p} />
      <ellipse cx="260" cy="210" rx="250" ry="200" fill={`url(#${p}Glow)`} opacity=".7" />
      <Platform p={p} cx={260} cy={346} rx={248} ry={58} />

      {/* progress path behind the tiles */}
      <polyline
        points={steps.map(s => `${s.cx},${s.tileY + 26}`).join(' ')}
        className="as-pipe" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* staircase */}
      <g filter={`url(#${p}Sh)`}>
        {steps.map(({ i, cx, yb, h }) => {
          const c = STEP_COLORS[i]
          return (
            <g key={i}>
              <polygon points={`${cx - 56},${yb - 18} ${cx},${yb} ${cx},${yb - h} ${cx - 56},${yb - 18 - h}`} fill={c.left} />
              <polygon points={`${cx},${yb} ${cx + 56},${yb - 18} ${cx + 56},${yb - 18 - h} ${cx},${yb - h}`} fill={c.right} />
              <polygon points={`${cx - 56},${yb - 18 - h} ${cx},${yb - h} ${cx + 56},${yb - 18 - h} ${cx},${yb - 36 - h}`} fill={c.top} stroke="#fff" strokeOpacity=".8" />
              <g transform={`matrix(1 .321 0 1 ${cx - 56} ${yb - 18 - h})`}>
                <text x="28" y="34" textAnchor="middle" fontFamily={FONT} fontSize="22" fontWeight="800" fill={c.num} opacity=".92">{`0${i + 1}`}</text>
              </g>
            </g>
          )
        })}
      </g>

      {/* icon tiles standing on each step */}
      {steps.map(({ i, cx, tileY }) => (
        <g key={i} transform={`translate(${cx - 23} ${tileY})`}>
          <g {...fl(5.6 + i * 0.5, -i * 1.2)}>
            <Tile p={p} size={46} fill={i === 3 ? `url(#${p}Cyan)` : undefined}>{icons[i]}</Tile>
          </g>
        </g>
      ))}

      {/* cubes & spheres */}
      <g {...fl(5.5, -1)}><IsoCube x={52} y={330} s={12} top="#cfe3ff" left="#5b95f0" right="#2f66d6" /></g>
      <g {...fl(6.4, -3)}><IsoCube x={470} y={344} s={13} top="#eef6ff" left="#b9d4fb" right="#8fb7f3" /></g>
      <g {...fl(5, -2)}><IsoCube x={70} y={96} s={11} top="#e3d9ff" left="#a78bfa" right="#7c5be0" /></g>
      <g {...fl(5.2, -2)}><circle cx="470" cy="150" r="10" fill={`url(#${p}Orb)`} /></g>
      <g {...fl(6, -4)}><circle cx="40" cy="200" r="7" fill={`url(#${p}Orb)`} /></g>
    </svg>
  )
}