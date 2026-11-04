import './ServiceScene3D.css'

/* ---------- shared building blocks ---------- */

const Orb = ({ x, y, r, c = 'a' }) => (
  <circle className={`sc-fl sc-fl-${c}`} cx={x} cy={y} r={r} fill="url(#sc-orb)" />
)

// Isometric block: top vertex at (x, y), half-width s, side height h.
const Slab = ({ x, y, s, h, c }) => (
  <g className={c ? `sc-fl sc-fl-${c}` : undefined}>
    <path d={`M${x} ${y}L${x + s} ${y + s / 2}L${x} ${y + s}L${x - s} ${y + s / 2}Z`} fill="url(#sc-top)" />
    <path d={`M${x - s} ${y + s / 2}L${x} ${y + s}V${y + s + h}L${x - s} ${y + s / 2 + h}Z`} fill="url(#sc-left)" />
    <path d={`M${x + s} ${y + s / 2}L${x} ${y + s}V${y + s + h}L${x + s} ${y + s / 2 + h}Z`} fill="url(#sc-right)" />
  </g>
)

const Ln = ({ x, y, w, h = 6, c = '#c3d0ee' }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />
)

// Floating glass window with a browser bar.
const Win = ({ x, y, w, h, c, bar = true, children }) => (
  <g className={c ? `sc-fl sc-fl-${c}` : undefined}>
    <rect x={x} y={y + 10} width={w} height={h} rx="16" fill="#1d3fa8" opacity=".18" filter="url(#sc-blur)" />
    <rect x={x} y={y} width={w} height={h} rx="14" className="sc-win" />
    {bar && (
      <>
        <path d={`M${x} ${y + 14}a14 14 0 0 1 14-14h${w - 28}a14 14 0 0 1 14 14v10H${x}Z`} className="sc-bar" />
        <circle cx={x + 14} cy={y + 12} r="2.8" fill="#ff8a80" />
        <circle cx={x + 24} cy={y + 12} r="2.8" fill="#ffd166" />
        <circle cx={x + 34} cy={y + 12} r="2.8" fill="#8fb4ff" />
      </>
    )}
    {children}
  </g>
)

// Floating glass tile with a stroked icon, centred at the tile middle.
const Tile = ({ x, y, c = 'a', children }) => (
  <g className={`sc-fl sc-fl-${c}`}>
    <rect x={x} y={y + 8} width="64" height="64" rx="18" fill="#1d3fa8" opacity=".18" filter="url(#sc-blur)" />
    <rect x={x} y={y} width="64" height="64" rx="18" className="sc-tile" />
    <g transform={`translate(${x + 32} ${y + 32})`} fill="none" stroke="#2f5ee0" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </g>
)

// Phone with dark bezel; children are drawn in absolute coordinates.
const Phone = ({ x, y, w, h, c, children }) => (
  <g className={c ? `sc-fl sc-fl-${c}` : undefined}>
    <rect x={x} y={y + 10} width={w} height={h} rx="24" fill="#1d3fa8" opacity=".2" filter="url(#sc-blur)" />
    <rect x={x} y={y} width={w} height={h} rx="22" fill="url(#sc-dark)" />
    <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx="17" className="sc-win" />
    <rect x={x + w / 2 - 18} y={y + 10} width="36" height="6" rx="3" fill="#0b1433" />
    {children}
  </g>
)

function Defs() {
  return (
    <defs>
      <linearGradient id="sc-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a95ff" /><stop offset="1" stopColor="#1f4fd8" /></linearGradient>
      <linearGradient id="sc-cyan" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a5f3fc" /><stop offset="1" stopColor="#22b8ff" /></linearGradient>
      <linearGradient id="sc-violet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b4c8ff" /><stop offset="1" stopColor="#7c5cf0" /></linearGradient>
      <linearGradient id="sc-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e4f1ff" /><stop offset="1" stopColor="#8fb6ff" /></linearGradient>
      <linearGradient id="sc-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4d86ff" /><stop offset="1" stopColor="#2a45d8" /></linearGradient>
      <linearGradient id="sc-right" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7f9bff" /><stop offset="1" stopColor="#2b3fb8" /></linearGradient>
      <linearGradient id="sc-dark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1c2d63" /><stop offset="1" stopColor="#0b1433" /></linearGradient>
      <linearGradient id="sc-cloud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#cfe0ff" /></linearGradient>
      <radialGradient id="sc-orb" cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#7fb2ff" /><stop offset="1" stopColor="#3b4fe0" /></radialGradient>
      <radialGradient id="sc-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#4f8cff" stopOpacity=".24" /><stop offset="1" stopColor="#4f8cff" stopOpacity="0" /></radialGradient>
      <filter id="sc-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" /></filter>
    </defs>
  )
}

function Base() {
  return (
    <>
      <ellipse cx="280" cy="230" rx="270" ry="210" fill="url(#sc-glow)" />
      <ellipse cx="280" cy="444" rx="210" ry="12" fill="#1d3fa8" opacity=".22" filter="url(#sc-blur)" />
      <Slab x={280} y={268} s={170} h={16} />
      <path d="M280 293L400 353L280 413L160 353Z" fill="#fff" opacity=".35" />
    </>
  )
}

/* ---------- 1. Website Design & Development ---------- */
function Website() {
  return (
    <>
      <Win x={120} y={64} w={280} h={196} c="a">
        <rect x={136} y={94} width={12} height={12} rx={4} fill="url(#sc-blue)" />
        <Ln x={154} y={97} w={32} c="#8fb4ff" />
        <Ln x={296} y={97} w={22} /><Ln x={324} y={97} w={22} /><Ln x={352} y={97} w={22} />
        <Ln x={138} y={128} w={120} h={12} c="url(#sc-blue)" />
        <Ln x={138} y={148} w={92} h={12} c="url(#sc-cyan)" />
        <Ln x={138} y={172} w={124} /><Ln x={138} y={184} w={100} />
        <rect x={138} y={202} width={58} height={18} rx={9} fill="url(#sc-blue)" />
        <rect x={282} y={122} width={104} height={84} rx={10} fill="url(#sc-violet)" />
        <path d="M282 206L316 170L340 194L358 180L386 206Z" fill="#fff" opacity=".55" />
        <circle cx={364} cy={142} r={8} fill="#fff" opacity=".8" />
        {[138, 208, 278].map((cx) => <rect key={cx} x={cx} y={226} width={60} height={22} rx={6} fill="#eaf1ff" />)}
      </Win>
      <Phone x={392} y={150} w={96} h={172} c="b">
        <rect x={402} y={176} width={76} height={40} rx={8} fill="url(#sc-blue)" />
        <Ln x={402} y={226} w={60} c="#8fb4ff" /><Ln x={402} y={240} w={76} /><Ln x={402} y={252} w={52} />
        <rect x={402} y={272} width={46} height={16} rx={8} fill="url(#sc-cyan)" />
      </Phone>
      <g className="sc-fl sc-fl-c">
        <circle cx={96} cy={300} r={16} fill="url(#sc-blue)" />
        <circle cx={124} cy={316} r={16} fill="url(#sc-cyan)" />
        <circle cx={150} cy={298} r={16} fill="url(#sc-violet)" />
      </g>
      <path className="sc-fl sc-fl-a" d="M360 226L360 262L370 253L378 270L386 266L378 249L392 248Z" fill="#fff" stroke="#2f5ee0" strokeWidth="2.4" strokeLinejoin="round" />
      <Orb x={70} y={90} r={10} c="b" /><Orb x={520} y={80} r={8} c="c" />
    </>
  )
}

/* ---------- 2. Custom Software Development ---------- */
function Software() {
  const code = [[0, 70, '#7c5cf0'], [1, 110, '#19bdeb'], [1, 84, '#8fb4ff'], [2, 100, '#4f82f5'], [2, 60, '#b4c8ff'], [1, 90, '#19bdeb'], [0, 40, '#7c5cf0'], [0, 96, '#8fb4ff']]
  return (
    <>
      <Win x={150} y={72} w={250} h={178} c="a">
        {code.map(([ind, w, col], i) => <Ln key={i} x={166 + ind * 16} y={104 + i * 17} w={w} h={7} c={col} />)}
      </Win>
      <Slab x={112} y={236} s={44} h={40} />
      <Slab x={112} y={196} s={44} h={40} c="b" />
      <g className="sc-fl sc-fl-b">
        <circle cx={440} cy={120} r={30} fill="none" stroke="url(#sc-violet)" strokeWidth={14} strokeDasharray="9.4 9.4" />
        <circle cx={440} cy={120} r={22} fill="url(#sc-blue)" />
        <circle cx={440} cy={120} r={9} fill="#fff" />
      </g>
      <Tile x={418} y={214} c="c">
        <path d="M-8 -10L-18 0L-8 10" /><path d="M8 -10L18 0L8 10" /><path d="M3 -14L-3 14" />
      </Tile>
      <Orb x={80} y={90} r={9} c="c" /><Orb x={500} y={310} r={8} c="b" />
    </>
  )
}

/* ---------- 3. Web Application Development ---------- */
function WebApp() {
  return (
    <>
      <Win x={110} y={76} w={300} h={190} c="a">
        <rect x={122} y={106} width={40} height={148} rx={8} fill="#eaf1ff" />
        {[0, 1, 2].map((i) => <rect key={i} x={176 + i * 76} y={106} width={68} height={36} rx={8} fill="#eaf1ff" />)}
        {[40, 64, 50, 84, 70].map((h, i) => <rect key={i} x={180 + i * 34} y={248 - h} width={20} height={h} rx={4} fill={i % 2 ? 'url(#sc-blue)' : 'url(#sc-violet)'} />)}
        <path d="M180 196L214 176L248 186L282 160L316 168" fill="none" stroke="#22b8ff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={376} cy={200} r={26} fill="none" stroke="#dfe8f8" strokeWidth={10} />
        <circle cx={376} cy={200} r={26} fill="none" stroke="url(#sc-blue)" strokeWidth={10} strokeDasharray="100 164" strokeLinecap="round" transform="rotate(-90 376 200)" />
      </Win>
      <g className="sc-fl sc-fl-b">
        <g fill="url(#sc-cloud)" stroke="#9db9f5" strokeWidth="1.2">
          <circle cx={440} cy={120} r={22} /><circle cx={466} cy={106} r={28} /><circle cx={494} cy={122} r={20} />
          <rect x={440} y={120} width={54} height={22} rx={11} />
        </g>
        <path d="M468 134v-24m-8 8l8-8l8 8" fill="none" stroke="#2f5ee0" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="sc-fl sc-fl-c">
        <path d="M64 240v36c0 8 12 14 26 14s26-6 26-14v-36" fill="url(#sc-blue)" />
        <ellipse cx={90} cy={240} rx={26} ry={10} fill="url(#sc-top)" />
        <path d="M64 258c0 8 12 14 26 14s26-6 26-14" fill="none" stroke="#fff" strokeOpacity=".5" />
      </g>
      <Tile x={424} y={212} c="a">
        <path d="M0 -20L16 -13V2C16 12 8 18 0 22C-8 18 -16 12 -16 2V-13Z" /><path d="M-7 1L-2 6L8 -6" />
      </Tile>
      <Orb x={60} y={120} r={8} c="a" />
    </>
  )
}

/* ---------- 4. Mobile Application Development ---------- */
function Mobile() {
  return (
    <>
      <g transform="rotate(-8 235 195)">
        <Phone x={160} y={64} w={130} h={250} c="a">
          <rect x={172} y={90} width={106} height={56} rx={12} fill="url(#sc-blue)" />
          <circle cx={194} cy={118} r={11} fill="#fff" opacity=".9" />
          <Ln x={212} y={110} w={50} c="#fff" /><Ln x={212} y={124} w={34} c="#cfe0ff" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={172} y={158 + i * 46} width={106} height={38} rx={10} fill="#eaf1ff" />
              <circle cx={190} cy={177 + i * 46} r={9} fill={['url(#sc-cyan)', 'url(#sc-violet)', 'url(#sc-blue)'][i]} />
              <Ln x={206} y={170 + i * 46} w={56} c="#8fb4ff" /><Ln x={206} y={182 + i * 46} w={38} />
            </g>
          ))}
        </Phone>
      </g>
      <g transform="rotate(8 355 215)">
        <Phone x={290} y={96} w={130} h={250} c="b">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={304 + (i % 2) * 52} y={124 + Math.floor(i / 2) * 58} width={44} height={44} rx={13}
              fill={['url(#sc-blue)', 'url(#sc-cyan)', 'url(#sc-violet)', 'url(#sc-violet)', 'url(#sc-blue)', 'url(#sc-cyan)'][i]} />
          ))}
          <rect x={304} y={300} width={96} height={24} rx={12} fill="#eaf1ff" />
        </Phone>
      </g>
      <g className="sc-fl sc-fl-c">
        <rect x={60} y={110} width={124} height={46} rx={14} className="sc-win" />
        <circle cx={84} cy={133} r={12} fill="url(#sc-blue)" />
        <Ln x={104} y={124} w={64} c="#8fb4ff" /><Ln x={104} y={138} w={44} />
      </g>
      <Tile x={440} y={70} c="a">
        <path d="M-12 8H12L8 -2V-8A8 8 0 0 0 -8 -8V-2Z" /><path d="M-4 14H4" />
      </Tile>
      <Orb x={500} y={250} r={9} c="b" />
    </>
  )
}

/* ---------- 5. Windows Application Development ---------- */
function Windows() {
  return (
    <>
      <g className="sc-fl sc-fl-a">
        <rect x={120} y={76} width={260} height={176} rx={14} fill="url(#sc-dark)" />
        <rect x={130} y={86} width={240} height={150} rx={6} className="sc-win" />
        <path d="M130 92a6 6 0 0 1 6-6h228a6 6 0 0 1 6 6v14H130Z" fill="url(#sc-blue)" />
        <Ln x={142} y={94} w={50} c="#fff" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Ln x={142} y={120 + i * 22} w={90} c="#8fb4ff" /><Ln x={246} y={120 + i * 22} w={34} /><Ln x={292} y={120 + i * 22} w={30} />
          </g>
        ))}
        <rect x={290} y={206} width={70} height={20} rx={10} fill="url(#sc-blue)" />
        <path d="M240 252h20l8 28h-36z" fill="#b7c8ee" />
        <rect x={212} y={280} width={76} height={8} rx={4} fill="#97abd8" />
      </g>
      <g className="sc-fl sc-fl-c">
        <rect x={420} y={214} width={64} height={46} rx={4} className="sc-win" />
        <Ln x={430} y={224} w={40} c="#8fb4ff" /><Ln x={430} y={236} w={28} /><Ln x={430} y={246} w={34} />
        <rect x={404} y={256} width={96} height={46} rx={12} fill="url(#sc-blue)" />
        <rect x={420} y={268} width={64} height={6} rx={3} fill="#fff" opacity=".6" />
        <circle cx={484} cy={288} r={4} fill="#a5f3fc" />
      </g>
      <Tile x={60} y={150} c="b">
        <path d="M-16 -14V14M-8 -14V14M0 -14V14M6 -14V14M14 -14V14" />
      </Tile>
      <Orb x={80} y={90} r={9} c="a" /><Orb x={510} y={150} r={8} c="b" />
    </>
  )
}

/* ---------- 6. Digital Marketing & SEO ---------- */
function Seo() {
  return (
    <>
      {[50, 80, 110, 140, 176].map((h, i) => (
        <rect key={i} className="sc-fl sc-fl-c" x={120 + i * 48} y={300 - h} width={34} height={h} rx={7}
          fill={i % 2 ? 'url(#sc-blue)' : 'url(#sc-violet)'} />
      ))}
      <g className="sc-fl sc-fl-a">
        <path d="M118 150L190 124L240 138L330 70" fill="none" stroke="url(#sc-cyan)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M338 64L330 80L320 67Z" fill="#22b8ff" stroke="#22b8ff" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g className="sc-fl sc-fl-b">
        <line x1="384" y1="214" x2="436" y2="266" stroke="url(#sc-blue)" strokeWidth="16" strokeLinecap="round" />
        <circle cx="340" cy="170" r="62" fill="#fff" fillOpacity=".38" />
        <circle cx="340" cy="170" r="62" fill="none" stroke="url(#sc-blue)" strokeWidth="12" />
        <path d="M304 190L326 166L346 180L376 144" fill="none" stroke="#22b8ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M312 120A52 52 0 0 1 356 112" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
      </g>
      <g className="sc-fl sc-fl-a" transform="translate(110 140)">
        <path d="M0 0c-18-22-26-34-26-46a26 26 0 1 1 52 0c0 12-8 24-26 46z" fill="url(#sc-violet)" />
        <circle cx="0" cy="-46" r="10" fill="#fff" />
      </g>
      <g className="sc-fl sc-fl-b">
        <circle cx="468" cy="100" r="34" fill="#fff" stroke="#9db9f5" strokeWidth="2" />
        <circle cx="468" cy="100" r="24" fill="url(#sc-violet)" />
        <circle cx="468" cy="100" r="13" fill="#fff" />
        <circle cx="468" cy="100" r="6" fill="url(#sc-blue)" />
      </g>
      <Orb x={70} y={300} r={9} c="c" />
    </>
  )
}

/* ---------- 7. Social Media Marketing ---------- */
function Social() {
  return (
    <>
      <Phone x={200} y={56} w={150} h={270} c="a">
        <circle cx={226} cy={92} r={11} fill="url(#sc-violet)" />
        <Ln x={244} y={86} w={60} c="#8fb4ff" /><Ln x={244} y={98} w={40} />
        <rect x={214} y={112} width={122} height={100} rx={10} fill="url(#sc-blue)" />
        <circle cx={306} cy={140} r={11} fill="#fff" opacity=".85" />
        <path d="M214 212L254 166L282 196L300 178L336 212Z" fill="#fff" opacity=".4" />
        <circle cx={224} cy={228} r={7} fill="#ff8aa8" opacity=".9" /><circle cx={246} cy={228} r={7} fill="#cfdcfb" /><circle cx={268} cy={228} r={7} fill="#cfdcfb" />
        <Ln x={214} y={246} w={100} c="#8fb4ff" /><Ln x={214} y={258} w={78} />
        <rect x={214} y={276} width={122} height={30} rx={10} fill="#eaf1ff" />
      </Phone>
      <g className="sc-fl sc-fl-c">
        <rect x={64} y={126} width={124} height={58} rx={18} fill="url(#sc-blue)" />
        <path d="M92 184L86 204L110 184Z" fill="url(#sc-blue)" />
        <circle cx={100} cy={155} r={6} fill="#fff" /><circle cx={126} cy={155} r={6} fill="#fff" /><circle cx={152} cy={155} r={6} fill="#fff" />
      </g>
      <Tile x={384} y={92} c="b">
        <path d="M0 12C-18 0 -16 -14 -7 -14C-3 -14 0 -10 0 -10C0 -10 3 -14 7 -14C16 -14 18 0 0 12Z" fill="#7c5cf0" fillOpacity=".18" />
      </Tile>
      <Tile x={400} y={236} c="a">
        <path d="M-14 -6L10 -18V18L-14 6Z" /><rect x={-22} y={-6} width={8} height={12} rx={3} /><path d="M-12 6L-8 18H-2L-4 6" />
      </Tile>
      <Orb x={80} y={80} r={9} c="a" /><Orb x={510} y={190} r={7} c="c" />
    </>
  )
}

/* ---------- 8. Digital Business Cards (NFC & QR) ---------- */
const QR = ['1110111', '1010101', '1110111', '0001000', '1110101', '1010011', '1110110']

function Card() {
  return (
    <>
      <g transform="rotate(-10 250 190)">
        <g className="sc-fl sc-fl-a">
          <rect x={120} y={114} width={250} height={156} rx={20} fill="#1d3fa8" opacity=".2" filter="url(#sc-blur)" />
          <rect x={120} y={104} width={250} height={156} rx={20} fill="url(#sc-blue)" />
          <path d="M120 124a20 20 0 0 1 20-20h120C220 150 180 200 120 220Z" fill="#fff" opacity=".12" />
          <circle cx={156} cy={146} r={20} fill="#fff" opacity=".92" />
          <Ln x={186} y={136} w={80} h={8} c="#fff" /><Ln x={186} y={152} w={56} c="#cfe0ff" />
          <Ln x={140} y={196} w={96} c="#cfe0ff" /><Ln x={140} y={210} w={72} c="#a5c4ff" /><Ln x={140} y={224} w={84} c="#a5c4ff" />
          <rect x={286} y={140} width={64} height={64} rx={8} fill="#fff" />
          {QR.flatMap((row, r) => [...row].map((v, c) => v === '1' && (
            <rect key={`${r}-${c}`} x={294 + c * 7.2} y={148 + r * 7.2} width="6" height="6" rx="1" fill="#1f3fb0" />
          )))}
        </g>
      </g>
      <g fill="none" stroke="#3b6cf0" strokeWidth="5" strokeLinecap="round">
        <path d="M378 172a26 26 0 0 1 0 44" opacity=".9" />
        <path d="M392 160a44 44 0 0 1 0 68" opacity=".6" />
        <path d="M406 148a62 62 0 0 1 0 92" opacity=".35" />
      </g>
      <Phone x={420} y={110} w={96} h={190} c="b">
        <rect x={430} y={134} width={76} height={44} rx={10} fill="url(#sc-violet)" />
        <circle cx={468} cy={190} r={14} fill="url(#sc-blue)" />
        <Ln x={440} y={214} w={56} c="#8fb4ff" /><Ln x={446} y={226} w={44} />
        <rect x={440} y={248} width={56} height={16} rx={8} fill="url(#sc-blue)" />
        <rect x={440} y={270} width={56} height={14} rx={7} fill="#eaf1ff" />
      </Phone>
      <Tile x={70} y={250} c="c">
        <rect x={-16} y={-16} width={12} height={12} rx={3} /><rect x={4} y={-16} width={12} height={12} rx={3} /><rect x={-16} y={4} width={12} height={12} rx={3} /><path d="M6 6H16V16" />
      </Tile>
      <Orb x={70} y={80} r={9} c="a" /><Orb x={520} y={60} r={7} c="c" />
    </>
  )
}

/* ---------- 9. Software Consulting & Business Solutions ---------- */
function Consulting() {
  const road = 'M80 330C150 270 120 210 210 200S330 160 360 110S430 90 470 80'
  return (
    <>
      <path d={road} fill="none" stroke="#cfdcfb" strokeWidth="18" strokeLinecap="round" />
      <path d={road} fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="8 8" strokeLinecap="round" />
      {[[80, 330], [210, 200], [360, 110]].map(([cx, cy]) => (
        <g key={cx} className="sc-fl sc-fl-c">
          <circle cx={cx} cy={cy} r={13} fill="url(#sc-blue)" /><circle cx={cx} cy={cy} r={5} fill="#fff" />
        </g>
      ))}
      <g className="sc-fl sc-fl-a">
        <rect x={468} y={36} width={4} height={46} rx={2} fill="#2f5ee0" />
        <path d="M472 38L504 48L472 60Z" fill="url(#sc-violet)" />
      </g>
      <g className="sc-fl sc-fl-b">
        <circle cx={130} cy={96} r={30} fill="url(#sc-cloud)" stroke="#8fb4ff" strokeWidth="2" />
        <path d="M120 100L126 90L134 100L140 90" fill="none" stroke="#2f5ee0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={118} y={124} width={24} height={10} rx={4} fill="#8fb4ff" /><rect x={122} y={136} width={16} height={6} rx={3} fill="#6f9bff" />
        <g stroke="#7aa6ff" strokeWidth="3" strokeLinecap="round"><path d="M130 48V56" /><path d="M88 66L94 72" /><path d="M172 66L166 72" /><path d="M80 96H88" /><path d="M172 96H180" /></g>
      </g>
      <g className="sc-fl sc-fl-a">
        <rect x={360} y={200} width={120} height={140} rx={14} fill="url(#sc-blue)" />
        <rect x={370} y={218} width={100} height={112} rx={8} className="sc-win" />
        <rect x={398} y={190} width={44} height={20} rx={8} fill="#8fb4ff" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={386} cy={242 + i * 30} r={8} fill="url(#sc-cyan)" />
            <path d={`M382 ${242 + i * 30}l3 3l6-6`} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <Ln x={402} y={238 + i * 30} w={56} c="#8fb4ff" /><Ln x={402} y={248 + i * 30} w={38} />
          </g>
        ))}
      </g>
      <Slab x={290} y={40} s={34} h={34} c="c" />
      <Orb x={70} y={200} r={9} c="a" /><Orb x={520} y={300} r={8} c="b" />
    </>
  )
}

const SCENES = {
  software: Software,
  website: Website,
  webapp: WebApp,
  mobile: Mobile,
  windows: Windows,
  seo: Seo,
  social: Social,
  card: Card,
  consulting: Consulting,
}

export default function ServiceScene3D({ kind = 'software', title = 'Service illustration' }) {
  const Scene = SCENES[kind] || Software
  return (
    <svg className="sc3d" viewBox="0 0 560 460" role="img" aria-label={title} focusable="false">
      <Defs />
      <Base />
      <Scene />
    </svg>
  )
}