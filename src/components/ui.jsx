import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
export const Head = ({ k, t, d, dark, center }) => (
  <div data-reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    <p className={`eyebrow ${dark ? '!text-accent' : ''}`}>{k}</p>
    <h2 className={`mt-3 text-3xl sm:text-5xl ${dark ? '!text-white' : ''}`}>{t}</h2>
    {d && <p className={`mt-4 text-base sm:text-lg ${dark ? 'text-white/65' : ''}`}>{d}</p>}
  </div>
)
export const ServiceCard = ({ s, n }) => {
  const Icon = Icons[s.icon] || Icons.Code2
  return (
    <Link to={`/service/${s.slug}`} data-reveal className="card group block">
      <div className="flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-cyan text-white shadow-lg shadow-accent/30"><Icon size={24} /></span>
        {n && <span className="font-display text-sm text-muted">{String(n).padStart(2, '0')}</span>}
      </div>
      <h3 className="mt-6 text-xl">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{s.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-dark transition-all group-hover:gap-2">Learn more <ArrowRight size={14} /></span>
    </Link>
  )
}
export const PageHero = ({ title, text }) => (
  <section className="aurora py-20 sm:py-28"><div className="container-x"><h1 className="max-w-3xl text-4xl sm:text-6xl">{title}</h1>{text && <p className="mt-5 max-w-2xl text-lg">{text}</p>}</div></section>
)
export const Cta = () => (
  <section id="contact" className="bg-surface py-20"><div className="container-x">
    <div data-reveal className="ink relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16">
      <h2 className="mx-auto max-w-2xl text-3xl !text-white sm:text-5xl">Ready to build the version your business deserves?</h2>
      <p className="mx-auto mt-4 max-w-xl text-white/65">Share your goal or challenge and we will respond with a clear direction.</p>
      <Link to="/contact" className="btn-primary mt-8">Let's Discuss Your Project <ArrowUpRight size={16} /></Link>
    </div></div></section>
)
