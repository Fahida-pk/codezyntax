import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// ServiceCard now lives in its own file (ServiceCard.jsx + ServiceCard.css).
// Re-exported here so every existing `import { ServiceCard } from '../components/ui'` keeps working.
export { default as ServiceCard } from './ServiceCard'

export const Head = ({ k, t, d, dark, center }) => (
  <div data-reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    <p className={`eyebrow ${dark ? '!text-accent' : ''}`}>{k}</p>
    <h2 className={`mt-3 text-3xl sm:text-5xl ${dark ? '!text-white' : ''}`}>{t}</h2>
    {d && <p className={`mt-4 text-base sm:text-lg ${dark ? 'text-white/65' : ''}`}>{d}</p>}
  </div>
)
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