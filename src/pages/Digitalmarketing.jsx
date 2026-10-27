import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, Share2, Megaphone, PenTool, Check, ArrowRight, ArrowUpRight, Plus,
  Compass, Sparkles, Rocket, TrendingUp,
} from 'lucide-react'
import Seo from '../components/Seo'
import { SITE } from '../data/site'
import './DigitalMarketing.css'

/* 3D illustrations: copy the four SVG files into public/images/.
   If one is missing the page still works (the image simply hides; the hero shows a CSS dashboard). */
const IMG = {
  hero: '/images/projects/digital-marketing-hero.svg',
  about: '/images/projects/dm-about-3d.svg',
  why: '/images/projects/dm-why-3d.svg',
  expertise: '/images/projects/dm-expertise-3d.svg',
}

/* ---- Content: taken from https://www.codezyntax.com/digital-marketing/ (grammar tidied only) ---- */
const EXPERTISE = [
  { icon: Compass, title: 'Strategic Campaign Planning' },
  { icon: Search, title: 'SEO & Organic Growth' },
  { icon: Share2, title: 'Social Media Management' },
  { icon: Megaphone, title: 'PPC & Performance Ads' },
  { icon: PenTool, title: 'Content Marketing & Branding' },
]

const WHY = [
  'Proven expertise in SEO, social media, and paid marketing',
  'Data-backed strategies that maximise ROI',
  'Creative content that connects and converts',
  'Transparent performance tracking and reporting',
  'Dedicated team focused on your business growth',
]

const JOURNEY = [
  {
    icon: Compass, kicker: 'Foundation', sub: 'Understanding Goals & Building a Digital Roadmap', title: 'Discovery & Strategy',
    text: 'We start with research-driven discovery sessions focused on understanding your real goals, audience behaviour and competition. This helps us create an effective strategy that supports stable, scalable business growth.',
  },
  {
    icon: Sparkles, kicker: 'Creative Development', sub: 'Crafting a Strong Brand Identity', title: 'Brand Presence & Messaging',
    text: 'We shape a strong brand voice and digital identity through creative storytelling and powerful visual communication, so every message reflects quality and builds deeper customer trust and recall.',
  },
  {
    icon: Rocket, kicker: 'Growth Activation', sub: 'Boosting Visibility & Reach', title: 'Performance Marketing (SEO & PPC)',
    text: 'Our performance-oriented approach builds strong visibility and conversion, applying proven methods trusted by brands that want long-term, effective results.',
  },
  {
    icon: TrendingUp, kicker: 'Optimization Phase', sub: 'Building Long-Term Connections', title: 'Engagement & Growth',
    text: 'We optimize campaigns and refine targeting through ongoing data analysis, helping your brand reach impactful engagement and conversion milestones.',
  },
]

const FAQS = [
  {
    q: 'What makes CodeZyntax a reliable partner for digital growth?',
    a: 'As the Best Digital Marketing Company in Palakkad, CodeZyntax Softwares LLP focuses on effective, ROI-driven campaigns with strategic preparation and execution. This is backed by our ability, as a leading software company in Palakkad, to connect digital marketing with personalized technology solutions.',
  },
  {
    q: 'What digital marketing services do you offer for businesses of all sizes?',
    a: 'We deliver complete SEO, branding, ads management, automation and digital transformation solutions, supported by our software development expertise for businesses that need customized digital systems or online platforms.',
  },
  {
    q: 'Do you offer search engine optimization (SEO) for local and regional businesses?',
    a: 'Yes. We deliver premium optimization services personalized for business growth, including SEO services in Pattambi, improving visibility and client acquisition with the latest ranking strategies.',
  },
  {
    q: 'Can you also build advanced web applications along with the marketing solutions?',
    a: 'Absolutely. We provide end-to-end development and marketing support, integrating brand strategy with our web app development in Palakkad for companies that need personalized platforms to streamline operations.',
  },
  {
    q: 'Do you also provide website design and branding services apart from marketing?',
    a: 'Yes. We specialize in responsive UI/UX and conversion-focused websites, including WordPress web design, merging design, branding, marketing strategy and user psychology to strengthen your customers’ digital presence.',
  },
  {
    q: 'Are there any additional branding or reputation-boosting tools available?',
    a: 'Yes. We support offline-to-online engagement through smart contact products such as NFC business cards, plus customized tools like the Google review scanner and Google review stand, alongside our broader growth support as a digital marketing agency in Pattambi.',
  },
]

/* Decorative CSS dashboard, used only if the hero image fails to load */
function DashboardMock() {
  const bars = [38, 56, 46, 74, 62, 92]
  return (
    <div className="dm-mock" aria-hidden="true">
      <div className="dm-mock-top"><span className="dm-mock-dot" /><span className="dm-mock-dot" /><span className="dm-mock-dot" /><span className="dm-mock-pill" /></div>
      <div className="dm-mock-body">
        <div className="dm-mock-side"><span className="dm-mock-nav is-on" /><span className="dm-mock-nav" /><span className="dm-mock-nav" /><span className="dm-mock-nav" /></div>
        <div className="dm-mock-main">
          <div className="dm-mock-tiles"><span /><span /><span /></div>
          <div className="dm-mock-chart">
            {bars.map((h, i) => <span key={i} className="dm-mock-col" style={{ height: `${h}%` }} />)}
            <svg className="dm-mock-line" viewBox="0 0 300 100" preserveAspectRatio="none"><path d="M0 84 C40 74 62 80 92 58 S152 44 186 30 S262 14 300 6" fill="none" vectorEffect="non-scaling-stroke" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Illustration with a graceful fallback (hides itself if the file is missing) */
function Art({ src, alt, width, height }) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <img
      className="dm-art"
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setOk(false)}
    />
  )
}

function HeroVisual() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="dm-hero-visual" data-reveal>
      <div className="dm-hero-glow" aria-hidden="true" />
      <div className="dm-float">
        {failed ? <DashboardMock /> : (
          <img
            className="dm-art"
            src={IMG.hero}
            width="900"
            height="770"
            alt="3D digital marketing dashboard with growth charts, search results panel, social engagement card and campaign performance widget"
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  const btns = useRef([])
  const onKey = (e, i) => {
    const n = FAQS.length
    let t = null
    if (e.key === 'ArrowDown') t = (i + 1) % n
    else if (e.key === 'ArrowUp') t = (i - 1 + n) % n
    else if (e.key === 'Home') t = 0
    else if (e.key === 'End') t = n - 1
    if (t !== null) { e.preventDefault(); btns.current[t]?.focus() }
  }
  return (
    <div className="dm-faq-list">
      {FAQS.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className={`dm-faq-item${isOpen ? ' is-open' : ''}`}>
            <h3 className="dm-faq-h">
              <button
                ref={el => (btns.current[i] = el)}
                type="button"
                className="dm-faq-q"
                id={`dm-faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`dm-faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                onKeyDown={e => onKey(e, i)}
              >
                <span>{f.q}</span>
                <Plus size={20} aria-hidden="true" />
              </button>
            </h3>
            <div id={`dm-faq-panel-${i}`} role="region" aria-labelledby={`dm-faq-btn-${i}`} className="dm-faq-a">
              <div><p>{f.a}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function DigitalMarketing() {
  return (
    <div className="dm">
      <Seo
        title="Best Digital Marketing Company in Palakkad"
        description="Choose one of the best digital marketing companies in Palakkad for SEO, social media marketing, and result-focused digital growth services."
      />

      {/* 1. HERO */}
      <section className="dm-hero" aria-labelledby="dm-hero-title">
        <div className="dm-wrap dm-hero-grid">
          <div className="dm-hero-copy">
            <p className="dm-eyebrow dm-eyebrow-pill" data-reveal>Best Digital Marketing Company in Palakkad</p>
            <h1 id="dm-hero-title" className="dm-hero-title" data-reveal>
              Result-Driven <span className="dm-grad">Digital Marketing</span> Services
            </h1>
            <p className="dm-lead" data-reveal>
              At CodeZyntax Softwares LLP, we combine creativity, data and technology to help businesses grow online. We deliver powerful strategies across SEO, social media, performance ads and content marketing to attract, engage and convert your target audience effectively.
            </p>
            <div className="dm-cta-row" data-reveal>
              <Link to="/contact" className="dm-btn dm-btn-primary">Get a Proposal <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <a href="#dm-about" className="dm-btn dm-btn-ghost">Explore More <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <ul className="dm-trust" data-reveal>
              {['Transparent', 'Data-driven', 'Performance-focused'].map(t => (
                <li key={t}><Check size={16} aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* 2. FOCUS STRIP */}
      <section className="dm-strip-sec" aria-label="Our digital marketing focus areas">
        <div className="dm-wrap">
          <ul className="dm-strip" data-reveal>
            {EXPERTISE.slice(1).map(({ icon: Icon, title }) => (
              <li key={title} className="dm-strip-item">
                <span className="dm-ico"><Icon size={22} aria-hidden="true" /></span>
                <strong>{title}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. ABOUT */}
      <section id="dm-about" className="dm-sec" aria-labelledby="dm-about-title">
        <div className="dm-wrap dm-split">
          <div className="dm-split-art" data-reveal>
            <div className="dm-art-glow" aria-hidden="true" />
            <Art src={IMG.about} width="800" height="560" alt="3D isometric growth chart with floating search and social engagement cards" />
          </div>
          <div className="dm-split-copy">
            <p className="dm-eyebrow" data-reveal>ABOUT OUR DIGITAL MARKETING SERVICES</p>
            <h2 id="dm-about-title" className="dm-h2-left" data-reveal>We Are a Dynamic Team Driving Digital Growth</h2>
            <p className="dm-body" data-reveal>
              At CodeZyntax Softwares LLP, our expert digital marketing team blends creativity, strategy and technology to help businesses grow faster online. We create specific campaigns across SEO, social media marketing, paid advertising and content marketing so your brand connects with the right target audience and drives profitable growth.
            </p>
            <p className="dm-body" data-reveal>
              Our approach is always transparent, data-driven and performance-focused, so every click, impression and conversion brings you closer to your business objectives. We don’t just market brands. We build long-term digital success stories that help you stand out in today’s competitive market.
            </p>
            <div data-reveal><Link to="/contact" className="dm-btn dm-btn-primary">Talk to Our Team <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="dm-sec dm-why" aria-labelledby="dm-why-title">
        <div className="dm-wrap dm-split dm-split-rev">
          <div className="dm-split-copy">
            <p className="dm-eyebrow" data-reveal>WHY CHOOSE US?</p>
            <h2 id="dm-why-title" className="dm-h2-left" data-reveal>Driving Meaningful Digital Growth</h2>
            <p className="dm-body" data-reveal>
              We drive meaningful digital growth with result-focused strategies. To increase your brand visibility, engagement and conversions, we use creative, data-driven solutions. From SEO to social media, content and paid ads, every plan is customized to your goals and target audience.
            </p>
            <ul className="dm-checks">
              {WHY.map((b, i) => (
                <li key={b} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="dm-tick"><Check size={15} aria-hidden="true" /></span>{b}
                </li>
              ))}
            </ul>
            <p className="dm-body" data-reveal>
              Every campaign is driven by purpose and performance. With CodeZyntax Softwares LLP, your brand gets the digital visibility, engagement and impact it deserves.
            </p>
          </div>
          <div className="dm-split-art" data-reveal>
            <div className="dm-art-glow" aria-hidden="true" />
            <Art src={IMG.why} width="800" height="560" alt="3D layered analytics dashboard with a verified shield badge" />
          </div>
        </div>
      </section>

      {/* 5. CORE EXPERTISE */}
      <section className="dm-sec" aria-labelledby="dm-exp-title">
        <div className="dm-wrap dm-split">
          <div className="dm-split-art" data-reveal>
            <div className="dm-art-glow" aria-hidden="true" />
            <Art src={IMG.expertise} width="800" height="600" alt="3D platform with glossy icons for SEO, social media, performance ads, content and branding" />
          </div>
          <div className="dm-split-copy">
            <p className="dm-eyebrow" data-reveal>OUR CORE EXPERTISE</p>
            <h2 id="dm-exp-title" className="dm-h2-left" data-reveal>We Design and Build Your Digital Success!</h2>
            <p className="dm-body" data-reveal>
              CodeZyntax Softwares LLP helps local and international brands overcome visibility, lead-generation and conversion challenges. Instead of generic ads, we create custom funnels that attract the right audience for your business and convert them into long-term customers.
            </p>
            <ul className="dm-exp">
              {EXPERTISE.map(({ icon: Icon, title }, i) => (
                <li key={title} className="dm-exp-item" data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="dm-ico"><Icon size={20} aria-hidden="true" /></span>
                  <span>{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. STRATEGIC DIGITAL EVOLUTION */}
      <section className="dm-journey" aria-labelledby="dm-journey-title">
        <div className="dm-glow dm-glow-a" aria-hidden="true" />
        <div className="dm-glow dm-glow-b" aria-hidden="true" />
        <div className="dm-wrap">
          <header className="dm-head dm-head-dark" data-reveal>
            <p className="dm-eyebrow">HOW WE WORK</p>
            <h2 id="dm-journey-title">Our Strategic Digital Evolution</h2>
            <p>
              Our digital marketing journey is built on experienced strategy, precision and measurable growth. Every step focuses on understanding your goals, building data-driven campaigns and gaining sustainable results that elevate your online presence and long-term brand value.
            </p>
          </header>
          <ol className="dm-steps">
            {JOURNEY.map(({ icon: Icon, kicker, sub, title, text }, i) => (
              <li key={title} className="dm-step" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="dm-step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="dm-step-card">
                  <p className="dm-step-kicker"><Icon size={15} aria-hidden="true" />{kicker}</p>
                  <p className="dm-step-sub">{sub}</p>
                  <h3><span className="dm-sr">Step {i + 1}: </span>{title}</h3>
                  <p className="dm-step-text">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="dm-sec dm-faq" aria-labelledby="dm-faq-title">
        <div className="dm-wrap dm-faq-wrap">
          <header className="dm-head" data-reveal>
            <p className="dm-eyebrow">FAQ</p>
            <h2 id="dm-faq-title">Find Out Answers Here</h2>
          </header>
          <div data-reveal><Faq /></div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="dm-cta-sec" aria-labelledby="dm-cta-title">
        <div className="dm-wrap">
          <div className="dm-cta-panel" data-reveal>
            <span className="dm-shape dm-shape-a" aria-hidden="true" />
            <span className="dm-shape dm-shape-b" aria-hidden="true" />
            <span className="dm-shape dm-shape-c" aria-hidden="true" />
            <h2 id="dm-cta-title">Ready to Grow Your Digital Presence?</h2>
            <p>Let&apos;s build a smarter digital marketing strategy that helps your business reach more people and create meaningful opportunities.</p>
            <Link to="/contact" className="dm-btn dm-btn-light">Get a Proposal <ArrowUpRight size={17} aria-hidden="true" /></Link>
            {SITE.email && <p className="dm-cta-mail"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>}
          </div>
        </div>
      </section>
    </div>
  )
}