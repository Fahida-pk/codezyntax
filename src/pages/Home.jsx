import { useState, useId, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import {
  ArrowUpRight, ArrowRight, ExternalLink, Globe, SlidersHorizontal, Users, LifeBuoy, Wallet,
  Target, Eye, Zap, Briefcase, Award, ShieldCheck, Layers, Headphones, Search, ClipboardList, Code2, Rocket,
} from 'lucide-react'
import Seo from '../components/Seo'
import { ServiceCard } from '../components/ui'
import { SERVICES, PROJECTS, REGIONS } from '../data/site'
import './Home.css'

/* ------------------------------------------------------------------
   Content for the Home page. Everything here is descriptive copy about
   how CodeZyntax works: no client names, results or statistics.
------------------------------------------------------------------- */
const ABOUT_FEATURES = [
  [SlidersHorizontal, 'Customizable Solutions', 'Software shaped around how your business actually works.'],
  [Users, 'Professional Team', 'Experienced developers who care about quality.'],
  [LifeBuoy, 'Reliable Support', 'Help when you need it, including after launch.'],
  [Wallet, 'Transparent Pricing', 'Clear scope and straightforward quotes.'],
]

const ABOUT_MV = [
  [Target, 'Our Mission', 'To deliver smart, scalable and easy-to-use digital solutions that fit your goals and help your business grow.'],
  [Eye, 'Our Vision', 'To be a dependable technology partner for businesses of every size, from startups to established enterprises, turning ideas into reality.'],
]

/* "Why Choose Us?" copy and figures are supplied by CodeZyntax; update them here if they change. */
const WU_STATS = [
  [ShieldCheck, '100%', 'Quality'],
  [Briefcase, '500+', 'Projects'],
  [Award, '7+', 'Years of Experience'],
]
const WU_POINTS = [
  [Headphones, '24/7 support to keep your systems always running'],
  [Zap, 'Agile methods ensure faster project completion'],
  [Users, 'Managers aligned with your business objectives'],
  [SlidersHorizontal, 'Custom-built solutions for your exact needs'],
  [Wallet, 'Budget-friendly plans for small businesses'],
]

const WHY = [
  [Target, 'Client-Centric Approach', 'We understand your goals and build solutions that truly fit your business needs.'],
  [Users, 'Experienced Team', 'A skilled team of developers, designers and project managers focused on quality and results.'],
  [Layers, 'End-to-End Services', 'From planning and design to development, deployment and support — everything in one place.'],
  [LifeBuoy, 'Long-Term Support', 'We stay with you even after launch with reliable support, updates and new feature development.'],
]

const STEPS = [
  [Search, 'Discover', 'We learn your goals, users and constraints.'],
  [ClipboardList, 'Plan', 'We define scope, structure, interface and technical approach.'],
  [Code2, 'Develop', 'We build in stages, with regular reviews along the way.'],
  [Rocket, 'Launch & Support', 'We test, launch and keep improving after release.'],
]

/* FAQ content. Questions and answers are plain data, so edit the text here. */
const FAQS = [
  ['What services does CodeZyntax Softwares LLP offer as the Best Software Company in Palakkad?', 'We offer a wide range of digital solutions, from custom software development to flexible business tools. As a trusted software development company in Palakkad, we build custom systems that improve productivity and support long-term growth.'],
  ['Do you provide web-based solutions and application development?', 'Yes. We build high-performance digital platforms, including web app development, with smooth functionality, secure architecture and better performance for businesses of all sizes.'],
  ['Can CodeZyntax help with SEO and digital marketing services?', 'Yes. We provide search engine optimization and online branding services, including SEO services in Pattambi. As a digital marketing agency in Palakkad, we help businesses become more visible, reach customers faster and grow their online presence.'],
  ['Do you build websites using WordPress or other CMS platforms?', 'Yes. We build responsive, visually appealing CMS-based websites, including WordPress web design in Palakkad, so your site is professional, fast and SEO-friendly.'],
  ['Do you offer branding tools like NFC cards and customer review systems?', 'Yes. We offer branding products such as NFC business cards in Palakkad, Google review scanners in Palakkad and Google review stands in Pattambi. They boost customer engagement, make collecting reviews easier and strengthen your online presence.'],
  ['Do you also offer mobile app development, billing software, or accounting tools?', 'Yes. We provide app development services and build billing software and accounting software for businesses in Palakkad and Pattambi, as a complete technology partner for growing businesses.'],
]

/* Section heading used throughout the page */
const Heading = ({ k, t, d, center, light }) => (
  <div data-reveal className={`hm-head ${center ? 'hm-head-c' : ''} ${light ? 'hm-head-light' : ''}`}>
    <span className="hm-pill"><i />{k}</span>
    <h2>{t}</h2>
    {d && <p>{d}</p>}
  </div>
)

/* Hostname for display, e.g. "https://www.1card.co.in/" -> "1card.co.in" */
const hostOf = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const findProject = (pattern) =>
  PROJECTS.find((p) =>
    pattern.test(
      `${p.title || ''} ${p.slug || ''} ${p.image || ''} ${p.url || ''}`
    )
  )


const HERO_SHOWCASE = [
  {
    title: 'Zynta ERP',
    category: 'Business Software',
    image: '/images/projects/zynta%20erp.webp',
    url: 'https://zyntaerp.com/',
  },
  {
    title: '1Card',
    category: 'Digital Business Card',
    image: '/images/projects/1card-home.webp',
    url: 'https://1card.co.in/',
  },
  {
    title: 'ZyntaWeb',
    category: 'Website & Software',
    image: '/images/projects/zynta.webp',
    url: 'https://demo.zyntaweb.com/',
  },
]


/* Project preview: the real screenshot when it exists, otherwise a clean browser-window placeholder
   (shows the real address, never a fake screenshot), so a missing file never shows a broken image. */
function ProjectMedia({ p }) {
  const [failed, setFailed] = useState(!p.image)
  if (!failed) return <img src={p.image} alt={`Screenshot of the ${p.title} website`} width="1440" height="900" loading="lazy" decoding="async" onError={() => setFailed(true)} />
  return (
    <span className="hm-project-ph" aria-hidden="true">
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hm-ph-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#15244f" /><stop offset="1" stopColor="#0a1128" /></linearGradient>
          <linearGradient id="hm-ph-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b7bf5" /><stop offset="1" stopColor="#1d4ed8" /></linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#hm-ph-g)" />
        <rect x="28" y="26" width="264" height="160" rx="10" fill="#fff" stroke="#c9d6f5" />
        <path d="M28 36a10 10 0 0 1 10-10h244a10 10 0 0 1 10 10v12H28Z" fill="#f1f5fd" />
        <circle cx="42" cy="37" r="3" fill="#ff8a80" /><circle cx="52" cy="37" r="3" fill="#ffd166" /><circle cx="62" cy="37" r="3" fill="#7ddf9b" />
        <rect x="76" y="31" width="200" height="12" rx="6" fill="#fff" stroke="#dbe4f7" />
        <text x="176" y="40" textAnchor="middle" fontSize="7.5" fill="#5b6b8c" fontFamily="Inter, system-ui, sans-serif">{hostOf(p.url)}</text>
        <rect x="46" y="68" width="86" height="11" rx="5.5" fill="#1b2a52" opacity=".85" />
        <rect x="46" y="86" width="128" height="6" rx="3" fill="#c3d0ee" /><rect x="46" y="98" width="108" height="6" rx="3" fill="#d6e0f5" />
        <rect x="46" y="118" width="54" height="16" rx="8" fill="url(#hm-ph-b)" />
        <rect x="196" y="64" width="78" height="104" rx="8" fill="#eaf0ff" /><rect x="206" y="76" width="58" height="30" rx="5" fill="#cfdcfb" /><rect x="206" y="114" width="40" height="5" rx="2.5" fill="#b8c9f2" /><rect x="206" y="125" width="52" height="5" rx="2.5" fill="#c9d6f6" />
      </svg>
    </span>
  )
}

/* Original isometric artwork for the closing call-to-action (inline SVG, no external images). */
function CtaArt({ side }) {
  const flip = side === 'right'
  return (
    <svg className={`hm-cta-art hm-cta-art-${side}`} viewBox="0 0 360 420" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`ca-top-${side}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9e8ff" /><stop offset="1" stopColor="#8fb6ff" /></linearGradient>
        <linearGradient id={`ca-l-${side}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4d86ff" /><stop offset="1" stopColor="#2a45d8" /></linearGradient>
        <linearGradient id={`ca-r-${side}`} x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7f9bff" /><stop offset="1" stopColor="#2b3fb8" /></linearGradient>
        <linearGradient id={`ca-v-${side}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b4c8ff" /><stop offset="1" stopColor="#5b7cf0" /></linearGradient>
        <linearGradient id={`ca-c-${side}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a5f3fc" /><stop offset="1" stopColor="#22b8ff" /></linearGradient>
        <radialGradient id={`ca-orb-${side}`} cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#7fb2ff" /><stop offset="1" stopColor="#3b4fe0" /></radialGradient>
      </defs>
      <g transform={flip ? 'translate(360 0) scale(-1 1)' : undefined}>
        {/* soft curves */}
        <path d="M-10 330C80 260 160 380 260 300S350 200 380 220" fill="none" stroke="#7aa6ff" strokeOpacity=".45" strokeWidth="1.6" />
        <path d="M-10 365C90 300 170 410 270 335S350 250 380 270" fill="none" stroke="#8fb4ff" strokeOpacity=".35" strokeWidth="1.2" />
        <ellipse cx="140" cy="372" rx="110" ry="16" fill="#2b4fe0" opacity=".14" />
        {/* large isometric cube */}
        <g className="hm-fl-a">
          <path d="M140 150 220 195 140 240 60 195Z" fill={`url(#ca-top-${side})`} />
          <path d="M60 195 140 240V340L60 295Z" fill={`url(#ca-l-${side})`} />
          <path d="M220 195 140 240V340L220 295Z" fill={`url(#ca-r-${side})`} />
          <path d="M140 150 220 195 140 240 60 195Z" fill="#fff" opacity=".25" />
          <path d="M140 240V340" stroke="#fff" strokeOpacity=".4" />
        </g>
        {/* small violet cube */}
        <g className="hm-fl-b">
          <path d="M268 90 312 114 268 138 224 114Z" fill="#e6eeff" />
          <path d="M224 114 268 138V192L224 168Z" fill={`url(#ca-v-${side})`} />
          <path d="M312 114 268 138V192L312 168Z" fill="#2f55d8" />
        </g>
        {/* cyan slab */}
        <g className="hm-fl-c">
          <path d="M60 78 112 104 60 130 8 104Z" fill="#d9fbff" />
          <path d="M8 104 60 130V146L8 120Z" fill={`url(#ca-c-${side})`} />
          <path d="M112 104 60 130V146L112 120Z" fill="#1494d8" />
        </g>
        {/* ring + orbs */}
        <circle cx="300" cy="260" r="26" fill="none" stroke="#7aa6ff" strokeOpacity=".6" strokeWidth="6" />
        <circle cx="300" cy="260" r="26" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
        <circle className="hm-fl-b" cx="196" cy="86" r="14" fill={`url(#ca-orb-${side})`} />
        <circle className="hm-fl-c" cx="30" cy="250" r="9" fill={`url(#ca-orb-${side})`} />
        <circle className="hm-fl-a" cx="330" cy="352" r="7" fill={`url(#ca-orb-${side})`} />
      </g>
    </svg>
  )
}

/* "Why Choose CodeZyntax" illustration: a 3D-style laptop showing a website interface, surrounded by
   floating blue technology tiles. Original inline SVG, no external images.
   Colours that must change in dark mode are CSS classes (wy-*). */
function Tile({ x, y, cls, children }) {
  return (
    <g className={cls}>
      <rect x={x} y={y + 10} width="72" height="72" rx="20" fill="#1d3fa8" opacity=".2" filter="url(#wy-blur-s)" />
      <rect x={x} y={y} width="72" height="72" rx="20" className="wy-tile" />
      <rect x={x + 4} y={y + 4} width="64" height="28" rx="15" fill="#fff" opacity=".6" className="wy-tile-hi" />
      <g transform={`translate(${x + 36} ${y + 36})`} fill="none" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" className="wy-ico">{children}</g>
    </g>
  )
}

function WhyScene() {
  return (
    <svg className="hm-why-art" viewBox="0 0 560 420" role="img" aria-label="Illustration of a laptop showing a website interface, surrounded by floating icons for code, security, analytics and layered services" focusable="false">
      <defs>
        <radialGradient id="wy-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#4f8cff" stopOpacity=".26" /><stop offset="1" stopColor="#4f8cff" stopOpacity="0" /></radialGradient>
        <linearGradient id="wy-bezel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1c2d63" /><stop offset="1" stopColor="#0b1433" /></linearGradient>
        <linearGradient id="wy-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eef3ff" /><stop offset="1" stopColor="#b7c8ee" /></linearGradient>
        <linearGradient id="wy-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a95ff" /><stop offset="1" stopColor="#1f4fd8" /></linearGradient>
        <linearGradient id="wy-cube-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e4f1ff" /><stop offset="1" stopColor="#8fb6ff" /></linearGradient>
        <linearGradient id="wy-cube-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4d86ff" /><stop offset="1" stopColor="#2a45d8" /></linearGradient>
        <linearGradient id="wy-cube-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7f9bff" /><stop offset="1" stopColor="#2b3fb8" /></linearGradient>
        <radialGradient id="wy-orb" cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#7fb2ff" /><stop offset="1" stopColor="#3b4fe0" /></radialGradient>
        <filter id="wy-blur" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="wy-blur-s" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      {/* soft light behind the laptop and ground shadow */}
      <ellipse cx="280" cy="215" rx="268" ry="196" fill="url(#wy-glow)" />
      <ellipse cx="280" cy="372" rx="205" ry="14" fill="#1d3fa8" opacity=".3" filter="url(#wy-blur)" />
      <ellipse cx="280" cy="214" rx="252" ry="92" fill="none" stroke="#7aa6ff" strokeOpacity=".35" strokeWidth="1.2" transform="rotate(-8 280 214)" />

      {/* laptop base */}
      <path d="M92 306H468L506 346Q511 360 494 360H66Q49 360 54 346Z" fill="url(#wy-base)" />
      <path d="M92 306H468L474 313H86Z" fill="#fff" opacity=".7" />
      <rect x="236" y="306" width="88" height="8" rx="4" fill="#97abd8" />
      <path d="M58 352H502" stroke="#8aa0d0" strokeOpacity=".55" strokeWidth="1.2" />

      {/* laptop screen */}
      <rect x="120" y="92" width="320" height="214" rx="14" fill="url(#wy-bezel)" />
      <rect x="130" y="102" width="300" height="194" rx="7" fill="#fff" />
      {/* browser bar */}
      <path d="M130 109a7 7 0 0 1 7-7h286a7 7 0 0 1 7 7v13H130Z" fill="#eef3fd" />
      <circle cx="143" cy="112" r="2.6" fill="#ff8a80" /><circle cx="152" cy="112" r="2.6" fill="#ffd166" /><circle cx="161" cy="112" r="2.6" fill="#7ddf9b" />
      <rect x="176" y="107" width="160" height="10" rx="5" fill="#fff" stroke="#d9e3f7" />
      {/* site navigation */}
      <rect x="146" y="132" width="11" height="11" rx="3.5" fill="url(#wy-blue)" />
      <rect x="161" y="135" width="30" height="5" rx="2.5" fill="#1b2a52" opacity=".8" />
      <rect x="318" y="135" width="20" height="5" rx="2.5" fill="#c3d0ee" /><rect x="344" y="135" width="20" height="5" rx="2.5" fill="#c3d0ee" /><rect x="370" y="135" width="20" height="5" rx="2.5" fill="#c3d0ee" />
      <rect x="396" y="131" width="24" height="13" rx="6.5" fill="url(#wy-blue)" />
      {/* hero copy */}
      <rect x="146" y="162" width="118" height="10" rx="5" fill="#1b2a52" opacity=".88" />
      <rect x="146" y="178" width="86" height="10" rx="5" fill="url(#wy-blue)" />
      <rect x="146" y="196" width="122" height="4.5" rx="2.25" fill="#c9d6f2" /><rect x="146" y="205" width="98" height="4.5" rx="2.25" fill="#d8e2f6" />
      <rect x="146" y="219" width="52" height="15" rx="7.5" fill="url(#wy-blue)" />
      <rect x="204" y="219" width="46" height="15" rx="7.5" fill="none" stroke="#b9c9ec" />
      {/* hero analytics card */}
      <rect x="290" y="156" width="130" height="82" rx="9" fill="#eaf1ff" />
      <rect x="302" y="198" width="14" height="30" rx="3" fill="#8fb4ff" /><rect x="322" y="186" width="14" height="42" rx="3" fill="#6f9bff" />
      <rect x="342" y="194" width="14" height="34" rx="3" fill="#4f82f5" /><rect x="362" y="176" width="14" height="52" rx="3" fill="url(#wy-blue)" />
      <path d="M302 178 330 168 352 174 396 162" fill="none" stroke="#22b8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="396" cy="162" r="3.2" fill="#fff" stroke="#22b8ff" strokeWidth="2" />
      {/* feature cards */}
      {[146, 240, 334].map(cx => (
        <g key={cx}>
          <rect x={cx} y="250" width="86" height="36" rx="8" fill="#f3f7ff" stroke="#dfe8f8" />
          <circle cx={cx + 14} cy="268" r="6.5" fill="url(#wy-blue)" />
          <rect x={cx + 26} y="261" width="44" height="5" rx="2.5" fill="#1b2a52" opacity=".7" />
          <rect x={cx + 26} y="271" width="32" height="4" rx="2" fill="#c3d0ee" />
        </g>
      ))}
      {/* screen glare */}
      <path d="M130 102H300L220 296H130Z" fill="#fff" opacity=".1" />

      {/* small floating cube */}
      <g className="hm-fl-b">
        <path d="M140 26 166 40 140 54 114 40Z" fill="url(#wy-cube-t)" />
        <path d="M114 40 140 54V84L114 70Z" fill="url(#wy-cube-l)" />
        <path d="M166 40 140 54V84L166 70Z" fill="url(#wy-cube-r)" />
        <path d="M140 26 166 40 140 54 114 40Z" fill="#fff" opacity=".3" />
      </g>

      {/* floating technology tiles */}
      <Tile x={30} y={116} cls="hm-fl-a">
        <path d="M-8 -10 -18 0 -8 10" /><path d="M8 -10 18 0 8 10" /><path d="M3 -14 -3 14" />
      </Tile>
      <Tile x={458} y={58} cls="hm-fl-c">
        <path d="M0 -20 16 -13V2C16 12 8 18 0 22 -8 18 -16 12 -16 2V-13Z" /><path d="M-7 1 -2 6 8 -6" />
      </Tile>
      <Tile x={474} y={214} cls="hm-fl-b">
        <path d="M-14 14V-2" /><path d="M0 14V-14" /><path d="M14 14V6" />
      </Tile>
      <Tile x={14} y={248} cls="hm-fl-c">
        <path d="M0 -18 18 -8 0 2 -18 -8Z" /><path d="M-18 2 0 12 18 2" />
      </Tile>

      {/* decorative orbs */}
      <circle className="hm-fl-a" cx="424" cy="36" r="10" fill="url(#wy-orb)" />
      <circle className="hm-fl-c" cx="536" cy="178" r="7" fill="url(#wy-orb)" />
      <circle className="hm-fl-b" cx="64" cy="70" r="8" fill="url(#wy-orb)" />
      <circle className="hm-fl-a" cx="522" cy="338" r="8" fill="url(#wy-orb)" />
      <circle className="hm-fl-c" cx="38" cy="372" r="6" fill="url(#wy-orb)" />
    </svg>
  )
}

/* FAQ: editorial list on a soft tinted band, with a smooth accordion. */
function HomeFaq() {
  const [open, setOpen] = useState(0)
  const uid = useId()
  return (
    <section className="hm-faq" aria-labelledby={`${uid}-title`}>
      <div className="hm-faq-wrap">
        <div className="hm-faq-grid">
          <header className="hm-faq-intro" data-reveal>
            <p className="hm-faq-label"><span aria-hidden="true">+</span>Frequently Asked</p>
            <h2 id={`${uid}-title`} className="hm-faq-title">Find Out Answers Here</h2>
            <p className="hm-faq-desc">Clear answers to the questions we hear most about our software, web, marketing and branding services.</p>
          </header>
          <ul className="hm-faq-list">
            {FAQS.map(([q, a], i) => {
              const isOpen = open === i
              const btnId = `${uid}-q${i}`
              const panelId = `${uid}-a${i}`
              return (
                <li key={btnId} className={`hm-faq-item${isOpen ? ' is-open' : ''}`}>
                  <h3 className="hm-faq-q">
                    <button type="button" id={btnId} className="hm-faq-btn" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? -1 : i)}>
                      <span className="hm-faq-q-text">{q}</span>
                      <span className="hm-faq-icon" aria-hidden="true"><i /><i /></span>
                    </button>
                  </h3>
                  <div id={panelId} className="hm-faq-panel" role="region" aria-labelledby={btnId}>
                    <div className="hm-faq-panel-inner"><div className="hm-faq-a"><p>{a}</p></div></div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}


/* Services grid: 3 columns desktop, 2 tablet, 1 mobile. Uses the shared compact ServiceCard
   (src/components/ServiceCard.jsx), the same card as the Services page. */

function ServicesGrid() {
  const [activeIndex, setActiveIndex] = useState(0)

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? SERVICES.length - 1 : current - 1
    )
  }
useEffect(() => {
  const media = window.matchMedia('(max-width: 639px)')
  if (!media.matches || SERVICES.length < 2) return

  const timer = window.setInterval(() => {
    setActiveIndex((current) => (current + 1) % SERVICES.length)
  }, 3000)

  return () => window.clearInterval(timer)
}, [])
  const next = () => {
    setActiveIndex((current) =>
      current >= SERVICES.length - 1 ? 0 : current + 1
    )
  }

  return (
    <div className="hm-service-carousel">
      <ul
        className="svc-grid hm-service-track"
        style={{ '--service-index': activeIndex }}
      >
        {SERVICES.map((s, index) => (
          <li key={s.slug || s.title || index}>
            <ServiceCard s={s} full />
          </li>
        ))}
      </ul>

      <div className="hm-service-controls" aria-label="Service carousel controls">
        <button
          type="button"
          className="hm-service-arrow"
          onClick={previous}
          aria-label="Previous service"
        >
          &#8592;
        </button>

        <div className="hm-service-dots">
          {SERVICES.map((service, index) => (
            <button
              key={service.slug || service.title || index}
              type="button"
              className={`hm-service-dot${activeIndex === index ? ' active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${service.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="hm-service-arrow"
          onClick={next}
          aria-label="Next service"
        >
          &#8594;
        </button>
      </div>
    </div>
  )
}

export default function Home() {
   
useEffect(() => {
  const selector = '.hm [data-reveal]';
  let frameId = null;

  const revealOnScroll = () => {
    if (frameId) return;

    frameId = window.requestAnimationFrame(() => {
      document.querySelectorAll(selector).forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (
          rect.top < window.innerHeight * 0.92 &&
          rect.bottom > 0
        ) {
          element.classList.add('in');
        }
      });

      frameId = null;
    });
  };

  revealOnScroll();

  window.addEventListener('scroll', revealOnScroll, {
    passive: true,
  });
  window.addEventListener('resize', revealOnScroll);

  return () => {
    window.removeEventListener('scroll', revealOnScroll);
    window.removeEventListener('resize', revealOnScroll);

    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
  };
}, []);

  return (<div className="hm">
    <Seo title="Software Development Company" description="CodeZyntax Softwares L.L.P. builds modern websites, custom software, web applications and digital solutions for businesses in India and the Gulf." />

    {/* ================= HERO ================= */}
    <section className="hm-hero hm-hero-editorial" aria-labelledby="hm-hero-title">
      <div className="hm-hero-bg" aria-hidden="true" />
      <div className="hm-wrap hm-hero-grid">
        <div className="hm-hero-copy" data-reveal>
          <h1 id="hm-hero-title" className="hm-h1 hm-hero-editorial-title">
            <span className="hm-l">Improving Your Business</span>
            <span className="hm-l">Potential With</span>
            <span className="hm-l hm-hero-blue">Innovation &amp; Technology</span>
          </h1>
          <p className="hm-lead">Best software development company In Palakkad</p>
        </div>

        <div className="hm-hero-art hm-hero-showcase" data-reveal aria-label="Website and software project previews">
       
<div className="hm-showcase-collage">
  {HERO_SHOWCASE.map((item, i) => (
    <a
      key={item.title}
      className={
        i === 0
          ? 'hm-showcase-main'
          : `hm-showcase-small hm-showcase-small-${i}`
      }
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${item.title}`}
    >
      <div className="hm-showcase-browserbar">
        <span />
        <span />
        <span />
        <b>{new URL(item.url).hostname}</b>
      </div>

      <div className="hm-showcase-image">
        <img
          src={item.image}
          alt={`${item.title} website preview`}
          loading={i === 0 ? 'eager' : 'lazy'}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
    </a>
  ))}
</div>

        </div>
      </div>
    </section>

    {/* ================= MOVING SERVICE STRIP ================= */}
    <div className="hm-ticker" role="presentation">
      <ul className="hm-ticker-track" aria-label="Our services">
        {[...SERVICES, ...SERVICES].map((s, i) => (
          <li key={i} aria-hidden={i >= SERVICES.length ? 'true' : undefined}><span>{s.title}</span><i /></li>
        ))}
      </ul>
    </div>
 {/* ================= ABOUT ================= */}
    <section id="about" className="hm-sec hm-about" aria-labelledby="hm-about-title">
      <div className="hm-wrap">
        <div className="hm-ab-shell">
          <div className="hm-ab-copy">
            <div data-reveal className="hm-head">
              <span className="hm-pill"><i />About</span>
              <h2 id="hm-about-title">Empowering Businesses with Smart Digital Solutions</h2>
            </div>
            <p data-reveal className="hm-ab-lead">We are a <strong>software development company in Palakkad</strong> committed to providing smart, scalable and easy-to-use digital solutions for businesses of any size. Our services cover <strong>custom software development</strong>, <strong>web and mobile applications</strong>, and <strong>digital marketing</strong> created to enhance your online presence.</p>
            <p data-reveal className="hm-ab-text">At CodeZyntax Softwares LLP, we believe technology should be user-friendly, reliable and suited to your goals. With a highly skilled team of developers and digital experts, we focus on creating innovative tools that solve challenges and deliver measurable business growth.</p>
            <p data-reveal className="hm-ab-text">As the best software development company in Palakkad, we prioritize <strong>transparency, collaboration</strong> and innovative technologies to turn your vision into reality. From startups to established enterprises, we adapt our strategies to shifting market trends to make sure of maximum impact. Alongside our development services, we also operate as a leading <strong>digital marketing agency in Pattambi</strong>, helping businesses grow their digital reach and gain long-term success.</p>
            <div className="hm-ab-mv">
              {ABOUT_MV.map(([Icon, t, d]) => (
                <div key={t} data-reveal className="hm-ab-mvi">
                  <span className="hm-ab-mvico"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <p data-reveal className="hm-ab-close">Let's create something remarkable together.</p>
            <Link data-reveal to="/about" className="hm-btn hm-btn-primary hm-btn-sm">About Us <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>

          <div data-reveal className="hm-ab-stage">
            <div className="hm-ab-build">
              <p className="hm-eyebrow">What we build</p>
              <ul className="hm-ab-chips">
                {SERVICES.slice(0, 6).map(sv => {
                  const SIcon = Icons[sv.icon] || Icons.Code2
                  return <li key={sv.slug}><Link to={`/service/${sv.slug}`}><SIcon size={15} strokeWidth={1.8} aria-hidden="true" />{sv.title}</Link></li>
                })}
                {SERVICES.length > 6 && <li className="hm-ab-more"><Link to="/service">+{SERVICES.length - 6} more</Link></li>}
              </ul>
              <p className="hm-ab-loc"><Globe size={16} aria-hidden="true" />Based in Palakkad, serving India and the Gulf</p>
            </div>
            <div className="hm-ab-cards">
              {ABOUT_FEATURES.map(([Icon, t, d]) => (
                <div key={t} className="hm-ab-card">
                  <span className="hm-ab-ico"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ================= SERVICES ================= */}
    <section className="hm-sec hm-services" aria-labelledby="hm-services-title">
      <div className="hm-wrap">
        <div className="hm-split">
          <div data-reveal className="hm-head">
            <span className="hm-pill"><i />Our Services</span>
            <h2 id="hm-services-title">One Partner for Every Digital Need</h2>
            <p>From custom software to marketing, our services work together so your product looks, performs and grows as one.</p>
          </div>
          <Link to="/service" data-reveal className="hm-btn hm-btn-outline hm-btn-sm">View All Services <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <ServicesGrid />
      </div>
    </section>

   
    {/* ================= SELECTED WORK ================= */}
    <section className="hm-sec hm-projects" aria-labelledby="hm-projects-title">
      <div className="hm-wrap">
        <div className="hm-work-head">
          <div data-reveal>
            <p className="hm-work-kicker"><b aria-hidden="true">+</b> Selected Work</p>
            <h2 id="hm-projects-title">Good ideas, made real.</h2>
          </div>
          <p data-reveal className="hm-work-intro">{PROJECTS.length ? 'Every project shown here is live on its own domain. Open it, explore it and experience the work directly.' : 'Case studies and live project links will appear here.'}</p>
        </div>
        {PROJECTS.length ? (
          <>
            <ul className="hm-work-list">
              {PROJECTS.map((p, i) => {
                const isOneCard = p.slug === '1card'
                return (
                  <li key={p.slug || p.title}>
                    <article data-reveal className={`hm-work${isOneCard ? ' hm-work-1card' : ''}`}>
                      <div className="hm-work-media">
                        <ProjectMedia p={p} />
                        <span className="hm-work-count" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                      </div>
                      <div className="hm-work-body">
                        <p className="hm-work-cat">{p.category}</p>
                        <h3>{p.title}</h3>

{p.summary && (
  <p className={`hm-work-sum${isOneCard ? ' hm-1card-quote' : ''}`}>
    {p.summary}
  </p>
)}
                      <div className="hm-work-links"></div>
                        <a className="hm-work-link" href={p.url} target="_blank" rel="noopener noreferrer">
                          View live website <ArrowUpRight size={20} strokeWidth={1.8} />
                          <span className="hm-sr"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            <div data-reveal className="hm-work-foot">
              <Link to="/contact" className="hm-btn hm-btn-outline hm-btn-sm">Start Your Project <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </>
        ) : (
          <div data-reveal className="hm-empty">
            <div className="hm-empty-art" aria-hidden="true">
              <svg viewBox="0 0 220 150" focusable="false">
                <defs>
                  <linearGradient id="hm-e-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2f6bff" /><stop offset="1" stopColor="#5b7cf0" /></linearGradient>
                  <linearGradient id="hm-e-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e4ebff" /></linearGradient>
                </defs>
                <ellipse cx="110" cy="136" rx="78" ry="9" fill="#2b4fe0" opacity=".14" />
                <rect x="28" y="16" width="164" height="106" rx="14" fill="url(#hm-e-s)" stroke="#c9d6ff" />
                <path d="M28 30a14 14 0 0 1 14-14h136a14 14 0 0 1 14 14v8H28Z" fill="url(#hm-e-g)" />
                <circle cx="44" cy="27" r="3.2" fill="#fff" opacity=".85" /><circle cx="55" cy="27" r="3.2" fill="#fff" opacity=".6" /><circle cx="66" cy="27" r="3.2" fill="#fff" opacity=".4" />
                <rect x="44" y="54" width="62" height="9" rx="4.5" fill="#b9c8ff" /><rect x="44" y="70" width="92" height="6" rx="3" fill="#dbe4ff" /><rect x="44" y="82" width="76" height="6" rx="3" fill="#dbe4ff" />
                <rect x="132" y="54" width="44" height="52" rx="9" fill="url(#hm-e-g)" opacity=".9" />
                <path d="M146 80l7 7 11-14" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="hm-empty-copy">
              <h3>Your project could be featured here</h3>
              <p>Tell us what you want to build and we will show you how we would approach it, from first sketch to launch.</p>
              <div className="hm-empty-actions">
                <Link to="/contact" className="hm-btn hm-btn-primary hm-btn-sm">Start a Project <ArrowUpRight size={16} aria-hidden="true" /></Link>
                <Link to="/portfolio" className="hm-btn hm-btn-outline hm-btn-sm">View Portfolio <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
 {/* ================= CLIENT FEEDBACK — split editorial layout ================= */}
 <div className="hm-testimonial-scroll">
  <div className="hm-testimonial-track"></div>
    <section className="hm-sec hm-testimonials" aria-labelledby="hm-testimonials-title">
      <div className="hm-testimonials-shell">
        <div className="hm-testimonials-intro" data-reveal>
          <p className="hm-testimonials-kicker">+ CLIENT EXPERIENCES / TRUSTED PARTNERS</p>
          <h2 id="hm-testimonials-title">Good work speaks through the people we work with.</h2>
          <p className="hm-testimonials-lead">We help businesses turn everyday needs into practical digital solutions, with a focus on thoughtful design, dependable delivery and responsive support.</p>
          <p className="hm-testimonials-note">Every business is different. We listen first, understand the workflow, and build around what matters.</p>
          <Link to="/contact" className="hm-testimonials-link">Discuss your project <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="hm-testimonials-panel">
          <p className="hm-testimonials-location">WHAT OUR CLIENTS SAY</p>
          <h3>Built around real business needs.</h3>
          <div className="hm-testimonial-rail">
          
          <article className="hm-testimonial-item" data-reveal>
            <div className="hm-testimonial-meta">
              <span className="hm-testimonial-mark">MS</span>
              <div><strong>MS Square</strong><small>Software</small></div>
            </div>
            <div className="hm-testimonial-copy">
              <h4>Best choice</h4>
              <p>“Partnering with CodeZyntax Softwares LLP was the best decision for our software needs. As a software development company in Palakkad, their team delivered us exactly what we were looking for. It was fast, functional, and delivered efficient results that were beyond our expectations.”</p>
              <span className="hm-testimonial-stars" aria-label="5 out of 5 stars">★★★★★</span>
            </div>
          </article>
          <article className="hm-testimonial-item" data-reveal>
            <div className="hm-testimonial-meta">
              <span className="hm-testimonial-mark hm-testimonial-mark-light">AC</span>
              <div><strong>ARTECHO</strong><small>1 card</small></div>
            </div>
            <div className="hm-testimonial-copy">
              <h4>Great service</h4>
              <p>“CodeZyntax Softwares LLP created a stylish, professional digital card for our brand. Their service was quick, responsive, and exactly what we needed to stand out.”</p>
              <span className="hm-testimonial-stars" aria-label="5 out of 5 stars">★★★★★</span>
            </div>
          </article>
          
{/* SOOCHI */}
<article className="hm-testimonial-item" data-reveal>
  <div className="hm-testimonial-meta">
    <span className="hm-testimonial-mark">S</span>
    <div>
      <strong>Soochi</strong>
      <small>Software</small>
    </div>
  </div>

  <div className="hm-testimonial-copy">
    <h4>Good communication</h4>
    <p>
      “CodeZyntax given us a good product without breaking our budget.
      Their team provided great communication, on-time delivery and
      exceptional quality at a very good price. We are highly satisfied
      with their service and will recommend them.”
    </p>
    <span className="hm-testimonial-stars"
      aria-label="5 out of 5 stars">★★★★★</span>
  </div>
</article>

{/* ALIGN IDEAS */}
<article className="hm-testimonial-item" data-reveal>
  <div className="hm-testimonial-meta">
    <span className="hm-testimonial-mark hm-testimonial-mark-light">
      AI
    </span>
    <div>
      <strong>align ideas</strong>
      <small>1 card</small>
    </div>
  </div>

  <div className="hm-testimonial-copy">
    <h4>Creative Designs</h4>
    <p>
      “We are really happy and satisfied with the digital card they
      designed for us, which was very modern, creative and perfectly
      suited for our brand image. Their NFC business cards are a
      great way to make a lasting impression.”
    </p>
    <span className="hm-testimonial-stars"
      aria-label="5 out of 5 stars">★★★★★</span>
  </div>
</article>

          </div>
          <Link to="/service" className="hm-testimonials-panel-link">Explore our services <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
      </div>
          </section>

      </div>
 {/* ================= FAQ ================= */}
    <HomeFaq />

    

    {/* ================= WHY CHOOSE ================= */}
    <section className="hm-sec hm-why" aria-labelledby="hm-why-title">
      <div className="hm-wrap">
        <div data-reveal className="hm-head hm-head-c">
          <span className="hm-pill"><i />Our Strengths</span>
          <h2 id="hm-why-title">Why Choose CodeZyntax</h2>
          <p>We combine the right strategy, technology and people to deliver reliable solutions that help your business grow.</p>
        </div>
        <div className="hm-why-layout">
          <div data-reveal className="hm-why-visual"><WhyScene /></div>
          <ul className="hm-why-cards">
            {WHY.map(([Icon, t, d]) => (
              <li key={t}>
                <article data-reveal className="hm-why-card">
                  <span className="hm-why-ico"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* ================= PROCESS ================= */}
    <section className="hm-sec hm-process" aria-labelledby="hm-process-title">
      <div className="hm-wrap">
        <div data-reveal className="hm-head hm-head-c">
          <span className="hm-pill"><i />Our Process</span>
          <h2 id="hm-process-title">Clear From First Call to Launch</h2>
          <p>A simple four-step approach that keeps every project on track.</p>
        </div>
        <ol className="hm-steps">
          {STEPS.map(([Icon, t, d], i) => (
            <li key={t} data-reveal>
              <span className="hm-step-node"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /><b>{i + 1}</b></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
{/* ================= FINAL CTA (id="contact" keeps the /#contact menu link working) ================= */}
    <section id="contact" className="hm-final" aria-labelledby="hm-final-title">
      <CtaArt side="left" />
      <CtaArt side="right" />
      <div className="hm-wrap hm-final-inner" data-reveal>
        <span className="hm-pill"><i />Let's Work Together</span>
        <h2 id="hm-final-title">Ready to Build the Version Your Business Deserves?</h2>
        <p>Share your goals with us, and let's turn your ideas into practical digital solutions.</p>
        <div className="hm-final-actions">
          <Link to="/contact" className="hm-btn hm-btn-primary">Let's Discuss Your Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link to="/service" className="hm-btn hm-btn-outline">Explore Our Services <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
   
  </div>)
}