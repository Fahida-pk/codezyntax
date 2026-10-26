import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import ServicesScene from './ServicesScene'
import './ServicesHero.css'

/* The hero illustration is the shared isometric 3D scene (platform, glass dashboard and six glossy
   service icons). It is a vector component, so it stays sharp on every screen. */
export const ServicesArt = () => <ServicesScene className="sv-art" />

export default function ServicesHero() {
  return (
    <section className="sv-hero aurora" aria-labelledby="sv-hero-title">
      <div className="container-x sv-hero-grid">
        <div className="sv-hero-copy" data-reveal>
          <span className="sv-pill"><i aria-hidden="true" />What we do</span>
          <h1 id="sv-hero-title">Our Services</h1>
          <p>Technology and marketing services for growing businesses.</p>
          <div className="sv-hero-actions">
            <Link to="/contact" className="sv-btn sv-btn-primary">Discuss Your Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="#services-list" className="sv-btn sv-btn-ghost">View Services <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="sv-hero-art" data-reveal><ServicesArt /></div>
      </div>
    </section>
  )
}