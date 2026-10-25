import { useState, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Loader2, Mail, MessageCircle, Phone, MapPin, Clock, Globe, Headphones, ArrowUpRight, ArrowRight, CheckCircle2, AlertCircle, Send, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import { SITE, SERVICES, REGIONS } from '../data/site'
import './Contact.css'

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

function validate(v) {
  const er = {}
  if (!v.name.trim()) er.name = 'Please enter your full name.'
  if (!v.email.trim()) er.email = 'Please enter your business email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) er.email = 'Enter a valid email address, for example name@company.com.'
  if (v.phone.trim() && !/^\+?[\d\s().-]{7,20}$/.test(v.phone.trim())) er.phone = 'Enter a valid phone number. Include the country code, for example +91.'
  if (v.message.trim().length < 10) er.message = 'Please describe your project (at least 10 characters).'
  return er
}

const Info = ({ icon: Icon, label, children, href, external }) => {
  const body = (<>
    <span className="ct-ico"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
    <span className="ct-info-text"><span className="ct-info-label">{label}</span><span className="ct-info-value">{children}</span></span>
    {href && <ArrowUpRight className="ct-info-go" size={18} aria-hidden="true" />}
  </>)
  return href
    ? <a className="ct-info ct-info-link" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a>
    : <div className="ct-info">{body}</div>
}

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
    if (!SITE.formEndpoint) {
      setProblem('The enquiry form is not connected to a mailbox yet, so nothing was sent.')
      setState('error'); return
    }
    setState('loading'); setProblem('')
    const f = new FormData()
    f.append('name', values.name.trim()); f.append('email', values.email.trim()); f.append('phone', values.phone.trim())
    f.append('company_name', values.companyName.trim()); f.append('service', service); f.append('budget', values.budget)
    f.append('message', values.message.trim()); f.append('brief', params.get('brief') || '')
    try {
      const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: f })
      if (r.ok) { setState('success'); setValues(EMPTY); setService(''); setErrors({}) }
      else { setProblem('The server did not accept the enquiry.'); setState('error') }
    } catch { setProblem('We could not reach the server. Check your connection.'); setState('error') }
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
    <section className="ct-hero">
      <div className="ct-hero-bg" aria-hidden="true" />
      <div className="ct-wrap ct-hero-grid">
        <div data-reveal>
          <span className="ct-pill"><i />Contact Us</span>
          <h1 className="ct-h1">Let's Build Something <span className="ct-grad">Great Together.</span></h1>
          <p className="ct-lead">Tell us about your project and we will respond. Whether you need a new website, custom software, a web or mobile application, or digital marketing, share a few details and our team will suggest a clear way forward.</p>
          <div className="ct-actions">
            <a href="#enquiry" className="ct-btn ct-btn-primary">Send an Enquiry <ArrowRight size={18} aria-hidden="true" /></a>
            {SITE.whatsapp && <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn-ghost"><MessageCircle size={18} aria-hidden="true" />Chat on WhatsApp</a>}
          </div>
        </div>
        <div className="ct-art" aria-hidden="true" data-reveal>
          <svg viewBox="0 0 420 320" className="ct-art-svg">
            <defs>
              <linearGradient id="ct-g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5aa2ff" /><stop offset="1" stopColor="#6a4cf0" /></linearGradient>
              <linearGradient id="ct-g2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
              <radialGradient id="ct-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#3b82ff" stopOpacity=".55" /><stop offset="1" stopColor="#3b82ff" stopOpacity="0" /></radialGradient>
            </defs>
            <circle cx="210" cy="160" r="150" fill="url(#ct-glow)" />
            <circle cx="210" cy="160" r="120" fill="none" stroke="url(#ct-g2)" strokeOpacity=".35" strokeWidth="1.2" strokeDasharray="3 7" />
            <circle cx="210" cy="160" r="86" fill="none" stroke="#7aa8ff" strokeOpacity=".3" strokeWidth="1" />
            {/* envelope card */}
            <g transform="translate(110 100)">
              <rect width="200" height="130" rx="22" fill="url(#ct-g1)" opacity=".95" />
              <rect width="200" height="130" rx="22" fill="none" stroke="#fff" strokeOpacity=".5" />
              <path d="M16 28 100 82 184 28" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="30" y="98" width="70" height="7" rx="3.5" fill="#fff" opacity=".55" />
              <rect x="30" y="111" width="46" height="7" rx="3.5" fill="#fff" opacity=".35" />
            </g>
            {/* chat bubble */}
            <g className="ct-float" transform="translate(284 56)">
              <path d="M18 0h74a18 18 0 0 1 18 18v34a18 18 0 0 1-18 18H58L36 90V70H18A18 18 0 0 1 0 52V18A18 18 0 0 1 18 0Z" fill="#0b1a5c" stroke="url(#ct-g2)" strokeWidth="1.5" />
              <circle cx="32" cy="35" r="5" fill="#22d3ee" /><circle cx="55" cy="35" r="5" fill="#5aa2ff" /><circle cx="78" cy="35" r="5" fill="#a78bfa" />
            </g>
            {/* code chip */}
            <g className="ct-float ct-float-b" transform="translate(30 210)">
              <rect width="92" height="56" rx="16" fill="#0b1a5c" stroke="#7aa8ff" strokeOpacity=".5" />
              <path d="M30 20 20 28l10 8M62 20l10 8-10 8M52 17 40 39" fill="none" stroke="#7df3ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <circle cx="64" cy="82" r="16" fill="url(#ct-g1)" /><circle cx="370" cy="250" r="11" fill="url(#ct-g2)" />
          </svg>
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
                    {state === 'loading' ? <><Loader2 className="ct-spin" size={18} aria-hidden="true" />Sending…</> : <>Send Enquiry <Send size={17} aria-hidden="true" /></>}
                  </button>
                  <p className="ct-privacy"><ShieldCheck size={16} aria-hidden="true" />Your details are used only to respond to your enquiry.</p>
                </div>

                <div aria-live="assertive">
                  {Object.values(errors).some(Boolean) && <p className="ct-alert" role="alert"><AlertCircle size={18} aria-hidden="true" />Please correct the highlighted fields and try again.</p>}
                  {state === 'error' && (
                    <p className="ct-alert" role="alert"><AlertCircle size={18} aria-hidden="true" /><span>{problem || 'We could not send your enquiry.'} Please try again later{SITE.email ? <> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a></> : ''}{SITE.whatsapp ? <>{SITE.email ? ' or ' : ' or '}<a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a></> : ''}.</span></p>)}
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
          <div data-reveal className="ct-map-head"><span className="ct-pill"><i />Our location</span><h2>Visit our office</h2>{SITE.address && <p>{SITE.address}</p>}</div>
          <div data-reveal className="ct-map-frame">
            {SITE.mapEmbed
              ? <iframe title="CodeZyntax office location map" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              : <div className="ct-map-fallback"><MapPin size={36} aria-hidden="true" /><p>Open our location in maps.</p></div>}
          </div>
          {SITE.mapUrl && <a data-reveal className="ct-btn ct-btn-ghost ct-map-link" href={SITE.mapUrl} target="_blank" rel="noopener noreferrer">Open in Maps <ArrowUpRight size={18} aria-hidden="true" /></a>}
        </div>
      </section>)}

    {/* ================= CTA ================= */}
    <section className="ct-cta-sec">
      <div className="ct-wrap">
        <div data-reveal className="ct-cta">
          <h2>Ready to discuss your project?</h2>
          <p>Share your goal or challenge and request a consultation. We will respond with a clear direction.</p>
          <div className="ct-actions ct-actions-c">
            <a href="#enquiry" className="ct-btn ct-btn-primary">Request a Consultation <ArrowUpRight size={18} aria-hidden="true" /></a>
            {SITE.email && <a href={`mailto:${SITE.email}`} className="ct-btn ct-btn-ghost"><Mail size={18} aria-hidden="true" />Email Us</a>}
          </div>
        </div>
      </div>
    </section>
  </div>)
}
