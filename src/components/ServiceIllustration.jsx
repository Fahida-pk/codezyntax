import { useId } from 'react'

/* ---------- palette ---------- */
const BLUE = { top: '#e6ebff', l: '#6a8bff', r: '#4a3fd8' }
const CYAN = { top: '#dcfbff', l: '#33c8ff', r: '#1d7fe0' }
const SKY = { top: '#ffffff', l: '#d9e2ff', r: '#aab5f6' }
const NAVY = '#16225a'

/* ---------- primitives ---------- */

// Isometric box: (x, y) is the back-top vertex.
function Box({ x, y, w, d = w, h, c = BLUE }) {
  const a = 0.866
  const b = 0.5
  const p1 = [x + w * a, y + w * b]
  const p2 = [x + w * a - d * a, y + w * b + d * b]
  const p3 = [x - d * a, y + d * b]
  const pts = (arr) => arr.map((p) => p.join(',')).join(' ')

  const left = pts([p3, p2, [p2[0], p2[1] + h], [p3[0], p3[1] + h]])
  return (
    <g>
      <polygon points={pts([[x, y], p1, p2, p3])} fill={c.top} stroke="#fff" strokeOpacity=".85" strokeWidth="1.2" />
      <polygon points={left} fill={c.l} />
      <polygon points={left} fill="#fff" opacity=".14" />
      <polygon
        points={pts([p2, p1, [p1[0], p1[1] + h], [p2[0], p2[1] + h]])}
        fill={c.r}
      />
      <line x1={p2[0]} y1={p2[1]} x2={p2[0]} y2={p2[1] + h} stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
    </g>
  )
}

function Ln({ x, y, w, c = '#cfdcf7', h = 6 }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />
}

function Win({ x, y, w, h, id, children }) {
  return (
    <g filter={`url(#${id}-sh)`}>
      <rect x={x} y={y} width={w} height={h} rx="14" fill="#fff" stroke="#d6e3fb" />
      <path
        d={`M${x} ${y + 26}V${y + 14}a14 14 0 0 1 14-14H${x + w - 14}a14 14 0 0 1 14 14V${y + 26}Z`}
        fill="#eaf1ff"
      />
      <circle cx={x + 16} cy={y + 13} r="3.5" fill="#8b7bff" />
      <circle cx={x + 29} cy={y + 13} r="3.5" fill="#a99bff" />
      <circle cx={x + 42} cy={y + 13} r="3.5" fill="#7ad7ff" />
      {children}
    </g>
  )
}

function Phone({ x, y, w, h, id, children }) {
  return (
    <g filter={`url(#${id}-sh)`}>
      <rect x={x} y={y} width={w} height={h} rx="30" fill={NAVY} />
      <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} rx="24" fill="#fff" />
      <rect x={x + w / 2 - 18} y={y + 12} width="36" height="8" rx="4" fill={NAVY} />
      {children}
    </g>
  )
}

function Float({ k = 'a', children }) {
  return <g className={`service-detail-fl service-detail-fl-${k}`}>{children}</g>
}

const Heart = ({ x, y, s = 0.7 }) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0 10C-22 -4 -14 -22 0 -10C14 -22 22 -4 0 10Z"
    fill="#8b5cf6"
  />
)

/* ---------- scenes ---------- */

const SCENES = {
  /* Custom software: layered platform + code window */
  software: ({ id }) => (
    <>
      <Box x={260} y={205} w={170} h={24} c={BLUE} />
      <Box x={260} y={191} w={150} h={24} c={CYAN} />
      <Box x={260} y={177} w={130} h={24} c={SKY} />
      <line x1="260" y1="156" x2="260" y2="190" stroke="#7aa6ff" strokeWidth="2" strokeDasharray="4 5" />
      <Float k="a">
        <Win x={165} y={36} w={190} h={120} id={id}>
          <Ln x={183} y={72} w={64} c="#4a5dff" />
          <Ln x={183} y={87} w={110} />
          <Ln x={199} y={102} w={84} c="#22b8ff" />
          <Ln x={199} y={117} w={104} />
          <Ln x={183} y={132} w={52} c="#4a5dff" />
          <text
            x="335" y="136" textAnchor="end" fontSize="26" fontWeight="800"
            fill="#4a5dff" fontFamily="Plus Jakarta Sans, Inter, sans-serif"
          >
            {'</>'}
          </text>
        </Win>
      </Float>
      <Float k="b">
        <Box x={432} y={118} w={40} h={26} c={CYAN} />
      </Float>
      <Float k="c">
        <circle cx="84" cy="232" r="24" fill="none" stroke="#7aa6ff" strokeWidth="5" strokeOpacity=".65" />
        <circle cx="110" cy="90" r="10" fill={`url(#${id}-b)`} />
      </Float>
    </>
  ),

  /* Website design: browser + palette + image tile */
  website: ({ id }) => (
    <>
      <Float k="a">
        <Win x={80} y={70} w={360} h={240} id={id}>
          <rect x="130" y="76" width="210" height="14" rx="7" fill="#fff" />
          <rect x="98" y="108" width="324" height="84" rx="10" fill={`url(#${id}-b)`} />
          <Ln x={116} y={128} w={140} c="#fff" h={9} />
          <Ln x={116} y={146} w={100} c="#ffffffaa" />
          <rect x="116" y="162" width="62" height="18" rx="9" fill="#fff" />
          <circle cx="372" cy="150" r="32" fill="#ffffff2e" />
          <circle cx="396" cy="128" r="14" fill="#ffffff3d" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={98 + i * 112} y="204" width="100" height="92" rx="10" fill="#f3f7ff" />
              <rect x={106 + i * 112} y="212" width="84" height="42" rx="7" fill="#dfeaff" />
              <Ln x={106 + i * 112} y={264} w={70} />
              <Ln x={106 + i * 112} y={277} w={48} />
            </g>
          ))}
        </Win>
        <path d="M402 196L402 230L411 221L417 236L424 233L418 219L430 219Z" fill={NAVY} stroke="#fff" strokeWidth="2" />
      </Float>
      <Float k="b">
        <g filter={`url(#${id}-sh)`}>
          <rect x="376" y="276" width="104" height="58" rx="14" fill="#fff" stroke="#d6e3fb" />
        </g>
        <circle cx="402" cy="305" r="11" fill="#4a5dff" />
        <circle cx="428" cy="305" r="11" fill="#22b8ff" />
        <circle cx="454" cy="305" r="11" fill="#9fbcf5" />
      </Float>
      <Float k="c">
        <g filter={`url(#${id}-sh)`}>
          <rect x="38" y="258" width="82" height="66" rx="12" fill="#fff" stroke="#d6e3fb" />
        </g>
        <polygon points="48,314 72,286 88,302 100,290 112,314" fill="#7aa6ff" />
        <circle cx="100" cy="274" r="7" fill="#a99bff" />
      </Float>
    </>
  ),

  /* Web application: dashboard */
  webapp: ({ id }) => (
    <>
      <Float k="a">
        <Win x={60} y={64} w={400} h={262} id={id}>
          <path d="M60 90H124V326H74a14 14 0 0 1-14-14Z" fill={`url(#${id}-b)`} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="76" y={108 + i * 30} width="32" height="10" rx="5" fill="#ffffffaa" />
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={140 + i * 104} y="102" width="94" height="52" rx="10" fill="#f3f7ff" />
              <Ln x={150 + i * 104} y={114} w={40} />
              <Ln x={150 + i * 104} y={130} w={56} c={i === 1 ? '#22b8ff' : '#4a5dff'} h={10} />
            </g>
          ))}
          <rect x="140" y="166" width="206" height="146" rx="10" fill="#f7faff" />
          {[40, 64, 48, 82, 60, 98, 76].map((h, i) => (
            <rect
              key={i} x={156 + i *26} y={298 - h} width="14" height={h} rx="4"
              fill={i % 2 ? '#9fbcf5' : `url(#${id}-b)`}
            />
          ))}
          <polyline
            points="160,214 186,200 212,208 238,184 264,192 290,172 316,180"
            fill="none" stroke="#22b8ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          />
          <rect x="358" y="166" width="90" height="146" rx="10" fill="#f7faff" />
          <circle cx="403" cy="222" r="24" fill="none" stroke="#e1ebff" strokeWidth="12" />
          <circle
            cx="403" cy="222" r="24" fill="none" stroke="#4a5dff" strokeWidth="12"
            strokeDasharray="102 151" transform="rotate(-90 403 222)" strokeLinecap="round"
          />
          <Ln x={372} y={266} w={60} />
          <Ln x={372} y={280} w={42} c="#9fbcf5" />
          <Ln x={372} y={294} w={52} />
        </Win>
      </Float>
      <Float k="b">
        <g filter={`url(#${id}-sh)`}>
          <rect x="22" y="112" width="102" height="46" rx="12" fill="#fff" stroke="#d6e3fb" />
        </g>
        <polyline points="36,142 46,132 54,138 66,124" fill="none" stroke="#22b8ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="104" y="141" textAnchor="end" fontSize="15" fontWeight="800" fill="#4a5dff" fontFamily="Plus Jakarta Sans, Inter, sans-serif">+24%</text>
      </Float>
      <Float k="c">
        <circle cx="468" cy="300" r="22" fill="#fff" stroke="#d6e3fb" />
        <path d="M458 300l8 8 14-16" fill="none" stroke="#4a5dff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </Float>
    </>
  ),

  /* Mobile app: two tilted phones */
  mobile: ({ id }) => (
    <>
      <g transform="rotate(-8 215 200)">
        <Float k="a">
          <Phone x={140} y={50} w={150} h={300} id={id}>
            <rect x="151" y="84" width="128" height="72" rx="14" fill={`url(#${id}-b)`} />
            <circle cx="172" cy="112" r="12" fill="#fff" />
            <Ln x={192} y={104} w={64} c="#fff" h={8} />
            <Ln x={192} y={120} w={44} c="#ffffffaa" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x="151" y={168 + i * 52} width="128" height="44" rx="12" fill="#f3f7ff" />
                <circle cx="173" cy={190 + i * 52} r="11" fill={i === 1 ? '#22b8ff' : '#7aa6ff'} />
                <Ln x={193} y={183 + i * 52} w={66} />
                <Ln x={193} y={196 + i * 52} w={42} c="#e1ebff" />
              </g>
            ))}
          </Phone>
        </Float>
      </g>
      <g transform="rotate(7 360 240)">
        <Float k="b">
          <Phone x={296} y={92} w={140} h={282} id={id}>
            <rect x="307" y="126" width="118" height="124" rx="12" fill="#e6f0ff" />
            <path d="M318 232C340 190 362 226 382 176S408 160 414 150" fill="none" stroke="#4a5dff" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
            <circle cx="414" cy="150" r="9" fill="#4a5dff" />
            <circle cx="414" cy="150" r="3.5" fill="#fff" />
            <Ln x={307} y={264} w={80} />
            <Ln x={307} y={278} w={56} c="#e1ebff" />
            <rect x="307" y="302" width="118" height="30" rx="15" fill={`url(#${id}-b)`} />
          </Phone>
        </Float>
      </g>
      <Float k="c">
        <g filter={`url(#${id}-sh)`}>
          <rect x="34" y="96" width="108" height="38" rx="19" fill="#fff" stroke="#d6e3fb" />
        </g>
        <circle cx="56" cy="115" r="9" fill="#4a5dff" />
        <Ln x={72} y={108} w={54} />
        <Ln x={72} y={120} w={34} c="#e1ebff" />
      </Float>
      <Float k="a">
        <circle cx="452" cy="86" r="24" fill="#fff" stroke="#d6e3fb" />
        <Heart x={452} y={86} />
      </Float>
    </>
  ),

  /* Windows application: monitor + desktop windows */
  windows: ({ id }) => (
    <>
      <polygon points="228,290 292,290 304,336 216,336" fill={`url(#${id}-b)`} />
      <rect x="184" y="334" width="152" height="12" rx="6" fill={NAVY} />
      <Float k="a">
        <g filter={`url(#${id}-sh)`}>
          <rect x="80" y="60" width="360" height="232" rx="16" fill={NAVY} />
        </g>
        <rect x="92" y="72" width="336" height="196" rx="8" fill={`url(#${id}-b)`} />
        <rect x="120" y="96" width="190" height="124" rx="8" fill="#fff" />
        <rect x="120" y="96" width="190" height="20" rx="8" fill="#eaf1ff" />
        <Ln x={134} y={132} w={100} />
        <Ln x={134} y={146} w={140} c="#e1ebff" />
        <Ln x={134} y={160} w={120} c="#e1ebff" />
        <rect x="134" y="178" width="64" height="22" rx="11" fill="#4a5dff" />
        <rect x="252" y="130" width="150" height="104" rx="8" fill="#fff" />
        <rect x="252" y="130" width="150" height="20" rx="8" fill="#eaf1ff" />
        {[28, 46, 34, 58].map((h, i) => (
          <rect key={i} x={272 + i * 30} y={222 - h} width="18" height={h} rx="4" fill={i % 2 ? '#22b8ff' : '#4a5dff'} />
        ))}
        <path d="M92 244H428V260a8 8 0 0 1-8 8H100a8 8 0 0 1-8-8Z" fill="#ffffff40" />
        <rect x="104" y="249" width="6" height="6" fill="#fff" />
        <rect x="112" y="249" width="6" height="6" fill="#fff" />
        <rect x="104" y="257" width="6" height="6" fill="#fff" />
        <rect x="112" y="257" width="6" height="6" fill="#fff" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={136 + i * 22} y="250" width="14" height="12" rx="3" fill="#ffffff80" />
        ))}
      </Float>
      <Float k="b">
        <circle cx="450" cy="116" r="17" fill="none" stroke="#4a5dff" strokeWidth="8" strokeDasharray="5.3 5.3" />
        <circle cx="450" cy="116" r="12" fill="#fff" stroke="#4a5dff" strokeWidth="4" />
      </Float>
      <Float k="c">
        <g filter={`url(#${id}-sh)`}>
          <path d="M30 202h26l8 10h34a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6v-46a6 6 0 0 1 6-6Z" fill="#22b8ff" />
        </g>
        <rect x="24" y="222" width="76" height="30" rx="6" fill="#7fd6ff" />
      </Float>
    </>
  ),

  /* Digital marketing: growth bars, trend arrow, target, engagement */
  marketing: ({ id }) => (
    <>
      {[3, 2, 1, 0].map((i) => {
        const h = [40, 72, 108, 150][i]
        return (
          <Box key={i} x={170 + i * 54} y={300 - i * 31 - h} w={40} h={h} c={i === 3 ? CYAN : BLUE} />
        )
      })}
      <Float k="a">
        <path d="M80 218L140 168L190 190L262 100" fill="none" stroke="#22b8ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="278,84 246,92 266,116" fill="#22b8ff" />
      </Float>
      <Float k="b">
        <circle cx="86" cy="86" r="32" fill="#e6eeff" stroke="#c9dafb" />
        <circle cx="86" cy="86" r="21" fill="#7aa6ff" />
        <circle cx="86" cy="86" r="10" fill="#4a5dff" />
        <circle cx="86" cy="86" r="3.5" fill="#fff" />
      </Float>
      <Float k="c">
        <g filter={`url(#${id}-sh)`}>
          <rect x="392" y="210" width="108" height="50" rx="16" fill="#fff" stroke="#d6e3fb" />
        </g>
        <Heart x={414} y={235} s={0.6} />
        <Ln x={430} y={226} w={54} />
        <Ln x={430} y={240} w={36} c="#e1ebff" />
      </Float>
      <Float k="a">
        <circle cx="440" cy="130" r="22" fill="#fff" stroke="#d6e3fb" />
        <text x="440" y="136" textAnchor="middle" fontSize="15" fontWeight="800" fill="#4a5dff" fontFamily="Plus Jakarta Sans, Inter, sans-serif">%</text>
      </Float>
    </>
  ),

  /* Digital business card: smart card, QR, share, NFC waves */
  card: ({ id }) => (
    <>
      <g transform="rotate(8 260 220)">
        <g filter={`url(#${id}-sh)`}>
          <rect x="132" y="124" width="270" height="170" rx="18" fill="#fff" stroke="#d6e3fb" />
        </g>
        <Ln x={156} y={150} w={80} c="#4a5dff" h={9} />
        <Ln x={156} y={168} w={120} />
      </g>
      <Float k="a">
        <g transform="rotate(-7 250 190)">
          <g filter={`url(#${id}-sh)`}>
            <rect x="108" y="100" width="284" height="178" rx="20" fill={`url(#${id}-b)`} />
          </g>
          <circle cx="152" cy="148" r="24" fill="#fff" />
          <circle cx="152" cy="141" r="8" fill="#78aaff" />
          <path d="M138 162a14 12 0 0 1 28 0Z" fill="#78aaff" />
          <Ln x={188} y={135} w={92} c="#fff" h={10} />
          <Ln x={188} y={153} w={64} c="#ffffffaa" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={136} cy={206 + i * 24} r="8" fill="#ffffff33" />
              <Ln x={154} y={203 + i * 24} w={[110, 90, 100][i]} c="#ffffffcc" />
            </g>
          ))}
          <rect x="302" y="184" width="72" height="72" rx="8" fill="#fff" />
          {[[310, 192], [346, 192], [310, 228]].map(([qx, qy], i) => (
            <g key={i}>
              <rect x={qx} y={qy} width="18" height="18" rx="3" fill="none" stroke={NAVY} strokeWidth="3.5" />
              <rect x={qx + 6} y={qy + 6} width="6" height="6" fill={NAVY} />
            </g>
          ))}
          {[[336, 204], [340, 214], [330, 232], [346, 230], [356, 240], [338, 244], [326, 214]].map(([qx, qy], i) => (
            <rect key={i} x={qx} y={qy} width="6" height="6" fill={NAVY} />
          ))}
        </g>
      </Float>
      <Float k="b">
        <g stroke="#22b8ff" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M418 78a14 14 0 0 1 0 28" />
          <path d="M432 66a30 30 0 0 1 0 52" opacity=".75" />
          <path d="M446 54a46 46 0 0 1 0 76" opacity=".5" />
        </g>
      </Float>
      <Float k="c">
        <circle cx="72" cy="312" r="28" fill="#fff" stroke="#d6e3fb" />
        <line x1="62" y1="312" x2="82" y2="302" stroke="#4a5dff" strokeWidth="2.5" />
        <line x1="62" y1="312" x2="82" y2="322" stroke="#4a5dff" strokeWidth="2.5" />
        <circle cx="62" cy="312" r="5.5" fill="#4a5dff" />
        <circle cx="82" cy="302" r="5.5" fill="#22b8ff" />
        <circle cx="82" cy="322" r="5.5" fill="#22b8ff" />
      </Float>
    </>
  ),
}

const LABELS = {
  software: 'Custom software development illustration',
  website: 'Website design illustration',
  webapp: 'Web application dashboard illustration',
  mobile: 'Mobile application illustration',
  windows: 'Windows desktop application illustration',
  marketing: 'Digital marketing growth illustration',
  card: 'Digital business card illustration',
}

export default function ServiceIllustration({ kind = 'software' }) {
  const id = `sd${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const Scene = SCENES[kind] || SCENES.software

  return (
    <svg
      className="service-detail-art"
      viewBox="0 0 520 440"
      role="img"
      aria-label={LABELS[kind] || LABELS.software}
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38c6ff" />
          <stop offset="55%" stopColor="#3f6bff" />
          <stop offset="100%" stopColor="#7a4dff" />
        </linearGradient>
        <radialGradient id={`${id}-gl`}>
          <stop offset="0%" stopColor="#5b6bff" stopOpacity=".38" />
          <stop offset="100%" stopColor="#5b6bff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#3a3fb8" floodOpacity=".26" />
        </filter>
      </defs>

      <ellipse cx="260" cy="408" rx="210" ry="26" fill={`url(#${id}-gl)`} />
      <ellipse cx="260" cy="215" rx="236" ry="86" fill="none" stroke="#7aa6ff" strokeOpacity=".3" transform="rotate(-14 260 215)" />

      <Scene id={id} />
    </svg>
  )
}