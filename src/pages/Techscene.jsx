import './Techscene.css'

/* =========================================================================
   TechScene: professional 3D-style technology illustration for the About page
   "Our technology" section. Pure SVG + CSS (no WebGL, no image files), so it
   always fits its box, never gets cropped, and works in light and dark mode.
   Shows: cloud upload, server rack, database, API gear, floating cards for
   Node.js, PHP, Laravel and Python, plus glossy cubes and spheres.
   The tech marks are simple stylised drawings. Swap in official brand SVGs
   if you want exact logos.
   ========================================================================= */

const FONT = 'Inter, system-ui, -apple-system, "Segoe UI", Arial, sans-serif'

/* floating wrapper props */
const fl = (d, dl = 0) => ({ className: 'ts-f', style: { '--d': `${d}s`, '--dl': `${dl}s` } })

function IsoCube({ x, y, s, top, left, right }) {
  return (
    <g>
      <polygon points={`${x},${y} ${x + s},${y + s / 2} ${x},${y + s} ${x - s},${y + s / 2}`} fill={top} />
      <polygon points={`${x - s},${y + s / 2} ${x},${y + s} ${x},${y + 2 * s} ${x - s},${y + 1.5 * s}`} fill={left} />
      <polygon points={`${x},${y + s} ${x + s},${y + s / 2} ${x + s},${y + 1.5 * s} ${x},${y + 2 * s}`} fill={right} />
    </g>
  )
}

function RackUnit({ y }) {
  return (
    <g>
      {/* left (front) face */}
      <polygon points={`180,${y} 260,${y + 26} 260,${y + 62} 180,${y + 36}`} fill="url(#tsLeft)" />
      {/* right face */}
      <polygon points={`260,${y + 26} 340,${y} 340,${y + 36} 260,${y + 62}`} fill="url(#tsRight)" />
      {/* top face */}
      <polygon points={`180,${y} 260,${y - 26} 340,${y} 260,${y + 26}`} fill="url(#tsTop)" stroke="#fff" strokeOpacity=".8" />
      {/* front details, skewed to match the face */}
      <g transform={`matrix(1 .325 0 1 180 ${y})`}>
        <rect x="12" y="10" width="38" height="6" rx="3" fill="#fff" opacity=".95" />
        <rect x="12" y="21" width="24" height="5" rx="2.5" fill="#fff" opacity=".6" />
        <circle cx="66" cy="18" r="4.5" fill="#2563eb" />
        <circle cx="66" cy="18" r="8" fill="#60a5fa" opacity=".35" />
      </g>
      <g transform={`matrix(1 -.325 0 1 260 ${y + 26})`}>
        <rect x="14" y="13" width="46" height="6" rx="3" fill="#fff" opacity=".6" />
      </g>
    </g>
  )
}

export default function TechScene() {
  return (
    <svg
      className="ts-svg" viewBox="0 0 520 440" role="img"
      aria-label="3D illustration of a cloud, server rack, database and API gear surrounded by Node.js, PHP, Laravel and Python technology cards"
    >
      <defs>
        <radialGradient id="tsGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#60a5fa" stopOpacity=".45" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tsPlat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="ts-plat-a" stopColor="#ffffff" />
          <stop offset="1" className="ts-plat-b" stopColor="#cfe3ff" />
        </linearGradient>
        <linearGradient id="tsTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbe9fd" />
        </linearGradient>
        <linearGradient id="tsLeft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6e6fc" />
          <stop offset="1" stopColor="#a9c8f2" />
        </linearGradient>
        <linearGradient id="tsRight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fb3ee" />
          <stop offset="1" stopColor="#5f8ae0" />
        </linearGradient>
        <linearGradient id="tsBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7db4ff" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="tsDb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1e40af" />
          <stop offset=".45" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tsNode" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f9142" />
          <stop offset="1" stopColor="#1d5a2d" />
        </linearGradient>
        <radialGradient id="tsOrb" cx=".32" cy=".28" r=".8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".3" stopColor="#bfdbfe" />
          <stop offset=".7" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </radialGradient>
        <filter id="tsSh" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#1d4ed8" floodOpacity=".28" />
        </filter>
      </defs>

      {/* ---------- background glow ---------- */}
      <ellipse cx="260" cy="210" rx="250" ry="200" fill="url(#tsGlow)" opacity=".7" />

      {/* ---------- platform ---------- */}
      <g>
        <ellipse cx="260" cy="356" rx="214" ry="56" className="ts-plat-rim" fill="#9fc3f7" />
        <ellipse cx="260" cy="346" rx="214" ry="56" fill="url(#tsPlat)" stroke="#bcd6fb" />
        <ellipse cx="260" cy="346" rx="160" ry="40" fill="none" className="ts-ring" strokeWidth="1.5" strokeDasharray="4 7" />
        <ellipse cx="260" cy="346" rx="104" ry="26" fill="none" className="ts-ring" strokeWidth="1.5" />
        <ellipse cx="260" cy="324" rx="118" ry="28" fill="#1d4ed8" opacity=".14" />
      </g>

      {/* ---------- server rack ---------- */}
      <g filter="url(#tsSh)">
        <RackUnit y={262} />
        <RackUnit y={214} />
        <RackUnit y={166} />
      </g>

      {/* ---------- cloud + data pipes ---------- */}
      <line x1="246" y1="124" x2="246" y2="150" className="ts-pipe" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      <line x1="274" y1="124" x2="274" y2="150" className="ts-pipe" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      <g {...fl(6, -1)}>
        <g filter="url(#tsSh)">
          <circle cx="230" cy="96" r="22" fill="url(#tsBlue)" />
          <circle cx="262" cy="82" r="31" fill="url(#tsBlue)" />
          <circle cx="294" cy="98" r="22" fill="url(#tsBlue)" />
          <rect x="220" y="96" width="86" height="26" rx="13" fill="url(#tsBlue)" />
        </g>
        <path d="M262 114 V84 M249 97 L262 84 L275 97" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ---------- database + API gear ---------- */}
      <g filter="url(#tsSh)">
        {[2, 1, 0].map(j => (
          <g key={j}>
            <rect x="274" y={296 + j * 22} width="88" height="26" fill="url(#tsDb)" />
            <ellipse cx="318" cy={322 + j * 22} rx="44" ry="13" fill="#1d4ed8" />
          </g>
        ))}
        <ellipse cx="318" cy="296" rx="44" ry="13" fill="#bcd9ff" />
        <ellipse cx="318" cy="296" rx="44" ry="13" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity=".9" />
      </g>
      {[0, 1].map(j => (
        <ellipse key={j} cx="318" cy={322 + j * 22} rx="44" ry="13" fill="none" stroke="#22d3ee" strokeWidth="2" opacity=".85" />
      ))}
      <g {...fl(5, -2)}>
        <g filter="url(#tsSh)">
          {Array.from({ length: 8 }, (_, k) => {
            const a = (k * Math.PI) / 4
            return <circle key={k} cx={318 + Math.cos(a) * 22} cy={272 + Math.sin(a) * 22} r="6" fill="#fff" />
          })}
          <circle cx="318" cy="272" r="22" fill="#fff" stroke="#cfe0fa" />
        </g>
        <text x="318" y="277" textAnchor="middle" fontFamily={FONT} fontSize="14" fontWeight="800" fill="#2563eb">API</text>
      </g>

      {/* ---------- floating technology cards ---------- */}
      {/* Node.js */}
      <g transform="matrix(1 .1 0 1 28 92)">
        <g {...fl(7, -1)}>
          <rect width="118" height="96" rx="16" fill="url(#tsNode)" filter="url(#tsSh)" />
          <rect width="118" height="96" rx="16" fill="none" stroke="#fff" strokeOpacity=".35" />
          <text x="59" y="48" textAnchor="middle" fontFamily={FONT} fontSize="30" fontWeight="800" fill="#fff" letterSpacing="-1">node</text>
          <rect x="43" y="58" width="32" height="20" rx="6" fill="#fff" opacity=".95" />
          <text x="59" y="73" textAnchor="middle" fontFamily={FONT} fontSize="13" fontWeight="800" fill="#2f7a37">JS</text>
        </g>
      </g>
      {/* Laravel */}
      <g transform="matrix(1 .1 0 1 24 214)">
        <g {...fl(6.4, -3)}>
          <rect width="118" height="96" rx="16" className="ts-glass" filter="url(#tsSh)" />
          <path d="M40 24 L56 33 V50 L40 41 Z M56 33 L72 24 V41 L56 50 Z M40 24 L56 15 L72 24" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
          <text x="59" y="80" textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="700" className="ts-txt">Laravel</text>
        </g>
      </g>
      {/* PHP */}
      <g transform="matrix(1 -.1 0 1 374 84)">
        <g {...fl(6.8, -2)}>
          <rect width="118" height="96" rx="16" className="ts-glass" filter="url(#tsSh)" />
          <ellipse cx="59" cy="48" rx="42" ry="25" fill="#7a86b8" />
          <text x="59" y="58" textAnchor="middle" fontFamily={FONT} fontSize="28" fontWeight="800" fontStyle="italic" fill="#161a33">php</text>
        </g>
      </g>
      {/* Python */}
      <g transform="matrix(1 -.1 0 1 380 204)">
        <g {...fl(7.4, -4)}>
          <rect width="112" height="96" rx="16" className="ts-glass" filter="url(#tsSh)" />
          <rect x="26" y="20" width="38" height="32" rx="14" fill="#3776ab" />
          <rect x="48" y="40" width="38" height="32" rx="14" fill="#ffd43b" />
          <circle cx="38" cy="31" r="3.2" fill="#fff" />
          <circle cx="74" cy="61" r="3.2" fill="#3776ab" />
        </g>
      </g>

      {/* ---------- cubes and spheres ---------- */}
      <g {...fl(5.5, -1)}><IsoCube x={92} y={338} s={16} top="#cfe3ff" left="#5b95f0" right="#2f66d6" /></g>
      <g {...fl(6.2, -3)}><IsoCube x={146} y={352} s={13} top="#cfe3ff" left="#5b95f0" right="#2f66d6" /></g>
      <g {...fl(6.6, -2)}><IsoCube x={448} y={330} s={14} top="#eef6ff" left="#b9d4fb" right="#8fb7f3" /></g>
      <g {...fl(5, -1)}><IsoCube x={206} y={40} s={11} top="#e3d9ff" left="#a78bfa" right="#7c5be0" /></g>
      <g {...fl(5.2, -2)}><circle cx="410" cy="52" r="10" fill="url(#tsOrb)" /></g>
      <g {...fl(6, -4)}><circle cx="120" cy="58" r="7" fill="url(#tsOrb)" /></g>
    </svg>
  )
}