import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BarChart3, Building2, ChevronDown, Contact, ExternalLink, Layers, LifeBuoy,
  Link2, Leaf, Mail, MapPin, MessageCircle, Palette, Pencil, Phone, QrCode, RefreshCw,
  ShieldCheck, Smartphone, Star, UserRound, Users, Wifi, Wrench, Zap,
} from 'lucide-react'
import './VCardsAlt.css'

/*
  ALT DESIGN – same content as https://www.codezyntax.com/vcards/ (lightly proofread).
  Layout: glass bento tiles + isometric 3D blocks (CSS only, no images).
  "900+ V-Cards Delivered" is on the live page; please confirm it is still accurate.
*/

const LINKS = {
  card: 'https://1card.co.in/',
  templates: 'https://1card.co.in/vcard-templates',
  instagram: 'https://www.instagram.com/1carddigital/',
  whatsapp: 'https://wa.link/i5jjl8',
  phone: 'tel:+918848418551',
}

const STAND = [
  [Wifi, 'Dual Technology', 'Works with both NFC and QR scanning.'],
  [Palette, 'Custom Branding', 'Add your logo, colour and social links.'],
  [Zap, 'Instant Connect', 'Direct users to your website, profile or review page.'],
  [ShieldCheck, 'Durable Design', 'Premium quality materials for long-lasting use.'],
]
const CARDS = [
  [Smartphone, 'Tap & Share', 'Instantly transfer your details to any smartphone.'],
  [Pencil, 'Editable Profile', 'Update info at any time without reprinting.'],
  [Layers, 'Personalized Design', 'Choose from stylish templates that fit your brand.'],
  [Leaf, 'Eco-Friendly', 'One digital card for life, zero paper waste.'],
]
const REVIEW = [
  [Star, 'Instant Reviews', 'Direct link to your Google Business review page.'],
  [Wifi, 'NFC + QR Enabled', 'Works seamlessly with all smartphones.'],
  [ShieldCheck, 'Boost Credibility', 'Build trust through real customer feedback.'],
  [Palette, 'Custom Branding', 'Add your logo, colours and custom brand message.'],
]
const OFFER = [
  [Wifi, 'blue', 'NFC + QR Technology', 'Works on all smartphones, no installation needed.'],
  [Layers, 'cyan', 'Customizable Layouts', 'Branded designs that match your business identity.'],
  [Pencil, 'violet', 'Editable Anytime', 'Update your details anytime without reprinting.'],
  [Contact, 'blue', 'Instant Profile Sharing', 'One tap or scan opens your complete digital card.'],
  [BarChart3, 'cyan', 'Analytics Ready', 'Get insights on how many times your card is viewed.'],
  [Leaf, 'violet', 'Eco-Friendly & Cost-Effective', 'One card for life, zero paper waste.'],
]
const WHY = [
  [Palette, 'Professional Design', 'Clean, customizable templates that fit your brand.', 'blue'],
  [Wrench, 'End-to-End Setup', 'We handle everything from linking to activation.', 'violet'],
  [Pencil, 'Easy Management', 'Edit and update your details anytime.', 'cyan'],
  [LifeBuoy, 'Reliable Support', 'Get help whenever you need it.', 'blue'],
  [Building2, 'Corporate Solutions', 'Bulk cards and custom branding for teams.', 'violet'],
]
const FAQ = [
  ['What is an NFC Stand in India and how does it help businesses?', 'An NFC Stand in India allows customers to instantly access your contact details, services and review links with a simple tap or scan on their smartphone. It works like a tap business card in India, enabling fast engagement and improving customer interaction for both online and offline businesses.'],
  ['Are NFC Stands better than traditional printed business cards?', 'Yes. An NFC Stand in India is more advanced than a printed card because it can be updated at any time without reprinting. It works like a digital business card NFC in India, making it easier to share information digitally and lowering the cost of repeated printing.'],
  ['Can the NFC Stand in India be used to collect Google reviews quickly?', 'Yes. Our NFC Stand in India helps businesses improve their online reputation by letting customers tap and submit ratings instantly. It can also be connected with a Google review stand in Pattambi and a Google review scanner in Palakkad, making it fast and effortless to receive reviews.'],
  ['Is the NFC Stand in India really useful for branding and marketing?', 'Yes. The NFC Stand in India is an effective branding tool that helps businesses stand out at customer touchpoints. Many organizations combine NFC stands with smart products like NFC business cards in Palakkad, supported by the marketing expertise of CodeZyntax for improved brand visibility.'],
  ['Is it possible to customize my NFC Stand in India according to my business requirements?', 'Yes. An NFC Stand in India can be fully customized with your branding, themes and review links. CodeZyntax offers unique smart-stand solutions built by skilled app developers in Palakkad, with premium UI expertise and innovative integrations for strong digital performance.'],
  ['Why should I purchase an NFC Stand in India from CodeZyntax Softwares LLP?', 'CodeZyntax Softwares LLP provides a feature-rich, premium-quality NFC Stand in India backed by marketing technology and software development expertise. We are known as a digital marketing agency in Pattambi and Palakkad, for WordPress web design in Palakkad, website design, and reliable SEO services in Pattambi, and we continue as a trusted software development company in Palakkad.'],
]
const MARQUEE = ['NFC Stand in India', 'QR Technology', 'Google Review Cards', 'Custom Branding', 'Editable Anytime', 'Eco-Friendly', 'Analytics Ready', 'Corporate Solutions']
const PHONES = ['blue', 'violet', 'dark', 'cyan', 'amber']

/* ---------- helpers ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.vx-reveal')
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }), { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Scene({ children, small = false, rx = -20, ry = -32 }) {
  const w = useRef(null)
  const move = (e) => {
    const el = w.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--ry', `${ry + ((e.clientX - r.left) / r.width - 0.5) * 22}deg`)
    el.style.setProperty('--rx', `${rx - ((e.clientY - r.top) / r.height - 0.5) * 14}deg`)
  }
  const leave = () => { w.current?.style.setProperty('--ry', `${ry}deg`); w.current?.style.setProperty('--rx', `${rx}deg`) }
  return (
    <div className={`vx-3d ${small ? 'vx-3d--sm' : ''}`} onMouseMove={move} onMouseLeave={leave} aria-hidden="true">
      <div className="vx-world" ref={w} style={{ '--rx': `${rx}deg`, '--ry': `${ry}deg` }}>{children}</div>
    </div>
  )
}

/* positioned 3D object */
const O = ({ x = 0, y = 0, z = 0, className = '', style, children }) => (
  <div className={`vx-o ${className}`} style={{ '--x': `${x}px`, '--y': `${y}px`, '--z': `${z}px`, ...style }}>{children}</div>
)

/* cuboid: 5 real faces */
const Cub = ({ w, h, d, color = 'blue', front, back, top, className = '', style }) => (
  <div className={`vx-cub vx-c--${color} ${className}`} style={{ '--w': `${w}px`, '--h': `${h}px`, '--d': `${d}px`, ...style }}>
    <i className="vx-f vx-f--front">{front}</i>
    <i className="vx-f vx-f--back">{back}</i>
    <i className="vx-f vx-f--left" />
    <i className="vx-f vx-f--right" />
    <i className="vx-f vx-f--top">{top}</i>
  </div>
)

const Tap = () => (
  <div className="vx-tap"><i /><i /><i /><div className="vx-tap__core"><Wifi size={26} /></div></div>
)

const Stars = ({ size = 18 }) => (
  <div className="vx-stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={size} fill="currentColor" strokeWidth={0} />)}</div>
)

function Ph({ v = 'blue' }) {
  return (
    <div className={`vx-ph vx-ph--${v}`}>
      <div className="vx-ph__s">
        <div className="vx-av"><UserRound size={20} strokeWidth={1.8} /></div>
        <i className="vx-ln vx-ln--n" /><i className="vx-ln vx-ln--s" /><i className="vx-bt" />
        <i className="vx-ln" /><i className="vx-ln vx-ln--s" />
        <div className="vx-ph__a">
          <span><Phone size={13} /></span><span><Mail size={13} /></span>
          <span><MessageCircle size={13} /></span><span><Link2 size={13} /></span>
        </div>
      </div>
    </div>
  )
}

const CardArt = ({ dark = false, title = 'Your Name', sub = 'Tap to share contact, website & socials' }) => (
  <div className="vx-art" style={{ color: dark ? '#0a1230' : '#fff' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <i className="vx-chip" /><Wifi size={22} style={{ transform: 'rotate(90deg)' }} />
    </div>
    <div><b>{title}</b><br /><small>{sub}</small></div>
  </div>
)

/* ---------- scenes ---------- */
const HeroScene = () => (
  <Scene>
    <O y={150}><Cub w={330} h={28} d={330} color="navy" top={<Tap />} /></O>
    <O x={-125} y={30} z={-80}>
      <Cub w={108} h={212} d={12} color="ink" front={<Ph v="dark" />} back={null} />
    </O>
    <O y={10} z={50} className="vx-bob">
      <Cub w={230} h={8} d={144} color="white" top={<CardArt dark />} />
    </O>
    <O x={150} y={-95} z={60} className="vx-bob" style={{ animationDelay: '-1.5s' }}>
      <Cub w={50} h={50} d={50} color="blue" front={<QrCode size={26} color="#fff" />} top={<QrCode size={22} color="#fff" />} />
    </O>
    <O x={-175} y={-115} z={40} className="vx-bob" style={{ animationDelay: '-3s' }}>
      <Cub w={44} h={44} d={44} color="violet" front={<Star size={22} color="#fff" />} />
    </O>
    <O x={175} y={40} z={-40} className="vx-bob" style={{ animationDelay: '-2s' }}>
      <Cub w={42} h={42} d={42} color="cyan" front={<Link2 size={22} color="#fff" />} />
    </O>
  </Scene>
)

const StandScene = () => (
  <Scene small rx={-14} ry={-24}>
    <O style={{ animation: 'vx-sway 9s ease-in-out infinite' }}>
      <O y={118}><Cub w={220} h={24} d={110} color="navy" /></O>
      <O y={-6}>
        <Cub w={180} h={232} d={16} color="blue" front={
          <div className="vx-art vx-art--c">
            <Tap />
            <b>Tap or Scan</b><small>Connect • Follow • Review</small>
            <div className="vx-qr"><QrCode size={40} strokeWidth={1.6} /></div>
          </div>
        } back={<div className="vx-art vx-art--c"><b>CodeZyntax</b><small>NFC + QR Stand</small></div>} />
      </O>
    </O>
  </Scene>
)

const FlipScene = () => (
  <Scene small rx={-10} ry={-16}>
    <O y={-10}>
      <div className="vx-flip">
        <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a8a 55%,#2f5bff)' }}><CardArt /></div>
        <div className="vx-flip__b" style={{ background: 'linear-gradient(135deg,#eef2ff,#c9d8ff)', color: '#0a1230' }}>
          <div className="vx-art vx-art--c" style={{ color: '#0a1230' }}>
            <div className="vx-qr" style={{ background: '#14235e', color: '#fff' }}><Contact size={34} /></div>
            <b>Save Contact</b><small>Website • Socials • Portfolio</small>
          </div>
        </div>
      </div>
    </O>
    <O y={130} z={0}><div style={{ transform: 'rotateX(90deg)' }}><Tap /></div></O>
    <O x={140} y={-110} z={50} className="vx-bob">
      <Cub w={44} h={44} d={44} color="violet" front={<Link2 size={22} color="#fff" />} />
    </O>
  </Scene>
)

const ReviewScene = () => (
  <Scene small rx={-18} ry={-28}>
    {[0, 1, 2, 3, 4].map((i) => {
      const h = 70 + i * 36
      return (
        <O key={i} x={(i - 2) * 72 + 40} y={135 - h / 2} z={-i * 6} className="vx-bob" style={{ animationDelay: `${-i * 0.5}s` }}>
          <Cub w={56} h={h} d={56} color="amber" front={<Star size={26} color="#0a1230" fill="#0a1230" strokeWidth={0} />} top={null} />
        </O>
      )
    })}
    <O x={-95} y={-70} z={70} className="vx-bob">
      <Cub w={150} h={92} d={8} color="white" front={
        <div className="vx-art vx-art--c" style={{ color: '#0a1230' }}>
          <MapPin size={22} color="#ef4444" /><b>Loved your service?</b><small>Tap or scan to review</small>
        </div>} />
    </O>
  </Scene>
)

const StairScene = () => (
  <Scene small rx={-16} ry={-34}>
    {WHY.map(([Icon, , , color], i) => {
      const h = 80 + i * 46
      return (
        <O key={i} x={(i - 2) * 84} y={150 - h / 2} z={-i * 14}>
          <Cub w={66} h={h} d={66} color={color} front={<Icon size={30} color="#fff" strokeWidth={1.7} />} top={null} />
        </O>
      )
    })}
  </Scene>
)

const CtaScene = () => (
  <Scene rx={-24} ry={-20}>
    <O y={20}><div className="vx-ringz vx-ringz--3" /></O>
    <O y={20}><div className="vx-ringz" /></O>
    <O y={20}><div className="vx-ringz vx-ringz--2" /></O>
    <O y={0} z={20} className="vx-bob">
      <Cub w={240} h={10} d={150} color="white" top={<CardArt dark title="Smart vCard" sub="One tap. Complete profile." />} />
    </O>
    <O x={-130} y={-90} z={50} className="vx-bob" style={{ animationDelay: '-2s' }}>
      <Cub w={46} h={46} d={46} color="cyan" front={<QrCode size={24} color="#fff" />} />
    </O>
    <O x={140} y={-70} z={30} className="vx-bob" style={{ animationDelay: '-1s' }}>
      <Cub w={46} h={46} d={46} color="violet" front={<Star size={24} color="#fff" />} />
    </O>
  </Scene>
)

/* ---------- blocks ---------- */
const Mini = ({ items }) => (
  <ul className="vx-mini">
    {items.map(([Icon, t, d]) => (
      <li key={t}><b><Icon size={16} />{t}</b>{d}</li>
    ))}
  </ul>
)
const Ext = ({ href, children, className = 'vx-btn vx-btn--line' }) => (
  <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>
)
function Faq({ q, a, open, onToggle, id }) {
  return (
    <div className="vx-q" data-open={open}>
      <button onClick={onToggle} aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`}>{q}<ChevronDown size={20} /></button>
      <div className="vx-q__a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}><div><p>{a}</p></div></div>
    </div>
  )
}

export default function VCardsAlt() {
  const [open, setOpen] = useState(0)
  useReveal()

  return (
    <main className="vx">
      {/* Hero */}
      <section className="vx-hero">
        <div className="vx-aurora" aria-hidden="true" />
        <div className="vx-wrap vx-hero__grid">
          <div>
            <h1 className="vx-in">V-Cards: The Future of <span className="vx-grad">Business Networking</span></h1>
            <p className="vx-in vx-hero__sub">Premium QR &amp; NFC Stand in India</p>
            <p className="vx-in vx-lead">Share your contact info, website and social profiles with a single tap or scan. No apps, no paper – just smooth, eco-friendly connections that work anytime, anywhere.</p>
            <div className="vx-in vx-row">
              <Ext href={LINKS.card} className="vx-btn vx-btn--main">Get Your vCard Now <ArrowRight size={18} /></Ext>
              <a href={LINKS.phone} className="vx-btn vx-btn--line"><Phone size={18} /> Call Now</a>
            </div>
            <div className="vx-in vx-pills">
              <span className="vx-pill"><Wifi size={15} /> NFC</span>
              <span className="vx-pill"><QrCode size={15} /> QR</span>
              <span className="vx-pill"><RefreshCw size={15} /> Editable anytime</span>
            </div>
          </div>
          <HeroScene />
        </div>
      </section>

      <div className="vx-marquee" aria-hidden="true">
        <div className="vx-marquee__t">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}><Star size={14} fill="currentColor" strokeWidth={0} />{m}</span>)}
        </div>
      </div>

      {/* Products – bento */}
      <section className="vx-sec">
        <div className="vx-wrap">
          <div className="vx-bento">
            <article className="vx-tile vx-s7 vx-reveal">
              <h3>All in One NFC &amp; QR Stand</h3>
              <p>Make your business stand out with our premium NFC Stand in India, an all in one NFC + QR display solution perfect for cafés, salons, hotels, offices and retail counters. This modern stand lets customers instantly connect, follow or write a review for your business with a simple tap or scan. Created for quick, contactless customer engagement, it is a stylish and effective way to increase your online presence and enhance customer interaction effortlessly.</p>
              <Mini items={STAND} />
              <div className="vx-row"><Ext href={LINKS.instagram}>View Details <ExternalLink size={16} /></Ext></div>
              <StandScene />
            </article>

            <article className="vx-tile vx-s5 vx-reveal">
              <h3>Smart NFC Digital Business Cards</h3>
              <p>Replace traditional paper cards with a smart, modern solution. CodeZyntax Softwares LLP, trusted for our NFC Stand in India, provides NFC business cards that let you share your contact info, website and social media profiles in seconds, with just a single tap. Perfect for professionals, creators and entrepreneurs who want to make every introduction memorable and sustainable.</p>
              <Mini items={CARDS} />
              <div className="vx-row"><Ext href={LINKS.card}>View Details <ExternalLink size={16} /></Ext></div>
              <FlipScene />
            </article>

            <article className="vx-tile vx-s12 vx-tile--row vx-reveal">
              <div className="vx-tile__copy">
                <h3>Smart Google Review Cards</h3>
                <p>Encourage your customers to share their experience instantly with our Google Review Cards, built with the same smart technology as our premium NFC Stand in India. With a simple tap or scan, they are taken directly to your Google review page, with no searching or typing. Perfect for cafés, salons, clinics and service-focused businesses that rely on positive client feedback and local SEO growth.</p>
                <Mini items={REVIEW} />
                <div className="vx-row"><Ext href={LINKS.card}>View Details <ExternalLink size={16} /></Ext></div>
              </div>
              <ReviewScene />
            </article>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="vx-sec">
        <div className="vx-wrap">
          <div className="vx-reveal" style={{ maxWidth: 780 }}>
            <h2 className="vx-h2">Connect Smarter with CodeZyntax V-Cards</h2>
            <p className="vx-lead">Share your contact info and business details instantly with a single tap. Our digital products like Smart V-Cards, trusted by businesses that also use our NFC Stand in India, use NFC and QR technology for easy, eco-friendly and professional brand networking, anytime, anywhere.</p>
            <p style={{ marginTop: '1.4rem', font: '700 1.25rem var(--head)' }}>Sustainable. Smart. Seamless.</p>
            <p className="vx-lead" style={{ marginTop: '0.5rem' }}>Transform how you connect with a single tap. CodeZyntax provides Smart vCards that combine NFC and QR technology to instantly share your contact details, social profile links and portfolio, anytime, anywhere and on any device. Built for professionals, creators and businesses who value innovation, effective branding and eco-friendly digital networking.</p>
            <div className="vx-row"><Ext href="/">Explore More Services <ArrowRight size={16} /></Ext></div>
          </div>
          <div className="vx-offer">
            {OFFER.map(([Icon, color, title, text]) => (
              <article className="vx-of vx-reveal" key={title}>
                <div className="vx-gem" aria-hidden="true">
                  <Cub w={52} h={52} d={52} color={color} front={<Icon size={24} color="#fff" strokeWidth={1.8} />} top={null} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="vx-sec">
        <div className="vx-wrap">
          <div className="vx-reveal" style={{ maxWidth: 780 }}>
            <h2 className="vx-h2">Explore Our V-Card Templates</h2>
            <p className="vx-lead">Choose from our variety of premium, modern and fully customizable designs tailored to match your professional image. Every NFC profile layout is crafted to complement our NFC Stand in India, and is optimized for clarity, speed and visual appeal, giving your clients a seamless digital experience every time they scan your card.</p>
          </div>
          <div className="vx-rail" aria-hidden="true">
            {PHONES.map((v) => <div className="vx-rail__i" key={v}><Ph v={v} /></div>)}
          </div>
          <div className="vx-row" style={{ marginTop: 0 }}><Ext href={LINKS.templates} className="vx-btn vx-btn--main">Explore More <ArrowRight size={18} /></Ext></div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="vx-sec">
        <div className="vx-wrap vx-split vx-split--rev">
          <div className="vx-reveal">
            <h2 className="vx-h2">Why Choose Us?</h2>
            <p className="vx-lead">At CodeZyntax Softwares LLP, we are redefining how professionals and businesses network. Our smart NFC and QR vCards are trusted by customers who also choose our premium All in One NFC Stand in India and Google Review Scanner in Palakkad, built for those who value innovation, branding and effortless communication. With a simple tap or scan, you can share your complete profile details, including contact info, website and social profile links, instantly and securely.</p>
            <Mini items={WHY.map(([I, t, d]) => [I, t, d])} />
            <div className="vx-stat"><b className="vx-grad">900+</b><span>V-Cards Delivered</span></div>
          </div>
          <div className="vx-reveal"><StairScene /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="vx-sec">
        <div className="vx-wrap vx-faqgrid">
          <div className="vx-reveal">
            <h2 className="vx-h2">Frequently Asked Questions</h2>
            <div className="vx-row"><Ext href={LINKS.instagram}>Follow Us on Instagram <ExternalLink size={16} /></Ext></div>
          </div>
          <div className="vx-faq vx-reveal">
            {FAQ.map(([q, a], i) => (
              <Faq key={q} id={`vx-faq-${i}`} q={q} a={a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vx-sec">
        <div className="vx-wrap">
          <div className="vx-cta vx-reveal">
            <div>
              <h2>Smart Networking Starts Here</h2>
              <p>Create your personalized Smart vCard and share your details instantly with just a tap or scan. No apps, no paper, just smooth, eco-friendly connections that work anytime, anywhere, perfectly paired with our premium all in one NFC Stand in India for enhanced digital engagement.</p>
              <div className="vx-row">
                <Ext href={LINKS.card} className="vx-btn vx-btn--white">Get Your vCard Now <ArrowRight size={18} /></Ext>
                <Ext href={LINKS.whatsapp} className="vx-btn vx-btn--ghostw"><MessageCircle size={18} /> WhatsApp us</Ext>
              </div>
            </div>
            <CtaScene />
          </div>
        </div>
      </section>
    </main>
  )
}