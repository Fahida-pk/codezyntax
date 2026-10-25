import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import './ServicesHero.css'

/* Original isometric 3D illustration for the Services page hero (inline SVG, no external images).
   A layered platform, a glossy browser window and six floating tokens, one per service area. */
function Slab({ cx, cy, a, b, t, id }) {
  return (
    <g>
      <path d={`M${cx - a} ${cy}L${cx} ${cy + b}V${cy + b + t}L${cx - a} ${cy + t}Z`} fill={`url(#sv-${id}-l)`} />
      <path d={`M${cx + a} ${cy}L${cx} ${cy + b}V${cy + b + t}L${cx + a} ${cy + t}Z`} fill={`url(#sv-${id}-r)`} />
      <path d={`M${cx} ${cy - b}L${cx + a} ${cy}L${cx} ${cy + b}L${cx - a} ${cy}Z`} fill={`url(#sv-${id}-t)`} />
      <path d={`M${cx} ${cy - b}L${cx + a} ${cy}L${cx} ${cy + b}L${cx - a} ${cy}Z`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" />
    </g>
  )
}

function Tok({ x, y, cls, children }) {
  return (
    <g className={cls}>
      <rect x={x} y={y + 9} width="76" height="76" rx="22" fill="#1d3fa8" opacity=".2" filter="url(#sv-blur-s)" />
      <rect x={x} y={y} width="76" height="76" rx="22" fill="url(#sv-tok)" />
      <rect x={x + 4} y={y + 4} width="68" height="30" rx="16" fill="#fff" opacity=".28" />
      <g transform={`translate(${x + 38} ${y + 38})`} fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">{children}</g>
    </g>
  )
}

export function ServicesArt() {
  return (
    <svg className="sv-art" viewBox="0 0 560 480" role="img" aria-label="Isometric illustration of a browser window on a layered platform, surrounded by icons for code, web, mobile, marketing, cards and desktop software" focusable="false">
      <defs>
        <radialGradient id="sv-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#4f8cff" stopOpacity=".3" /><stop offset="1" stopColor="#4f8cff" stopOpacity="0" /></radialGradient>
        <linearGradient id="sv-s1-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b7cff" /><stop offset="1" stopColor="#3f5de0" /></linearGradient>
        <linearGradient id="sv-s1-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c3fc4" /><stop offset="1" stopColor="#141f78" /></linearGradient>
        <linearGradient id="sv-s1-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a3bd0" /><stop offset="1" stopColor="#1c1a85" /></linearGradient>
        <linearGradient id="sv-s2-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f2f8ff" /><stop offset="1" stopColor="#bcd4ff" /></linearGradient>
        <linearGradient id="sv-s2-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6f95ff" /><stop offset="1" stopColor="#3550d6" /></linearGradient>
        <linearGradient id="sv-s2-r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6f8fff" /><stop offset="1" stopColor="#2b3fb0" /></linearGradient>
        <linearGradient id="sv-tok" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6fa8ff" /><stop offset=".55" stopColor="#3b6df0" /><stop offset="1" stopColor="#2a45d0" /></linearGradient>
        <linearGradient id="sv-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e6efff" /></linearGradient>
        <linearGradient id="sv-bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3b7bf5" /><stop offset="1" stopColor="#22b8ff" /></linearGradient>
        <linearGradient id="sv-orbit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#22d3ee" stopOpacity="0" /><stop offset=".5" stopColor="#4f7dff" stopOpacity=".7" /><stop offset="1" stopColor="#6f8fff" stopOpacity="0" /></linearGradient>
        <radialGradient id="sv-orb" cx=".3" cy=".25" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#7fb2ff" /><stop offset="1" stopColor="#3b4fe0" /></radialGradient>
        <filter id="sv-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="12" /></filter>
        <filter id="sv-blur-s" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* ambient light and ground shadow */}
      <ellipse cx="280" cy="260" rx="270" ry="210" fill="url(#sv-glow)" />
      <ellipse cx="280" cy="438" rx="200" ry="18" fill="#1d3fa8" opacity=".28" filter="url(#sv-blur)" />

      {/* orbit rings */}
      <ellipse cx="280" cy="270" rx="244" ry="84" fill="none" stroke="url(#sv-orbit)" strokeWidth="1.6" transform="rotate(-12 280 270)" />
      <ellipse cx="280" cy="270" rx="204" ry="64" fill="none" stroke="url(#sv-orbit)" strokeWidth="1" opacity=".7" transform="rotate(10 280 270)" />

      {/* layered platform */}
      <Slab id="s1" cx={280} cy={352} a={212} b={116} t={28} />
      <Slab id="s2" cx={280} cy={328} a={158} b={87} t={22} />
      <path d="M280 276 L328 304 L280 332 L232 304Z" fill="#fff" opacity=".5" />

      {/* browser window */}
      <g className="sv-fl-a">
        <rect x="186" y="106" width="188" height="150" rx="16" fill="#1d3fa8" opacity=".18" transform="translate(8 14)" filter="url(#sv-blur-s)" />
        <rect x="186" y="106" width="188" height="150" rx="16" fill="url(#sv-win)" stroke="#c9d8f7" />
        <path d="M186 122a16 16 0 0 1 16-16h156a16 16 0 0 1 16 16v14H186Z" fill="url(#sv-bar)" />
        <circle cx="202" cy="121" r="3.6" fill="#fff" opacity=".9" /><circle cx="214" cy="121" r="3.6" fill="#fff" opacity=".65" /><circle cx="226" cy="121" r="3.6" fill="#fff" opacity=".4" />
        <rect x="204" y="152" width="84" height="12" rx="6" fill="#2a3f86" opacity=".85" />
        <rect x="204" y="172" width="120" height="7" rx="3.5" fill="#bccbf0" />
        <rect x="204" y="186" width="98" height="7" rx="3.5" fill="#d3def6" />
        <rect x="204" y="208" width="56" height="20" rx="10" fill="url(#sv-bar)" />
        <rect x="300" y="196" width="56" height="44" rx="10" fill="#dfe9ff" />
        <path d="M308 228l12-14 10 8 16-18" fill="none" stroke="#3b6df0" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* floating service tokens */}
      <Tok x={60} y={86} cls="sv-fl-b">{/* code */}
        <path d="M-9 -10 -18 0 -9 10" /><path d="M9 -10 18 0 9 10" /><path d="M4 -14 -4 14" />
      </Tok>
      <Tok x={424} y={70} cls="sv-fl-c">{/* web */}
        <circle r="16" /><ellipse rx="7" ry="16" /><path d="M-16 0H16" />
      </Tok>
      <Tok x={440} y={240} cls="sv-fl-a">{/* mobile */}
        <rect x="-10" y="-17" width="20" height="34" rx="5" /><path d="M-3 12H3" />
      </Tok>
      <Tok x={30} y={262} cls="sv-fl-c">{/* marketing */}
        <path d="M-15 -5H-6L11 -15V15L-6 5H-15Z" fill="#fff" /><path d="M-10 6 -7 17" />
      </Tok>
      <Tok x={236} y={12} cls="sv-fl-b">{/* digital cards */}
        <rect x="-17" y="-12" width="34" height="24" rx="5" /><path d="M-17 -4H17" /><path d="M-10 5H-1" />
      </Tok>
      <Tok x={150} y={372} cls="sv-fl-a">{/* desktop */}
        <rect x="-17" y="-14" width="34" height="23" rx="3" /><path d="M-7 16H7" /><path d="M0 9V16" />
      </Tok>

      {/* decorative orbs */}
      <circle className="sv-fl-a" cx="392" cy="196" r="11" fill="url(#sv-orb)" />
      <circle className="sv-fl-c" cx="506" cy="196" r="8" fill="url(#sv-orb)" />
      <circle className="sv-fl-b" cx="40" cy="198" r="9" fill="url(#sv-orb)" />
      <circle className="sv-fl-a" cx="470" cy="394" r="7" fill="url(#sv-orb)" />
    </svg>
  )
}

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