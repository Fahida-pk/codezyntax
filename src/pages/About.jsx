import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, ArrowRight, Search, ClipboardList, Code2, Rocket, Mail, Phone, MessageCircle, MapPin,
  Target, Eye, ShieldCheck, Briefcase, Award, Headphones, SlidersHorizontal, Users, Wallet,
  LayoutDashboard, Server, Smartphone, Cloud, Megaphone,
  Database, Monitor, CodeXml, Globe, Terminal, HardDrive, PanelsTopLeft,
} from 'lucide-react'
import Seo from '../components/Seo'
import { SITE, SERVICES } from '../data/site'
import TechScene from './Techscene.jsx'
import { DoScene, StepsScene } from './Aboutscenes'
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
  [LayoutDashboard, 'Frontend Development', ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Bootstrap', 'Tailwind CSS', 'PostCSS']],
  [Server, 'Backend Development', ['PHP', 'Laravel', 'Node.js', 'Express.js', 'REST APIs']],
  [CodeXml, 'Programming Languages', ['C#', 'Python', 'JavaScript', 'C++']],
  [PanelsTopLeft, 'CMS & Website Development', ['WordPress', 'Custom Websites', 'Responsive Web Design']],
  [Database, 'Database Management', ['MySQL', 'MongoDB', 'PostgreSQL']],
  [Monitor, 'Development Tools', ['Visual Studio', 'Visual Studio Code', 'Git', 'GitHub', 'Postman']],
  [HardDrive, 'Web Hosting & Servers', ['cPanel', 'Plesk', 'DirectAdmin', 'VPS Hosting', 'Cloud Hosting']],
  [Globe, 'Cloud & Deployment', ['Vercel', 'Netlify', 'CI/CD', 'Domain & DNS Management']],
]

const DO = [
  [Code2, 'Custom software', 'Software shaped around your goals, user-friendly and reliable in daily use.'],
  [Smartphone, 'Web & mobile apps', 'Websites and applications that improve your online presence and solve real challenges.'],
  [Megaphone, 'Digital marketing', 'Marketing that supports your growth, from our digital marketing team in Pattambi.'],
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
   Premium 3D visuals — real-time WebGL (Three.js), loaded lazily, mounted only
   when the scene nears the viewport, and paused when off-screen. Decorative only.
   See about3d.js.
   ========================================================================== */
/* Vite resolves this at build time. The pattern matches About3d.JS and about3d.js, so the page
   works on case-sensitive hosts (Vercel / Linux) whichever way the file is named.
   Recommended: name the file about3d.js (lowercase). */
const load3d = Object.values(import.meta.glob('./[aA]bout3d.[jJ][sS]'))[0]

function Scene3D({ kind, className, ...rest }) {
  const host = useRef(null)
  useEffect(() => {
    const el = host.current
    if (!el) return
    let disposed = false
    let started = false
    let cleanup = () => {}
    const boot = () => {
      if (started) return
      started = true
      if (!load3d) return
      load3d()
        .then((m) => {
          if (disposed || !host.current) return
          cleanup = m.mountScene(host.current, kind)
        })
        .catch(() => {})
    }
    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { boot(); io.disconnect() }
      }, { rootMargin: '250px' })
      io.observe(el)
    } else {
      boot()
    }
    return () => { disposed = true; io && io.disconnect(); cleanup() }
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
      <section className="ab-sec ab-do" aria-labelledby="ab-do-title">
        <div className="ab-wrap">
          <div className="ab-do-top">
            <div data-ab className="ab-do-copy">
              <p className="ab-kicker"><b aria-hidden="true">+</b> What we do</p>
              <h2 id="ab-do-title">Digital products built around a real business goal.</h2>
              <p className="ab-lead">We provide <strong>custom software development</strong>, <strong>web and mobile applications</strong> and <strong>digital marketing</strong> created to improve your online presence and the way your business runs day to day.</p>
              <Link to="/service" className="ab-link">Explore our services <ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" /></Link>
            </div>
            {/* 3D illustration (SVG). See AboutScenes.jsx */}
            <div className="as-wrap" data-ab><DoScene /></div>
          </div>

          <ul className="ab-pillars">
            {DO.map(([Icon, t, p], i) => (
              <li key={t} data-ab className="ab-pillar" style={d(i)}>
                <span className="ab-ico"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3>{t}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ul>

          <div data-ab className="ab-do-notes">
            <p>We believe technology should be user-friendly, reliable and suited to your goals. A skilled team of developers and digital experts focuses on tools that solve real challenges, with transparency and collaboration at every step.</p>
            <p>From startups to established enterprises, we adapt our approach to your market so every project has the most impact.</p>
          </div>

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
          <div className="ab-headrow">
            <div data-ab className="ab-head">
              <p className="ab-kicker"><b aria-hidden="true">+</b> Our technology</p>
              <h2 id="ab-stack-title">Modern tools, chosen to fit your product.</h2>
              <p className="ab-lead">We pick the right technology for your goals, budget and growth plans, then build it to be fast, secure and easy to maintain.</p>
            </div>
            {/* Professional 3D technology illustration (SVG). See TechScene.jsx / TechScene.css */}
            <div className="ab-tech-scene" data-ab><TechScene /></div>
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
          <div className="ab-headrow">
            <div data-ab className="ab-head">
              <p className="ab-kicker"><b aria-hidden="true">+</b> Working principles</p>
              <h2 id="ab-pr-title">Clear scope. Visible progress. Useful outcomes.</h2>
              <p className="ab-lead">The process stays practical from the first conversation through launch and support.</p>
            </div>
            {/* 3D illustration (SVG). See AboutScenes.jsx */}
            <div className="as-wrap" data-ab><StepsScene /></div>
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