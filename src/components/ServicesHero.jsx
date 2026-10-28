import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import ServicesScene from './ServicesScene'
import './ServicesHero.css'

/* The hero illustration is the shared isometric 3D scene (platform, glass dashboard and six glossy service icons). */
export const ServicesArt = () => <ServicesScene className="sv-art" />

/* [plain lead, gradient highlight]. All three are stacked in one grid cell, so the heading box is always
   as tall as the longest phrase: the full text is never cut off and the page never jumps while it rotates. */
const PHRASES = [
  ['Empower Your', 'Brand with Marketing'],
  ['Empower Your', 'Network with V Cards'],
  ['Empower Your', 'Growth with CodeZyntax'],
]
const INTERVAL = 3800

export default function ServicesHero() {
  const [pos, setPos] = useState({ cur: 0, prev: -1 })
  const [still, setStill] = useState(false)

  // honour "reduce motion": show the first phrase and do not rotate
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStill(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // advance every few seconds; restarts whenever the phrase changes (including after a dot click)
  useEffect(() => {
    if (still) return undefined
    const t = setTimeout(
      () => setPos((p) => ({ cur: (p.cur + 1) % PHRASES.length, prev: p.cur })),
      INTERVAL,
    )
    return () => clearTimeout(t)
  }, [pos.cur, still])

  const go = (i) => setPos((p) => (i === p.cur ? p : { cur: i, prev: p.cur }))

  return (
    <section className="sv-hero" aria-labelledby="sv-hero-title">
      <div className="sv-bg" aria-hidden="true">
        <i className="sv-orb sv-orb-a" />
        <i className="sv-orb sv-orb-b" />
        <i className="sv-orb sv-orb-c" />
      </div>

      <div className="container-x sv-hero-grid">
      <div className="sv-hero-copy" data-reveal>
        <h1 id="sv-hero-title" className="sv-title">
          <span className="sv-pill"><i aria-hidden="true" />Our Services</span>

          <span className="sv-rotor">
            {PHRASES.map(([lead, highlight], i) => (
              <span
                key={highlight}
                className="sv-ph"
                data-state={i === pos.cur ? 'active' : i === pos.prev ? 'out' : 'idle'}
                aria-hidden={i === pos.cur ? undefined : 'true'}
              >
                <span className="sv-lead">{lead}</span>
                <span className="sv-grad">{highlight}</span>
              </span>
            ))}
          </span>
        </h1>

        <p className="sv-desc">At CodeZyntax Softwares LLP, the Best Software Company in Palakkad, we creating an effective software solutions, creative digital marketing strategies, and smart digital V Cards that is to help your brand connect, grow, and win through digitally.</p>

        <div className="sv-hero-actions">
          <Link to="/contact" className="sv-btn sv-btn-primary">Discuss Your Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a href="#services-list" className="sv-btn sv-btn-ghost">View Services <ArrowRight size={18} aria-hidden="true" /></a>
        </div>

       
      </div>

      {/* 3D illustration (vector, sharp on every screen) */}
      <div className="sv-hero-art" data-reveal><ServicesArt /></div>
      </div>
    </section>
  )
}