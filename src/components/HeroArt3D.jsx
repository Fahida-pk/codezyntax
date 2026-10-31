import './HeroArt3D.css'

/* Clean, standard 3D illustration: a desktop monitor with a dashboard UI,
   standing on an isometric platform, with floating glass cards, a code tile,
   a cloud and a gear. Fully original SVG, theme-aware (light / dark). */

function gearPath(cx, cy, ro, ri, n) {
  const pts = []
  const step = (Math.PI * 2) / n
  const t = step / 4
  for (let i = 0; i < n; i++) {
    const a = i * step
    const corners = [[a - t * 1.7, ri], [a - t * 0.8, ro], [a + t * 0.8, ro], [a + t * 1.7, ri]]
    corners.forEach(([ang, r]) => {
      pts.push(`${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`)
    })
  }
  return `M${pts.join('L')}Z`
}

const lin = (id, a, b, x2 = 0, y2 = 1) => (
  <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
    <stop offset="0" stopColor={a} />
    <stop offset="1" stopColor={b} />
  </linearGradient>
)

export default function HeroArt3D() {
  const p = 'hx-'
  const u = name => `url(#${p}${name})`

  return (
    <svg
      viewBox="0 0 600 500"
      className="sw-hero-svg hx-svg"
      role="img"
      aria-label="3D illustration of a monitor showing a dashboard on a platform, with floating cards, a code tile, a cloud and a gear"
    >
      <defs>
        {lin(`${p}bezel`, '#3d4c92', '#121a45')}
        {lin(`${p}screen`, '#18235f', '#2f2f9a', 1, 1)}
        {lin(`${p}violet`, '#7a86ff', '#a36bff', 1, 1)}
        {lin(`${p}sky`, '#a3d2ff', '#5b8cff', 1, 1)}
        {lin(`${p}bar`, '#2f6bff', '#7c5cf0')}
        {lin(`${p}metal`, '#a9b7de', '#8d9cc9', 1, 0)}
        {lin(`${p}side`, '#5a66e0', '#232c86')}
        {lin(`${p}gear`, '#c9d6ff', '#6f7ff0', 1, 1)}
        {lin(`${p}cloud`, '#e3eeff', '#86a6ff')}
        <linearGradient id={`${p}gloss`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${p}plat`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--hx-p1)' }} />
          <stop offset="1" style={{ stopColor: 'var(--hx-p2)' }} />
        </linearGradient>
        <linearGradient id={`${p}rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4d93ff" />
          <stop offset=".5" stopColor="#a36bff" />
          <stop offset="1" stopColor="#4d93ff" />
        </linearGradient>
        <radialGradient id={`${p}spot`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#4d93ff" stopOpacity=".34" />
          <stop offset="1" stopColor="#4d93ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${p}orb`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".4" stopColor="#9cc0ff" />
          <stop offset="1" stopColor="#2864ed" />
        </radialGradient>
        <filter id={`${p}sh`} x="-25%" y="-25%" width="150%" height="165%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#1e3a8a" floodOpacity=".28" />
        </filter>
        <filter id={`${p}blur`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${p}soft`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* backdrop: spotlight + orbit rings */}
      <circle cx="300" cy="240" r="275" fill={u('spot')} />
      <circle cx="300" cy="235" r="205" fill="none" stroke="#4d93ff" strokeOpacity=".35" strokeWidth="1.6" />
      <ellipse cx="300" cy="340" rx="290" ry="86" transform="rotate(-9 300 340)" fill="none" stroke={u('rim')} strokeWidth="1.4" opacity=".5" />

      {/* ---------- platform (isometric slab) ---------- */}
      <ellipse cx="300" cy="492" rx="285" ry="34" fill="#2f6bff" opacity=".35" filter={u('blur')} />
      <g strokeLinejoin="round" strokeWidth="18">
        <polygon points="62,396 300,322 538,396 300,470" fill={u('side')} stroke={u('side')} transform="translate(0 24)" />
        <polygon points="62,396 300,322 538,396 300,470" className="hx-plat-top" fill={u('plat')} stroke="var(--hx-plat-edge)" />
      </g>
      <polygon points="120,396 300,340 480,396 300,452" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="2" />
      <polygon points="175,396 300,357 425,396 300,435" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
      <polygon points="62,396 300,322 538,396 300,470" fill="none" stroke={u('rim')} strokeWidth="2.5" opacity=".9" />

      {/* ---------- monitor ---------- */}
      <ellipse cx="302" cy="376" rx="120" ry="18" fill="#1b2a7a" opacity=".4" filter={u('soft')} />

      <g filter={u('sh')}>
        {/* stand */}
        <ellipse cx="300" cy="372" rx="76" ry="14" fill="#6d7db3" />
        <ellipse cx="300" cy="366" rx="76" ry="14" fill={u('metal')} />
        <ellipse cx="300" cy="364" rx="58" ry="9" fill="#fff" opacity=".35" />
        <polygon points="276,280 324,280 332,362 268,362" fill={u('metal')} />
        <polygon points="276,280 292,280 296,362 268,362" fill="#fff" opacity=".28" />

        {/* body thickness + bezel */}
        <rect x="163" y="82" width="300" height="212" rx="16" fill="#0b1236" />
        <rect x="150" y="70" width="300" height="212" rx="16" fill={u('bezel')} />
        <rect x="150.8" y="70.8" width="298.4" height="210.4" rx="15.4" fill="none" stroke="#fff" strokeOpacity=".28" />

        {/* screen */}
        <rect x="160" y="80" width="280" height="186" rx="8" fill={u('screen')} />
        <circle cx="300" cy="75.5" r="1.8" fill="#6f84c9" />
        <circle cx="300" cy="274" r="3" fill="#fff" opacity=".35" />

        <g transform="translate(160 80)">
          <rect width="280" height="16" rx="8" fill="#fff" opacity=".1" />
          <circle cx="10" cy="8" r="2.4" fill="#7fa6f5" />
          <circle cx="18" cy="8" r="2.4" fill="#a3bff7" />
          <circle cx="26" cy="8" r="2.4" fill="#c4d6fa" />
          <rect y="16" width="48" height="170" fill="#fff" opacity=".07" />
          <rect x="9" y="27" width="28" height="6" rx="3" fill="#fff" opacity=".9" />
          {[43, 55, 67, 79].map(y => (
            <rect key={y} x="9" y={y} width="30" height="4" rx="2" fill="#fff" opacity=".25" />
          ))}

          <rect x="60" y="28" width="96" height="66" rx="9" fill={u('violet')} />
          <rect x="60" y="28" width="96" height="24" rx="9" fill="#fff" opacity=".18" />
          <polyline points="88,49 76,61 88,73" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="128,49 140,61 128,73" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="114" y1="46" x2="102" y2="76" stroke="#fff" strokeWidth="5" strokeLinecap="round" />

          <rect x="166" y="28" width="104" height="66" rx="9" fill="#fff" fillOpacity=".16" stroke="#fff" strokeOpacity=".3" />
          <polygon points="172,88 196,56 212,72 226,62 264,88" fill={u('sky')} />
          <circle cx="250" cy="42" r="6" fill="#fff" opacity=".9" />

          <rect x="60" y="106" width="210" height="12" rx="6" fill="#fff" opacity=".2" />
          <rect x="60" y="106" width="140" height="12" rx="6" fill={u('bar')} />
          <rect x="60" y="128" width="150" height="9" rx="4.5" fill="#fff" opacity=".2" />
          <rect x="60" y="143" width="100" height="9" rx="4.5" fill="#fff" opacity=".2" />
          <rect x="60" y="160" width="62" height="18" rx="9" fill={u('violet')} />
          <rect x="130" y="160" width="62" height="18" rx="9" fill="#fff" opacity=".2" />
        </g>
        <polygon points="160,80 300,80 232,266 160,266" fill={u('gloss')} />
      </g>

      {/* ---------- floating elements ---------- */}
      {/* chart card, left */}
      <g transform="translate(14 112) rotate(-4)">
        <g className="hx-a">
          <rect x="4" y="8" width="136" height="104" rx="14" className="hx-shadow" filter={u('sh')} />
          <rect width="136" height="104" rx="14" className="hx-glass" strokeWidth="1.4" />
          <rect x="2" y="2" width="132" height="18" rx="12" className="hx-gloss" />
          <line x1="18" y1="90" x2="122" y2="90" stroke="var(--hx-chart-base)" strokeWidth="2" />
          {[0.4, 0.62, 0.5, 0.82, 1].map((v, i) => (
            <g key={i}>
              <rect x={22 + i * 20 + 2} y={90 - 54 * v + 3} width="13" height={54 * v} rx="3.5" fill="#3a2fb0" opacity=".4" />
              <rect x={22 + i * 20} y={90 - 54 * v} width="13" height={54 * v} rx="3.5" fill={u('bar')} />
            </g>
          ))}
        </g>
      </g>

      {/* cloud, lower left */}
      <g className="hx-b">
        <g transform="translate(24 268) scale(.78)" filter={u('sh')}>
          <g fill="#6f8ff0" transform="translate(0 6)">
            <rect x="8" y="44" width="112" height="28" rx="14" />
            <circle cx="38" cy="44" r="22" />
            <circle cx="68" cy="30" r="30" />
            <circle cx="98" cy="46" r="22" />
          </g>
          <g fill={u('cloud')}>
            <rect x="8" y="44" width="112" height="28" rx="14" />
            <circle cx="38" cy="44" r="22" />
            <circle cx="68" cy="30" r="30" />
            <circle cx="98" cy="46" r="22" />
          </g>
          <ellipse cx="60" cy="18" rx="24" ry="8" fill="#fff" opacity=".5" />
          <path d="M68 64 V36 M55 49 L68 36 L81 49" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* code tile, top right */}
      <g className="hx-b">
        <g transform="translate(486 58)">
          <rect x="4" y="8" width="78" height="78" rx="18" fill="#4a3fd0" opacity=".55" />
          <rect width="78" height="78" rx="18" fill={u('violet')} stroke="#fff" strokeOpacity=".6" strokeWidth="1.5" filter={u('sh')} />
          <rect x="3" y="3" width="72" height="28" rx="15" fill="#fff" opacity=".2" />
          <polyline points="23,28 10,39 23,50" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="55,28 68,39 55,50" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="46" y1="24" x2="32" y2="54" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        </g>
      </g>

      {/* image card, right */}
      <g transform="translate(470 214) rotate(3)">
        <g className="hx-a">
          <rect x="4" y="8" width="118" height="94" rx="14" className="hx-shadow" filter={u('sh')} />
          <rect width="118" height="94" rx="14" className="hx-glass" strokeWidth="1.4" />
          <rect x="2" y="2" width="114" height="18" rx="12" className="hx-gloss" />
          <rect x="10" y="26" width="98" height="42" rx="6" fill="#fff" fillOpacity=".3" />
          <polygon points="16,62 44,36 60,52 76,42 104,62" fill={u('sky')} />
          <rect x="10" y="76" width="70" height="6" rx="3" fill="#fff" fillOpacity=".6" />
        </g>
      </g>

      {/* gear on the platform */}
      <g className="hx-b">
        <g filter={u('sh')}>
          <path d={gearPath(464, 400, 25, 20, 10)} fill="#3f4bc2" stroke="#3f4bc2" strokeWidth="3" strokeLinejoin="round" />
          <path d={gearPath(462, 394, 25, 20, 10)} fill={u('gear')} stroke="#fff" strokeOpacity=".75" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="462" cy="394" r="11.5" fill="#6f7ff0" opacity=".55" />
          <circle cx="462" cy="393" r="10" fill="#f1f5ff" stroke="#fff" strokeWidth="2" />
        </g>
      </g>

      {/* orbs + sparkles */}
      {[[150, 66, 8, 'a'], [566, 200, 6, 'b'], [62, 352, 6, 'b'], [330, 36, 5, 'a']].map(([cx, cy, r, d]) => (
        <g key={`${cx}-${cy}`} className={d === 'a' ? 'hx-a' : 'hx-b'}>
          <circle cx={cx} cy={cy} r={r * 2.4} fill="#4d93ff" opacity=".22" filter={u('soft')} />
          <circle cx={cx} cy={cy} r={r} fill={u('orb')} />
        </g>
      ))}
      <g stroke="#9fc0ff" strokeWidth="2.5" strokeLinecap="round" opacity=".85">
        <line x1="420" y1="38" x2="420" y2="52" /><line x1="413" y1="45" x2="427" y2="45" />
        <line x1="76" y1="250" x2="76" y2="260" /><line x1="71" y1="255" x2="81" y2="255" />
      </g>
    </svg>
  )
}