import { useEffect, useRef, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Code2,
  Users,
  Rocket,
  ShieldCheck,
  Clock,
  Headset,
  Target,
} from 'lucide-react'
import './ServiceDetail.css'
import '../components/ServiceCard'
import Seo from '../components/Seo'
import { PageHero, ServiceCard } from '../components/ui'
import ServicesHero from '../components/ServicesHero'
import ServiceIllustration from '../components/ServiceIllustration'
import { SERVICES } from '../data/site'
import { SERVICE_CONTENT, getServiceKind } from '../data/serviceContent'
import './Home.css'

// ================= WHY CHOOSE US DATA =================

const WU_STATS = [
  [Rocket, 'Since 2017', 'Our Journey'],
  [Users, 'Client Focused', 'Our Approach'],
  [Code2, 'Digital First', 'Our Solutions'],
]

const WU_POINTS = [
  [Target, 'Customized solutions for your business needs'],
  [Code2, 'Modern technology and creative development'],
  [ShieldCheck, 'Quality-focused and reliable solutions'],
  [Clock, 'Clear communication and timely delivery'],
  [Headset, 'Support throughout your digital journey'],
]

// ================= WHY CHOOSE US SECTION =================

function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="hm-sec hm-wu"
      aria-labelledby="hm-wu-title"
    >
      <div className="hm-wrap">
        <div className="hm-wu-grid">
          <div className="hm-wu-copy">
            <div data-reveal className="hm-head">
              <span className="hm-pill">
                <i aria-hidden="true" />
                Our Approach
              </span>

              <h2 id="hm-wu-title">Why Choose Us?</h2>
            </div>

            <p data-reveal className="hm-wu-text">
              At CodeZyntax Softwares LLP, we specialize in{' '}
              <strong>progressive software solutions</strong>,{' '}
              <strong>creative online strategies</strong>, and seamless
              user experiences. Our mission is to empower businesses
              with custom websites, applications, and digital marketing
              solutions that support engagement and long-term growth.
              We focus on quality, creativity, and purpose in every project.
            </p>

            <ul className="hm-wu-stats">
              {WU_STATS.map(([Icon, value, label]) => (
                <li
                  key={label}
                  data-reveal
                  className="hm-wu-stat"
                >
                  <span className="hm-wu-sico">
                    <Icon
                      size={18}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </span>

                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="hm-wu-panel">
            <p className="hm-eyebrow">What You Get</p>

            <ul className="hm-wu-list">
              {WU_POINTS.map(([Icon, text]) => (
                <li key={text}>
                  <span className="hm-wu-ico">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="hm-wu-pt">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p data-reveal className="hm-wu-note">
          We combine creativity and technology to deliver customized
          digital solutions that help businesses strengthen their
          online presence and grow with confidence.
        </p>
      </div>
    </section>
  )
}

// ================= CTA 3D ARTWORK =================

function CtaArt({ side }) {
  const flip = side === 'right'

  return (
    <svg
      className={`hm-cta-art hm-cta-art-${side}`}
      viewBox="0 0 360 420"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={`cta-top-${side}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#d9e8ff" />
          <stop offset="100%" stopColor="#8fb6ff" />
        </linearGradient>

        <linearGradient
          id={`cta-left-${side}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#4d86ff" />
          <stop offset="100%" stopColor="#2a45d8" />
        </linearGradient>

        <linearGradient
          id={`cta-right-${side}`}
          x1="1"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#7f9bff" />
          <stop offset="100%" stopColor="#2b3fb8" />
        </linearGradient>

        <radialGradient
          id={`cta-orb-${side}`}
          cx=".3"
          cy=".25"
          r=".8"
        >
          <stop offset="0%" stopColor="#fff" />
          <stop offset="45%" stopColor="#7fb2ff" />
          <stop offset="100%" stopColor="#3b4fe0" />
        </radialGradient>
      </defs>

      <g transform={flip ? 'translate(360 0) scale(-1 1)' : undefined}>
        <path
          d="M-10 330 C80 260 160 380 260 300 S350 200 380 220"
          fill="none"
          stroke="#7aa6ff"
          strokeOpacity=".45"
          strokeWidth="1.6"
        />

        {/* Large 3D cube */}
        <g className="hm-fl-a">
          <path
            d="M140 150 220 195 140 240 60 195Z"
            fill={`url(#cta-top-${side})`}
          />
          <path
            d="M60 195 140 240V340L60 295Z"
            fill={`url(#cta-left-${side})`}
          />
          <path
            d="M220 195 140 240V340L220 295Z"
            fill={`url(#cta-right-${side})`}
          />
        </g>

        {/* Small cube */}
        <g className="hm-fl-b">
          <path
            d="M268 90 312 114 268 138 224 114Z"
            fill="#e6eeff"
          />
          <path
            d="M224 114 268 138V192L224 168Z"
            fill={`url(#cta-left-${side})`}
          />
          <path
            d="M312 114 268 138V192L312 168Z"
            fill="#2f55d8"
          />
        </g>

        {/* Cyan 3D slab */}
        <g className="hm-fl-c">
          <path
            d="M60 78 112 104 60 130 8 104Z"
            fill="#d9fbff"
          />
          <path
            d="M8 104 60 130V146L8 120Z"
            fill="#22b8ff"
          />
          <path
            d="M112 104 60 130V146L112 120Z"
            fill="#1494d8"
          />
        </g>

        {/* Decorative rings and orbs */}
        <circle
          cx="300"
          cy="260"
          r="26"
          fill="none"
          stroke="#7aa6ff"
          strokeWidth="5"
          strokeOpacity=".65"
        />

        <circle
          className="hm-fl-b"
          cx="196"
          cy="86"
          r="14"
          fill={`url(#cta-orb-${side})`}
        />

        <circle
          className="hm-fl-c"
          cx="30"
          cy="250"
          r="9"
          fill={`url(#cta-orb-${side})`}
        />

        <circle
          className="hm-fl-a"
          cx="330"
          cy="352"
          r="7"
          fill={`url(#cta-orb-${side})`}
        />
      </g>
    </svg>
  )
}

// ================= SHARED READY TO BUILD CTA =================

function ReadyToBuildCTA() {
  return (
    <section
      id="contact"
      className="hm-final"
      aria-labelledby="hm-final-title"
    >
      <CtaArt side="left" />
      <CtaArt side="right" />

      <div className="hm-wrap hm-final-inner">
        <span className="hm-pill">
          <i aria-hidden="true" />
          Let's Work Together
        </span>

        <h2 id="hm-final-title">
          Ready to Build the Version
          <br />
          Your Business Deserves?
        </h2>

        <p>
          Share your goals with us, and let's turn your ideas into
          practical digital solutions.
        </p>

        <div className="hm-final-actions">
          <Link to="/contact" className="hm-btn hm-btn-primary">
            Let's Discuss Your Project
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>

          <Link to="/service" className="hm-btn hm-btn-outline">
            Explore Our Services
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ================= SERVICE CARD: STAGGERED REVEAL + HOVER LIGHT =================

function ServiceCardFx({ index, children }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <li
      ref={ref}
      className={`svx-card ${seen ? 'is-in' : ''}`}
      style={{ '--c3': index % 3, '--c2': index % 2 }}
      onPointerMove={onMove}
    >
      {children}
    </li>
  )
}

// ================= SERVICES PAGE =================

export function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Custom software, web, mobile, Windows, digital marketing and digital business card services from CodeZyntax."
      />

      {/* Hero: text on the left, 3D illustration on the right */}
      <ServicesHero />

      {/* Services cards: compact design, full descriptions */}
      <section id="services-list" className="section svc-page-section">
        <div className="container-x">
          <ul className="svc-grid">
            {SERVICES.map((service, index) => (
              <ServiceCardFx key={service.slug} index={index}>
                <ServiceCard s={service} n={index + 1} full />
              </ServiceCardFx>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* READY TO BUILD CTA */}
      <ReadyToBuildCTA />
    </>
  )
}

// ================= SERVICE DETAIL PAGE =================

// Fades a block in once, when it scrolls into view.
function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`service-detail-reveal ${seen ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function SectionHeading({ label, title, text }) {
  return (
    <Reveal className="service-detail-heading">
      <span>{label}</span>
      <h2 className="service-detail-grad">{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

export function ServiceDetail({ slug: fixed }) {
  const params = useParams()
  const slug = fixed || params.slug

  // Always start a service page at the top when switching services.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  const service = SERVICES.find((item) => item.slug === slug)

  if (!service) {
    return <Navigate to="/service" replace />
  }

  const kind = getServiceKind(service)
  const c = SERVICE_CONTENT[kind]
  const enquiryUrl = `/contact?service=${encodeURIComponent(service.title)}`

  return (
    <>
      <Seo title={service.title} description={service.summary} />

      <main className="service-detail-page" key={service.slug}>
        {/* ---------------- HERO ---------------- */}
        <section className="service-detail-hero">
          <div className="service-detail-container">
            <div className="service-detail-copy">
              <span className="service-detail-eyebrow">
                <span />
                {c.kicker}
              </span>

              <h1 className="service-detail-title">{service.title}</h1>

              <p className="service-detail-description">{c.lead}</p>

              <div className="service-detail-actions">
                <Link to={enquiryUrl} className="service-detail-primary">
                  Enquire About This Service
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>

              <ul className="service-detail-points">
                {c.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-detail-visual">
              <ServiceIllustration kind={kind} />
            </div>
          </div>
        </section>

        {/* ---------------- FEATURES ---------------- */}
        <section className="service-detail-section service-detail-features">
          <div className="service-detail-container">
            <SectionHeading
              label="WHAT'S INCLUDED"
              title={`Key features of ${service.title}`}
              text="Everything you need to go from idea to a reliable, professional result."
            />

            <div className="service-detail-feature-grid">
              {c.features.map(([Icon, title, text], i) => (
                <Reveal
                  as="article"
                  key={title}
                  delay={(i % 3) * 70}
                  className="service-detail-feature"
                >
                  <span className="service-detail-icon">
                    <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- BENEFITS ---------------- */}
        <section className="service-detail-section service-detail-benefits">
          <div className="service-detail-container">
            <SectionHeading
              label="BUSINESS VALUE"
              title={`Benefits of ${service.title}`}
              text={c.value}
            />

            <div className="service-detail-benefit-grid">
              {c.benefits.map(([title, text], i) => (
                <Reveal
                  as="article"
                  key={title}
                  delay={(i % 2) * 80}
                  className="service-detail-benefit-card"
                >
                  <span className="service-detail-check">
                    <CheckCircle2 size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- TECHNOLOGIES + USE CASES ---------------- */}
        <section className="service-detail-section service-detail-stack">
          <div className="service-detail-container">
            <Reveal className="service-detail-board">
              <div className="service-detail-board-col">
                <h2>Technologies &amp; tools</h2>
                <p>The tools we rely on to deliver this service.</p>
                <ul className="service-detail-chips">
                  {c.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-board-col">
                <h2>Who it&rsquo;s for</h2>
                <p>Common situations where this service fits best.</p>
                <ul className="service-detail-ideal">
                  {c.idealFor.map((item) => (
                    <li key={item}>
                      <span className="service-detail-dot">
                        <CheckCircle2 size={15} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- PROCESS ---------------- */}
        <section className="service-detail-section service-detail-process">
          <div className="service-detail-container">
            <SectionHeading
              label="OUR PROCESS"
              title="How we work with you"
              text="A clear, collaborative process with no surprises."
            />

            <ol className="service-detail-steps">
              {c.process.map(([title, text], i) => (
                <Reveal as="li" key={title} delay={i * 80} className="service-detail-step">
                  <span className="service-detail-step-no">{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- LET'S WORK TOGETHER ---------------- */}
        <section className="service-detail-enquiry" id="enquiry">
          <div className="service-detail-container">
            <Reveal className="service-detail-enquiry-inner">
              <span className="service-detail-enquiry-label">LET&rsquo;S WORK TOGETHER</span>
              <h2 className="service-detail-grad">{c.ctaTitle}</h2>
              <p>{c.ctaText}</p>

              <Link to={enquiryUrl} className="service-detail-primary service-detail-primary-lg">
                Discuss Your Project
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>

              <ul className="service-detail-enquiry-notes">
                <li>
                  <ShieldCheck size={16} aria-hidden="true" />
                  Free initial consultation
                </li>
                <li>
                  <ShieldCheck size={16} aria-hidden="true" />
                  Clear scope and timelines
                </li>
                <li>
                  <ShieldCheck size={16} aria-hidden="true" />
                  Confidential by default
                </li>
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}