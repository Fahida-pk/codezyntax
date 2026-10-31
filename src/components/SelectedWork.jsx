import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  AppWindow,
  Globe,
  ImageOff,
  Lock,
  Monitor,
  Layers,
  MessageSquareText,
} from 'lucide-react'
import { PROJECTS } from '../data/site'
import HeroArt3D from './HeroArt3D'
import './SelectedWork.css'

/* ------------------------------------------------------------------ *
 *  SCREENSHOTS
 *  Real captures go in /public/images/projects/ (1440x900 .webp).
 *  Replace a screenshot by dropping in a file with the same name, or
 *  change the `image` path below. Missing images show a clean placeholder.
 *
 *  Windows apps: add  { type: 'Windows Application', image: '...' }
 *  with the real installed-software screenshot. It renders in a desktop
 *  window frame, never in a browser frame.
 * ------------------------------------------------------------------ */

const norm = url => (url || '').replace(/\/$/, '').toLowerCase()

const SHOWCASE = [
  // Web applications
  { slug: '1card', title: '1Card', type: 'Web Application', label: 'Digital Business Card', url: 'https://1card.co.in/', image: '/images/projects/1card-home.webp' },
  { slug: 'zynta-erp', title: 'Zynta ERP', type: 'Web Application', label: 'ERP Software', url: 'https://zyntaerp.com/', image: '/images/projects/zynta-erp.webp' },
  // site.js points this at hairship.webp (a different project); overridden here.
  { slug: 'zynta-crm', title: 'Zynta CRM', type: 'Web Application', label: 'CRM Software', url: 'https://crm.1card.co.in/', image: '/images/projects/hairship.webp' },
  { slug: '1card-demo', title: 'Payroll Management System', type: 'Web Application', label: 'Live Demo', url: 'https://demo.payroll.zyntaweb.com/login.php', image: '/images/projects/payroll.webp' },
  { slug: 'zyntaweb', title: 'Serlog', type: 'Web Application', label: 'Service Management', url: 'https://zyntaweb.com/', image: '/images/projects/zynta.webp' },
  { slug: 'qr-code-generator', title: 'QR Code Generator', type: 'Web Application', image: '/images/projects/qr-code-generator.webp', summary: 'A fast online tool to create QR codes for links, text and contact details.' },

{
  slug: 'alafiya',
  title: 'Alafiya',
  type: 'Web Application',
  label: 'Web Application',
  url: 'https://alafiya.zyntaweb.com/',
  images: [
    '/images/projects/Alafiya1.webp',
    '/images/projects/alafiya2.webp',
    '/images/projects/alafiya3.webp',
  ],
  summary: 'A modern web application designed to simplify business operations with an intuitive and user-friendly interface.'
},
{
  slug: 'skilllab',
  title: 'SkillLab',
  type: 'Web Application',
  label: 'Student Learning Dashboard',
  url: 'https://skilllab.zyntaweb.com/',
  images: [
    '/images/projects/skillab.webp',
    '/images/projects/skillab2.webp',
    '/images/projects/skillab3.webp',
  ],
  summary: 'A smart student learning management platform featuring daily task tracking, performance analytics, task accuracy monitoring, progress visualization, and subscription management.'
},

  // Windows / desktop applications (add real entries here)

  // Websites
  { slug: 'qaf-uae', title: 'QAF UAE', type: 'Website', label: 'Website', url: 'https://qafuae.com/', image: '/images/projects/qaf-uae.webp', summary: 'A professional business website for QAF UAE with a clear, modern presentation.' },
  { slug: 'hairship', title: 'Hairship', type: 'Website', label: 'Website', url: 'https://hairship.in/', image: '/images/projects/hairship1.webp', summary: 'A clean, brand-focused website for Hairship, built to showcase its products and services.' },
  { slug: 'metrooman', title: 'Metrooman', type: 'Website', label: 'Website', url: 'https://metrooman.com/', image: '/images/projects/metrooman.webp', summary: 'A responsive corporate website designed for a strong and trustworthy online presence.' },
  { slug: 'brothers-corp-trading', title: 'Brothers Corp Trading', type: 'Website', label: 'Website', url: 'https://brotherscorptrading.com/', image: '/images/projects/brothers-corp-trading.jpg', summary: 'A trading company website that presents products and company details clearly.' },
  { slug: 'bali-it-solutions', title: 'Bali IT Solutions', type: 'Website', label: 'Website', url: 'https://www.baliitsolutions.com/', image: '/images/projects/bali-it-solutions.webp', summary: 'An IT services website that explains solutions and makes it easy to get in touch.' },
  { slug: 'costain-travels', title: 'Costain Travels', type: 'Website', label: 'Website', url: 'https://costaintravels.com/', image: '/images/projects/costain-travels.webp', summary: 'A travel website designed to present destinations and services to visitors.' },
  { slug: 'sfsc', title: 'SFSC', type: 'Website', label: 'Website', url: 'https://sfsc.com/', image: '/images/projects/sfsc.jpg', summary: 'A modern, easy-to-navigate website for SFSC.' },
]

// Merge with existing PROJECTS (matched by URL) so slugs, summaries and other
// existing fields keep working. Type, label and image come from SHOWCASE.
// Try the project's existing image path first, then the fallback path, and
// also the same file name in other common formats, so a screenshot saved as
// .png or .jpg still loads. Only after every candidate fails is a placeholder shown.
const EXTS = ['webp', 'png', 'jpg', 'jpeg']
function candidates(...paths) {
  const out = []
  paths.filter(Boolean).forEach(p => {
    out.push(p)
    const base = p.replace(/\.(webp|png|jpe?g)$/i, '')
    EXTS.forEach(e => out.push(`${base}.${e}`))
  })
  return [...new Set(out)]
}

const ALL_PROJECTS = SHOWCASE.map(entry => {
  const existing = PROJECTS.find(p => norm(p.url) === norm(entry.url))

  // Alafiya has exactly three real screenshots. Do not expand these paths
  // into .webp/.png/.jpg/.jpeg fallback candidates.
  
const projectImages = entry.images?.length
  ? entry.images
  : candidates(existing?.image, entry.image)


  return {
    ...entry,
    ...existing,
    slug: entry.slug,
    url: entry.url,
    title: entry.title,
    type: entry.type,
    label: entry.label,
    images: projectImages,
    summary: existing?.summary || entry.summary,
  }
})


// Required order: Web Applications, Windows / Desktop, Websites
const CATEGORIES = [
  { title: 'Web Applications', type: 'Web Application', tone: 'web', description: 'Dashboards, business platforms and online tools.', Icon: AppWindow },
  { title: 'Windows / Desktop Applications', type: 'Windows Application', tone: 'desktop', description: 'Installed software built for daily business operations.', Icon: Monitor },
  { title: 'Websites', type: 'Website', tone: 'site', description: 'Responsive websites built for a strong online presence.', Icon: Globe },
]

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/* ---------- hooks ---------- */

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visible]
}

function useTilt(ref) {
  const onPointerMove = e => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--sw-rx', `${(-y * 5).toFixed(2)}deg`)
    el.style.setProperty('--sw-ry', `${(x * 7).toFixed(2)}deg`)
  }
  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--sw-rx', '0deg')
    el.style.setProperty('--sw-ry', '0deg')
  }
  return { onPointerMove, onPointerLeave }
}

/* ---------- previews (full-width, edge to edge) ---------- */



function Screenshot({ project, desktop }) {
  const list = project.images || []
  const [idx, setIdx] = useState(0)

  // Only Alafiya and SkillLab use the slow automatic slideshow.
  const isSlideshow =
    ['alafiya', 'skilllab'].includes(project.slug) && list.length === 3

  // Change image slowly; the CSS below handles the smooth slide/fade.
  useEffect(() => {
    if (!isSlideshow) return

    const timer = window.setInterval(() => {
      setIdx(current => (current + 1) % 3)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [isSlideshow])

  const src = list[idx]

  if (!src) {
    return (
      <div className="sw-shot-missing">
        {desktop ? <AppWindow size={26} /> : <ImageOff size={26} />}
        <strong>{project.title}</strong>
        <span>Screenshot coming soon</span>
      </div>
    )
  }

  return (
    <img
      key={`${project.slug}-${src}`}
      className={`sw-shot${isSlideshow ? ' sw-shot-slideshow' : ''}`}
      src={encodeURI(src)}
      alt={`${project.title} screenshot ${idx + 1}`}
      width="1440"
      height="900"
      loading="lazy"
      decoding="async"
      onError={() => {
        if (isSlideshow) {
          setIdx(current => (current + 1) % 3)
        } else {
          setIdx(current => Math.min(current + 1, list.length - 1))
        }
      }}
    />
  )
}


function BrowserMockup({ project }) {
  return (
    <div className="sw-browser">

      {/* Browser top bar */}
      <div className="sw-browser-bar">

        <span className="sw-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <span className="sw-address">
          <Lock size={10} />

          <span>
            {project.url ? hostname(project.url) : ''}
          </span>
        </span>

      </div>

      {/* Screenshot area */}
      <div className="sw-viewport">
        <Screenshot project={project} />
      </div>

    </div>
  )
}





function DesktopMockup({ project }) {
  return (
    <div className="sw-desktop">
      <div className="sw-monitor">
        <div className="sw-window-bar">
          <AppWindow size={12} />
          <span>{project.title}</span>
          <span className="sw-window-controls" aria-hidden="true"><i /><i /><i /></span>
        </div>
        <div className="sw-viewport">
          <Screenshot project={project} desktop />
        </div>
      </div>
    </div>
  )
}

/* ---------- card ---------- */

function ProjectCard({ project, index }) {
  const [revealRef, visible] = useReveal()
  const cardRef = useRef(null)
  const tilt = useTilt(cardRef)
  const desktop = project.type === 'Windows Application'

  return (
    <div
      ref={revealRef}
      className={`sw-reveal${visible ? ' is-visible' : ''}`}
      style={{ '--sw-delay': `${(index % 4) * 80}ms` }}
    >
      <article ref={cardRef} className="sw-card" {...tilt}>
        <div className="sw-media">
          {desktop ? <DesktopMockup project={project} /> : <BrowserMockup project={project} />}
        </div>

        <div className="sw-card-body">
          <span className="sw-category">{project.label || project.type}</span>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>

          <div className="sw-card-footer">
            <span className="sw-domain">{hostname(project.url)}</span>
            <a
              className="sw-view-button"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} (opens in a new tab)`}
            >
              View
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}

function EmptyDesktop() {
  return (
    <div className="sw-empty">
      <div className="sw-empty-art">
        <DesktopMockup project={{ title: 'Windows application', image: null }} />
      </div>
      <div>
        <h4>Windows software showcase coming soon</h4>
        <p>
          Real screenshots of our installed desktop applications will appear
          here in a desktop window frame.
        </p>
      </div>
    </div>
  )
}

function CategoryIcon({ Icon, tone }) {
  return (
    <span className={`sw-icon3d sw-icon3d-${tone}`} aria-hidden="true">
      <span className="sw-icon3d-face"><Icon size={tone === 'desktop' ? 22 : 24} strokeWidth={2.1} /></span>
      <span className="sw-icon3d-stand" />
    </span>
  )
}

/* ---------- 3D illustration for the closing call-to-action ---------- */

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

function IllustrationDefs({ id }) {
  const g = (suffix, c1, c2, x2 = '1', y2 = '1') => (
    <linearGradient id={`${id}${suffix}`} x1="0" y1="0" x2={x2} y2={y2}>
      <stop offset="0" stopColor={c1} />
      <stop offset="1" stopColor={c2} />
    </linearGradient>
  )
  return (
    <>
      {g('bz', '#26346a', '#0d1431')}
      {g('bs', '#f4f7ff', '#c3d1ee', '0', '1')}
      {g('sd', '#a9bbe3', '#7488be', '1', '0')}
      {g('dk', '#12205a', '#2d2f96')}
      {g('lt', '#ffffff', '#dfe9ff')}
      {g('t1', '#7a86ff', '#a36bff')}
      {g('t2', '#a3d2ff', '#5b8cff')}
      {g('gear', '#c9d6ff', '#6f7ff0')}
      {g('cloud', '#d9e7ff', '#7f9fff', '0', '1')}
      {g('plat', '#f1f4ff', '#c9cdf5', '0', '1')}
      {g('bar', '#2864ed', '#7c5cf0', '0', '1')}
      {g('lid', '#3a4a86', '#151d45', '0', '1')}
      {g('deck', '#c2cdea', '#9fb0da', '0', '1')}
      {g('side', '#5a66e0', '#232c86', '0', '1')}
      <linearGradient id={`${id}gl`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".62" />
        <stop offset="1" stopColor="#fff" stopOpacity=".22" />
      </linearGradient>
      <linearGradient id={`${id}gd`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8fa8ff" stopOpacity=".5" />
        <stop offset="1" stopColor="#3f52d8" stopOpacity=".22" />
      </linearGradient>
      <linearGradient id={`${id}rim`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#4d93ff" />
        <stop offset=".5" stopColor="#a36bff" />
        <stop offset="1" stopColor="#4d93ff" />
      </linearGradient>
      <linearGradient id={`${id}refl`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity=".28" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}top`} cx=".5" cy=".3" r=".75">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".6" stopColor="#dfe6ff" />
        <stop offset="1" stopColor="#b3bff3" />
      </radialGradient>
      <radialGradient id={`${id}spot`} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#4d93ff" stopOpacity=".38" />
        <stop offset="1" stopColor="#4d93ff" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}soft`} x="-30%" y="-60%" width="160%" height="220%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <radialGradient id={`${id}orb`} cx=".35" cy=".3" r=".8">
        <stop offset="0" stopColor="#fff" />
        <stop offset=".4" stopColor="#9cc0ff" />
        <stop offset="1" stopColor="#2864ed" />
      </radialGradient>
      <filter id={`${id}sh`} x="-25%" y="-25%" width="150%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#1e3a8a" floodOpacity=".3" />
      </filter>
      <filter id={`${id}glow`} x="-20%" y="-60%" width="140%" height="220%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </>
  )
}

function Laptop3D({ id, dark }) {
  const keys = []
  for (let r = 0; r < 4; r++) {
    for (let k = 0; k < 13; k++) {
      const x = 8 + k * 19.5
      const y = 6 + r * 11
      keys.push(
        <g key={`${r}-${k}`}>
          <rect x={x} y={y + 1.8} width="16" height="8" rx="2" fill="#7f91bf" />
          <rect x={x} y={y} width="16" height="8" rx="2" fill={dark ? '#e4ebfd' : '#ffffff'} />
        </g>
      )
    }
  }
  const ink = dark ? '#ffffff' : '#2864ed'
  const soft = dark ? 'rgba(255,255,255,.22)' : '#c3d4f4'
  return (
    <g>
      {/* light cast by the screen onto the deck */}
      <polygon points="74,196 334,188 318,236 52,244" fill="#6fa0ff" opacity={dark ? 0.42 : 0.22} filter={`url(#${id}soft)`} />

      {/* base: front face, chamfer highlight, right face, top */}
      <polygon points="30,270 296,262 296,272 30,280" fill={`url(#${id}sd)`} />
      <polygon points="30,270 296,262 296,265.5 30,273.5" fill="#fff" opacity=".7" />
      <polygon points="336,186 296,262 296,272 336,196" fill="#5d72ab" />
      <polygon points="70,194 336,186 296,262 30,270" fill={`url(#${id}bs)`} />
      <g transform="matrix(1 -0.03 -0.526 1 70 194)">
        <rect x="3" y="2" width="260" height="49" rx="5" fill={`url(#${id}deck)`} />
        {keys}
        <rect x="93" y="54" width="80" height="17" rx="6" fill="#e9effc" stroke="#aebce0" strokeWidth="1" />
      </g>

      {/* hinge */}
      <polygon points="68,190 338,182 338,190 68,198" fill={`url(#${id}sd)`} />

      {/* lid: thickness, rounded front */}
      <polygon points="338,24 346,30 346,194 338,188" fill={`url(#${id}lid)`} />
      <polygon points="70,34 338,24 346,30 78,40" fill="#56679f" />
      <polygon points="72,192 334,184 334,28 72,36" fill={`url(#${id}bz)`} stroke={`url(#${id}bz)`} strokeWidth="9" strokeLinejoin="round" />
      <circle cx="203" cy="32.5" r="1.8" fill="#6f84c9" />

      {/* display */}
      <g transform="matrix(1 -0.03 0 0.96 78 42)">
        <rect width="250" height="150" rx="4" fill={`url(#${id}${dark ? 'dk' : 'lt'})`} />
        <rect width="250" height="14" fill={dark ? 'rgba(255,255,255,.1)' : '#e6eeff'} />
        <circle cx="9" cy="7" r="2.4" fill="#7fa6f5" /><circle cx="17" cy="7" r="2.4" fill="#a3bff7" /><circle cx="25" cy="7" r="2.4" fill="#c4d6fa" />
        <rect y="14" width="50" height="136" fill={dark ? 'rgba(255,255,255,.07)' : '#eaf1ff'} />
        <rect x="9" y="24" width="30" height="6" rx="3" fill={ink} opacity=".9" />
        {[40, 52, 64, 76].map(y => <rect key={y} x="9" y={y} width="32" height="4" rx="2" fill={soft} />)}
        <rect x="62" y="27" width="88" height="62" rx="8" fill="#4a3fd0" opacity=".55" />
        <rect x="60" y="24" width="88" height="62" rx="8" fill={`url(#${id}t1)`} />
        <rect x="60" y="24" width="88" height="24" rx="8" fill="#fff" opacity=".18" />
        <polyline points="86,45 74,55 86,65" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="122,45 134,55 122,65" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="110" y1="42" x2="98" y2="68" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <rect x="156" y="24" width="86" height="62" rx="8" fill={dark ? 'rgba(255,255,255,.16)' : '#fff'} stroke={dark ? 'rgba(255,255,255,.3)' : '#d9e5ff'} />
        <polygon points="162,80 184,50 198,66 210,56 236,80" fill={`url(#${id}t2)`} />
        <circle cx="222" cy="38" r="6" fill="#fff" opacity=".9" />
        <rect x="60" y="96" width="182" height="12" rx="6" fill={soft} />
        <rect x="60" y="96" width="120" height="12" rx="6" fill={`url(#${id}bar)`} />
        <rect x="60" y="116" width="130" height="9" rx="4.5" fill={soft} />
        <rect x="60" y="131" width="90" height="9" rx="4.5" fill={soft} />
      </g>
      {/* glass glare across the screen */}
      <polygon points="78,42 208,37.5 150,185 78,186" fill={`url(#${id}refl)`} />
      <polyline points="72,36 334,28" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" />
    </g>
  )
}

function Gear({ id, cx, cy, r }) {
  const d = gearPath(cx, cy, r, r * 0.8, 10)
  return (
    <g filter={`url(#${id}sh)`}>
      <path d={gearPath(cx + 2, cy + 6, r, r * 0.8, 10)} fill="#3f4bc2" stroke="#3f4bc2" strokeWidth="3" strokeLinejoin="round" />
      <path d={d} fill={`url(#${id}gear)`} stroke="#fff" strokeOpacity=".75" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={r * 0.46} fill="#6f7ff0" opacity=".55" />
      <circle cx={cx} cy={cy - 1} r={r * 0.4} fill="#f1f5ff" stroke="#fff" strokeWidth="2" />
      <path d={`M${cx - r * 0.55} ${cy - r * 0.35} A${r * 0.66} ${r * 0.66} 0 0 1 ${cx + r * 0.1} ${cy - r * 0.66}`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Cloud({ id, x, y, s = 1, arrow }) {
  const shapes = (
    <>
      <rect x="8" y="44" width="112" height="28" rx="14" />
      <circle cx="38" cy="44" r="22" />
      <circle cx="68" cy="30" r="30" />
      <circle cx="98" cy="46" r="22" />
    </>
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} filter={`url(#${id}sh)`}>
      <g fill="#6f8ff0" transform="translate(0 6)">{shapes}</g>
      <g fill={`url(#${id}cloud)`}>{shapes}</g>
      <ellipse cx="60" cy="18" rx="24" ry="8" fill="#fff" opacity=".5" />
      <ellipse cx="34" cy="34" rx="10" ry="5" fill="#fff" opacity=".35" />
      {arrow && <path d="M68 64 V36 M55 49 L68 36 L81 49" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />}
    </g>
  )
}

function Card({ id, x, y, w, h, rot = 0, skew = 0, dark, drift = 'a', children }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) skewY(${skew})`}>
      <g className={drift === 'a' ? 'sw-float-a' : 'sw-float-b'}>
        <rect x="4" y="8" width={w} height={h} rx="14" fill={dark ? '#1a2790' : '#8d9be4'} opacity=".6" filter={`url(#${id}sh)`} />
        <rect width={w} height={h} rx="14" fill={`url(#${id}${dark ? 'gd' : 'gl'})`} stroke="#fff" strokeOpacity={dark ? 0.55 : 0.95} strokeWidth="1.4" />
        <rect x="2" y="2" width={w - 4} height="18" rx="12" fill="#fff" opacity={dark ? 0.16 : 0.5} />
        {children}
      </g>
    </g>
  )
}

function Bars({ id, x, y, h = 50, dark }) {
  const hs = [0.38, 0.6, 0.48, 0.82, 1]
  return (
    <g>
      <line x1={x - 4} y1={y + h} x2={x + 100} y2={y + h} stroke={dark ? 'rgba(255,255,255,.4)' : '#c3d4f4'} strokeWidth="2" />
      {hs.map((v, i) => (
        <g key={i}>
          <rect x={x + i * 20 + 2} y={y + h - h * v + 3} width="13" height={h * v} rx="3.5" fill="#3a2fb0" opacity=".45" />
          <rect x={x + i * 20} y={y + h - h * v} width="13" height={h * v} rx="3.5" fill={`url(#${id}bar)`} />
        </g>
      ))}
    </g>
  )
}

function CtaArt() {
  const id = 'ca-'
  return (
    <svg viewBox="0 0 560 440" className="sw-cta-svg" role="presentation" focusable="false">
      <defs><IllustrationDefs id={id} /></defs>

      <ellipse cx="300" cy="360" rx="270" ry="60" fill="#7c5cf0" opacity=".25" filter={`url(#${id}glow)`} />
      <ellipse cx="290" cy="225" rx="262" ry="112" transform="rotate(-18 290 225)" fill="none" stroke="#b9c9ff" strokeWidth="2" opacity=".8" />

      {/* rounded slab */}
      <g strokeLinejoin="round" strokeWidth="18">
        <polygon points="75,375 290,430 505,375 290,320" fill="#8e9be6" stroke="#8e9be6" />
        <polygon points="75,355 290,410 505,355 290,300" fill={`url(#${id}plat)`} stroke="#e4e9ff" />
      </g>
      <polygon points="150,356 290,392 430,356 290,320" fill="#fff" opacity=".35" />

      {/* laptop */}
      <g transform="translate(112 46)" filter={`url(#${id}sh)`}><Laptop3D id={id} /></g>

      {/* floating elements */}
      <g className="sw-float-b"><Cloud id={id} x={340} y={10} s={0.95} arrow /></g>
      <g className="sw-float-a" filter={`url(#${id}sh)`}>
        <circle cx="494" cy="170" r="38" fill={`url(#${id}t1)`} stroke="#fff" strokeWidth="3" />
        <circle cx="494" cy="170" r="26" fill="#eef1ff" />
        <circle cx="494" cy="170" r="16" fill={`url(#${id}t1)`} />
        <circle cx="494" cy="170" r="6" fill="#eef1ff" />
        <line x1="494" y1="170" x2="530" y2="132" stroke="#4a4fd6" strokeWidth="4" strokeLinecap="round" />
        <polyline points="518,128 532,130 530,144" fill="none" stroke="#4a4fd6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Card id={id} x={18} y={86} w={128} h={96} drift="a">
        <Bars id={id} x={22} y={20} h={56} />
      </Card>
      <Card id={id} x={8} y={236} w={150} h={86} drift="b">
        {[0, 1].map(i => (
          <g key={i} transform={`translate(0 ${i * 36})`}>
            <rect x="16" y="14" width="22" height="22" rx="6" fill={`url(#${id}bar)`} />
            <polyline points="21,25 26,30 34,20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="48" y="18" width="80" height="6" rx="3" fill="#7c8fd0" opacity=".7" />
            <rect x="48" y="28" width="56" height="5" rx="2.5" fill="#c3d4f4" />
          </g>
        ))}
      </Card>
      <g className="sw-float-b"><Gear id={id} cx={438} cy={352} r={30} /></g>

      {/* sparkles */}
      <g stroke="#2864ed" strokeWidth="3" strokeLinecap="round" opacity=".8">
        <line x1="176" y1="40" x2="170" y2="28" /><line x1="190" y1="46" x2="202" y2="40" /><line x1="186" y1="58" x2="198" y2="60" />
      </g>
      <circle className="sw-float-a" cx="540" cy="260" r="7" fill={`url(#${id}orb)`} />
    </svg>
  )
}

function ContactCta() {
  return (
    <section className="sw-cta" aria-labelledby="sw-cta-title">
      <div className="sw-cta-inner">
        <div className="sw-cta-content">
          <h2 id="sw-cta-title">
            Ready to Build Something <span className="sw-grad-text">Exceptional?</span>
          </h2>
          <p>
            Have an idea or a business challenge? Let&rsquo;s turn your vision
            into a powerful digital solution with the right technology and
            creative approach.
          </p>
          <div className="sw-cta-actions">
            <Link className="sw-cta-primary" to="/contact">
              Let&rsquo;s Discuss Your Project
              <MessageSquareText size={17} />
            </Link>
            <Link className="sw-cta-secondary" to="/service">
              Explore Our Services
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="sw-cta-art">
          <CtaArt />
        </div>
      </div>
    </section>
  )
}

/* ---------- hero highlights (live counts + actions) ---------- */

 function HeroHighlights() {
  return (
    <div className="sw-highlights">
     
      <div className="sw-hero-actions">
        <Link className="sw-hero-primary" to="/contact">
          Start your project
          <MessageSquareText size={16} />
        </Link>

        <a className="sw-hero-secondary" href="#sw-band-web">
          Browse the work
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  )
}
  

/* ---------- 3D category tab ---------- */

function TabCard({ cat, count, active, onSelect }) {
  const { title, tone, description, Icon } = cat
  const ref = useRef(null)
  const tilt = useTilt(ref)

  return (
    <div className="sw-tab-wrap">
      <a
        ref={ref}
        href={`#sw-band-${tone}`}
        className={`sw-tab sw-tab-${tone}${active ? ' is-active' : ''}`}
        onClick={() => onSelect(tone)}
        {...tilt}
      >
        <span className="sw-tab-icon"><Icon size={22} strokeWidth={2.1} /></span>
        <span className="sw-tab-text">
          <strong>{title}</strong>
          <small>{description}</small>
        </span>
        <span className="sw-tab-meta">
          <b>{count} {count === 1 ? 'Project' : 'Projects'}</b>
          <ArrowUpRight size={13} />
        </span>
      </a>
    </div>
  )
}

/* ---------- section ---------- */

export default function SelectedWork() {
  const [active, setActive] = useState('web')

  // highlight the tab whose band is on screen
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.dataset.tone)),
      { rootMargin: '-40% 0px -50% 0px' }
    )
    document.querySelectorAll('.sw-band').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="sw-section" id="selected-work" aria-labelledby="sw-title">
      <div className="sw-container sw-hero">
        <header className="sw-heading">
          <h2 id="sw-title">
            Selected Work, Built for{' '}
            <span className="sw-title-grad">Real Businesses</span>
          </h2>
          <p>
Explore our portfolio of custom software development, Windows applications, web and mobile app development, and professional website design. From scalable business solutions to SEO, digital marketing, and innovative digital branding tools, we build technology-driven solutions that help businesses improve efficiency, strengthen their online presence, and achieve sustainable growth.          </p>
          <HeroHighlights />
        </header>

        <div className="sw-hero-art">
          <HeroArt3D />
        </div>

        <nav className="sw-tabs" aria-label="Project categories">
          {CATEGORIES.map(cat => (
            <TabCard
              key={cat.tone}
              cat={cat}
              count={ALL_PROJECTS.filter(p => p.type === cat.type).length}
              active={active === cat.tone}
              onSelect={setActive}
            />
          ))}
        </nav>
      </div>

      {CATEGORIES.map(({ title, type, tone, description, Icon }) => {
        const items = ALL_PROJECTS.filter(p => p.type === type)

        return (
          <section
            className={`sw-band sw-band-${tone}`}
            id={`sw-band-${tone}`}
            data-tone={tone}
            key={type}
            aria-labelledby={`sw-cat-${tone}`}
          >
            <div className="sw-container">
              <div className="sw-category-heading">
                <CategoryIcon Icon={Icon} tone={tone} />
                <div>
                  <h3 id={`sw-cat-${tone}`}>{title}</h3>
                  <p>{description}</p>
                </div>
                <span className="sw-category-count">
                  {items.length} {items.length === 1 ? 'project' : 'projects'}
                </span>
              </div>

              {items.length > 0 ? (
                <div className="sw-grid">
                  {items.map((project, i) => (
                    <ProjectCard key={project.slug || project.url} project={project} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyDesktop />
              )}
            </div>
          </section>
        )
      })}

      <ContactCta />
    </section>
  )
}

