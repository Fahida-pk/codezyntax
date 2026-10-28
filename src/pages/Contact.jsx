import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Loader2, Mail, MessageCircle, Phone, MapPin, Clock, Globe, Headphones, ArrowUpRight, ArrowRight,
  CheckCircle2, AlertCircle, Send, ShieldCheck, Check, Code,
} from 'lucide-react'
import Seo from '../components/Seo'
import { SITE, SERVICES, REGIONS } from '../data/site'
import './Contact.css'

/* =========================================================================
   Contact page. The 3D hero is built in code (CSS 3D transforms + SVG),
   so there are no image files to copy and nothing can 404.
   Form logic, validation, honeypot and SITE data usage are unchanged.
   ========================================================================= */

// Services shown first in the selector (the rest of SERVICES follow, so nothing from the data is lost).
const FEATURED = ['website-design-development', 'custom-software-development', 'web-application-development', 'mobile-application-development', 'digital-marketing-seo']
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
  if (!v.name.trim()) er.name = 'Please enter your full name.'
  if (!v.email.trim()) er.email = 'Please enter your business email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) er.email = 'Enter a valid email address, for example name@company.com.'
  if (v.phone.trim() && !/^\+?[\d\s().-]{7,20}$/.test(v.phone.trim())) er.phone = 'Enter a valid phone number. Include the country code, for example +91.'
  if (v.message.trim().length < 10) er.message = 'Please describe your project (at least 10 characters).'
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

/* ---------------------------- 3D hero scene ---------------------------- */
function ContactStage() {
  const wrap = useRef(null)
  const stage = useRef(null)
  useLive(wrap)
  useParallax(stage)
  return (
    <div className="ct-stagewrap ct-3d" ref={wrap}>
      <div
        className="ct-stage" ref={stage} role="img"
        aria-label="Animated 3D illustration of an envelope with floating chat, code and confirmation cards, representing a project enquiry"
      >
        <div className="ct-scene">
          <div className="ct-sway">
            <div className="ct-l ct-ground" />
            <div className="ct-l ct-plate" style={{ '--z': '0px' }} />

            <div className="ct-l ct-env" style={{ '--z': '56px' }}>
              <div className="ct-lf ct-envcard" style={{ '--d': '8s' }}>
                <svg viewBox="0 0 240 160" aria-hidden="true">
                  <defs>
                    <linearGradient id="ctEnvBody" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#7db4ff" />
                      <stop offset="1" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="ctEnvFlap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
                      <stop offset="1" stopColor="#dbeafe" stopOpacity=".9" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="232" height="152" rx="22" fill="url(#ctEnvBody)" />
                  <path d="M4 26 120 98 236 26 V20 a16 16 0 0 0 -16 -16 H20 A16 16 0 0 0 4 20 Z" fill="url(#ctEnvFlap)" />
                  <path d="M4 26 120 98 236 26" fill="none" stroke="#2563eb" strokeOpacity=".35" strokeWidth="2" strokeLinejoin="round" />
                  <rect x="30" y="116" width="84" height="8" rx="4" fill="#fff" opacity=".7" />
                  <rect x="30" y="132" width="52" height="8" rx="4" fill="#fff" opacity=".4" />
                </svg>
              </div>
            </div>

            <div className="ct-l ct-chat" style={{ '--z': '120px' }}>
              <div className="ct-lf ct-card3d" style={{ '--d': '6.2s', '--delay': '-1s' }}>
                <div className="ct-chat-head"><MessageCircle aria-hidden="true" /><span /></div>
                <div className="ct-bubble"><i /><i /><i /></div>
                <div className="ct-line" /><div className="ct-line is-short" />
              </div>
            </div>

            <div className="ct-l ct-code" style={{ '--z': '96px' }}>
              <div className="ct-lf ct-card3d ct-code-card" style={{ '--d': '7.4s', '--delay': '-3s' }}>
                <Code aria-hidden="true" />
                <div><span /><span className="is-short" /></div>
              </div>
            </div>

            <div className="ct-l ct-done" style={{ '--z': '138px' }}>
              <div className="ct-lf ct-card3d ct-done-card" style={{ '--d': '6.8s', '--delay': '-2s' }}>
                <span className="ct-done-ico"><Check aria-hidden="true" /></span>
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

/* ---------------------------- 3D: location pin (map section) ---------------------------- */
function PinScene() {
  const wrap = useRef(null)
  useLive(wrap)
  return (
    <div className="ct-pwrap ct-3d" ref={wrap}>
      <div className="ct-pstage" role="img" aria-label="Animated 3D map pin standing on a glowing map tile">
        <div className="ct-pscene">
          <div className="ct-ptile" />
          <span className="ct-pripple" />
          <span className="ct-pripple is-2" />
          <div className="ct-ppin">
            <div className="ct-lf ct-pinbody" style={{ '--d': '4.8s' }}><i /></div>
          </div>
          <span className="ct-pshadow" />
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- 3D: tumbling cube (CTA) ---------------------------- */
function Cube({ size = 64, className = '' }) {
  return (
    <div className={`ct-cubewrap ${className}`} style={{ '--s': `${size}px` }} aria-hidden="true">
      <div className="ct-cube"><i /><i /><i /><i /><i /><i /></div>
    </div>
  )
}

/* ---------------------------- 3D: glossy tile + ring (CTA) ---------------------------- */
function FloatTile({ icon: Icon, className = '' }) {
  return (
    <span className={`ct-ftile ${className}`} aria-hidden="true">
      <span className="ct-lf ct-tile is-thick" style={{ '--d': '6s' }}><Icon /></span>
    </span>
  )
}
function Ring3D({ size = 72, className = '' }) {
  return (
    <span className={`ct-ringwrap ${className}`} style={{ '--s': `${size}px` }} aria-hidden="true"><span className="ct-ring3d" /></span>
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
  const services = useMemo(() => [...SERVICES].sort((a, b) => (FEATURED.indexOf(a.slug) + 1 || 99) - (FEATURED.indexOf(b.slug) + 1 || 99)), [])
  const preset = params.get('service') || ''
  const presetTitle = (services.find(s => s.title === preset || s.slug === preset) || {}).title || ''
  const [values, setValues] = useState(EMPTY)
  const [service, setService] = useState(presetTitle)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | loading | success | error
  const [problem, setProblem] = useState('')
  const hp = useRef(null)

  const set = k => e => { setValues(v => ({ ...v, [k]: e.target.value })); if (errors[k]) setErrors(x => ({ ...x, [k]: undefined })) }

  const submit = async e => {
    e.preventDefault()
    const er = validate(values)
    setErrors(er)
    const first = Object.keys(er)[0]
    if (first) { setState('idle'); document.getElementById(`ct-${first}`)?.focus(); return }
    if (hp.current?.value) return // honeypot filled: silently ignore bots

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setProblem('The enquiry form is not configured yet. Please try again later.')
      setState('error')
      return
    }

    setState('loading')
    setProblem('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'New Enquiry - CodeZyntax Website',
          from_name: 'CodeZyntax Website Contact Form',
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          company_name: values.companyName.trim(),
          service,
          budget: values.budget,
          message: values.message.trim(),
          brief: params.get('brief') || '',
        }),
      })

      const result = await response.json()
      if (response.ok && result.success) {
        setState('success')
        setValues(EMPTY)
        setService('')
        setErrors({})
      } else {
        setProblem(result.message || 'The enquiry could not be sent. Please try again.')
        setState('error')
      }
    } catch {
      setProblem('We could not reach the email service. Please check your internet connection and try again.')
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
        <div className="ct-hero-copy" data-reveal>
          <span className="ct-pill"><i />Contact us</span>
          <h1 id="ct-hero-title" className="ct-h1">Let&rsquo;s build something great together</h1>
          <p className="ct-lead">Tell us about your project and we will respond. Whether you need a new website, custom software, a web or mobile application, or digital marketing, share a few details and our team will suggest a clear way forward.</p>
          <div className="ct-actions">
            <a href="#enquiry" className="ct-btn ct-btn-primary">Send an enquiry <ArrowRight size={18} aria-hidden="true" /></a>
            {SITE.whatsapp && <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn-ghost"><MessageCircle size={18} aria-hidden="true" />Chat on WhatsApp</a>}
          </div>
          <ul className="ct-points">
            {POINTS.map(p => <li key={p}><Check size={16} aria-hidden="true" />{p}</li>)}
          </ul>
        </div>
        <div data-reveal><ContactStage /></div>
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
            {SITE.address && <Info icon={MapPin} label="Office address" href={SITE.mapUrl || undefined} external>{SITE.address}</Info>}
            {SITE.hours && <Info icon={Clock} label="Business hours">{SITE.hours}</Info>}
            <Info icon={Globe} label="Regions we serve">{REGIONS.join(' · ')}</Info>
            <Info icon={Headphones} label="Support">24/7 support, including after launch</Info>
          </div>
        </aside>

        <div className="ct-formcol" id="enquiry">
          <div className="ct-card" data-reveal>
            {state === 'success' ? (
              <div className="ct-success" role="status">
                <span className="ct-success-ico"><CheckCircle2 size={34} aria-hidden="true" /></span>
                <h2>Thank you. Your enquiry has been sent.</h2>
                <p>We have received your project details and will respond to the email address you provided.</p>
                <button type="button" className="ct-btn ct-btn-ghost" onClick={() => setState('idle')}>Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-labelledby="ct-form-title">
                <div className="ct-form-head">
                  <h2 id="ct-form-title">Tell us about your project</h2>
                  <p>Fields marked <span aria-hidden="true">*</span><span className="ct-sr"> with an asterisk</span> are required.</p>
                </div>

                {/* hidden spam trap: real visitors never see or fill this */}
                <div className="ct-trap" aria-hidden="true"><label>Website<input ref={hp} name="website" tabIndex="-1" autoComplete="off" /></label></div>

                <div className="ct-row">
                  <div className="ct-field"><label htmlFor="ct-name">Full name <b aria-hidden="true">*</b></label>
                    <input {...fieldProps('name', { type: 'text', autoComplete: 'name', placeholder: 'Your full name', required: true })} /><Err k="name" /></div>
                  <div className="ct-field"><label htmlFor="ct-email">Business email <b aria-hidden="true">*</b></label>
                    <input {...fieldProps('email', { type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'name@company.com', required: true })} /><Err k="email" /></div>
                </div>
                <div className="ct-row">
                  <div className="ct-field"><label htmlFor="ct-phone">Phone number <span className="ct-opt">optional</span></label>
                    <input {...fieldProps('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+91 …' })} /><Err k="phone" /></div>
                  <div className="ct-field"><label htmlFor="ct-companyName">Company name <span className="ct-opt">optional</span></label>
                    <input {...fieldProps('companyName', { type: 'text', autoComplete: 'organization', placeholder: 'Your company' })} /></div>
                </div>

                <fieldset className="ct-field ct-services">
                  <legend>Service required</legend>
                  <div className="ct-chips" role="radiogroup">
                    {services.map(s => (
                      <label key={s.slug} className={`ct-chip ${service === s.title ? 'on' : ''}`}>
                        <input type="radio" name="service" value={s.title} checked={service === s.title} onChange={() => setService(s.title)} />
                        <span>{s.title}</span>
                      </label>))}
                  </div>
                </fieldset>

                <div className="ct-field"><label htmlFor="ct-budget">Project budget <span className="ct-opt">optional</span></label>
                  <select {...fieldProps('budget')}><option value="">Select a budget range</option>{BUDGETS.map(b => <option key={b}>{b}</option>)}</select></div>

                <div className="ct-field"><label htmlFor="ct-message">Project details <b aria-hidden="true">*</b></label>
                  <textarea {...fieldProps('message', { rows: 6, placeholder: 'What would you like to build? Mention goals, key features, timeline and any existing systems.', required: true })} /><Err k="message" /></div>

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

    {/* ================= MAP (only with a real address / map link) ================= */}
    {(SITE.mapEmbed || SITE.mapUrl) && (
      <section className="ct-map">
        <div className="ct-wrap">
          <div data-reveal className="ct-map-top">
            <div className="ct-map-head"><span className="ct-pill"><i />Our location</span><h2>Visit our office</h2>{SITE.address && <p>{SITE.address}</p>}</div>
            <PinScene />
          </div>
          <div data-reveal className="ct-map-frame">
            {SITE.mapEmbed
              ? <iframe title="CodeZyntax office location map" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              : <div className="ct-map-fallback"><MapPin size={36} aria-hidden="true" /><p>Open our location in maps.</p></div>}
          </div>
          {SITE.mapUrl && <a data-reveal className="ct-btn ct-btn-ghost ct-map-link" href={SITE.mapUrl} target="_blank" rel="noopener noreferrer">Open in Maps <ArrowUpRight size={18} aria-hidden="true" /></a>}
        </div>
      </section>)}

    {/* ================= CTA ================= */}
    <section className="ct-cta-sec" aria-labelledby="ct-cta-title">
      <div className="ct-wrap">
        <div data-reveal className="ct-cta">
          {/* extra 3D elements: cubes, glossy tiles, rings and spheres */}
          <Cube size={64} className="ct-cube-a" />
          <Cube size={40} className="ct-cube-b" />
          <span className="ct-cta-orb" aria-hidden="true" />
          <span className="ct-cta-orb ct-cta-orb-b" aria-hidden="true" />
          <FloatTile icon={Send} className="ft-a" />
          <FloatTile icon={Mail} className="ft-b" />
          <FloatTile icon={MessageCircle} className="ft-c" />
          <Ring3D size={84} className="rg-a" />
          <Ring3D size={56} className="rg-b" />
          <div className="ct-cta-body">
            <h2 id="ct-cta-title" className="ct-cta-title">Ready to discuss your project?</h2>
            <p className="ct-cta-text">Share your goal or challenge and request a consultation. We will respond with a clear direction.</p>
            <div className="ct-actions ct-actions-c">
              <a href="#enquiry" className="ct-btn ct-btn-primary">Request a consultation <ArrowUpRight size={18} aria-hidden="true" /></a>
              {SITE.email && <a href={`mailto:${SITE.email}`} className="ct-btn ct-btn-ghost"><Mail size={18} aria-hidden="true" />Email us</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>)
}