import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import {
  ArrowUpRight, ArrowRight, ExternalLink, Globe, SlidersHorizontal, Users, LifeBuoy, Wallet,
  Target, Eye, Zap, Briefcase, Award, ShieldCheck, MessagesSquare, Headphones, Search, ClipboardList, Code2, Rocket,
} from 'lucide-react'
import Seo from '../components/Seo'
import HomeHeroScene from '../components/HomeHeroScene'
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
  [Target, 'Tailored Solutions', 'We build around your goals and workflows instead of forcing a one-size-fits-all template.'],
  [ShieldCheck, 'Quality-Focused Development', 'Clean, documented and maintainable code, tested before every launch.'],
  [MessagesSquare, 'Clear Communication', 'Regular reviews and plain-language updates, so you always know where your project stands.'],
  [Headphones, 'Ongoing Support', 'Updates, fixes and new features after launch, as your business grows.'],
]

const STEPS = [
  [Search, 'Discover', 'We learn your goals, users and constraints.'],
  [ClipboardList, 'Plan', 'We define scope, structure, interface and technical approach.'],
  [Code2, 'Develop', 'We build in stages, with regular reviews along the way.'],
  [Rocket, 'Launch & Support', 'We test, launch and keep improving after release.'],
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
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, '') } catch { return '' } }

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

/* Original isometric 3D illustration for "Why Choose CodeZyntax": layered platform, glossy shield
   and four floating tokens (target, chat, support ring, quality check). Inline SVG only.
   Built for a light panel; colours that must change in dark mode are CSS classes (wy-*). */
function Slab({ cx, cy, a, b, t, id }) {
  return (
    <g>
      <path d={`M${cx - a} ${cy}L${cx} ${cy + b}V${cy + b + t}L${cx - a} ${cy + t}Z`} fill={`url(#wy-${id}-l)`} />
      <path d={`M${cx + a} ${cy}L${cx} ${cy + b}V${cy + b + t}L${cx + a} ${cy + t}Z`} fill={`url(#wy-${id}-r)`} />
      <path d={`M${cx} ${cy - b}L${cx + a} ${cy}L${cx} ${cy + b}L${cx - a} ${cy}Z`} fill={`url(#wy-${id}-t)`} />
      <path d={`M${cx} ${cy - b}L${cx + a} ${cy}L${cx} ${cy + b}L${cx - a} ${cy}Z`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" />
    </g>
  )
}
function Token({ x, y, cls, children }) {
  return (
    <g className={cls}>
      <rect x={x} y={y + 8} width="76" height="76" rx="22" fill="#1d3fa8" opacity=".16" filter="url(#wy-blur-s)" />
      <rect x={x} y={y} width="76" height="76" rx="22" className="wy-tok" />
      <rect x={x + 4} y={y + 4} width="68" height="30" rx="16" fill="#fff" opacity=".55" className="wy-tok-hi" />
      <g transform={`translate(${x + 38} ${y + 38})`}>{children}</g>
    </g>
  )
}
function WhyArt() {
  const slabs = [['s1', 280, 392, 222, 122, 26], ['s2', 280, 368, 176, 97, 24], ['s3', 280, 346, 134, 74, 22]]
  return (
    <svg className="hm-why-art" viewBox="0 0 560 540" role="img" aria-label="Isometric illustration of a glowing shield on a layered platform, surrounded by icons for tailored solutions, communication, support and quality" focusable="false">
      <defs>
        <radialGradient id="wy-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#4f8cff" stopOpacity=".28" /><stop offset="1" stopColor="#4f8cff" stopOpacity="0" /></radialGradient>
        <linearGradient id="wy-s1-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b7cff" /><stop offset="1" stopColor="#3f5de0" /></linearGradient>
        <linearGradient id="wy-s1-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c3fc4" /><stop offset="1" stopColor="#141f78" /></linearGradient>
        <linearGradient id="wy-s1-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a3bd0" /><stop offset="1" stopColor="#1c1a85" /></linearGradient>
        <linearGradient id="wy-s2-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8fb4ff" /><stop offset="1" stopColor="#5b7cff" /></linearGradient>
        <linearGradient id="wy-s2-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d63e8" /><stop offset="1" stopColor="#2230a8" /></linearGradient>
        <linearGradient id="wy-s2-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6552e6" /><stop offset="1" stopColor="#2c2a9c" /></linearGradient>
        <linearGradient id="wy-s3-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f2f8ff" /><stop offset="1" stopColor="#bcd4ff" /></linearGradient>
        <linearGradient id="wy-s3-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6f95ff" /><stop offset="1" stopColor="#3550d6" /></linearGradient>
        <linearGradient id="wy-s3-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6f8fff" /><stop offset="1" stopColor="#2b3fb0" /></linearGradient>
        <linearGradient id="wy-shield" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6fb2ff" /><stop offset=".55" stopColor="#3b63f0" /><stop offset="1" stopColor="#2f4fd0" /></linearGradient>
        <linearGradient id="wy-shield-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fd0ff" /><stop offset="1" stopColor="#4a6cf5" /></linearGradient>
        <linearGradient id="wy-shield-d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1f2fa8" /><stop offset="1" stopColor="#3a1f9a" /></linearGradient>
        <linearGradient id="wy-orbit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#22d3ee" stopOpacity="0" /><stop offset=".5" stopColor="#4f7dff" stopOpacity=".7" /><stop offset="1" stopColor="#6f8fff" stopOpacity="0" /></linearGradient>
        <linearGradient id="wy-ck-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e4f1ff" /><stop offset="1" stopColor="#8fb6ff" /></linearGradient>
        <linearGradient id="wy-ck-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4d86ff" /><stop offset="1" stopColor="#2a45d8" /></linearGradient>
        <linearGradient id="wy-ck-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7f9bff" /><stop offset="1" stopColor="#2b3fb8" /></linearGradient>
        <radialGradient id="wy-orb" cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#7fb2ff" /><stop offset="1" stopColor="#3b4fe0" /></radialGradient>
        <filter id="wy-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="12" /></filter>
        <filter id="wy-blur-s" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* ambient light + ground shadow */}
      <ellipse cx="280" cy="300" rx="270" ry="220" fill="url(#wy-glow)" />
      <ellipse cx="280" cy="506" rx="215" ry="20" fill="#1d3fa8" opacity=".28" filter="url(#wy-blur)" />

      {/* orbit rings behind the model */}
      <ellipse cx="280" cy="300" rx="236" ry="88" fill="none" stroke="url(#wy-orbit)" strokeWidth="1.6" transform="rotate(-12 280 300)" />
      <ellipse cx="280" cy="300" rx="200" ry="70" fill="none" stroke="url(#wy-orbit)" strokeWidth="1" opacity=".7" transform="rotate(10 280 300)" />

      {/* layered platform */}
      {slabs.map(([id, cx, cy, a, b, t]) => <Slab key={id} id={id} cx={cx} cy={cy} a={a} b={b} t={t} />)}
      {/* glowing inlay on the top slab */}
      <path d="M280 306 L336 346 L280 386 L224 346Z" fill="#fff" opacity=".55" />
      <path d="M280 318 L322 346 L280 374 L238 346Z" fill="none" stroke="#4f7dff" strokeOpacity=".85" strokeWidth="1.4" />

      {/* shield (depth layer, body, bevel, check) */}
      <g className="hm-fl-a">
        <path d="M288 166 360 193 V268 C360 311 329 338 288 355 C247 338 216 311 216 268 V193Z" fill="url(#wy-shield-d)" opacity=".95" />
        <path d="M280 150 350 177 V252 C350 295 319 322 280 339 C241 322 210 295 210 252 V177Z" fill="url(#wy-shield)" />
        <path d="M280 164 337 186 V250 C337 285 312 308 280 322 C248 308 223 285 223 250 V186Z" fill="url(#wy-shield-in)" opacity=".5" />
        <path d="M280 150 350 177 V252 C350 295 319 322 280 339" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.6" />
        <path d="M222 190 C248 176 270 172 280 170 C260 200 240 246 240 300 C226 284 222 268 222 252Z" fill="#fff" opacity=".22" />
        <path d="M246 252 L271 277 L318 220" fill="none" stroke="#0d1a6b" strokeOpacity=".35" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 6)" />
        <path d="M246 252 L271 277 L318 220" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* small isometric cube, upper left */}
      <g className="hm-fl-b">
        <path d="M110 120 150 142 110 164 70 142Z" fill="url(#wy-ck-t)" />
        <path d="M70 142 110 164V212L70 190Z" fill="url(#wy-ck-l)" />
        <path d="M150 142 110 164V212L150 190Z" fill="url(#wy-ck-r)" />
        <path d="M110 120 150 142 110 164 70 142Z" fill="#fff" opacity=".3" />
      </g>

      {/* tokens, each tied to one strength */}
      <Token x={414} y={112} cls="hm-fl-c">
        <circle r="20" fill="none" className="wy-st-a" strokeWidth="3.5" />
        <circle r="11" fill="none" stroke="#22b8ff" strokeWidth="3.5" />
        <circle r="3.5" className="wy-fi-a" />
        <path d="M0 0 18 -18" className="wy-st-a" strokeWidth="3.5" strokeLinecap="round" />
      </Token>
      <Token x={46} y={286} cls="hm-fl-a">
        <path d="M-21 -15a8 8 0 0 1 8-8h26a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H-3L-14 24V9h-1a8 8 0 0 1-6-8Z" className="wy-fi-b" />
        <circle cx="-9" cy="-7" r="2.8" fill="#fff" /><circle cx="0" cy="-7" r="2.8" fill="#fff" /><circle cx="9" cy="-7" r="2.8" fill="#fff" />
      </Token>
      <Token x={438} y={296} cls="hm-fl-b">
        <circle r="19" fill="none" className="wy-st-soft" strokeWidth="9" />
        <circle r="19" fill="none" stroke="#22b8ff" strokeWidth="9" strokeDasharray="14.9 14.9" />
      </Token>
      <Token x={204} y={52} cls="hm-fl-b">
        <path d="M0 -22 18 -14V3C18 14 9 21 0 25 -9 21 -18 14 -18 3V-14Z" className="wy-fi-b" />
        <path d="M-8 2 -2 8 9 -6" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </Token>

      {/* decorative orbs */}
      <circle className="hm-fl-a" cx="372" cy="96" r="12" fill="url(#wy-orb)" />
      <circle className="hm-fl-c" cx="504" cy="228" r="8" fill="url(#wy-orb)" />
      <circle className="hm-fl-b" cx="36" cy="236" r="9" fill="url(#wy-orb)" />
      <circle className="hm-fl-a" cx="116" cy="470" r="7" fill="url(#wy-orb)" />
    </svg>
  )
}

export default function Home() {
  return (<div className="hm">
    <Seo title="Software Development Company" description="CodeZyntax Softwares L.L.P. builds modern websites, custom software, web applications and digital solutions for businesses in India and the Gulf." />

    {/* ================= HERO ================= */}
    <section className="hm-hero" aria-labelledby="hm-hero-title">
      <div className="hm-hero-bg" aria-hidden="true" />
      <div className="hm-wrap hm-hero-grid">
        <div className="hm-hero-copy" data-reveal>
          <span className="hm-pill hm-pill-glass"><i />Software · Web · Mobile · Digital</span>
          <h1 id="hm-hero-title" className="hm-h1">
            <span className="hm-l">Transforming </span>
            <span className="hm-l hm-grad">Business Ideas </span>
            <span className="hm-l">into Powerful </span>
            <span className="hm-l hm-grad hm-grad-cyan">Digital Solutions.</span>
          </h1>
          <p className="hm-lead">We design and build custom software, web and mobile applications and digital marketing solutions that help businesses work smarter, serve customers better and grow with confidence.</p>
          <div className="hm-cta">
            <Link to="/contact" className="hm-btn hm-btn-primary">Let's Discuss Your Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/service" className="hm-btn hm-btn-ghost">Explore Our Services <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <p className="hm-regions-line"><Globe size={16} aria-hidden="true" />Serving businesses across {REGIONS[0]} and the Gulf region</p>
        </div>
        <div className="hm-hero-art" data-reveal>
          <HomeHeroScene />
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
        <ul className="hm-grid-services">
          {SERVICES.map(s => {
            const Icon = Icons[s.icon] || Icons.Code2
            return (
              <li key={s.slug}>
                <Link to={`/service/${s.slug}`} data-reveal className="hm-card">
                  <span className="hm-ico"><Icon size={26} strokeWidth={1.7} aria-hidden="true" /></span>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="hm-more">Learn more <ArrowRight size={15} aria-hidden="true" /></span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>

    {/* ================= ABOUT ================= */}
    <section id="about" className="hm-sec hm-about" aria-labelledby="hm-about-title">
      <div className="hm-wrap">
        <div className="hm-ab-shell">
          <div className="hm-ab-copy">
            <div data-reveal className="hm-head">
              <span className="hm-pill"><i />About CodeZyntax</span>
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
              {PROJECTS.map((p, i) => (
                <li key={p.slug || p.title}>
                  <a data-reveal href={p.url} target="_blank" rel="noopener noreferrer" className="hm-work">
                    <div className="hm-work-media">
                      <ProjectMedia p={p} />
                      <span className="hm-work-count" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                    </div>
                    <div className="hm-work-body">
                      <p className="hm-work-cat">{p.category}</p>
                      <h3>{p.title}<span className="hm-sr"> (opens in a new tab)</span></h3>
                      {p.summary && <p className="hm-work-sum">{p.summary}</p>}
                      <div className="hm-work-tags">
                        {[...(p.tags || []), hostOf(p.url)].filter(Boolean).slice(0, 3).map(t => <span key={t}>{t}</span>)}
                      </div>
                      <span className="hm-work-link" aria-hidden="true">View live website <ArrowUpRight size={20} strokeWidth={1.8} /></span>
                    </div>
                  </a>
                </li>
              ))}
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


    {/* ================= WHY CHOOSE ================= */}
    <section className="hm-sec hm-why" aria-labelledby="hm-why-title">
      <div className="hm-wrap">
        <div data-reveal className="hm-head hm-head-c">
          <span className="hm-pill"><i />Our Strengths</span>
          <h2 id="hm-why-title">Why Choose CodeZyntax</h2>
          <p>The principles behind every project we take on.</p>
        </div>
        <div data-reveal className="hm-why-shell">
          <div className="hm-why-model"><WhyArt /></div>
          <ol className="hm-why-list">
            {WHY.map(([Icon, t, d], i) => (
              <li key={t} className="hm-why-item">
                <span className="hm-why-ico"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span>
                <div>
                  <span className="hm-why-n" aria-hidden="true">0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
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