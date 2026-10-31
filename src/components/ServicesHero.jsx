
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import ServicesScene from './ServicesScene'
import './ServicesHero.css'

export const ServicesArt = () => (
  <ServicesScene className="sv-art" />
)

const PHRASES = [
  ['Empower Your', 'Brand with Marketing'],
  ['Empower Your', 'Network with V Cards'],
  ['Empower Your', 'Growth with CodeZyntax'],
]

const INTERVAL = 3800

export default function ServicesHero() {
  const [pos, setPos] = useState(0)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const sync = () => setStill(mq.matches)

    sync()
    mq.addEventListener('change', sync)

    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (still) return undefined

    const timer = setInterval(() => {
      setPos((current) => (current + 1) % PHRASES.length)
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [still])

  return (
    <section
      className="sv-hero"
      aria-labelledby="sv-hero-title"
    >
      <div className="sv-bg" aria-hidden="true">
        <i className="sv-orb sv-orb-a" />
        <i className="sv-orb sv-orb-b" />
        <i className="sv-orb sv-orb-c" />
      </div>

      <div className="container-x sv-hero-grid">
        <div className="sv-hero-copy" data-reveal>
          <p className="sv-kicker">
            <b aria-hidden="true">+</b>
            Our Services
          </p>

          <h1
            id="sv-hero-title"
            className="sv-title"
          >
            <span className="sv-rotor">
              {PHRASES.map(([lead, highlight], i) => (
                <span
                  key={highlight}
                  className="sv-ph"
                  data-state={i === pos ? 'active' : 'idle'}
                  aria-hidden={i !== pos}
                >
                  <span className="sv-lead">
                    {lead}
                  </span>

                  <span className="sv-grad">
                    {highlight}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p className="sv-desc">
            At CodeZyntax Softwares LLP, we create
            effective software solutions, creative
            digital marketing strategies, and smart
            digital V Cards to help your brand connect,
            grow, and succeed digitally.
          </p>

          <div className="sv-hero-actions">
            <Link
              to="/contact"
              className="sv-btn sv-btn-primary"
            >
              Discuss Your Project
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>

            <a
              href="#services-list"
              className="sv-btn sv-btn-ghost"
            >
              View Services
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          className="sv-hero-art"
          data-reveal
          aria-label="3D illustration of digital services"
        >
          <ServicesArt />
        </div>
      </div>
    </section>
  )
}
