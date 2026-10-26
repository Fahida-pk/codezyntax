import './ServicesScene.css'

/* ==========================================================================
   ServicesScene: original isometric 3D-style illustration for the Home
   "Our Services" section. Inline SVG only (vector, so it stays sharp on every
   screen and retina display, with no image download and no external assets).

   Scene: layered isometric platform, a floating glass web dashboard, and six
   glossy blue 3D tiles for web development, payment systems, digital
   marketing, mobile apps, desktop software and global connectivity, joined
   by curved light lines and soft glowing particles. No text inside the art.
   ========================================================================== */

/* One isometric slab: top face + left/right sides, gradients picked by id. */
function Slab({ id, cx, cy, a, b, t }) {
  const top = `M${cx} ${cy - b}L${cx + a} ${cy}L${cx} ${cy + b}L${cx - a} ${cy}Z`
  return (
    <g>
      <path d={`M${cx - a} ${cy}L${cx} ${cy + b}V${cy + b + t}L${cx - a} ${cy + t}Z`} fill={`url(#svs-${id}-l)`} />
      <path d={`M${cx + a} ${cy}L${cx} ${cy + b}V${cy + b + t}L${cx + a} ${cy + t}Z`} fill={`url(#svs-${id}-r)`} />
      <path d={top} fill={`url(#svs-${id}-t)`} />
      <path d={top} fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="1.4" />
    </g>
  )
}

/* Small isometric cube resting on the platform (x,y = centre of its base). */
function MiniCube({ x, y, s, h, top, left, right }) {
  const hh = s / 2
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={s * 1.1} ry={hh * 1.1} fill="#1d3fa8" opacity=".25" filter="url(#svs-blur-s)" />
      <path d={`M${x - s} ${y - h}L${x} ${y - h + hh}V${y + hh}L${x - s} ${y}Z`} fill={left} />
      <path d={`M${x + s} ${y - h}L${x} ${y - h + hh}V${y + hh}L${x + s} ${y}Z`} fill={right} />
      <path d={`M${x} ${y - h - hh}L${x + s} ${y - h}L${x} ${y - h + hh}L${x - s} ${y - h}Z`} fill={top} />
      <path d={`M${x} ${y - h - hh}L${x + s} ${y - h}L${x} ${y - h + hh}L${x - s} ${y - h}Z`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
    </g>
  )
}

/* Glossy rounded 3D tile (extruded edge, bevel, top gloss) that holds one white glyph. */
function Tile({ x, y, delay, amp = 'a', children }) {
  return (
    <g className={`svs-fl svs-fl-${amp}`} style={{ animationDelay: delay }}>
      <rect x={x + 6} y={y + 26} width="84" height="84" rx="26" fill="#1d3fa8" opacity=".26" filter="url(#svs-blur)" />
      <rect x={x + 6} y={y + 12} width="84" height="84" rx="26" fill="url(#svs-depth)" />
      <rect x={x + 4} y={y + 8} width="84" height="84" rx="26" fill="url(#svs-depth)" />
      <rect x={x + 2} y={y + 4} width="84" height="84" rx="26" fill="url(#svs-depth)" />
      <rect x={x} y={y} width="84" height="84" rx="26" fill="url(#svs-face)" />
      <rect x={x + 0.8} y={y + 0.8} width="82.4" height="82.4" rx="25.2" fill="none" stroke="url(#svs-rim)" strokeWidth="1.6" />
      <rect x={x + 6} y={y + 5} width="72" height="38" rx="20" fill="url(#svs-gloss)" />
      <g transform={`translate(${x + 42} ${y + 43})`} filter="url(#svs-glyph)" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </g>
  )
}

/* Particle field: [cx, cy, r, tone, delay]. tone: 0 white, 1 cyan, 2 lavender */
const PARTICLES = [
  [86, 52, 3.2, 1, '0s'], [168, 70, 2.2, 0, '1.2s'], [232, 28, 2.6, 2, '2.1s'], [402, 38, 3, 1, '.6s'],
  [470, 66, 2.2, 0, '1.8s'], [606, 190, 3.2, 2, '.3s'], [612, 318, 2.4, 1, '2.6s'], [24, 214, 2.6, 2, '1.5s'],
  [14, 372, 3, 1, '.9s'], [194, 360, 2.2, 0, '2.3s'], [446, 346, 2.4, 2, '1s'], [588, 440, 3, 1, '1.7s'],
  [262, 560, 2.4, 0, '.4s'], [378, 574, 2.8, 2, '2s'], [118, 520, 2.4, 1, '2.8s'], [530, 536, 2.2, 0, '1.1s'],
  [350, 168, 1.8, 0, '.7s'], [240, 236, 1.8, 1, '1.9s'],
]
const TONE = ['#ffffff', '#7fe0ff', '#c9bcff']

export default function ServicesScene({ className = '' }) {
  /* grid lines on the top slab: P(u,v) = T + u(R-T) + v(L-T) */
  const T = [320, 313], R = [490, 398], L = [150, 398]
  const P = (u, v) => [T[0] + u * (R[0] - T[0]) + v * (L[0] - T[0]), T[1] + u * (R[1] - T[1]) + v * (L[1] - T[1])]
  const grid = [0.2, 0.4, 0.6, 0.8].flatMap(k => {
    const [a1, a2] = P(k, 0), [b1, b2] = P(k, 1), [c1, c2] = P(0, k), [d1, d2] = P(1, k)
    return [`M${a1} ${a2}L${b1} ${b2}`, `M${c1} ${c2}L${d1} ${d2}`]
  })

  return (
    <svg
      className={`svs ${className}`}
      viewBox="0 0 640 620"
      role="img"
      aria-label="Isometric 3D illustration of a floating web dashboard above a layered platform, surrounded by glossy icons for web development, payments, digital marketing, mobile apps, desktop software and global connectivity"
      focusable="false"
    >
      <defs>
        <radialGradient id="svs-bg" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset=".45" stopColor="#dcebff" stopOpacity=".7" />
          <stop offset="1" stopColor="#dcebff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svs-bg2" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#cdbfff" stopOpacity=".5" />
          <stop offset="1" stopColor="#cdbfff" stopOpacity="0" />
        </radialGradient>

        {/* platform layers */}
        <linearGradient id="svs-s1-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e9e4ff" /><stop offset="1" stopColor="#b9adf7" /></linearGradient>
        <linearGradient id="svs-s1-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8f84e8" /><stop offset="1" stopColor="#5d54c4" /></linearGradient>
        <linearGradient id="svs-s1-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a395f0" /><stop offset="1" stopColor="#4b45b0" /></linearGradient>
        <linearGradient id="svs-s2-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#bcd6ff" /><stop offset="1" stopColor="#7fa8f7" /></linearGradient>
        <linearGradient id="svs-s2-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4f83f0" /><stop offset="1" stopColor="#2a48c8" /></linearGradient>
        <linearGradient id="svs-s2-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6e8df5" /><stop offset="1" stopColor="#2d3fb4" /></linearGradient>
        <linearGradient id="svs-s3-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#e6f0ff" /><stop offset="1" stopColor="#c6dbff" /></linearGradient>
        <linearGradient id="svs-s3-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8db5ff" /><stop offset="1" stopColor="#3f66e0" /></linearGradient>
        <linearGradient id="svs-s3-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9db8ff" /><stop offset="1" stopColor="#3550cc" /></linearGradient>

        {/* tiles */}
        <linearGradient id="svs-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7db4ff" /><stop offset=".5" stopColor="#3f78f4" /><stop offset="1" stopColor="#2447d0" />
        </linearGradient>
        <linearGradient id="svs-depth" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2f58dc" /><stop offset="1" stopColor="#14267e" /></linearGradient>
        <linearGradient id="svs-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".5" stopColor="#fff" stopOpacity=".15" /><stop offset="1" stopColor="#9fd0ff" stopOpacity=".5" /></linearGradient>
        <linearGradient id="svs-gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".6" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>

        {/* dashboard */}
        <linearGradient id="svs-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".96" /><stop offset=".55" stopColor="#eaf3ff" stopOpacity=".88" /><stop offset="1" stopColor="#d3e4ff" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="svs-glass-stroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#a9c6f5" /></linearGradient>
        <linearGradient id="svs-btn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#60a5ff" /><stop offset="1" stopColor="#2d56e0" /></linearGradient>
        <linearGradient id="svs-bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fb2ff" /><stop offset="1" stopColor="#3b66ea" /></linearGradient>
        <linearGradient id="svs-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#19bdeb" /><stop offset="1" stopColor="#8b6cf6" /></linearGradient>
        <linearGradient id="svs-conn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#19bdeb" stopOpacity=".1" /><stop offset=".5" stopColor="#4f8cff" stopOpacity=".95" /><stop offset="1" stopColor="#8b6cf6" stopOpacity=".2" /></linearGradient>
        <radialGradient id="svs-orb" cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#8dbbff" /><stop offset="1" stopColor="#3b4fe0" /></radialGradient>
        <radialGradient id="svs-orb-l" cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".5" stopColor="#d3c8ff" /><stop offset="1" stopColor="#7d6cf0" /></radialGradient>
        <radialGradient id="svs-pad" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#7fe0ff" stopOpacity=".55" /><stop offset="1" stopColor="#7fe0ff" stopOpacity="0" /></radialGradient>
        <clipPath id="svs-clip"><rect width="300" height="190" rx="22" /></clipPath>

        <filter id="svs-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="svs-blur-s" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="svs-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="svs-glyph" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="2.5" stdDeviation="1.6" floodColor="#0a1f7a" floodOpacity=".5" /></filter>
      </defs>

      {/* ambient light */}
      <ellipse cx="320" cy="320" rx="318" ry="290" fill="url(#svs-bg)" />
      <ellipse cx="500" cy="170" rx="170" ry="150" fill="url(#svs-bg2)" />

      {/* ground shadow + orbit rings */}
      <ellipse cx="320" cy="566" rx="250" ry="24" fill="#1d3fa8" opacity=".3" filter="url(#svs-blur)" />
      <ellipse cx="320" cy="420" rx="300" ry="112" fill="none" stroke="#6f9cf5" strokeOpacity=".35" strokeWidth="1.2" strokeDasharray="2 7" />
      <ellipse cx="320" cy="420" rx="266" ry="96" fill="none" stroke="#a99bf5" strokeOpacity=".3" strokeWidth="1" />

      {/* layered isometric platform */}
      <Slab id="s1" cx={320} cy={440} a={250} b={125} t={24} />
      <Slab id="s2" cx={320} cy={418} a={214} b={107} t={22} />
      <Slab id="s3" cx={320} cy={398} a={170} b={85} t={20} />
      <g fill="none" stroke="#7fa6ee" strokeOpacity=".5" strokeWidth="1">
        {grid.map(d => <path key={d} d={d} />)}
      </g>
      {/* glowing inlay under the dashboard */}
      <path d="M320 345L420 398L320 451L220 398Z" fill="url(#svs-pad)" />
      <path d="M320 357L398 398L320 439L242 398Z" fill="#fff" fillOpacity=".5" stroke="#19bdeb" strokeOpacity=".85" strokeWidth="1.4" />
      <path d="M320 373L366 398L320 423L274 398Z" fill="none" stroke="#4f7dff" strokeOpacity=".7" strokeWidth="1.2" />
      {/* glowing edge on the middle slab */}
      <path d="M106 418L320 525L534 418" fill="none" stroke="#7fe0ff" strokeOpacity=".7" strokeWidth="1.6" filter="url(#svs-glow)" />

      {/* small blocks resting on the platform */}
      <MiniCube x={432} y={455} s={22} h={30} top="#f0f6ff" left="#5b8cf5" right="#2f48cc" />
      <MiniCube x={206} y={458} s={17} h={22} top="#efeaff" left="#8d7ff0" right="#5a4cc8" />

      {/* curved connection lines (behind dashboard and tiles) */}
      <g fill="none" stroke="url(#svs-conn)" strokeWidth="2" strokeLinecap="round" className="svs-lines">
        <path d="M98 150C140 160 160 190 214 206" />
        <path d="M542 146C505 150 490 168 436 186" />
        <path d="M320 60C320 90 320 110 320 140" />
        <path d="M72 312C110 296 150 276 196 252" />
        <path d="M566 312C520 306 492 278 450 256" />
        <path d="M140 438C150 390 182 340 222 296" />
      </g>
      <g fill="#fff" stroke="#4f8cff" strokeWidth="2" filter="url(#svs-glow)">
        <circle cx="214" cy="206" r="4" /><circle cx="436" cy="186" r="4" /><circle cx="320" cy="140" r="4" />
        <circle cx="196" cy="252" r="4" /><circle cx="450" cy="256" r="4" /><circle cx="222" cy="296" r="4" />
      </g>

      {/* floating glass web dashboard */}
      <g className="svs-fl svs-fl-b" style={{ animationDelay: '-2s' }}>
        <ellipse cx="322" cy="392" rx="132" ry="26" fill="#1d3fa8" opacity=".28" filter="url(#svs-blur)" />
        <g transform="translate(170 120) skewY(-6)">
          <rect x="16" y="18" width="300" height="190" rx="22" fill="#a99bf5" opacity=".3" />
          <rect x="8" y="10" width="300" height="190" rx="22" fill="#8db5ff" opacity=".4" />
          <rect width="300" height="190" rx="22" fill="url(#svs-glass)" stroke="url(#svs-glass-stroke)" strokeWidth="1.8" />
          <g clipPath="url(#svs-clip)">
            <path d="M-10 -10H150L70 200H-10Z" fill="#fff" opacity=".22" />
            {/* window bar */}
            <circle cx="22" cy="20" r="4" fill="#8fb4ff" /><circle cx="35" cy="20" r="4" fill="#b4c9ff" /><circle cx="48" cy="20" r="4" fill="#d3e0ff" />
            <rect x="70" y="12" width="150" height="16" rx="8" fill="#fff" fillOpacity=".85" stroke="#cfe0fb" />
            <rect x="228" y="14" width="52" height="12" rx="6" fill="url(#svs-btn)" />
            <path d="M0 38H300" stroke="#cfe0fb" />
            {/* sidebar */}
            {[0, 1, 2, 3, 4].map(i => (
              <rect key={i} x="14" y={52 + i * 26} width="44" height="16" rx="8" fill={i === 0 ? 'url(#svs-btn)' : '#d8e6ff'} />
            ))}
            {/* KPI tiles */}
            {[0, 1, 2].map(i => (
              <g key={i}>
                <rect x={72 + i * 74} y="52" width="66" height="42" rx="12" fill="#fff" fillOpacity=".85" stroke="#d6e4fb" />
                <rect x={82 + i * 74} y="61" width="26" height="5" rx="2.5" fill="#bcd2fa" />
                <rect x={82 + i * 74} y="73" width="40" height="9" rx="4.5" fill={i === 0 ? 'url(#svs-btn)' : i === 1 ? '#6f9bf5' : '#b5a6f7'} />
              </g>
            ))}
            {/* bar + line chart */}
            <rect x="72" y="104" width="150" height="74" rx="12" fill="#fff" fillOpacity=".85" stroke="#d6e4fb" />
            {[22, 34, 26, 44, 36, 52, 46].map((h, i) => <rect key={i} x={84 + i * 18} y={168 - h} width="10" height={h} rx="4" fill="url(#svs-bar)" />)}
            <path d="M86 150C100 138 112 146 128 128S156 120 176 110S202 114 212 108" fill="none" stroke="url(#svs-line)" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="212" cy="108" r="4" fill="#fff" stroke="#8b6cf6" strokeWidth="2" />
            {/* donut */}
            <rect x="230" y="104" width="58" height="74" rx="12" fill="#fff" fillOpacity=".85" stroke="#d6e4fb" />
            <circle cx="259" cy="133" r="15" fill="none" stroke="#dbe8ff" strokeWidth="7" />
            <circle cx="259" cy="133" r="15" fill="none" stroke="url(#svs-btn)" strokeWidth="7" strokeLinecap="round" strokeDasharray="62 94.2" transform="rotate(-90 259 133)" />
            <rect x="240" y="157" width="38" height="5" rx="2.5" fill="#c3d6fb" />
            <rect x="248" y="167" width="22" height="5" rx="2.5" fill="#dbe7fc" />
          </g>
        </g>
      </g>

      {/* six glossy 3D tiles */}
      {/* digital marketing: megaphone */}
      <Tile x={278} y={8} delay="-1s" amp="b">
        <path d="M-20 -6H-6L16 -19V19L-6 6H-20Z" fill="#fff" />
        <path d="M-15 6L-11 20H-3L-6 6" fill="#fff" />
        <path d="M23 -8Q30 0 23 8" />
      </Tile>
      {/* web development: browser with code */}
      <Tile x={56} y={100} delay="0s" amp="a">
        <rect x="-24" y="-19" width="48" height="38" rx="7" />
        <path d="M-24 -8H24" />
        <path d="M-7 2L-14 9L-7 16" strokeWidth="3.4" /><path d="M7 2L14 9L7 16" strokeWidth="3.4" /><path d="M2 0L-2 18" strokeWidth="3" />
      </Tile>
      {/* payment systems: card */}
      <Tile x={500} y={96} delay="-3s" amp="a">
        <rect x="-25" y="-17" width="50" height="34" rx="7" fill="#fff" stroke="none" />
        <rect x="-25" y="-8" width="50" height="8" fill="#2c5de0" stroke="none" />
        <rect x="-18" y="6" width="12" height="6" rx="2" fill="#2c5de0" stroke="none" />
        <path d="M2 9H16" stroke="#9ab6f3" strokeWidth="3" />
      </Tile>
      {/* mobile applications: phone */}
      <Tile x={30} y={262} delay="-4s" amp="b">
        <rect x="-14" y="-24" width="28" height="48" rx="8" fill="#fff" fillOpacity=".16" />
        <path d="M-5 -17H5" strokeWidth="3" />
        <rect x="-8" y="-8" width="16" height="9" rx="2.5" fill="#fff" stroke="none" />
        <path d="M-8 8H8M-8 14H2" strokeWidth="3" />
      </Tile>
      {/* desktop software: monitor */}
      <Tile x={524} y={262} delay="-5s" amp="a">
        <rect x="-25" y="-20" width="50" height="33" rx="6" fill="#fff" fillOpacity=".16" />
        <path d="M-9 20H9M0 13V20" />
        <path d="M-14 -11H0M-14 -3H9" strokeWidth="3" />
      </Tile>
      {/* global connectivity: globe */}
      <Tile x={96} y={388} delay="-2.5s" amp="b">
        <circle r="21" />
        <ellipse rx="9" ry="21" />
        <path d="M-21 0H21M-17 -10Q0 -5 17 -10M-17 10Q0 5 17 10" strokeWidth="3" />
      </Tile>

      {/* glossy spheres */}
      <circle className="svs-fl svs-fl-a" style={{ animationDelay: '-1.5s' }} cx="446" cy="46" r="15" fill="url(#svs-orb)" />
      <circle className="svs-fl svs-fl-b" style={{ animationDelay: '-3.5s' }} cx="196" cy="48" r="10" fill="url(#svs-orb-l)" />
      <circle className="svs-fl svs-fl-a" style={{ animationDelay: '-.5s' }} cx="600" cy="236" r="8" fill="url(#svs-orb)" />
      <circle className="svs-fl svs-fl-b" style={{ animationDelay: '-4.5s' }} cx="40" cy="190" r="9" fill="url(#svs-orb-l)" />
      <circle className="svs-fl svs-fl-a" style={{ animationDelay: '-2.2s' }} cx="580" cy="388" r="11" fill="url(#svs-orb)" />

      {/* glowing particles */}
      <g filter="url(#svs-glow)">
        {PARTICLES.map(([cx, cy, r, tone, d]) => (
          <circle key={`${cx}-${cy}`} className="svs-p" style={{ animationDelay: d }} cx={cx} cy={cy} r={r} fill={TONE[tone]} />
        ))}
      </g>
    </svg>
  )
}