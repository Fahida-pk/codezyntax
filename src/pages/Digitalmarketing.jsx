import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, Share2, Megaphone, PenTool, Compass, BarChart3, Check, ArrowRight, ArrowUpRight,
  Eye, MousePointerClick, Users, Target, TrendingUp, Sparkles, Rocket, Heart, MessageCircle,
  Globe, Layers, UserPlus, Repeat, Sprout,
} from 'lucide-react'
import Seo from '../components/Seo'
import { SITE } from '../data/site'
import './Digitalmarketing.css'

/* =========================================================================
   All illustrations on this page are built in code (CSS 3D transforms + SVG),
   so there are no image files to copy and nothing can 404.
   Every animation is real motion: floating layers, drawn chart lines,
   travelling light pulses, rotating rings and mouse-responsive parallax.
   ========================================================================= */

/* ---------------------------- content ---------------------------- */
const SERVICES = [
  { icon: Search, title: 'Search Engine Optimization (SEO)', text: 'Improve rankings, organic visibility and the quality of the traffic reaching your website.' },
  { icon: Share2, title: 'Social Media Marketing', text: 'Plan, publish and manage content that builds an engaged community around your brand.' },
  { icon: Megaphone, title: 'Performance Marketing & PPC', text: 'Targeted paid campaigns on search and social platforms, tuned for measurable return.' },
  { icon: PenTool, title: 'Content Marketing', text: 'Useful, on-brand content that attracts the right audience and supports every channel.' },
  { icon: Compass, title: 'Brand Strategy & Digital Presence', text: 'A clear voice and visual identity that stays consistent wherever customers find you.' },
  { icon: BarChart3, title: 'Campaign Analytics & Conversion Optimization', text: 'Transparent tracking and reporting that show what works and what to improve next.' },
]

const LAYERS = [
  { icon: Users, label: 'Audience research' },
  { icon: PenTool, label: 'Creative campaigns' },
  { icon: Rocket, label: 'Marketing technology' },
  { icon: BarChart3, label: 'Performance analysis' },
]

const WHY = [
  { icon: BarChart3, title: 'Data-driven marketing decisions', text: 'Every choice is guided by what the numbers show, not guesswork.' },
  { icon: Target, title: 'Strategies tailored to business goals', text: 'Plans are built around your objectives and your audience.' },
  { icon: Sparkles, title: 'Creative and consistent brand communication', text: 'One recognisable voice across every channel and campaign.' },
  { icon: Eye, title: 'Transparent performance reporting', text: 'Clear reports that show what is working and where we are improving.' },
  { icon: TrendingUp, title: 'Continuous campaign optimization', text: 'Campaigns are reviewed and refined on an ongoing basis.' },
  { icon: Rocket, title: 'Technology-led marketing solutions', text: 'Our software expertise connects marketing with the systems behind it.' },
]

const CHANNELS = [
  { icon: Search, label: 'SEO', x: 50, y: 12 },
  { icon: Share2, label: 'Social', x: 84, y: 32 },
  { icon: Megaphone, label: 'Paid ads', x: 84, y: 72 },
  { icon: PenTool, label: 'Content', x: 50, y: 90 },
  { icon: Sparkles, label: 'Brand', x: 16, y: 72 },
  { icon: BarChart3, label: 'Analytics', x: 16, y: 32 },
]

const PROCESS = [
  { icon: Compass, title: 'Discover', text: 'Understand business goals, customers, and competitors.' },
  { icon: Target, title: 'Strategize', text: 'Develop a tailored marketing roadmap.' },
  { icon: Rocket, title: 'Execute', text: 'Launch campaigns and create engaging content.' },
  { icon: TrendingUp, title: 'Optimize', text: 'Analyse results and continuously improve performance.' },
]

/* Illustrative chart shapes only. These are not real results. */
const TABS = [
  { id: 'traffic', label: 'Traffic', d: 'M0 128 C40 118 70 124 110 98 S180 82 220 64 S300 48 400 16' },
  { id: 'leads', label: 'Leads', d: 'M0 136 C50 130 90 118 130 110 S200 88 250 78 S330 50 400 34' },
  { id: 'engagement', label: 'Engagement', d: 'M0 108 C40 88 70 116 110 82 S180 94 220 60 S310 72 400 28' },
]
const BASELINE = 'M0 140 C80 136 160 128 240 122 S340 112 400 106'

const FUNNEL = [
  { label: 'Visitors', w: 100 },
  { label: 'Leads', w: 68 },
  { label: 'Qualified', w: 44 },
  { label: 'Customers', w: 26 },
]
const CAMPAIGNS = [
  { label: 'Campaign A', w: 82 },
  { label: 'Campaign B', w: 61 },
  { label: 'Campaign C', w: 74 },
]

const GOALS_L = [
  { icon: Globe, title: 'Brand awareness', text: 'Consistent messaging across search, social and paid channels so the right people recognise your brand.' },
  { icon: MousePointerClick, title: 'Website traffic', text: 'SEO and targeted campaigns that bring relevant visitors to your website.' },
  { icon: UserPlus, title: 'Lead generation', text: 'Funnels and landing experiences built to turn interest into enquiries.' },
]
const GOALS_R = [
  { icon: Heart, title: 'Audience engagement', text: 'Content and community activity that keeps your audience involved.' },
  { icon: Repeat, title: 'Conversion optimization', text: 'Testing and refining journeys so more visitors take the action you want.' },
  { icon: Sprout, title: 'Long-term digital growth', text: 'Ongoing analysis and optimisation that builds results over time.' },
]

/* ---------------------------- hooks ---------------------------- */
/* Fade-in on scroll. Content stays visible if IntersectionObserver is missing. */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const items = root.querySelectorAll('.dm-rv')
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-in'))
      return undefined
    }
    root.classList.add('dm-ready')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    items.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

/* Pause heavy animations while a 3D scene is off screen. */
function useLive(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) { el.classList.add('is-live'); return undefined }
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-live', e.isIntersecting), { rootMargin: '80px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}

/* Smooth mouse parallax via CSS variables. Off for touch and reduced motion. */
function useParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (reduce.matches || !fine.matches) return undefined
    let raf = 0
    const onMove = e => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
        el.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [ref])
}

/* ---------------------------- small pieces ---------------------------- */
function Ring({ pct, size = 64, stroke = 7, children, label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <span className="dm-ring" style={{ width: size, height: size }} aria-hidden="true" data-label={label}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} className="dm-ring-track" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} className="dm-ringp" strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} style={{ '--c': c, '--o': c * (1 - pct) }} transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="dm-ring-in">{children}</span>
    </span>
  )
}

/* ---------------------------- 1. HERO 3D SCENE ---------------------------- */
function HeroStage() {
  const wrap = useRef(null)
  const stage = useRef(null)
  useLive(wrap)
  useParallax(stage)
  const cols = [34, 52, 44, 68, 58, 82, 72]
  return (
    <div className="dm-stagewrap dm-3d" ref={wrap}>
      <div
        className="dm-stage" ref={stage} role="img"
        aria-label="Animated 3D illustration of a floating marketing analytics dashboard with search, social engagement, conversion and campaign performance cards"
      >
        <div className="dm-scene">
          <div className="dm-sway">
            <div className="dm-l dm-ground" />
            <div className="dm-l dm-base" style={{ '--z': '0px' }} />

            <div className="dm-l dm-h-campaign" style={{ '--z': '70px' }}>
              <div className="dm-lf dm-card3d" style={{ '--d': '7s', '--delay': '-2s' }}>
                <p className="dm-mini-label">Campaign performance</p>
                <div className="dm-mini-bars">
                  {[40, 62, 50, 78, 66].map((h, i) => <span key={i} style={{ '--h': `${h}%`, '--i': i }} />)}
                </div>
              </div>
            </div>

            <div className="dm-l dm-h-main" style={{ '--z': '48px' }}>
              <div className="dm-lf dm-card3d dm-main-card" style={{ '--d': '9s' }}>
                <div className="dm-win"><i /><i /><i /><b /></div>
                <div className="dm-kpis"><span /><span /><span /></div>
                <div className="dm-mchart">
                  <div className="dm-cols">{cols.map((h, i) => <span key={i} style={{ '--h': `${h}%`, '--i': i }} />)}</div>
                  <svg viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="dmHeroArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#3b82f6" stopOpacity=".28" />
                        <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="dm-area" d="M0 98 C30 92 50 96 80 74 S130 62 160 48 S230 36 300 12 L300 120 L0 120 Z" fill="url(#dmHeroArea)" />
                    <path className="dm-hline" pathLength="100" d="M0 98 C30 92 50 96 80 74 S130 62 160 48 S230 36 300 12" fill="none" />
                    <path className="dm-hpulse" pathLength="100" d="M0 98 C30 92 50 96 80 74 S130 62 160 48 S230 36 300 12" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="dm-l dm-h-search" style={{ '--z': '104px' }}>
              <div className="dm-lf dm-card3d" style={{ '--d': '6.4s', '--delay': '-1s' }}>
                <div className="dm-searchbar"><Search aria-hidden="true" /><span /></div>
                <div className="dm-result is-top"><i /><span /><TrendingUp aria-hidden="true" /></div>
                <div className="dm-result"><i /><span /></div>
                <div className="dm-result"><i /><span /></div>
              </div>
            </div>

            <div className="dm-l dm-h-social" style={{ '--z': '124px' }}>
              <div className="dm-lf dm-card3d" style={{ '--d': '5.6s', '--delay': '-3s' }}>
                <div className="dm-avatar" />
                <div className="dm-reacts">
                  <span><Heart aria-hidden="true" /></span>
                  <span><MessageCircle aria-hidden="true" /></span>
                  <span><Share2 aria-hidden="true" /></span>
                </div>
              </div>
            </div>

            <div className="dm-l dm-h-conv" style={{ '--z': '136px' }}>
              <div className="dm-lf dm-card3d" style={{ '--d': '6.8s', '--delay': '-4s' }}>
                <Ring pct={0.74} size={54} stroke={7}><TrendingUp aria-hidden="true" /></Ring>
                <p className="dm-mini-label">Conversions</p>
              </div>
            </div>

            <div className="dm-l dm-orb dm-orb-a" style={{ '--z': '150px' }}><span className="dm-lf" style={{ '--d': '5s' }} /></div>
            <div className="dm-l dm-orb dm-orb-b" style={{ '--z': '90px' }}><span className="dm-lf" style={{ '--d': '6s', '--delay': '-2s' }} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- 3. ABOUT: LAYERED 3D STACK ---------------------------- */
function LayerStack() {
  const wrap = useRef(null)
  useLive(wrap)
  return (
    <div className="dm-isowrap dm-3d" ref={wrap}>
      <div className="dm-iso" role="img" aria-label="Animated 3D stack of four layers: audience research, creative campaigns, marketing technology and performance analysis">
        <div className="dm-iso-scene">
          <div className="dm-iso-floor" />
          <div className="dm-iso-beam" />
          {LAYERS.map(({ icon: Icon, label }, i) => (
            <div key={label} className="dm-slab-pos" style={{ '--i': i }}>
              <div className="dm-slab">
                <span className="dm-ico3d"><Icon aria-hidden="true" /></span>
                <b>{label}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- 4. WHY: CONNECTED CHANNELS HUB ---------------------------- */
function ChannelHub() {
  const wrap = useRef(null)
  useLive(wrap)
  return (
    <div className="dm-hubwrap dm-3d" ref={wrap}>
      <div className="dm-hub" role="img" aria-label="Animated 3D diagram of SEO, social, paid ads, content, brand and analytics channels connected to one central strategy">
        <div className="dm-plane">
          <div className="dm-plane-grid" />
          <span className="dm-pulse-ring" />
          <span className="dm-pulse-ring is-2" />
          <svg className="dm-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {CHANNELS.map(c => (
              <line key={c.label} x1="50" y1="50" x2={c.x} y2={c.y} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div className="dm-pin" style={{ left: '50%', top: '50%', '--lift': '58px' }}>
            <div className="dm-lf dm-core" style={{ '--d': '5s' }}><Layers aria-hidden="true" /><em>Your strategy</em></div>
          </div>
          {CHANNELS.map(({ icon: Icon, label, x, y }, i) => (
            <div key={label} className="dm-pin" style={{ left: `${x}%`, top: `${y}%`, '--lift': '34px' }}>
              <div className="dm-lf dm-node" style={{ '--d': `${5 + (i % 3)}s`, '--delay': `${-i * 0.9}s` }}>
                <span className="dm-ico3d"><Icon aria-hidden="true" /></span>
                <em>{label}</em>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- 7. DATA DASHBOARD ---------------------------- */
function DataBoard() {
  const wrap = useRef(null)
  const board = useRef(null)
  const [tab, setTab] = useState('traffic')
  useLive(wrap)
  useParallax(board)
  const cur = TABS.find(t => t.id === tab)
  return (
    <div className="dm-boardwrap dm-3d dm-rv" ref={wrap}>
      <div className="dm-board" ref={board}>
        <div className="dm-board-head">
          <div className="dm-tabs" role="group" aria-label="Choose a sample metric">
            {TABS.map(t => (
              <button key={t.id} type="button" className={`dm-tab${t.id === tab ? ' is-on' : ''}`} aria-pressed={t.id === tab} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <span className="dm-sample">Illustrative sample data</span>
        </div>

        <div className="dm-board-grid">
          <div className="dm-panel dm-panel-chart">
            <p className="dm-panel-title">{cur.label} over time</p>
            <svg key={tab} className="dm-bigchart" viewBox="0 0 400 160" role="img" aria-label={`Sample ${cur.label.toLowerCase()} trend chart`}>
              <defs>
                <linearGradient id="dmArea2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3b82f6" stopOpacity=".26" />
                  <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[40, 80, 120].map(y => <line key={y} x1="0" x2="400" y1={y} y2={y} className="dm-gridline" />)}
              <path d={BASELINE} className="dm-base-line" fill="none" />
              <path d={`${cur.d} L400 160 L0 160 Z`} className="dm-darea" fill="url(#dmArea2)" />
              <path d={cur.d} pathLength="100" className="dm-dline" fill="none" />
              <path d={cur.d} pathLength="100" className="dm-dpulse" fill="none" />
            </svg>
          </div>

          <div className="dm-panel">
            <p className="dm-panel-title">Conversion funnel</p>
            <ul className="dm-funnel">
              {FUNNEL.map((f, i) => (
                <li key={f.label}>
                  <span>{f.label}</span>
                  <i style={{ '--w': `${f.w}%`, '--i': i }} />
                </li>
              ))}
            </ul>
          </div>

          <div className="dm-panel">
            <p className="dm-panel-title">Engagement</p>
            <div className="dm-rings">
              <div><Ring pct={0.78} size={58} stroke={7}><Eye aria-hidden="true" /></Ring><span>Reach</span></div>
              <div><Ring pct={0.55} size={58} stroke={7}><MousePointerClick aria-hidden="true" /></Ring><span>Clicks</span></div>
              <div><Ring pct={0.66} size={58} stroke={7}><Share2 aria-hidden="true" /></Ring><span>Shares</span></div>
            </div>
          </div>

          <div className="dm-panel dm-panel-wide">
            <p className="dm-panel-title">Campaign performance</p>
            <ul className="dm-hbars">
              {CAMPAIGNS.map((c, i) => (
                <li key={c.label}><span>{c.label}</span><i style={{ '--w': `${c.w}%`, '--i': i }} /></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dm-float-chip dm-chip-a" aria-hidden="true"><Ring pct={0.7} size={44} stroke={6}><TrendingUp /></Ring></div>
        <div className="dm-float-chip dm-chip-b" aria-hidden="true"><Search /><span /></div>
      </div>
    </div>
  )
}

/* ---------------------------- 8. GOALS GYROSCOPE ---------------------------- */
function Gyro() {
  const wrap = useRef(null)
  useLive(wrap)
  return (
    <div className="dm-gyrowrap dm-3d" ref={wrap}>
      <div className="dm-gyro" role="img" aria-label="Animated 3D orbit rings around a central goal target">
        <div className="dm-ringset r1"><span /></div>
        <div className="dm-ringset r2"><span /></div>
        <div className="dm-ringset r3"><span /></div>
        <div className="dm-sphere"><Target aria-hidden="true" /></div>
      </div>
    </div>
  )
}

function Cube({ size = 64, className = '' }) {
  return (
    <div className={`dm-cubewrap ${className}`} style={{ '--s': `${size}px` }} aria-hidden="true">
      <div className="dm-cube"><i /><i /><i /><i /><i /><i /></div>
    </div>
  )
}

/* ============================== PAGE ============================== */
export default function DigitalMarketing() {
  const root = useReveal()
  return (
    <div className="dm" ref={root}>
      <Seo
        title="Best Digital Marketing Company in Palakkad"
        description="Choose one of the best digital marketing companies in Palakkad for SEO, social media marketing, and result-focused digital growth services."
      />

      {/* 1. HERO */}
      <section className="dm-hero" aria-labelledby="dm-hero-title">
        <div className="dm-wrap dm-hero-grid">
          <div className="dm-hero-copy">
            <p className="dm-eyebrow dm-eyebrow-pill dm-rv">DIGITAL MARKETING &amp; GROWTH</p>
            <h1 id="dm-hero-title" className="dm-hero-title dm-rv">Turn Your Digital Presence Into Measurable Growth</h1>
            <p className="dm-lead dm-rv">
              CodeZyntax Softwares LLP helps businesses grow online through SEO, paid advertising, content marketing, social media and data-driven strategies, connected to the technology that keeps them running.
            </p>
            <div className="dm-cta-row dm-rv">
              <Link to="/contact" className="dm-btn dm-btn-primary">Get a Proposal <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <a href="#dm-services" className="dm-btn dm-btn-ghost">Explore Our Services <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <ul className="dm-trust dm-rv">
              {['Transparent reporting', 'Data-driven decisions', 'Performance-focused'].map(t => (
                <li key={t}><Check size={16} aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <HeroStage />
        </div>
      </section>

      {/* 2. SERVICES */}
      <section id="dm-services" className="dm-sec" aria-labelledby="dm-svc-title">
        <div className="dm-wrap dm-svc">
          <div className="dm-svc-intro">
            <h2 id="dm-svc-title" className="dm-h2 dm-rv">Everything You Need to Grow Online</h2>
            <p className="dm-body dm-rv">
              From being found on search to turning visitors into customers, one team plans, runs and measures every part of your digital marketing.
            </p>
            <div className="dm-rv"><Link to="/contact" className="dm-link">Discuss your goals <ArrowRight size={16} aria-hidden="true" /></Link></div>
          </div>
          <ul className="dm-svc-list">
            {SERVICES.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="dm-svc-item dm-rv" style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
                <span className="dm-ico3d"><Icon aria-hidden="true" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. APPROACH */}
      <section className="dm-sec dm-tint" aria-labelledby="dm-about-title">
        <div className="dm-wrap dm-split">
          <div className="dm-split-art dm-rv"><LayerStack /></div>
          <div className="dm-split-copy">
            <h2 id="dm-about-title" className="dm-h2 dm-rv">Strategy, Creativity and Technology Working Together</h2>
            <p className="dm-body dm-rv">
              Good marketing starts with knowing who you are talking to. We research your audience and competitors, then shape creative campaigns that speak to them clearly.
            </p>
            <p className="dm-body dm-rv">
              Technology and analysis hold it all together. Tracking, automation and regular performance reviews show what is working, so each campaign supports the growth your business is aiming for.
            </p>
            <div className="dm-rv"><Link to="/contact" className="dm-btn dm-btn-primary">Talk to Our Team <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE */}
      <section className="dm-sec" aria-labelledby="dm-why-title">
        <div className="dm-wrap dm-split dm-split-rev">
          <div className="dm-split-copy">
            <h2 id="dm-why-title" className="dm-h2 dm-rv">A Smarter Approach to Digital Growth</h2>
            <p className="dm-body dm-rv">Why businesses choose CodeZyntax as their digital marketing partner:</p>
            <ul className="dm-why">
              {WHY.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="dm-rv" style={{ transitionDelay: `${i * 50}ms` }}>
                  <span className="dm-why-ico"><Icon size={18} aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="dm-split-art dm-rv"><ChannelHub /></div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="dm-sec dm-tint" aria-labelledby="dm-proc-title">
        <div className="dm-wrap">
          <header className="dm-head">
            <h2 id="dm-proc-title" className="dm-h2 dm-rv">Our Digital Marketing Process</h2>
            <p className="dm-body dm-rv">Four clear stages take a campaign from first conversation to continuous improvement.</p>
          </header>
          <ol className="dm-flow dm-rv">
            {PROCESS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="dm-flow-item" style={{ '--i': i }}>
                <span className="dm-flow-num" aria-hidden="true">{i + 1}</span>
                <div className="dm-flow-body">
                  <span className="dm-flow-ico"><Icon size={20} aria-hidden="true" /></span>
                  <h3><span className="dm-sr">Step {i + 1}: </span>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. DATA */}
      <section className="dm-sec" aria-labelledby="dm-data-title">
        <div className="dm-wrap">
          <header className="dm-head">
            <h2 id="dm-data-title" className="dm-h2 dm-rv">Marketing Decisions Backed by Data</h2>
            <p className="dm-body dm-rv">
              We track what matters, from traffic and leads to engagement and campaign performance, and report it clearly. The dashboard below is an illustration with sample values. Switch the metric to see how a trend view works.
            </p>
          </header>
          <DataBoard />
        </div>
      </section>

      {/* 7. GOALS */}
      <section className="dm-sec dm-tint" aria-labelledby="dm-cap-title">
        <div className="dm-wrap">
          <header className="dm-head">
            <h2 id="dm-cap-title" className="dm-h2 dm-rv">Digital Solutions Designed Around Your Goals</h2>
            <p className="dm-body dm-rv">Whatever you want your marketing to achieve, we shape the mix of channels around it.</p>
          </header>
          <div className="dm-cap">
            <ul className="dm-cap-col is-left">
              {GOALS_L.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="dm-cap-item dm-rv" style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="dm-why-ico"><Icon size={18} aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ul>
            <div className="dm-cap-center dm-rv"><Gyro /></div>
            <ul className="dm-cap-col">
              {GOALS_R.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="dm-cap-item dm-rv" style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="dm-why-ico"><Icon size={18} aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="dm-cta-sec" aria-labelledby="dm-cta-title">
        <div className="dm-wrap">
          <div className="dm-cta-panel dm-rv">
            <div className="dm-cta-inner">
              <Cube size={64} className="dm-cube-a" />
              <Cube size={40} className="dm-cube-b" />
              <span className="dm-cta-orb" aria-hidden="true" />
              <h2 id="dm-cta-title">Ready to Grow Your Digital Presence?</h2>
              <p>Let&rsquo;s create a digital marketing strategy aligned with your business goals.</p>
              <Link to="/contact" className="dm-btn dm-btn-primary">Get a Proposal <ArrowUpRight size={17} aria-hidden="true" /></Link>
              {SITE.email && <p className="dm-cta-mail"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}