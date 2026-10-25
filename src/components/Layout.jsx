import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle, Mail, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { SITE, NAV, SERVICES, LOGO_URL } from '../data/site'
import useReveal from '../hooks/useReveal'

function Logo() {
  // Official logo: save it as public/logo.webp. Falls back to the live URL until then. Shown on white so original colours stay intact.
  const [src, setSrc] = useState('/logo.webp')
  return (
    <Link to="/" aria-label="CodeZyntax Softwares LLP home" className="inline-flex shrink-0 rounded-lg bg-[#ffffff] px-3 py-1.5">
      <img src={src} alt="CodeZyntax Softwares LLP" className="h-9 w-auto max-w-[170px] object-contain sm:h-10" onError={() => setSrc(LOGO_URL)} />
    </Link>)
}
const NavItems = ({ link }) => NAV.map(([l, p]) => p.includes('#')
  ? <Link key={p} to={p} className={link({ isActive: false })}>{l}</Link>
  : <NavLink key={p} to={p} end={p === '/'} className={link}>{l}</NavLink>)
function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const n = !dark; setDark(n)
    document.documentElement.classList.toggle('dark', n); document.documentElement.style.colorScheme = n ? 'dark' : 'light'
    try { localStorage.setItem('cz-theme', n ? 'dark' : 'light') } catch (e) { /* storage unavailable */ }
  }
  return (
    <button onClick={toggle} role="switch" aria-checked={dark} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Dark mode on' : 'Light mode on'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-heading transition hover:border-accent hover:text-accent-dark">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>)
}
function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname, hash } = useLocation()
  useEffect(() => {
    setOpen(false)
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 80)
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  useEffect(() => { const f = () => setSolid(window.scrollY > 12); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  const link = ({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-accent-dark' : 'text-body hover:text-heading'}`
  return (
    <header className={`sticky top-0 z-50 border-b transition duration-300 ${solid || open ? 'border-line/70 bg-surface/85 shadow-sm backdrop-blur-xl' : 'border-transparent bg-surface/60 backdrop-blur-xl'}`}>
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <Logo />
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main"><NavItems link={link} /></nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/contact" className="btn-primary hidden !px-5 !py-2.5 xl:inline-flex">Get a Proposal <ArrowUpRight size={15} /></Link>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-heading xl:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="container-x max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto pb-6 xl:hidden" aria-label="Mobile">
        <div className="flex flex-col [&>a]:border-b [&>a]:border-line/60 [&>a]:py-3.5 [&>a]:text-base"><NavItems link={link} /></div>
        <Link to="/contact" className="btn-primary mt-5 w-full">Get a Proposal <ArrowUpRight size={15} /></Link>
      </nav>}
    </header>)
}
function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1"><Logo /><p className="mt-5 text-sm leading-relaxed">Software development and digital solutions for businesses in India and the Gulf region.</p></div>
        <div><p className="ft-title font-display font-semibold">Services</p><ul className="mt-4 space-y-2.5 text-sm">{SERVICES.slice(0, 6).map(s => <li key={s.slug}><Link className="transition hover:text-accent" to={`/service/${s.slug}`}>{s.title}</Link></li>)}</ul></div>
        <div><p className="ft-title font-display font-semibold">Company</p><ul className="mt-4 space-y-2.5 text-sm">{[['About', '/about'], ['Portfolio', '/portfolio'], ['Industries', '/industries'], ['Insights', '/blog'], ['Contact', '/contact']].map(([l, p]) => <li key={p}><Link className="transition hover:text-accent" to={p}>{l}</Link></li>)}</ul></div>
        <div><p className="ft-title font-display font-semibold">Connect</p><ul className="mt-4 space-y-2.5 text-sm">
          <li><Link className="transition hover:text-accent" to="/contact">Start a project</Link></li>
          {SITE.email && <li><a className="inline-flex items-center gap-2 transition hover:text-accent" href={`mailto:${SITE.email}`}><Mail size={14} />{SITE.email}</a></li>}
          {SITE.whatsapp && <li><a className="inline-flex items-center gap-2 transition hover:text-accent" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />WhatsApp</a></li>}
          <li><Link className="transition hover:text-accent" to="/privacy-policy">Privacy Policy</Link></li><li><Link className="transition hover:text-accent" to="/terms">Terms &amp; Conditions</Link></li></ul></div>
      </div>
      <div className="ft-bottom py-6 text-center text-xs">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
    </footer>)
}
export default function Layout() {
  useReveal()
  return (<>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-surface focus:p-2">Skip to content</a>
    <Header /><main id="main"><Outlet /></main><Footer />
    {SITE.whatsapp && <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-4 right-4 z-40 rounded-full bg-green-500 p-3 text-white shadow-xl transition hover:scale-110 sm:bottom-5 sm:right-5 sm:p-3.5"><MessageCircle /></a>}
  </>)
}