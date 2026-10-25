import { Link } from 'react-router-dom'
import {
  ArrowUpRight, ArrowRight, Search, ClipboardList, Code2, Rocket, Globe, Mail, Phone, MessageCircle, MapPin,
  Target, Eye, ShieldCheck, Briefcase, Award, Headphones, SlidersHorizontal, Users, Wallet,
} from 'lucide-react'
import Seo from '../components/Seo'
import { SITE, SERVICES, REGIONS } from '../data/site'
import './About.css'

/* Copy reuses what the Home page already says about CodeZyntax. Nothing new is invented:
   the figures are the ones CodeZyntax supplied for the Home "Why Choose Us" content. */
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

const Detail = ({ icon: Icon, label, href, external, children }) => {
  const inner = (<>
    <span className="ab-detail-ico"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
    <span><small>{label}</small><strong>{children}</strong></span>
  </>)
  return href
    ? <a className="ab-detail" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
    : <div className="ab-detail">{inner}</div>
}

export default function About() {
  return (
    <div className="ab">
      <Seo
        title="About Us"
        description="CodeZyntax Softwares LLP is a software development company in Palakkad building custom software, websites, web and mobile applications and digital marketing for businesses in India and the Gulf."
      />

      {/* ================= INTRO ================= */}
      <section className="ab-hero" aria-labelledby="ab-title">
        <div className="ab-wrap">
          <nav className="ab-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About</span>
          </nav>
          <div className="ab-hero-grid">
            <div data-reveal>
              <p className="ab-kicker"><b aria-hidden="true">+</b> About the company</p>
              <h1 id="ab-title">Smart software. Full responsibility.</h1>
            </div>
            <div data-reveal className="ab-hero-side">
              <p>CodeZyntax Softwares LLP is a software development company in Palakkad. We connect planning, design, development, launch and support, so your business has one accountable technology partner.</p>
              <Link to="/contact" className="ab-link">Start a conversation <ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="ab-sec" aria-labelledby="ab-do-title">
        <div className="ab-wrap ab-split">
          <div data-reveal>
            <p className="ab-kicker"><b aria-hidden="true">+</b> What we do</p>
            <h2 id="ab-do-title">Digital products built around a real business goal.</h2>
          </div>
          <div data-reveal className="ab-prose">
            <p>We provide <strong>custom software development</strong>, <strong>web and mobile applications</strong> and <strong>digital marketing</strong> created to improve your online presence and the way your business runs day to day.</p>
            <p>We believe technology should be user-friendly, reliable and suited to your goals. A skilled team of developers and digital experts focuses on tools that solve real challenges, with transparency and collaboration at every step.</p>
            <p>From startups to established enterprises, we adapt our approach to your market so every project has the most impact. Alongside development, we also work as a digital marketing agency in Pattambi.</p>
          </div>
        </div>
        <div className="ab-wrap">
          <ul className="ab-chips" aria-label="Our services" data-reveal>
            {SERVICES.map(s => <li key={s.slug}><Link to={`/service/${s.slug}`}>{s.title}</Link></li>)}
          </ul>
        </div>
      </section>

      {/* ================= FIGURES + MISSION / VISION ================= */}
      <section className="ab-sec ab-tint" aria-labelledby="ab-mv-title">
        <div className="ab-wrap">
          <div data-reveal className="ab-head">
            <p className="ab-kicker"><b aria-hidden="true">+</b> Why CodeZyntax</p>
            <h2 id="ab-mv-title">Clear purpose, dependable delivery.</h2>
          </div>
          <ul className="ab-stats" data-reveal>
            {STATS.map(([Icon, n, l]) => (
              <li key={l}><Icon size={22} strokeWidth={1.7} aria-hidden="true" /><strong>{n}</strong><span>{l}</span></li>
            ))}
          </ul>
          <div className="ab-mv">
            {MV.map(([Icon, t, d]) => (
              <article key={t} data-reveal className="ab-card">
                <span className="ab-ico"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <ul className="ab-points" data-reveal>
            {POINTS.map(([Icon, t]) => (
              <li key={t}><span className="ab-ico ab-ico-sm"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= LOCAL PRESENCE + BUSINESS DETAILS ================= */}
      <section className="ab-sec" aria-labelledby="ab-local-title">
        <div className="ab-wrap ab-split">
          <div data-reveal>
            <p className="ab-kicker"><b aria-hidden="true">+</b> Where we work</p>
            <h2 id="ab-local-title">Local presence, wider delivery.</h2>
            <p className="ab-lead">Based in Palakkad, Kerala, we work with businesses across {REGIONS[0]} and the Gulf region: {REGIONS.slice(1).join(', ')}.</p>
            <p className="ab-sub"><Globe size={16} aria-hidden="true" /> Serving India and the Gulf</p>
          </div>
          <div data-reveal className="ab-details" aria-label="Business details">
            <h3>Business details</h3>
            <p className="ab-company">CodeZyntax Softwares LLP</p>
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

      {/* ================= WORKING PRINCIPLES ================= */}
      <section className="ab-sec ab-tint" aria-labelledby="ab-pr-title">
        <div className="ab-wrap">
          <div data-reveal className="ab-head">
            <p className="ab-kicker"><b aria-hidden="true">+</b> Working principles</p>
            <h2 id="ab-pr-title">Clear scope. Visible progress. Useful outcomes.</h2>
            <p className="ab-lead">The process stays practical from the first conversation through launch and support.</p>
          </div>
          <ol className="ab-steps">
            {PRINCIPLES.map(([Icon, t, d], i) => (
              <li key={t} data-reveal className="ab-step">
                <span className="ab-step-n" aria-hidden="true">0{i + 1}</span>
                <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="ab-cta" aria-labelledby="ab-cta-title">
        <div className="ab-wrap">
          <div data-reveal className="ab-cta-box">
            <div>
              <p className="ab-kicker"><b aria-hidden="true">+</b> Work with CodeZyntax</p>
              <h2 id="ab-cta-title">Bring the rough idea.</h2>
              <p>We will help turn it into a clear project direction and an honest scope.</p>
            </div>
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