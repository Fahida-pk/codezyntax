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

import Seo from '../components/Seo'
import { PageHero, ServiceCard } from '../components/ui'
import ServicesHero from '../components/ServicesHero'
import { SERVICES } from '../data/site'
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
        <li key={service.slug}>
          <ServiceCard s={service} n={index + 1} full />
        </li>
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

export function ServiceDetail({ slug: fixed }) {
  const params = useParams()
  const slug = fixed || params.slug

  const service = SERVICES.find((item) => item.slug === slug)

  if (!service) {
    return <Navigate to="/service" replace />
  }

  return (
    <>
      <Seo
        title={service.title}
        description={service.summary}
      />

      <PageHero
        title={service.title}
        text={service.summary}
      />

      {/* Service benefits */}
      <section className="section">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl">Benefits</h2>

          <ul className="mt-4 space-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <CheckCircle2
                  className="shrink-0 text-accent-dark"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Link
            to={`/contact?service=${encodeURIComponent(service.title)}`}
            className="btn-dark mt-8 inline-flex"
          >
            Enquire About This Service
          </Link>
        </div>
      </section>

      {/* CTA on service detail page */}
      <ReadyToBuildCTA />
    </>
  )
}