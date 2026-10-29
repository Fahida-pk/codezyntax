import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSearchParams } from 'react-router-dom'
import {
  Loader2, Mail, MessageCircle, Phone, MapPin, Clock, Globe, Headphones, ArrowUpRight, ArrowRight,
  CheckCircle2, AlertCircle, Send, ShieldCheck, Check, Code, User, Building2, Wallet, FileText,
  AppWindow, Smartphone, TrendingUp, Monitor, Share2, QrCode, Lightbulb, Navigation,
} from 'lucide-react'
import Seo from '../components/Seo'
import { SITE, SERVICES, REGIONS } from '../data/site'
import './Contact.css'

/* =========================================================================
   Contact page. The 3D hero is built in code (CSS 3D transforms + SVG),
   so there are no image files to copy and nothing can 404.
   Form logic, validation, honeypot, EmailJS call and SITE data are unchanged.
   ========================================================================= */

const MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/dir//CodeZyntax+Softwares+LLP,+Pattambi+-+Cherpulassery+Rd,+Pattambi,+Keralam+679306/@10.9193172,76.2282174,6513m/data=!3m1!1e3!4m8!3m7!1m0!1m5!1m1!1s0x3ba7c5f186c59b11:0x513a9a37e203410a!2m2!1d76.2070185!2d10.8144624'

/* The nine service options, in display order. `key` is only used to match
   ?service= presets against titles/slugs in your SERVICES data. */
const SERVICE_OPTIONS = [
  { slug: 'website-design-development', key: 'websitedesign', title: 'Website Design & Development', icon: Globe },
  { slug: 'custom-software-development', key: 'customsoftware', title: 'Custom Software Development', icon: Code },
  { slug: 'web-application-development', key: 'webapplication', title: 'Web Application Development', icon: AppWindow },
  { slug: 'mobile-application-development', key: 'mobileapplication', title: 'Mobile Application Development', icon: Smartphone },
  { slug: 'digital-marketing-seo', key: 'digitalmarketing', title: 'Digital Marketing & SEO', icon: TrendingUp },
  { slug: 'windows-application-development', key: 'windowsapplication', title: 'Windows Application Development', icon: Monitor },
  { slug: 'social-media-marketing', key: 'socialmedia', title: 'Social Media Marketing', icon: Share2 },
  { slug: 'digital-business-cards', key: 'businesscard', title: 'Digital Business Cards (NFC & QR)', icon: QrCode },
  { slug: 'software-consulting-business-solutions', key: 'consulting', title: 'Software Consulting & Business Solutions', icon: Lightbulb },
]
const norm = t => String(t || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '')
function resolvePreset(preset) {
  if (!preset) return ''
  const entry = (SERVICES || []).find(s => s.title === preset || s.slug === preset)
  const cands = [preset, entry?.title, entry?.slug].filter(Boolean).map(norm)
  const hit = SERVICE_OPTIONS.find(o => cands.some(c => c === norm(o.title) || c === norm(o.slug) || c.includes(o.key)))
  return hit ? hit.title : ''
}

const BUDGETS = [
  'Not decided yet',
  'Small — a focused website or simple tool',
  'Medium — a multi-feature web or mobile application',
  'Large — a complex or multi-platform system',
  'Ongoing support or retainer',
]
const EMPTY = { name: '', email: '', phone: '', companyName: '', budget: '', message: '' }

const POINTS = ['Direct line to our team', 'Clear next steps', 'Your details stay private']

function validate(v) {
  const er = {}
  if (!v.name.trim()) er.name = 'Please enter your name.'
  if (!v.email.trim()) er.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) er.email = 'Enter a valid email address, for example name@company.com.'
  const phoneDigits = v.phone.replace(/\D/g, '')
  if (!phoneDigits) er.phone = 'Please enter your phone number.'
  else if (phoneDigits.length < 7 || phoneDigits.length > 15) er.phone = 'Enter a valid phone number (7–15 digits).'
  if (!v.message.trim()) er.message = 'Please enter your project details.'
  return er
}

/* ---------------------------- hooks ---------------------------- */
/* Pause the 3D animation while the scene is off screen. */
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

/* Gentle mouse parallax through CSS variables. Off for touch and reduced motion. */
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

/* ---------------------------- 3D hero scene ----------------------------
   Floating contact card, 3D envelope, glass message bubbles, a code card
   and connected nodes, all on a soft blue tile with a blue-violet glow. */
function ContactStage() {
  const wrap = useRef(null)
  const stage = useRef(null)
  useLive(wrap)
  useParallax(stage)
  return (
    <div className="ct-stagewrap ct-3d" ref={wrap}>
      <div
        className="ct-stage" ref={stage} role="img"
        aria-label="Animated 3D illustration of an envelope, a contact card and glass message bubbles connected by glowing lines, representing a project enquiry"
      >
        <div className="ct-glow" aria-hidden="true" />
        <div className="ct-scene">
          <div className="ct-sway">
            <div className="ct-l ct-ground" />
            <div className="ct-l ct-plate" style={{ '--z': '0px' }} />

            {/* connected digital elements */}
            <div className="ct-l ct-links" style={{ '--z': '30px' }}>
              <svg viewBox="0 0 100 90" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="ctLink" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#ctLink)" strokeWidth=".7" strokeLinecap="round" strokeDasharray="2 3" className="ct-dash">
                  <path d="M44 46 24 20" /><path d="M54 44 78 20" /><path d="M44 54 20 76" /><path d="M56 56 80 74" />
                </g>
                <g fill="#fff" stroke="#2563eb" strokeWidth=".8">
                  <circle cx="24" cy="20" r="1.6" /><circle cx="78" cy="20" r="1.6" /><circle cx="20" cy="76" r="1.6" /><circle cx="80" cy="74" r="1.6" />
                </g>
              </svg>
            </div>

            <div className="ct-l ct-env" style={{ '--z': '56px' }}>
              <div className="ct-lf ct-envcard" style={{ '--d': '8s' }}>
                <svg viewBox="0 0 240 160" aria-hidden="true">
                  <defs>
                    <linearGradient id="ctEnvBody" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#7db4ff" />
                      <stop offset=".6" stopColor="#2563eb" />
                      <stop offset="1" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="ctEnvFlap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ffffff" stopOpacity=".96" />
                      <stop offset="1" stopColor="#dbeafe" stopOpacity=".92" />
                    </linearGradient>
                    <linearGradient id="ctEnvGloss" x1="0" y1="0" x2=".7" y2="1">
                      <stop offset="0" stopColor="#fff" stopOpacity=".5" />
                      <stop offset=".45" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="232" height="152" rx="22" fill="url(#ctEnvBody)" />
                  <path d="M4 26 120 98 236 26 V20 a16 16 0 0 0 -16 -16 H20 A16 16 0 0 0 4 20 Z" fill="url(#ctEnvFlap)" />
                  <path d="M4 26 120 98 236 26" fill="none" stroke="#2563eb" strokeOpacity=".35" strokeWidth="2" strokeLinejoin="round" />
                  <rect x="30" y="116" width="84" height="8" rx="4" fill="#fff" opacity=".7" />
                  <rect x="30" y="132" width="52" height="8" rx="4" fill="#fff" opacity=".4" />
                  <rect x="4" y="4" width="232" height="152" rx="22" fill="url(#ctEnvGloss)" />
                </svg>
              </div>
            </div>

            {/* floating contact card */}
            <div className="ct-l ct-contact" style={{ '--z': '124px' }}>
              <div className="ct-lf ct-card3d ct-contact-card" style={{ '--d': '6.6s', '--delay': '-1.5s' }}>
                <span className="ct-avatar"><User aria-hidden="true" /></span>
                <div><span /><span className="is-short" /></div>
              </div>
            </div>

            {/* glass message bubbles */}
            <div className="ct-l ct-chat" style={{ '--z': '120px' }}>
              <div className="ct-lf ct-glass ct-bubble-a" style={{ '--d': '6.2s', '--delay': '-1s' }}>
                <MessageCircle aria-hidden="true" />
                <span className="ct-dots"><i /><i /><i /></span>
              </div>
            </div>
            <div className="ct-l ct-done" style={{ '--z': '138px' }}>
              <div className="ct-lf ct-glass ct-bubble-b" style={{ '--d': '6.8s', '--delay': '-2s' }}>
                <span className="ct-done-ico"><Check aria-hidden="true" /></span>
                <div><span /><span className="is-short" /></div>
              </div>
            </div>

            <div className="ct-l ct-code" style={{ '--z': '96px' }}>
              <div className="ct-lf ct-card3d ct-code-card" style={{ '--d': '7.4s', '--delay': '-3s' }}>
                <Code aria-hidden="true" />
                <div><span /><span className="is-short" /></div>
              </div>
            </div>

            <div className="ct-l ct-orb ct-orb-a" style={{ '--z': '150px' }}><span className="ct-lf" style={{ '--d': '5s' }} /></div>
            <div className="ct-l ct-orb ct-orb-b" style={{ '--z': '84px' }}><span className="ct-lf" style={{ '--d': '6s', '--delay': '-2s' }} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- 3D: connected globe (contact info) ---------------------------- */
function GlobeScene() {
  const wrap = useRef(null)
  useLive(wrap)
  return (
    <div className="ct-gwrap ct-3d" ref={wrap}>
      <div className="ct-gstage" role="img" aria-label="Animated 3D globe with orbit rings and floating email, phone and chat icons, showing the ways to reach us">
        <div className="ct-gscene">
          <div className="ct-gplate" />
          <div className="ct-gglobe">
            <div className="ct-gring g1"><span /></div>
            <div className="ct-gring g2"><span /></div>
            <div className="ct-gring g3"><span /></div>
            <div className="ct-gsphere ct-lf" style={{ '--d': '6s' }}><Globe aria-hidden="true" /></div>
          </div>
          <div className="ct-gtile ct-gt-a"><span className="ct-lf ct-tile" style={{ '--d': '5.2s' }}><Mail aria-hidden="true" /></span></div>
          <div className="ct-gtile ct-gt-b"><span className="ct-lf ct-tile" style={{ '--d': '6.4s', '--delay': '-2s' }}><Phone aria-hidden="true" /></span></div>
          <div className="ct-gtile ct-gt-c"><span className="ct-lf ct-tile" style={{ '--d': '5.8s', '--delay': '-4s' }}><MessageCircle aria-hidden="true" /></span></div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- 3D map directions scene ---------------------------- */
/* City blocks: buildings are generated between the road grid so they never sit on a road. */
const MAP_X = [0, 12, 30, 50, 70, 88, 100]
const MAP_Y = [0, 10, 24, 37, 52, 63, 70]
const MAP_BUILDINGS = (() => {
  const out = []
  for (let i = 0; i < MAP_X.length - 1; i++) {
    for (let j = 0; j < MAP_Y.length - 1; j++) {
      if (i === 5) continue              // river
      if (i === 1 && j === 4) continue   // park
      const x0 = MAP_X[i] + 2.6, x1 = MAP_X[i + 1] - 2.6
      const y0 = MAP_Y[j] + 2.6, y1 = MAP_Y[j + 1] - 2.6
      const w = x1 - x0, h = y1 - y0
      if (w < 3.5 || h < 3.5) continue
      const split = w > 11
      const pw = split ? (w - 1.2) / 2 : w
      for (let k = 0; k < (split ? 2 : 1); k++) {
        const shrink = ((i + j + k) % 3) * 0.9
        out.push({
          x: x0 + k * (pw + 1.2), y: y0 + shrink, w: pw,
          h: h - shrink - ((i * j + k) % 2) * 0.8, tint: (i + j + k) % 4 === 0,
        })
      }
    }
  }
  return out
})()
const MAP_MINOR_H = [10, 24, 52, 63]
const MAP_MINOR_V = [12, 30, 50, 70, 88]
const ROUTE_A = 'M8 63 H30 V52 H50 V37'
const ROUTE_B = 'M92 10 H70 V24 H50 V37'
const ARROWS_A = [[20, 63, 0], [30, 57.5, -90], [40, 52, 0], [50, 44, -90]]
const ARROWS_B = [[81, 10, 180], [70, 17, 90], [60, 24, 180], [50, 30, 90]]
const roadsH = MAP_MINOR_H.map(y => `M0 ${y} H100`).join(' ')
const roadsV = MAP_MINOR_V.map(x => `M${x} 0 V70`).join(' ')

function OfficeScene() {
  const wrap = useRef(null)
  const stage = useRef(null)
  useLive(wrap)
  useParallax(stage)
  return (
    <div className="ct-owrap ct-3d" ref={wrap}>
      <div
        className="ct-ostage" ref={stage} role="img"
        aria-label="Animated 3D map of Pattambi with roads, buildings, a blue navigation route with direction arrows, start markers and a glowing location pin for the CodeZyntax office"
      >
        <div className="ct-glow" aria-hidden="true" />
        <div className="ct-oscene">
          <div className="ct-osway">
            <div className="ct-l ct-oground" />

            {/* floating map slab */}
            <div className="ct-l ct-oplate" style={{ '--z': '0px' }}>
              {/* layer 1: the street map (water, park, 3D buildings, roads, labels) */}
              <div className="ct-omap" aria-hidden="true">
                <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <path id="ctOmRoad" d="M0 37 H100" />
                  </defs>
                  <rect width="100" height="70" fill="#f3f6fc" />

                  {/* river + park */}
                  <path d="M96 0 C91 18 100 40 93 70 H100 V0 Z" fill="#cfe0fb" />
                  <path d="M96 0 C91 18 100 40 93 70" fill="none" stroke="#b9d0f6" strokeWidth=".6" />
                  <rect x="13.6" y="53.6" width="15" height="8" rx="1.6" fill="#e4e9fb" stroke="#d3dbf5" strokeWidth=".4" />
                  <g fill="#c7d2f5">
                    <circle cx="16.5" cy="56.5" r="1.1" /><circle cx="20" cy="58.8" r="1.1" /><circle cx="24" cy="56" r="1.1" />
                    <circle cx="26.5" cy="59.2" r="1.1" /><circle cx="18" cy="60" r=".9" />
                  </g>

                  {/* buildings: soft ground shadow, side wall, then roof */}
                  <g>
                    {MAP_BUILDINGS.map((b, n) => (
                      <g key={n}>
                        <rect x={b.x + 1.5} y={b.y + 1.5} width={b.w} height={b.h} rx=".9" fill="#6b7bb8" opacity=".14" />
                        <rect x={b.x + .8} y={b.y + .8} width={b.w} height={b.h} rx=".9" fill={b.tint ? '#cfc6ee' : '#c3cfe6'} />
                        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx=".9" fill={b.tint ? '#efeafc' : '#f1f4fb'} stroke="#fff" strokeWidth=".3" />
                      </g>
                    ))}
                  </g>

                  {/* roads: wide casings first, then fills, so junctions merge */}
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d={`${roadsH} ${roadsV}`} stroke="#c6d3e8" strokeWidth="2.1" />
                    <path d="M0 37 H100" stroke="#bccae2" strokeWidth="4" />
                    <path d={`${roadsH} ${roadsV}`} stroke="#fdfeff" strokeWidth="1.4" />
                    <path d="M0 37 H100" stroke="#fdfeff" strokeWidth="3.2" />
                    <path d="M0 37 H100" stroke="#dbe5f5" strokeWidth=".35" strokeDasharray="1.6 1.6" />
                  </g>
                  {/* roundabouts */}
                  <g fill="#fdfeff" stroke="#bccae2" strokeWidth=".6">
                    <circle cx="30" cy="37" r="3" /><circle cx="70" cy="37" r="3" />
                  </g>
                  <g fill="#f3f6fc" stroke="#cbd6e8" strokeWidth=".4">
                    <circle cx="30" cy="37" r="1.2" /><circle cx="70" cy="37" r="1.2" />
                  </g>

                  {/* places of interest */}
                  <g stroke="#fff" strokeWidth=".6">
                    <circle cx="22" cy="17" r="1.6" fill="#2563eb" /><circle cx="79" cy="17" r="1.6" fill="#2563eb" />
                    <circle cx="60" cy="57.5" r="1.6" fill="#7c3aed" /><circle cx="40" cy="44.5" r="1.6" fill="#7c3aed" />
                  </g>

                  {/* labels */}
                  <text fontSize="2.1" fontWeight="600" fill="#5b6b86" dy=".72" style={{ fontFamily: 'inherit' }}>
                    <textPath href="#ctOmRoad" startOffset="58%">Pattambi - Cherpulassery Rd</textPath>
                  </text>
                  <text x="34" y="20" fontSize="2.8" fontWeight="700" letterSpacing=".7" fill="#9aa9c6" stroke="#f3f6fc" strokeWidth=".8" paintOrder="stroke" style={{ fontFamily: 'inherit' }}>PATTAMBI</text>
                  <rect x="57" y="27.2" width="27" height="4.6" rx="2.3" fill="#fff" stroke="#cbd6f0" strokeWidth=".35" />
                  <text x="59" y="30.4" fontSize="2.2" fontWeight="700" fill="#1d4ed8" style={{ fontFamily: 'inherit' }}>CodeZyntax Softwares LLP</text>

                  {/* compass */}
                  <g>
                    <circle cx="7" cy="7" r="3.2" fill="#fff" stroke="#cbd6f0" strokeWidth=".4" />
                    <polygon points="7,3.6 8.3,7 7,6.4 5.7,7" fill="#4f46e5" />
                    <text x="7" y="9.6" textAnchor="middle" fontSize="2" fontWeight="700" fill="#4f46e5" style={{ fontFamily: 'inherit' }}>N</text>
                  </g>
                </svg>
              </div>

              {/* layer 2: navigation routes, arrows and markers */}
              <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <filter id="ctOmGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".9" /></filter>
                  <linearGradient id="ctOmRoute" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {/* alternate route (violet) */}
                  <path d={ROUTE_B} stroke="#fff" strokeWidth="2.6" opacity=".95" />
                  <path d={ROUTE_B} stroke="#8b5cf6" strokeWidth="1.3" opacity=".9" />
                  {/* main route (blue) with glow */}
                  <path d={ROUTE_A} stroke="#4f46e5" strokeWidth="4.6" opacity=".35" filter="url(#ctOmGlow)" />
                  <path d={ROUTE_A} stroke="#fff" strokeWidth="3.4" />
                  <path d={ROUTE_A} stroke="url(#ctOmRoute)" strokeWidth="2" />
                  {/* flowing direction dots */}
                  <path d={ROUTE_A} stroke="#fff" strokeWidth=".7" strokeDasharray="1.2 2.8" className="ct-dash" />
                  <path d={ROUTE_B} stroke="#fff" strokeWidth=".6" strokeDasharray="1.2 2.8" className="ct-dash" />
                </g>

                {/* direction chevrons */}
                <g fill="#fff" stroke="#2563eb" strokeWidth=".35" strokeLinejoin="round">
                  {ARROWS_A.map(([x, y, r]) => <polygon key={`a${x}${y}`} points="-1.5,-1.3 1.6,0 -1.5,1.3 -.6,0" transform={`translate(${x} ${y}) rotate(${r})`} />)}
                </g>
                <g fill="#fff" stroke="#7c3aed" strokeWidth=".35" strokeLinejoin="round">
                  {ARROWS_B.map(([x, y, r]) => <polygon key={`b${x}${y}`} points="-1.5,-1.3 1.6,0 -1.5,1.3 -.6,0" transform={`translate(${x} ${y}) rotate(${r})`} />)}
                </g>

                {/* start markers */}
                <g>
                  <circle cx="8" cy="63" r="2.8" fill="#fff" stroke="#2563eb" strokeWidth="1" />
                  <circle cx="8" cy="63" r="1" fill="#2563eb" />
                  <rect x="3" y="55.8" width="10" height="4.2" rx="2.1" fill="#fff" stroke="#cbd6f0" strokeWidth=".3" />
                  <text x="8" y="58.8" textAnchor="middle" fontSize="2.1" fontWeight="700" fill="#1d4ed8" style={{ fontFamily: 'inherit' }}>Start</text>
                  <circle cx="92" cy="10" r="2.8" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
                  <circle cx="92" cy="10" r="1" fill="#7c3aed" />
                </g>
              </svg>
              <span className="ct-oring r1" /><span className="ct-oring r2" /><span className="ct-oring r3" />
            </div>

            <div className="ct-l ct-opin-shadow" style={{ '--z': '2px' }} aria-hidden="true" />

            {/* glass destination pin (tip lands on the end of the route) */}
            <div className="ct-l ct-opin" style={{ '--z': '70px' }} aria-hidden="true">
              <div className="ct-lf" style={{ '--d': '4.8s' }}><i className="ct-opinbody" /></div>
            </div>

            {/* floating glass cards */}
            <div className="ct-l ct-onav" style={{ '--z': '110px' }} aria-hidden="true">
              <div className="ct-lf ct-glass ct-ocard" style={{ '--d': '6.4s', '--delay': '-1.5s' }}>
                <span className="ct-oico"><Navigation /></span>
                <div className="ct-otext"><b>Directions</b><small>Pattambi, Kerala</small></div>
              </div>
            </div>
            <div className="ct-l ct-ohours" style={{ '--z': '96px' }} aria-hidden="true">
              <div className="ct-lf ct-card3d ct-ocard" style={{ '--d': '7.2s', '--delay': '-3s' }}>
                <span className="ct-oico ct-oico-v"><Clock /></span>
                <div><span /><span className="is-short" /></div>
              </div>
            </div>

            <div className="ct-l ct-orb ct-orb-o1" style={{ '--z': '130px' }} aria-hidden="true"><span className="ct-lf" style={{ '--d': '5.4s' }} /></div>
            <div className="ct-l ct-orb ct-orb-o2" style={{ '--z': '60px' }} aria-hidden="true"><span className="ct-lf" style={{ '--d': '6.2s', '--delay': '-2s' }} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- small pieces ---------------------------- */
const Info = ({ icon: Icon, label, children, href, external }) => {
  const body = (<>
    <span className="ct-ico"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
    <span className="ct-info-text"><span className="ct-info-label">{label}</span><span className="ct-info-value">{children}</span></span>
    {href && <ArrowUpRight className="ct-info-go" size={18} aria-hidden="true" />}
  </>)
  return href
    ? <a className="ct-info ct-info-link" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a>
    : <div className="ct-info">{body}</div>
}

/* ============================== PAGE ============================== */
export default function Contact() {
  const [params] = useSearchParams()
  const presetTitle = resolvePreset(params.get('service') || '')
  const [values, setValues] = useState(EMPTY)
  const [service, setService] = useState(presetTitle ? [presetTitle] : [])
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | loading | success | error
  const [problem, setProblem] = useState('')
  const hp = useRef(null)

  const set = k => e => { setValues(v => ({ ...v, [k]: e.target.value })); if (errors[k]) setErrors(x => ({ ...x, [k]: undefined })) }

  const submit = async e => {
    e.preventDefault()
    const er = validate(values)
    if (service.length === 0) er.service = 'Please select at least one service.'
    setErrors(er)
    const first = Object.keys(er)[0]
    if (first) {
      setState('idle')
      const target = first === 'service' ? document.querySelector('.ct-service-option input') : document.getElementById(`ct-${first}`)
      target?.focus()
      return
    }
    if (hp.current?.value) return // honeypot filled: silently ignore bots
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setProblem('Email service is not configured. Please check the EmailJS environment variables.')
      setState('error')
      return
    }

    setState('loading')
    setProblem('')

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          // Provide both common variable names so existing EmailJS templates work.
          name: values.name.trim(),
          from_name: values.name.trim(),
          email: values.email.trim(),
          from_email: values.email.trim(),
          phone: values.phone.trim(),
          company_name: values.companyName.trim(),
          service: service.join(', ') || 'Not specified',
          budget: values.budget || 'Not specified',
          message: values.message.trim(),
          brief: params.get('brief') || '',
          reply_to: values.email.trim() || '',
        },
        { publicKey }
      )

      setState('success')
      setValues(EMPTY)
      setService([])
      setErrors({})
    } catch (error) {
      console.error('EmailJS enquiry submission failed:', error)
      setProblem('We could not send your enquiry. Please try again or contact us by email.')
      setState('error')
    }
  }

  const fieldProps = (k, extra = {}) => ({
    id: `ct-${k}`, name: k, value: values[k], onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `ct-${k}-err` : undefined, ...extra,
  })
  const Err = ({ k }) => errors[k] ? <span id={`ct-${k}-err`} role="alert" className="ct-err"><AlertCircle size={14} aria-hidden="true" />{errors[k]}</span> : null
  const hasDirect = SITE.email || SITE.whatsapp || SITE.phone

  return (<div className="ct">
    <Seo title="Contact Us" description="Send a project enquiry to CodeZyntax Softwares LLP for custom software, websites, web and mobile applications and digital marketing." />

    {/* ================= HERO ================= */}
    <section className="ct-hero" aria-labelledby="ct-hero-title">
      <div className="ct-hero-bg" aria-hidden="true" />
      <div className="ct-wrap ct-hero-grid">
        <div className="ct-hero-copy">
          <span className="ct-pill ct-rise" style={{ '--i': 0 }}><i />Contact us</span>
          <h1 id="ct-hero-title" className="ct-h1 ct-grad-text ct-rise" style={{ '--i': 1 }}>Let&rsquo;s Build Something Great Together</h1>
          <p className="ct-lead ct-rise" style={{ '--i': 2 }}>Have an idea in mind? Tell us about your project, and our team will help you transform it into a scalable, high-quality digital solution.</p>
          <div className="ct-actions ct-rise ct-desktop-actions" style={{ '--i': 3 }}>
            <a href="#enquiry" className="ct-btn ct-btn-primary">Send an enquiry <ArrowRight size={18} aria-hidden="true" /></a>
            {SITE.whatsapp && <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn-ghost"><MessageCircle size={18} aria-hidden="true" />Chat on WhatsApp</a>}
          </div>
          <ul className="ct-points ct-rise" style={{ '--i': 4 }}>
            {POINTS.map(p => <li key={p}><Check size={16} aria-hidden="true" />{p}</li>)}
          </ul>
        </div>
        <div className="ct-rise ct-rise-art" style={{ '--i': 2 }}><ContactStage /></div>

        {/* Mobile-only enquiry buttons: displayed below the 3D envelope illustration. */}
        <div className="ct-actions ct-rise ct-mobile-actions" style={{ '--i': 3 }}>
          <a href="#enquiry" className="ct-btn ct-btn-primary">Send an enquiry <ArrowRight size={18} aria-hidden="true" /></a>
          {SITE.whatsapp && <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn-ghost"><MessageCircle size={18} aria-hidden="true" />Chat on WhatsApp</a>}
        </div>
      </div>
    </section>

    {/* ================= INFO + FORM ================= */}
    <section className="ct-main">
      <div className="ct-wrap ct-grid">
        <aside className="ct-side" aria-label="Contact information">
          <div data-reveal className="ct-side-head">
            <h2>Contact information</h2>
            <p>{hasDirect ? 'Reach us directly, or use the enquiry form.' : 'Use the enquiry form and we will get back to you.'}</p>
          </div>
          <div data-reveal className="ct-side-art"><GlobeScene /></div>
          <div className="ct-infos" data-reveal>
            {SITE.email && <Info icon={Mail} label="Email" href={`mailto:${SITE.email}`}>{SITE.email}</Info>}
            {SITE.phone && <Info icon={Phone} label="Phone" href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone}</Info>}
            {SITE.whatsapp && <Info icon={MessageCircle} label="WhatsApp" href={`https://wa.me/${SITE.whatsapp}`} external>Message us on WhatsApp</Info>}
            {SITE.address && <Info icon={MapPin} label="Office address" href={SITE.mapUrl || MAPS_DIRECTIONS_URL} external>{SITE.address}</Info>}
            {SITE.hours && <Info icon={Clock} label="Business hours">{SITE.hours}</Info>}
            <Info icon={Globe} label="Regions we serve">{REGIONS.join(' · ')}</Info>
            <Info icon={Headphones} label="Support">24/7 support, including after launch</Info>
          </div>
        </aside>

        <div className="ct-formcol" id="enquiry">
          <div className="ct-card" data-reveal>
            {state === 'success' ? (
              <div className="ct-success" role="status" aria-live="polite">
                <span className="ct-success-ico"><CheckCircle2 size={34} aria-hidden="true" /></span>
                <h2>Thank you. Your enquiry has been sent.</h2>
                <p>We have received your project details and will respond to the email address you provided.</p>
                <button type="button" className="ct-btn ct-btn-ghost" onClick={() => setState('idle')}>Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-labelledby="ct-form-title">
                <div className="ct-form-head">
                  <h2 id="ct-form-title">Build Your Project Brief</h2>
                  <p className="ct-form-sub">Share your vision, goals, and requirements. We&rsquo;ll help you choose the right technology and create a solution that moves your business forward.</p>
                  <p className="ct-form-note">Fields marked with <b aria-hidden="true">*</b> are required. Company name and project budget are optional.</p>
                </div>

                {/* hidden spam trap: real visitors never see or fill this */}
                <div className="ct-trap" aria-hidden="true"><label>Website<input ref={hp} name="website" tabIndex="-1" autoComplete="off" /></label></div>

                <div className="ct-row">
                  <div className="ct-field"><label htmlFor="ct-name">Full name <b aria-hidden="true">*</b></label>
                    <div className="ct-ic"><User className="ct-ic-i" size={18} aria-hidden="true" />
                      <input {...fieldProps('name', { type: 'text', autoComplete: 'name', placeholder: 'Your full name', required: true })} /></div><Err k="name" /></div>
                  <div className="ct-field"><label htmlFor="ct-email">Business email <b aria-hidden="true">*</b></label>
                    <div className="ct-ic"><Mail className="ct-ic-i" size={18} aria-hidden="true" />
                      <input {...fieldProps('email', { type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'name@company.com', required: true })} /></div><Err k="email" /></div>
                </div>
                <div className="ct-row">
                  <div className="ct-field"><label htmlFor="ct-phone">Phone number <b aria-hidden="true">*</b></label>
                    <div className="ct-phone-group ct-phone-searchable">
                      <PhoneInput
                        country="in"
                        value={values.phone.replace(/^\+/, '')}
                        onChange={(phone) => {
                          const internationalPhone = phone ? `+${phone}` : ''
                          setValues(v => ({ ...v, phone: internationalPhone }))
                          if (errors.phone) setErrors(x => ({ ...x, phone: undefined }))
                        }}
                        enableSearch
                        searchPlaceholder="Search country"
                        searchNotFound="No country found"
                        preferredCountries={['in', 'ae', 'sa', 'qa', 'om', 'kw', 'bh', 'gb', 'us']}
                        countryCodeEditable={false}
                        enableLongNumbers
                        inputProps={{
                          id: 'ct-phone',
                          name: 'phone',
                          required: true,
                          autoComplete: 'tel',
                          'aria-label': 'Phone number with country code',
                          'aria-invalid': errors.phone ? 'true' : undefined,
                          'aria-describedby': errors.phone ? 'ct-phone-err' : undefined,
                        }}
                        containerClass="ct-phone-widget"
                        inputClass="ct-phone-widget-input"
                        buttonClass="ct-phone-widget-button"
                        dropdownClass="ct-phone-widget-dropdown"
                      />
                    </div>
                    <Err k="phone" /></div>
                  <div className="ct-field"><label htmlFor="ct-companyName">Company name <span className="ct-opt">optional</span></label>
                    <div className="ct-ic"><Building2 className="ct-ic-i" size={18} aria-hidden="true" />
                      <input {...fieldProps('companyName', { type: 'text', autoComplete: 'organization', placeholder: 'Your company' })} /></div></div>
                </div>

                <fieldset className="ct-field ct-services" aria-describedby={errors.service ? 'ct-service-err' : undefined}>
                  <legend>Service required <b aria-hidden="true">*</b> <span className="ct-opt">select one or more</span></legend>
                  <div className="ct-service-options">
                    {SERVICE_OPTIONS.map(s => {
                      const checked = service.includes(s.title)
                      const Icon = s.icon
                      return (
                        <label key={s.slug} className={`ct-service-option ${checked ? 'on' : ''}`}>
                          <input
                            type="checkbox"
                            name="service"
                            value={s.title}
                            checked={checked}
                            onChange={() => {
                              setService(current =>
                                checked
                                  ? current.filter(item => item !== s.title)
                                  : [...current, s.title]
                              )
                              if (errors.service) setErrors(current => ({ ...current, service: undefined }))
                            }}
                          />
                          <span className="ct-service-ico" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
                          <span className="ct-service-label">{s.title}</span>
                          <span className="ct-service-check" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
                        </label>
                      )
                    })}
                  </div>
                  {errors.service && <span id="ct-service-err" role="alert" className="ct-err"><AlertCircle size={14} aria-hidden="true" />{errors.service}</span>}
                </fieldset>

                <div className="ct-field"><label htmlFor="ct-budget">Project budget <span className="ct-opt">optional</span></label>
                  <div className="ct-ic"><Wallet className="ct-ic-i" size={18} aria-hidden="true" />
                    <select {...fieldProps('budget')}><option value="">Select a budget range</option>{BUDGETS.map(b => <option key={b}>{b}</option>)}</select></div></div>

                <div className="ct-field"><label htmlFor="ct-message">Project details <b aria-hidden="true">*</b></label>
                  <div className="ct-ic ct-ic-area"><FileText className="ct-ic-i" size={18} aria-hidden="true" />
                    <textarea {...fieldProps('message', { rows: 6, placeholder: 'What would you like to build? Mention goals, key features, timeline and any existing systems.', required: true })} /></div><Err k="message" /></div>

                <div className="ct-submit">
                  <button className="ct-btn ct-btn-primary" disabled={state === 'loading'}>
                    {state === 'loading' ? <><Loader2 className="ct-spin" size={18} aria-hidden="true" />Sending…</> : <>Send enquiry <Send size={17} aria-hidden="true" /></>}
                  </button>
                  <p className="ct-privacy"><ShieldCheck size={16} aria-hidden="true" />Your details are used only to respond to your enquiry.</p>
                </div>

                <div aria-live="assertive">
                  {Object.values(errors).some(Boolean) && <p className="ct-alert" role="alert"><AlertCircle size={18} aria-hidden="true" />Please correct the highlighted fields and try again.</p>}
                  {state === 'error' && (
                    <p className="ct-alert" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{problem || 'We could not send your enquiry.'} Please try again later{SITE.email ? <> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a></> : ''}{SITE.whatsapp ? <>{' or '}<a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a></> : ''}.</span></p>)}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* ================= CTA CARD + 3D MAP DIRECTIONS ================= */}
    <section className="ct-map" aria-labelledby="ct-map-title">
      <div className="ct-wrap">
        <div className="ct-map-card" data-reveal>
          <div className="ct-map-top">
            <div className="ct-map-head">
              <h2 id="ct-map-title">Ready to Discuss Your Project?</h2>
              <p>Find our office in Pattambi, Kerala, and let&rsquo;s turn your ideas into reality.</p>
              <div className="ct-map-actions">
                <a className="ct-btn ct-btn-primary" href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  <Navigation size={18} aria-hidden="true" />Get Directions<ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <OfficeScene />
          </div>
        </div>
      </div>
    </section>
  </div>)
}