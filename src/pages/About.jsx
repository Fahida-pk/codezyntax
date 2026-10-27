import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, ArrowRight, Search, ClipboardList, Code2, Rocket, Mail, Phone, MessageCircle, MapPin,
  Target, Eye, ShieldCheck, Briefcase, Award, Headphones, SlidersHorizontal, Users, Wallet,
  LayoutDashboard, Server, Smartphone, Cloud,
} from 'lucide-react'
import Seo from '../components/Seo'
import { SITE, SERVICES } from '../data/site'
import './About.css'

/* Copy reuses what the Home page already says about CodeZyntax. The figures are the ones
   CodeZyntax supplied for the Home "Why Choose Us" content. */
const STATS = [
  [ShieldCheck, '100%', 'Quality'],
  [Briefcase, '500+', 'Projects'],
  [Award, '7+', 'Years of experience'],
]

const MV = [
  [Target, 'Our mission', 'To deliver smart, scalable and easy-to-use digital solutions that fit your goals and help your business grow.'],
  [Eye, 'Our vision', 'To be a dependable technology partner for businesses of every size, from startups to established enterprises, turning ideas into reality.'],
]

const PRINCIPLES = [
  [Search, 'Understand first', 'Your goals, users, workflow and constraints shape the solution.'],
  [ClipboardList, 'Design with purpose', 'Every page, screen and action supports a user or a business need.'],
  [Code2, 'Build in stages', 'You see progress regularly and make focused decisions before launch.'],
  [Rocket, 'Stay accountable', 'Testing, launch and support stay connected under one team.'],
]

const POINTS = [
  [Headphones, '24/7 support to keep your systems always running'],
  [SlidersHorizontal, 'Custom-built solutions for your exact needs'],
  [Users, 'Managers aligned with your business objectives'],
  [Wallet, 'Budget-friendly plans for small businesses'],
]

/* Replaces "Our Global Reach": the capability areas a software company is judged on.
   EDIT the tool names below so they match what your team actually uses. */
const STACK = [
  [LayoutDashboard, 'Frontend', ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']],
  [Server, 'Backend & APIs', ['Node.js', 'PHP / Laravel', 'REST', 'Python']],
  [Smartphone, 'Mobile apps', ['Android', 'iOS', 'React Native', 'Flutter']],
  [Cloud, 'Cloud & Data', ['AWS', 'MySQL', 'PostgreSQL', 'CI/CD']],
]

const Detail = ({ icon: Icon, label, href, external, children }) => {
  const inner = (<>
    <span className="ab-detail-ico"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
    <span><small>{label}</small><strong>{children}</strong></span>
  </>)
  return href
    ? <a className="ab-detail" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
    : <div className="ab-detail">{inner}</div>
}

/* ==========================================================================
   Premium 3D visuals — real-time WebGL (Three.js), loaded lazily and paused
   when off-screen. Decorative only. See about3d.js.
   ========================================================================== */
function Scene3D({ kind, className, ...rest }) {
  const host = useRef(null)
  useEffect(() => {
    let disposed = false
    let cleanup = () => {}
    import('./about3d.js')
      .then((m) => {
        if (disposed || !host.current) return
        cleanup = m.mountScene(host.current, kind)
      })
      .catch(() => {})
    return () => { disposed = true; cleanup() }
  }, [kind])
  return (
    <div className={className} aria-hidden="true" {...rest}>
      <div className="ab-glow" />
      <div className="ab-3d" ref={host} />
    </div>
  )
}

export default function About() {
  const root = useRef(null)

  /* Scroll-reveal. Content stays visible if JS / IntersectionObserver is unavailable. */
  useEffect(() => {
    const el = root.current
    if (!el) return
    const items = el.querySelectorAll('[data-ab]')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(n => n.classList.add('is-in'))
      return
    }
    el.classList.add('ab-js')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    items.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])

  const d = (i) => ({ '--d': `${i * 90}ms` })

  return (
    <div className="ab" ref={root}>
      <Seo
        title="About Us"
        description="CodeZyntax Softwares LLP is a software development company in Palakkad building custom software, websites, web and mobile applications and digital marketing for businesses in India and the Gulf."
      />

      {/* ================= INTRO ================= */}
      <section className="ab-hero" aria-labelledby="ab-title">
        <span className="ab-bgorb ab-bgorb-1" aria-hidden="true" />
        <span className="ab-bgorb ab-bgorb-2" aria-hidden="true" />
        <div className="ab-wrap">
          <nav className="ab-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About</span>
          </nav>
          <div className="ab-hero-grid">
            <div className="ab-hero-copy">
              <div data-ab>
                <p className="ab-kicker"><b aria-hidden="true">+</b> About the company</p>
                <h1 id="ab-title">Smart software. Full responsibility.</h1>
              </div>
              <div data-ab className="ab-hero-side" style={d(1)}>
                <p>CodeZyntax Softwares LLP is a software development company in Palakkad. We connect planning, design, development, launch and support, so your business has one accountable technology partner.</p>
                <Link to="/contact" className="ab-link">Start a conversation <ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" /></Link>
              </div>
            </div>
            <Scene3D kind="stack" className="ab-stage" data-ab />
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="ab-sec" aria-labelledby="ab-do-title">
        <div className="ab-wrap ab-split">
          <div data-ab>
            <p className="ab-kicker"><b aria-hidden="true">+</b> What we do</p>
            <h2 id="ab-do-title">Digital products built around a real business goal.</h2>
            <Scene3D kind="cube" className="ab-cube-scene" />
          </div>
          <div data-ab className="ab-prose" style={d(1)}>
            <p>We provide <strong>custom software development</strong>, <strong>web and mobile applications</strong> and <strong>digital marketing</strong> created to improve your online presence and the way your business runs day to day.</p>
            <p>We believe technology should be user-friendly, reliable and suited to your goals. A skilled team of developers and digital experts focuses on tools that solve real challenges, with transparency and collaboration at every step.</p>
            <p>From startups to established enterprises, we adapt our approach to your market so every project has the most impact. Alongside development, we also work as a digital marketing agency in Pattambi.</p>
          </div>
        </div>
        <div className="ab-wrap">
          <ul className="ab-chips" aria-label="Our services" data-ab>
            {SERVICES.map(s => <li key={s.slug}><Link to={`/service/${s.slug}`}>{s.title}</Link></li>)}
          </ul>
        </div>
      </section>

      {/* ================= FIGURES + MISSION / VISION ================= */}
      <section className="ab-sec ab-tint" aria-labelledby="ab-mv-title">
        <div className="ab-wrap">
          <div data-ab className="ab-head">
            <p className="ab-kicker"><b aria-hidden="true">+</b> Why CodeZyntax</p>
            <h2 id="ab-mv-title">Clear purpose, dependable delivery.</h2>
          </div>
          <ul className="ab-stats">
            {STATS.map(([Icon, n, l], i) => (
              <li key={l} data-ab style={d(i)}><Icon size={22} strokeWidth={1.7} aria-hidden="true" /><strong>{n}</strong><span>{l}</span></li>
            ))}
          </ul>
          <div className="ab-mv">
            {MV.map(([Icon, t, p], i) => (
              <article key={t} data-ab className="ab-card" style={d(i)}>
                <span className="ab-ico"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
          <ul className="ab-points">
            {POINTS.map(([Icon, t], i) => (
              <li key={t} data-ab style={d(i)}><span className="ab-ico ab-ico-sm"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= TECHNOLOGY (replaces "Our Global Reach") ================= */}
      <section className="ab-sec" aria-labelledby="ab-stack-title">
        <div className="ab-wrap">
          <div data-ab className="ab-head">
            <p className="ab-kicker"><b aria-hidden="true">+</b> Our technology</p>
            <h2 id="ab-stack-title">Modern tools, chosen to fit your product.</h2>
            <p className="ab-lead">We pick the right technology for your goals, budget and growth plans, then build it to be fast, secure and easy to maintain.</p>
          </div>
          <div className="ab-stack">
            {STACK.map(([Icon, t, tools], i) => (
              <article key={t} data-ab className="ab-tech" style={d(i)}>
                <span className="ab-ico"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3>{t}</h3>
                <ul>{tools.map(x => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKING PRINCIPLES ================= */}
      <section className="ab-sec ab-tint" aria-labelledby="ab-pr-title">
        <div className="ab-wrap">
          <div data-ab className="ab-head">
            <p className="ab-kicker"><b aria-hidden="true">+</b> Working principles</p>
            <h2 id="ab-pr-title">Clear scope. Visible progress. Useful outcomes.</h2>
            <p className="ab-lead">The process stays practical from the first conversation through launch and support.</p>
          </div>
          <ol className="ab-steps">
            {PRINCIPLES.map(([Icon, t, p], i) => (
              <li key={t} data-ab className="ab-step" style={d(i)}>
                <span className="ab-step-n" aria-hidden="true">0{i + 1}</span>
                <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                <h3>{t}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= BUSINESS DETAILS ================= */}
      <section className="ab-sec" aria-labelledby="ab-biz-title">
        <div className="ab-wrap">
          <div data-ab className="ab-head">
            <p className="ab-kicker"><b aria-hidden="true">+</b> Business details</p>
            <h2 id="ab-biz-title">CodeZyntax Softwares LLP</h2>
          </div>
          <div data-ab className="ab-details" aria-label="Business details" style={d(1)}>
            {SITE.address && <Detail icon={MapPin} label="Address" href={SITE.mapUrl || undefined} external>{SITE.address}</Detail>}
            {SITE.phone && <Detail icon={Phone} label="Phone" href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone}</Detail>}
            {SITE.whatsapp && <Detail icon={MessageCircle} label="WhatsApp" href={`https://wa.me/${SITE.whatsapp}`} external>Message us on WhatsApp</Detail>}
            {SITE.email && <Detail icon={Mail} label="Email" href={`mailto:${SITE.email}`}>{SITE.email}</Detail>}
            {!SITE.address && !SITE.phone && !SITE.whatsapp && !SITE.email && (
              <p className="ab-muted">Reach us through the <Link to="/contact">contact page</Link>.</p>
            )}
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="ab-cta" aria-labelledby="ab-cta-title">
        <div className="ab-wrap">
          <div data-ab className="ab-cta-box">
            <div className="ab-cta-text">
              <p className="ab-kicker"><b aria-hidden="true">+</b> Work with CodeZyntax</p>
              <h2 id="ab-cta-title">Bring the rough idea.</h2>
              <p>We will help turn it into a clear project direction and an honest scope.</p>
            </div>
            <Scene3D kind="orb" className="ab-orb-scene" />
            <div className="ab-cta-actions">
              <Link to="/contact" className="ab-btn ab-btn-primary">Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link to="/service" className="ab-btn ab-btn-ghost">Explore our services <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}