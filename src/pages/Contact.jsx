import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import PhoneInput from 'react-phone-input-2'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
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

const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
function createCaptchaCode() {
  const values = new Uint32Array(6)
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values)
    return Array.from(values, value => CAPTCHA_CHARS[value % CAPTCHA_CHARS.length]).join('')
  }
  return Array.from({ length: 6 }, () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]).join('')
}

const POINTS = ['Direct line to our team', 'Clear next steps', 'Your details stay private']

function validate(v, phoneCountry = 'in') {
  const er = {}
  if (!v.name.trim()) er.name = 'Please enter your name.'
  if (!v.email.trim()) er.email = 'Please enter your email address.'
 

  const phoneValue = v.phone.trim()
  if (!phoneValue) {
    er.phone = 'Please enter your phone number.'
  } else {
    try {
      const parsedPhone = parsePhoneNumberFromString(phoneValue)
      const selectedCountry = String(phoneCountry || '').toUpperCase()

      if (
        !parsedPhone ||
        !parsedPhone.isValid() ||
        (selectedCountry && parsedPhone.country && parsedPhone.country !== selectedCountry)
      ) {
        er.phone = 'Enter a valid phone number for the selected country.'
      }
    } catch {
      er.phone = 'Enter a valid phone number for the selected country.'
    }
  }

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

/* ---------------------------- 3D DIRECTIONS SCENE ----------------------------
   Floating map slab with a glowing route, a 3D compass dial, two arrow-shaped
   direction signs, a glass destination pin and soft ripples.
   Uses the "directions scene" rules in Contact.css (.ct-dcomp, .ct-dnavbig,
   .ct-dpin, .ct-dsA / .ct-dsB, .ct-dring ...) plus the shared
   .ct-oscene / .ct-osway / .ct-oplate rules. */
const DIR_ROUTE = 'M8 62 H62 V46 H82 V24'
const DIR_BLOCKS = [
  [6, 6, 14, 9], [24, 6, 16, 9], [44, 6, 14, 9], [62, 6, 14, 9],
  [6, 22, 10, 12], [62, 28, 14, 12], [86, 40, 9, 12],
  [6, 40, 10, 14], [66, 52, 12, 10], [84, 8, 11, 9],
]

/* Live Google Maps embed centred on the office (lat 10.8144624, lng 76.2070185).
   Clicking the mini map opens MAPS_DIRECTIONS_URL in a new tab. */
const OFFICE_EMBED = 'https://www.google.com/maps?q=10.8144624,76.2070185&z=16&hl=en&output=embed'

function DirectionsScene() {
  const wrap = useRef(null)
  const stage = useRef(null)
  useLive(wrap)
  useParallax(stage)
  return (
    <div className="ct-owrap ct-3d" ref={wrap}>
      <div
        className="ct-ostage" ref={stage} role="img"
        aria-label="Animated 3D directions illustration: a floating map with a glowing blue route, a compass, direction signs and a glass location pin marking the CodeZyntax office in Pattambi"
      >
        <div className="ct-glow" aria-hidden="true" />
        <div className="ct-oscene">
          <div className="ct-osway">
            <div className="ct-l ct-oground" />

          
{/* Main 3D map slab with live Google Map */}
<div className="ct-l ct-oplate" style={{ '--z': '0px' }}>

  {/* Actual Google Map directly inside the 3D platform */}
  <div className="ct-omap">
    <iframe
      src={OFFICE_EMBED}
      title="CodeZyntax office location in Pattambi"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>

  {/* Blue route overlay */}
  <svg
    viewBox="0 0 100 70"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <filter id="ctDirGlow">
        <feGaussianBlur stdDeviation="1.2" />
      </filter>

      <linearGradient
        id="ctDirRoute"
        x1="0" y1="1" x2="1" y2="0"
      >
        <stop offset="0" stopColor="#2563eb" />
        <stop offset="1" stopColor="#7c3aed" />
      </linearGradient>
    </defs>

    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d={DIR_ROUTE}
        stroke="#2563eb"
        strokeWidth="5"
        opacity=".45"
        filter="url(#ctDirGlow)"
      />
      <path d={DIR_ROUTE} stroke="#fff" strokeWidth="3.5" />
      <path d={DIR_ROUTE} stroke="url(#ctDirRoute)" strokeWidth="2.2" />
      <path
        d={DIR_ROUTE}
        stroke="#fff"
        strokeWidth=".7"
        strokeDasharray="1.2 2.8"
        className="ct-dash"
      />
    </g>

    <circle cx="8" cy="62" r="2.8" fill="#fff"
      stroke="#2563eb" strokeWidth="1" />
    <circle cx="8" cy="62" r="1" fill="#2563eb" />
  </svg>

  <span className="ct-dring r1" />
  <span className="ct-dring r2" />

</div>


            {/* 3D compass dial */}
            <div className="ct-l ct-dcomp" style={{ '--z': '40px' }} aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#b9cff5" strokeWidth="1.6" />
                <g stroke="#9db8ea" strokeWidth="1.4" strokeLinecap="round">
                  {Array.from({ length: 12 }, (_, i) => {
                    const a = (i * 30 * Math.PI) / 180
                    const r1 = i % 3 === 0 ? 34 : 38
                    return <line key={i} x1={50 + Math.sin(a) * r1} y1={50 - Math.cos(a) * r1} x2={50 + Math.sin(a) * 42} y2={50 - Math.cos(a) * 42} />
                  })}
                </g>
                <g fontSize="9" fontWeight="700" fill="#4f46e5" textAnchor="middle" style={{ fontFamily: 'inherit' }}>
                  <text x="50" y="22">N</text><text x="80" y="53">E</text><text x="50" y="84">S</text><text x="20" y="53">W</text>
                </g>
                <g className="ct-dneedle">
                  <polygon points="50,24 57,50 43,50" fill="#4f46e5" />
                  <polygon points="50,76 57,50 43,50" fill="#c7d2fe" />
                  <circle cx="50" cy="50" r="4" fill="#fff" stroke="#4f46e5" strokeWidth="1.6" />
                </g>
              </svg>
            </div>

            {/* small tilted glass panel with a live map of the office; the whole panel is a link */}
            <div className="ct-l ct-dmap" style={{ '--z': '100px' }}>
              <div className="ct-lf" style={{ '--d': '6.8s', '--delay': '-2s' }}>
                <div className="ct-dmap-panel">
                  <iframe
                    className="ct-dmap-frame"
                    src={OFFICE_EMBED}
                    title="Map showing the CodeZyntax Softwares LLP office in Pattambi"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <span className="ct-dmap-pulse" aria-hidden="true" />
                  <i className="ct-dmap-pin" aria-hidden="true" />
                  <span className="ct-dmap-label" aria-hidden="true"><MapPin />CodeZyntax Office</span>
                  <a
                    className="ct-dmap-link"
                    href={MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open the CodeZyntax Softwares LLP office in Google Maps (opens in a new tab)"
                  />
                </div>
              </div>
            </div>

            {/* floating navigation tile */}
            <div className="ct-l ct-dnavbig" style={{ '--z': '120px' }} aria-hidden="true">
              <span className="ct-lf ct-tile" style={{ '--d': '5.4s' }}><Navigation /></span>
            </div>

            {/* destination pin */}
            <div className="ct-l ct-dpin-shadow" style={{ '--z': '2px' }} aria-hidden="true" />
            <div className="ct-l ct-dpin" style={{ '--z': '70px' }} aria-hidden="true">
              <div className="ct-lf" style={{ '--d': '4.8s' }}><i className="ct-opinbody" /></div>
            </div>

            {/* direction signs */}
            <div className="ct-l ct-dsA" style={{ '--z': '110px' }} aria-hidden="true">
              <div className="ct-dsh">
                <div className="ct-lf ct-ocard ct-dsign ct-dsign-r ct-dsign-glass" style={{ '--d': '6.4s', '--delay': '-1.5s' }}>
                  <span className="ct-oico"><Navigation /></span>
                  <div className="ct-otext"><b>Head to office</b><small>Pattambi, Kerala</small></div>
                </div>
              </div>
            </div>
            <div className="ct-l ct-dsB" style={{ '--z': '96px' }} aria-hidden="true">
              <div className="ct-dsh">
                <div className="ct-lf ct-ocard ct-dsign ct-dsign-l ct-dsign-solid" style={{ '--d': '7.2s', '--delay': '-3s' }}>
                  <span className="ct-oico ct-oico-v"><MapPin /></span>
                  <div className="ct-otext"><b>You&rsquo;ve arrived</b><small>CodeZyntax Softwares</small></div>
                </div>
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
  const [captchaCode, setCaptchaCode] = useState(() => createCaptchaCode())
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaError, setCaptchaError] = useState('')
  const [phoneCountry, setPhoneCountry] = useState('in')
  const hp = useRef(null)

  const set = k => e => { setValues(v => ({ ...v, [k]: e.target.value })); if (errors[k]) setErrors(x => ({ ...x, [k]: undefined })) }

  const submit = async e => {
    e.preventDefault()
    const er = validate(values, phoneCountry)
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

    if (captchaAnswer.trim().toUpperCase() !== captchaCode) {
      setCaptchaError('Incorrect CAPTCHA code. Please try again.')
      setCaptchaAnswer('')
      setCaptchaCode(createCaptchaCode())
      return
    }

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
      setPhoneCountry('in')
      setService([])
      setErrors({})
      setCaptchaAnswer('')
      setCaptchaCode(createCaptchaCode())
      setCaptchaError('')
    } catch (error) {
      console.error('EmailJS enquiry submission failed:', error)
      setProblem('We could not send your enquiry. Please try again or contact us by email.')
      setState('error')
      setCaptchaAnswer('')
      setCaptchaCode(createCaptchaCode())
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
                        onChange={(phone, country) => {
                          const internationalPhone = phone ? `+${phone}` : ''
                          setPhoneCountry(country?.countryCode || 'in')
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

                <div className="ct-captcha-wrap">
                  <label className="ct-captcha-label" htmlFor="ct-captcha-answer">
                    Security verification <b aria-hidden="true">*</b>
                  </label>

                  <div className="ct-captcha-challenge">
                    <div className="ct-captcha-image" aria-label={`CAPTCHA code: ${captchaCode}`}>
                      {captchaCode.split('').map((char, index) => (
                        <span key={`${char}-${index}`} style={{ '--captcha-index': index }}>
                          {char}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="ct-captcha-refresh"
                      onClick={() => {
                        setCaptchaCode(createCaptchaCode())
                        setCaptchaAnswer('')
                        setCaptchaError('')
                      }}
                      aria-label="Generate a new CAPTCHA code"
                      title="Refresh CAPTCHA"
                    >
                      <span aria-hidden="true">↻</span>
                    </button>
                  </div>

                  <input
                    id="ct-captcha-answer"
                    name="captcha"
                    type="text"
                    value={captchaAnswer}
                    onChange={e => {
                      setCaptchaAnswer(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))
                      if (captchaError) setCaptchaError('')
                    }}
                    placeholder="Enter the code shown above"
                    autoComplete="off"
                    maxLength={6}
                    spellCheck="false"
                    aria-invalid={captchaError ? 'true' : undefined}
                    aria-describedby={captchaError ? 'ct-captcha-error' : undefined}
                    className="ct-captcha-input"
                  />

                  {captchaError && (
                    <span id="ct-captcha-error" className="ct-err" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />{captchaError}
                    </span>
                  )}
                </div>

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
            <DirectionsScene />
          </div>
        </div>
      </div>
    </section>
  </div>)
}