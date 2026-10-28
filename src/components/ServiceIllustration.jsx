import { useId } from 'react'

/**
 * Service-specific 3D-style illustrations (layered shapes, soft light, floating
 * objects). Blue / violet / cyan only. Surfaces use CSS classes (sd-s, sd-s2,
 * sd-bar, sd-plat, sd-floor, sd-st) that ServiceDetail.css maps to light/dark
 * theme variables, so the artwork follows the `.dark` class.
 */

const FL = 'service-detail-fl'
const FL_B = 'service-detail-fl service-detail-fl-b'
const FL_C = 'service-detail-fl service-detail-fl-c'

const QR_ROWS = [
  '111010111',
  '101001101',
  '111110111',
  '000101000',
  '110010110',
  '011001010',
  '111010011',
  '101101100',
  '111011101',
]

function Defs({ u }) {
  return (
    <defs>
      <linearGradient id={`${u}t`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e6eeff" />
        <stop offset="100%" stopColor="#97b8ff" />
      </linearGradient>
      <linearGradient id={`${u}l`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4d86ff" />
        <stop offset="100%" stopColor="#2a45d8" />
      </linearGradient>
      <linearGradient id={`${u}r`} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7f9bff" />
        <stop offset="100%" stopColor="#2b3fb8" />
      </linearGradient>
      <linearGradient id={`${u}c`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7fe3ff" />
        <stop offset="100%" stopColor="#1494d8" />
      </linearGradient>
      <linearGradient id={`${u}v`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a592ff" />
        <stop offset="100%" stopColor="#5a3cf2" />
      </linearGradient>
      <linearGradient id={`${u}b`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1fb6ff" />
        <stop offset="50%" stopColor="#2f6bff" />
        <stop offset="100%" stopColor="#6d4bff" />
      </linearGradient>
      <radialGradient id={`${u}o`} cx=".3" cy=".25" r=".8">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="45%" stopColor="#7fb2ff" />
        <stop offset="100%" stopColor="#3b4fe0" />
      </radialGradient>
      <filter id={`${u}s`} x="-20%" y="-20%" width="140%" height="155%">
        <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#3b4fe0" floodOpacity=".24" />
      </filter>
    </defs>
  )
}

const gr = (u, k) => `url(#${u}${k})`

function Floor({ u }) {
  return (
    <g>
      <ellipse cx="260" cy="396" rx="205" ry="30" className="sd-floor" />
      <path d="M260 318 L450 360 L260 402 L70 360Z" className="sd-plat" />
      <path d="M70 360 L260 402 V418 L70 376Z" fill={gr(u, 'l')} />
      <path d="M450 360 L260 402 V418 L450 376Z" fill={gr(u, 'r')} />
    </g>
  )
}

function Cube({ u, x, y, s = 30, tone = 'blue', cls = '' }) {
  const top = { blue: '#dce8ff', cyan: '#d9fbff', violet: '#e6defe' }[tone]
  const left = { blue: 'l', cyan: 'c', violet: 'v' }[tone]
  const right = { blue: '#2b3fb8', cyan: '#1494d8', violet: '#4a30c8' }[tone]
  const h = s * 1.1
  return (
    <g className={cls}>
      <path d={`M${x} ${y} L${x + s} ${y + s / 2} L${x} ${y + s} L${x - s} ${y + s / 2}Z`} fill={top} />
      <path d={`M${x - s} ${y + s / 2} L${x} ${y + s} V${y + s + h} L${x - s} ${y + s / 2 + h}Z`} fill={gr(u, left)} />
      <path d={`M${x + s} ${y + s / 2} L${x} ${y + s} V${y + s + h} L${x + s} ${y + s / 2 + h}Z`} fill={right} />
    </g>
  )
}

function Orb({ u, x, y, r, cls = '' }) {
  return <circle className={cls} cx={x} cy={y} r={r} fill={gr(u, 'o')} />
}

function Win({ u, x, y, w, h }) {
  return (
    <g filter={`url(#${u}s)`}>
      <rect x={x} y={y} width={w} height={h} rx="16" className="sd-s sd-st" />
      <path
        d={`M${x} ${y + 28} V${y + 16} a16 16 0 0 1 16 -16 H${x + w - 16} a16 16 0 0 1 16 16 V${y + 28}Z`}
        className="sd-s2"
      />
      <circle cx={x + 18} cy={y + 14} r="4" fill="#1fb6ff" />
      <circle cx={x + 32} cy={y + 14} r="4" fill="#2f6bff" />
      <circle cx={x + 46} cy={y + 14} r="4" fill="#6d4bff" />
    </g>
  )
}

function Ln({ x, y, w, f, h = 7 }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={f} className={f ? undefined : 'sd-bar'} />
}

function QR({ x, y, s, fill = '#2a3fb8' }) {
  const c = s / 9
  return (
    <g>
      {QR_ROWS.flatMap((row, r) =>
        row.split('').map((v, i) =>
          v === '1' ? (
            <rect key={`${r}-${i}`} x={x + i * c} y={y + r * c} width={c + 0.4} height={c + 0.4} rx={c * 0.18} fill={fill} />
          ) : null,
        ),
      )}
    </g>
  )
}

/* ---------------------------------------------------------------- scenes */

function Software({ u }) {
  const g = (k) => gr(u, k)
  return (
    <>
      <Floor u={u} />
      <Win u={u} x={140} y={140} w={240} h={172} />
      <Ln x={160} y={182} w={70} f={g('v')} />
      <Ln x={238} y={182} w={50} />
      <Ln x={176} y={200} w={90} f={g('c')} />
      <Ln x={274} y={200} w={40} />
      <Ln x={176} y={218} w={60} />
      <Ln x={244} y={218} w={70} f={g('b')} />
      <Ln x={160} y={236} w={110} />
      <Ln x={176} y={254} w={80} f={g('v')} />
      <Ln x={264} y={254} w={50} />
      <Ln x={160} y={272} w={50} f={g('c')} />
      <path d="M140 294 H380 V296 a16 16 0 0 1 -16 16 H156 a16 16 0 0 1 -16 -16 Z" fill={g('b')} />

      <Cube u={u} x={420} y={110} s={30} cls={FL} />

      <g className={FL_B}>
        <circle cx="102" cy="176" r="24" fill="none" stroke={g('v')} strokeWidth="11" strokeDasharray="9.4 9.4" />
        <circle cx="102" cy="176" r="19" className="sd-s sd-st" />
        <circle cx="102" cy="176" r="7" fill={g('b')} />
      </g>

      <g className={FL_C}>
        <path d="M74 286 C94 270 110 280 128 262" fill="none" stroke={g('b')} strokeWidth="3" strokeLinecap="round" />
        <circle cx="74" cy="286" r="9" className="sd-s sd-st" />
        <circle cx="74" cy="286" r="4" fill={g('c')} />
        <circle cx="128" cy="262" r="9" className="sd-s sd-st" />
        <circle cx="128" cy="262" r="4" fill={g('v')} />
      </g>

      <Orb u={u} x={350} y={96} r={12} cls={FL_B} />
      <Orb u={u} x={450} y={262} r={8} cls={FL} />
    </>
  )
}

function Website({ u }) {
  const g = (k) => gr(u, k)
  return (
    <>
      <Floor u={u} />
      <Win u={u} x={130} y={128} w={260} h={186} />
      <rect x="196" y="135" width="150" height="14" rx="7" className="sd-bar" />
      <rect x="146" y="166" width="228" height="72" rx="12" fill={g('b')} />
      <circle cx="338" cy="202" r="28" fill="#fff" opacity=".18" />
      <circle cx="352" cy="190" r="14" fill="#fff" opacity=".28" />
      <rect x="162" y="182" width="110" height="8" rx="4" fill="#fff" />
      <rect x="162" y="198" width="80" height="7" rx="3.5" fill="#fff" opacity=".7" />
      <rect x="162" y="214" width="56" height="14" rx="7" fill="#fff" />
      {[146, 226, 306].map((x, i) => (
        <g key={x}>
          <rect x={x} y="250" width="68" height="52" rx="10" className="sd-s2" />
          <circle cx={x + 18} cy="270" r="8" fill={g(['c', 'l', 'v'][i])} />
          <Ln x={x + 10} y={286} w={46} />
        </g>
      ))}

      <g className={FL_B}>
        <path
          d="M350 232 L350 258 L357 252 L362 263 L368 260 L363 250 L372 250Z"
          fill={g('v')}
          stroke="#fff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      <g className={FL}>
        <circle cx="430" cy="132" r="22" className="sd-s sd-st" fillOpacity=".9" />
        <circle cx="430" cy="132" r="22" fill="none" stroke={g('b')} strokeWidth="6" />
        <path d="M446 148 L466 168" stroke={g('v')} strokeWidth="8" strokeLinecap="round" />
      </g>

      <g className={FL_C}>
        <path d="M60 96 L112 122 L60 148 L8 122Z" fill="#d9fbff" transform="translate(30 0)" />
        <path d="M38 122 L90 148 V164 L38 138Z" fill="#22b8ff" transform="translate(30 0)" />
        <path d="M142 122 L90 148 V164 L142 138Z" fill="#1494d8" transform="translate(30 0)" />
      </g>

      <Cube u={u} x={84} y={252} s={20} tone="violet" cls={FL_B} />
      <Orb u={u} x={470} y={252} r={9} cls={FL_C} />
    </>
  )
}

function WebApp({ u }) {
  const g = (k) => gr(u, k)
  return (
    <>
      <Floor u={u} />
      <Win u={u} x={120} y={124} w={280} h={190} />
      <rect x="130" y="160" width="44" height="146" rx="10" className="sd-s2" />
      {[180, 204, 228].map((y, i) => (
        <circle key={y} cx="152" cy={y} r="7" fill={g(i === 0 ? 'v' : 'b')} opacity={i === 0 ? 1 : 0.7} />
      ))}
      {[186, 257, 328].map((x, i) => (
        <g key={x}>
          <rect x={x} y="162" width="62" height="40" rx="8" className="sd-s2" />
          <Ln x={x + 10} y={172} w={26} />
          <Ln x={x + 10} y={186} w={40} f={g(['c', 'b', 'v'][i])} h={8} />
        </g>
      ))}
      <rect x="186" y="212" width="204" height="92" rx="10" className="sd-s2" />
      <path d="M198 290 L228 266 L256 276 L288 244 L320 256 L352 230 L378 236 V296 H198Z" fill={g('c')} opacity=".2" />
      <path
        d="M198 290 L228 266 L256 276 L288 244 L320 256 L352 230 L378 236"
        fill="none"
        stroke={g('b')}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="352" cy="230" r="5" className="sd-s" stroke="#6d4bff" strokeWidth="3" />

      <g className={FL_B}>
        <path d="M50 222 V268 a30 11 0 0 0 60 0 V222Z" fill={g('l')} />
        <ellipse cx="80" cy="222" rx="30" ry="11" fill="#dce8ff" />
        <path d="M50 238 a30 11 0 0 0 60 0 M50 254 a30 11 0 0 0 60 0" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" />
      </g>

      <g className={FL} filter={`url(#${u}s)`}>
        <circle cx="428" cy="118" r="18" className="sd-s" />
        <circle cx="452" cy="128" r="14" className="sd-s" />
        <circle cx="408" cy="130" r="12" className="sd-s" />
        <rect x="408" y="126" width="46" height="16" rx="8" className="sd-s" />
        <path d="M430 136 V118 M424 124 L430 118 L436 124" fill="none" stroke={g('b')} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <Cube u={u} x={74} y={104} s={20} tone="violet" cls={FL_C} />
      <Orb u={u} x={456} y={246} r={9} cls={FL_B} />
    </>
  )
}

function Mobile({ u }) {
  const g = (k) => gr(u, k)
  return (
    <>
      <Floor u={u} />
      <g transform="rotate(-10 200 250)">
        <rect x="132" y="136" width="112" height="214" rx="24" fill={g('v')} />
        <rect x="140" y="146" width="96" height="194" rx="18" className="sd-s2" />
        <rect x="150" y="162" width="76" height="36" rx="10" fill={g('c')} opacity=".85" />
        <Ln x={150} y={214} w={60} />
        <Ln x={150} y={230} w={44} />
      </g>

      <g filter={`url(#${u}s)`}>
        <rect x="230" y="98" width="142" height="254" rx="28" fill="#16204f" />
      </g>
      <rect x="238" y="108" width="126" height="234" rx="21" className="sd-s" />
      <rect x="276" y="114" width="50" height="9" rx="4.5" fill="#16204f" />
      <rect x="248" y="134" width="106" height="54" rx="12" fill={g('b')} />
      <rect x="260" y="148" width="58" height="8" rx="4" fill="#fff" />
      <rect x="260" y="164" width="38" height="7" rx="3.5" fill="#fff" opacity=".7" />
      {[204, 238, 272].map((y, i) => (
        <g key={y}>
          <circle cx="264" cy={y + 12} r="12" fill={g(['c', 'l', 'v'][i])} />
          <Ln x={284} y={y + 4} w={60} />
          <Ln x={284} y={y + 18} w={38} />
        </g>
      ))}
      <rect x="252" y="308" width="98" height="22" rx="11" fill={g('b')} />

      <g className={FL_B} filter={`url(#${u}s)`}>
        <rect x="378" y="146" width="112" height="46" rx="14" className="sd-s" />
        <circle cx="400" cy="169" r="11" fill={g('c')} />
        <Ln x={418} y={160} w={58} />
        <Ln x={418} y={174} w={36} />
      </g>

      <Orb u={u} x={130} y={112} r={18} cls={FL} />
      <Cube u={u} x={104} y={250} s={18} tone="cyan" cls={FL_C} />
      <Orb u={u} x={456} y={282} r={8} cls={FL_C} />
    </>
  )
}

function Windows({ u }) {
  const g = (k) => gr(u, k)
  return (
    <>
      <Floor u={u} />
      <path d="M240 304 H290 L304 342 H226Z" fill={g('r')} />
      <rect x="196" y="340" width="128" height="11" rx="5.5" fill={g('l')} />
      <g filter={`url(#${u}s)`}>
        <rect x="120" y="116" width="280" height="190" rx="16" fill="#16204f" />
      </g>
      <rect x="130" y="126" width="260" height="170" rx="8" className="sd-s" />
      <path d="M130 134 a8 8 0 0 1 8 -8 H184 V296 H138 a8 8 0 0 1 -8 -8Z" fill={g('l')} />
      {[152, 176, 200].map((y, i) => (
        <circle key={y} cx="157" cy={y} r="6" fill="#fff" opacity={i === 0 ? 1 : 0.65} />
      ))}
      <rect x="196" y="138" width="184" height="18" rx="6" className="sd-s2" />
      {[170, 188, 206, 224].map((y, i) => (
        <g key={y}>
          <Ln x={202} y={y} w={50} />
          <Ln x={266} y={y} w={56} />
          <Ln x={338} y={y} w={34} f={i % 2 ? g('v') : g('c')} />
        </g>
      ))}
      <rect x="292" y="250" width="86" height="28" rx="14" fill={g('b')} />
      <rect x="306" y="260" width="58" height="8" rx="4" fill="#fff" />

      <g className={FL_B} filter={`url(#${u}s)`}>
        <path d="M410 140 H472 V268 l-7.75 -8 -7.75 8 -7.75 -8 -7.75 8 -7.75 -8 -7.75 8 -7.75 -8 -7.75 8 -7.75 -8Z" className="sd-s sd-st" />
        <Ln x={422} y={156} w={40} />
        <Ln x={422} y={170} w={28} />
        <Ln x={422} y={184} w={40} />
        {[0, 3, 5, 9, 12, 15, 19, 22, 26, 29, 33].map((o, i) => (
          <rect key={o} x={422 + o * 1.15} y="206" width={i % 3 === 0 ? 3 : 1.8} height="34" fill="#2a3fb8" />
        ))}
      </g>

      <g className={FL}>
        <rect x="52" y="104" width="22" height="22" rx="5" fill={g('c')} />
        <rect x="78" y="104" width="22" height="22" rx="5" fill={g('l')} />
        <rect x="52" y="130" width="22" height="22" rx="5" fill={g('v')} />
        <rect x="78" y="130" width="22" height="22" rx="5" fill={g('b')} />
      </g>

      <Cube u={u} x={74} y={230} s={18} tone="violet" cls={FL_C} />
      <Orb u={u} x={448} y={92} r={11} cls={FL_C} />
    </>
  )
}

function Marketing({ u }) {
  const g = (k) => gr(u, k)
  const heights = [34, 52, 70, 92, 118]
  return (
    <>
      <Floor u={u} />
      <g filter={`url(#${u}s)`}>
        <rect x="110" y="140" width="230" height="172" rx="18" className="sd-s sd-st" />
      </g>
      <Ln x={130} y={158} w={70} f={g('v')} />
      <Ln x={130} y={172} w={44} />
      {heights.map((h, i) => (
        <rect key={h} x={132 + i * 40} y={296 - h} width="26" height={h} rx="7" fill={g(i === 4 ? 'v' : i % 2 ? 'c' : 'l')} />
      ))}
      <path d="M134 262 L190 232 L232 246 L298 190" fill="none" stroke={g('b')} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M284 184 L306 178 L302 202Z" fill="#6d4bff" />

      <g className={FL_B}>
        <circle cx="430" cy="204" r="36" fill="#dce8ff" />
        <circle cx="430" cy="204" r="26" fill={g('l')} />
        <circle cx="430" cy="204" r="15" fill="#dce8ff" />
        <circle cx="430" cy="204" r="6" fill={g('v')} />
        <path d="M430 204 L464 170" stroke="#5a3cf2" strokeWidth="4" strokeLinecap="round" />
        <path d="M456 166 L468 166 M468 166 L468 178" fill="none" stroke="#5a3cf2" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g className={FL}>
        <path d="M60 226 L122 196 V280 L60 250Z" fill={g('v')} />
        <rect x="42" y="224" width="24" height="30" rx="7" fill={g('l')} />
        <rect x="70" y="250" width="14" height="32" rx="5" fill={g('c')} />
        <path d="M134 222 q14 20 0 40 M148 210 q22 32 0 64" fill="none" stroke={g('c')} strokeWidth="4" strokeLinecap="round" />
      </g>

      <g className={FL_C} filter={`url(#${u}s)`}>
        <rect x="304" y="82" width="94" height="46" rx="16" className="sd-s" />
        <path d="M324 128 L318 144 L340 128Z" className="sd-s" />
        <circle cx="332" cy="105" r="5" fill={g('c')} />
        <circle cx="351" cy="105" r="5" fill={g('b')} />
        <circle cx="370" cy="105" r="5" fill={g('v')} />
      </g>

      <Cube u={u} x={86} y={108} s={20} tone="cyan" cls={FL_C} />
      <Orb u={u} x={470} y={96} r={10} cls={FL_B} />
    </>
  )
}

function VCard({ u }) {
  const g = (k) => gr(u, k)
  return (
    <>
      <Floor u={u} />

      <g transform="rotate(6 200 230)" filter={`url(#${u}s)`}>
        <rect x="118" y="168" width="190" height="120" rx="16" fill={g('v')} />
      </g>

      <g transform="rotate(-12 190 250)" filter={`url(#${u}s)`}>
        <rect x="90" y="190" width="190" height="120" rx="16" fill={g('b')} />
        <rect x="108" y="208" width="30" height="22" rx="5" fill="#fff" opacity=".55" />
        <rect x="108" y="254" width="82" height="8" rx="4" fill="#fff" />
        <rect x="108" y="270" width="52" height="7" rx="3.5" fill="#fff" opacity=".7" />
        <path d="M244 210 a10 10 0 0 1 0 18 M252 204 a18 18 0 0 1 0 30 M260 198 a26 26 0 0 1 0 42" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9" />
        <rect x="228" y="254" width="42" height="42" rx="8" fill="#fff" />
        <QR x={232} y={258} s={34} />
      </g>

      <g className={FL_B}>
        <path d="M296 204 a22 22 0 0 1 0 44 M306 192 a34 34 0 0 1 0 68" fill="none" stroke={g('c')} strokeWidth="4" strokeLinecap="round" />
      </g>

      <g filter={`url(#${u}s)`}>
        <rect x="330" y="108" width="114" height="212" rx="26" fill="#16204f" />
      </g>
      <rect x="338" y="118" width="98" height="192" rx="19" className="sd-s" />
      <rect x="372" y="123" width="30" height="7" rx="3.5" fill="#16204f" />
      <circle cx="387" cy="160" r="21" fill={g('c')} />
      <circle cx="387" cy="154" r="7" fill="#fff" opacity=".9" />
      <path d="M373 172 a14 11 0 0 1 28 0Z" fill="#fff" opacity=".9" />
      <Ln x={356} y={192} w={62} f={g('b')} />
      <Ln x={364} y={206} w={46} />
      {[361, 387, 413].map((x, i) => (
        <circle key={x} cx={x} cy="240" r="11" fill={g(['l', 'v', 'c'][i])} />
      ))}
      <rect x="354" y="266" width="66" height="22" rx="11" fill={g('b')} />

      <g className={FL_C} filter={`url(#${u}s)`}>
        <rect x="46" y="94" width="78" height="78" rx="14" className="sd-s sd-st" />
        <QR x={58} y={106} s={54} />
      </g>

      <Cube u={u} x={470} y={290} s={18} tone="cyan" cls={FL} />
      <Orb u={u} x={150} y={92} r={10} cls={FL_B} />
      <Orb u={u} x={478} y={110} r={8} cls={FL_C} />
    </>
  )
}

const SCENES = {
  software: Software,
  website: Website,
  webapp: WebApp,
  mobile: Mobile,
  windows: Windows,
  marketing: Marketing,
  card: VCard,
}

export function ServiceIllustration({ kind = 'software', className = '' }) {
  const u = `si${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const Scene = SCENES[kind] || SCENES.software

  return (
    <svg
      className={`service-detail-art ${className}`.trim()}
      viewBox="0 0 520 440"
      aria-hidden="true"
      focusable="false"
    >
      <Defs u={u} />
      <Scene u={u} />
    </svg>
  )
}

export default ServiceIllustration