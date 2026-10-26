import { useLayoutEffect, useRef } from 'react'
import './HomeHeroScene.css'

/*
  HomeHeroScene — premium 3D software illustration for the Home hero.
  Built only from custom SVG + CSS 3D transforms (no WebGL, no images, no libraries).

  The artwork is drawn on a fixed 600 x 540 canvas and scaled to fit its container with a
  ResizeObserver, so it never crops, overlaps text or causes horizontal scroll at
  320 / 375 / 390 / 430 px widths, tablets or desktops.
  Pointer tilt is desktop-mouse only. Animation stops under prefers-reduced-motion.
*/

const CANVAS_W = 600

/* ---------- small SVG building blocks ---------- */

// Slice path on an ellipse (used for the 3D pie chart)
function slice(cx, cy, rx, ry, a0, a1) {
  const p = a => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  const large = a1 - a0 > Math.PI ? 1 : 0
  return `M${cx} ${cy}L${x0.toFixed(2)} ${y0.toFixed(2)}A${rx} ${ry} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}Z`
}

function Defs() {
  return (
    <svg className="hs-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hs-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6aa8ff" /><stop offset="1" stopColor="#2b4fe0" /></linearGradient>
        <linearGradient id="hs-blue-d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3d6bff" /><stop offset="1" stopColor="#1a2fa8" /></linearGradient>
        <linearGradient id="hs-cyan" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7df3ff" /><stop offset="1" stopColor="#1da1f2" /></linearGradient>
        <linearGradient id="hs-violet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c4a4ff" /><stop offset="1" stopColor="#6a4cf0" /></linearGradient>
        <linearGradient id="hs-pink" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ad5" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
        <linearGradient id="hs-white" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#c9d6ff" /></linearGradient>
        <linearGradient id="hs-wave" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#22d3ee" stopOpacity="0" /><stop offset=".5" stopColor="#4f8cff" stopOpacity=".9" /><stop offset="1" stopColor="#a78bfa" stopOpacity="0" /></linearGradient>
        {/* cube faces */}
        <linearGradient id="hs-cf-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#bfe0ff" /><stop offset="1" stopColor="#6fa8ff" /></linearGradient>
        <linearGradient id="hs-cf-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4d86ff" /><stop offset="1" stopColor="#2a45d8" /></linearGradient>
        <linearGradient id="hs-cf-right" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8f7bff" /><stop offset="1" stopColor="#3b3bd0" /></linearGradient>
        <linearGradient id="hs-gm-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff1e8" /><stop offset="1" stopColor="#ffc2dd" /></linearGradient>
        <linearGradient id="hs-gm-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9b8ff" /><stop offset="1" stopColor="#8f6bf2" /></linearGradient>
        <linearGradient id="hs-gm-right" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9fc9" /><stop offset="1" stopColor="#8a5cf0" /></linearGradient>
        <radialGradient id="hs-shine" cx=".3" cy=".25" r=".7"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
        {/* cylinders */}
        <linearGradient id="hs-cyl-v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6a4cf0" /><stop offset=".5" stopColor="#a58cff" /><stop offset="1" stopColor="#4a35c4" /></linearGradient>
        <linearGradient id="hs-cyl-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1da1f2" /><stop offset=".5" stopColor="#7df3ff" /><stop offset="1" stopColor="#1478c8" /></linearGradient>
      </defs>
    </svg>
  )
}

// Glossy isometric cube / gem. tone = "blue" | "gem"
function Cube({ tone = 'blue', className = '' }) {
  const t = tone === 'gem' ? 'gm' : 'cf'
  return (
    <svg className={className} viewBox="0 0 100 110" aria-hidden="true">
      <g strokeLinejoin="round" strokeWidth="6">
        <path d="M50 6 93 30 50 54 7 30Z" fill={`url(#hs-${t}-top)`} stroke={`url(#hs-${t}-top)`} />
        <path d="M7 30 50 54V104L7 80Z" fill={`url(#hs-${t}-left)`} stroke={`url(#hs-${t}-left)`} />
        <path d="M93 30 50 54V104L93 80Z" fill={`url(#hs-${t}-right)`} stroke={`url(#hs-${t}-right)`} />
      </g>
      <path d="M50 6 93 30 50 54 7 30Z" fill="url(#hs-shine)" opacity=".55" />
      <path d="M50 54V104" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
    </svg>
  )
}

function Pie() {
  const cx = 62, cy = 38, rx = 54, ry = 27
  const parts = [
    [0.0, 0.34, 'url(#hs-blue)', '#1c2f9a'],
    [0.34, 0.62, 'url(#hs-cyan)', '#127ab4'],
    [0.62, 0.84, 'url(#hs-pink)', '#6b3fc4'],
    [0.84, 1.0, 'url(#hs-violet)', '#4a35c4'],
  ]
  const ang = f => -Math.PI / 2 + f * Math.PI * 2
  return (
    <svg viewBox="0 0 124 84" aria-hidden="true">
      <ellipse cx="62" cy="70" rx="50" ry="10" fill="#020617" opacity=".45" />
      <g transform="translate(0 11)">{parts.map(([a, b, , dark], i) => <path key={i} d={slice(cx, cy, rx, ry, ang(a), ang(b))} fill={dark} stroke={dark} strokeWidth="1" />)}</g>
      <g>{parts.map(([a, b, fill], i) => <path key={i} d={slice(cx, cy, rx, ry, ang(a), ang(b))} fill={fill} stroke="#0b1a5c" strokeOpacity=".35" strokeWidth=".8" />)}</g>
      <ellipse cx="46" cy="24" rx="22" ry="7" fill="url(#hs-shine)" opacity=".35" />
    </svg>
  )
}

function Cylinder({ id }) {
  return (
    <svg viewBox="0 0 40 70" aria-hidden="true">
      <path d="M3 14V56C3 63 37 63 37 56V14Z" fill={`url(#${id})`} />
      <ellipse cx="20" cy="14" rx="17" ry="8" fill={`url(#${id})`} />
      <ellipse cx="20" cy="14" rx="17" ry="8" fill="#fff" opacity=".35" />
    </svg>
  )
}

function Cloud() {
  return (
    <svg viewBox="0 0 120 70" aria-hidden="true">
      <path d="M26 62a20 20 0 0 1-2-39.9A28 28 0 0 1 77 18a24 24 0 0 1 20 20 17 17 0 0 1 1 24Z" fill="url(#hs-white)" />
      <path d="M26 62a20 20 0 0 1-2-39.9A28 28 0 0 1 77 18" fill="none" stroke="#fff" strokeWidth="2" opacity=".8" />
      <path d="M22 62h76" stroke="#8fa8ff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function Gear() {
  // custom gear: toothed ring (dashed stroke) + hub
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="14" fill="none" stroke="#fff" strokeWidth="7" strokeDasharray="5.5 5.5" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="#fff" strokeWidth="5" />
      <circle cx="24" cy="24" r="5" fill="#a855f7" />
    </svg>
  )
}

/* ---------- laptop screen content (flat, lives on the 3D screen plane) ---------- */
function ScreenUI() {
  const lines = [
    ['#7df3ff', 30], ['#a78bfa', 46], ['#ffd166', 38], ['#7df3ff', 54], ['#ff9ad5', 26],
    ['#a78bfa', 48], ['#7df3ff', 34], ['#ffd166', 42], ['#ff9ad5', 30], ['#7df3ff', 50],
  ]
  return (
    <div className="hs-ui">
      <div className="hs-ui-bar"><i /><i /><i /><span /></div>
      <div className="hs-ui-body">
        <div className="hs-ui-side">{[0, 1, 2, 3, 4].map(n => <b key={n} className={n === 0 ? 'on' : ''} />)}</div>
        <div className="hs-ui-code">
          {lines.map(([c, w], n) => (
            <p key={n} style={{ paddingLeft: n % 3 === 1 ? 10 : n % 3 === 2 ? 20 : 0 }}>
              <s>{n + 1}</s><u style={{ background: c, width: `${w}%` }} />
            </p>
          ))}
        </div>
        <div className="hs-ui-stats">
          <div className="hs-ui-card">
            <svg viewBox="0 0 90 34" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 28 15 22 30 25 45 14 60 17 75 6 90 2" fill="none" stroke="#7df3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0 28 15 22 30 25 45 14 60 17 75 6 90 2V34H0Z" fill="#4f8cff" opacity=".22" />
            </svg>
            <div className="hs-ui-bars">{[40, 62, 48, 78, 58, 92].map((h, n) => <em key={n} style={{ height: `${h}%` }} />)}</div>
          </div>
          <div className="hs-ui-row">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="14" fill="none" stroke="#1e2a6a" strokeWidth="7" />
              <circle cx="20" cy="20" r="14" fill="none" stroke="url(#hs-cyan)" strokeWidth="7" strokeDasharray="52 100" strokeLinecap="round" transform="rotate(-90 20 20)" />
              <circle cx="20" cy="20" r="14" fill="none" stroke="#a78bfa" strokeWidth="7" strokeDasharray="22 100" strokeDashoffset="-56" strokeLinecap="round" transform="rotate(-90 20 20)" />
            </svg>
            <div className="hs-ui-mini"><b /><b /><b /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- main component ---------- */
export default function HomeHeroScene() {
  const frame = useRef(null)
  const world = useRef(null)

  // Scale the fixed-size canvas to whatever width the layout gives us.
  useLayoutEffect(() => {
    const el = frame.current
    if (!el) return
    const fit = () => el.style.setProperty('--s', String(Math.max(0.2, el.clientWidth / CANVAS_W)))
    fit()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', fit)
      return () => window.removeEventListener('resize', fit)
    }
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Subtle pointer tilt (mouse only — never on touch devices).
  const move = e => {
    if (e.pointerType !== 'mouse' || !world.current) return
    const r = e.currentTarget.getBoundingClientRect()
    world.current.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`)
    world.current.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`)
  }
  const leave = () => {
    world.current?.style.setProperty('--ry', '0deg')
    world.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <div className="hs" ref={frame} onPointerMove={move} onPointerLeave={leave}>
      <Defs />
      <div className="hs-canvas" role="img" aria-label="Illustration of a laptop with an analytics dashboard, a smartphone app and floating code and chart cards">
        {/* ambient light */}
        <div className="hs-glow hs-glow-a" />
        <div className="hs-glow hs-glow-b" />
        <svg className="hs-waves" viewBox="0 0 600 540" aria-hidden="true">
          <path d="M-20 400C90 330 170 470 300 420S500 330 620 380" fill="none" stroke="url(#hs-wave)" strokeWidth="2" />
          <path d="M-20 440C100 380 190 500 320 455S520 380 620 420" fill="none" stroke="url(#hs-wave)" strokeWidth="1.2" opacity=".7" />
          <path d="M-20 360C80 300 200 400 320 360S510 290 620 330" fill="none" stroke="url(#hs-wave)" strokeWidth="1" opacity=".5" />
        </svg>

        {/* 3D world: platform + laptop + phone */}
        <div className="hs-persp">
          <div className="hs-world" ref={world}>
            <div className="hs-shadow" />

            {/* platform slab (stacked layers give real thickness) */}
            <div className="hs-plat">
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(n => <i key={n} className="hs-plat-side" style={{ transform: `translateZ(${-n * 2}px)` }} />)}
              <i className="hs-plat-top" />
              <i className="hs-plat-ring" />
            </div>

            {/* laptop base */}
            <div className="hs-lap">
              {[1, 2, 3, 4, 5].map(n => <i key={n} className="hs-lap-side" style={{ transform: `translateZ(${-n * 1.6}px)` }} />)}
              <i className="hs-lap-top"><b className="hs-keys" /><b className="hs-pad" /></i>
            </div>

            {/* laptop screen (hinged, leaning back) */}
            <div className="hs-scr">
              {[1, 2, 3, 4].map(n => <i key={n} className="hs-scr-back" style={{ transform: `translateZ(${-n * 1.5}px)` }} />)}
              <div className="hs-scr-face"><ScreenUI /><i className="hs-scr-gloss" /></div>
            </div>

            {/* smartphone */}
            <div className="hs-ph">
              {[1, 2, 3, 4, 5].map(n => <i key={n} className="hs-ph-back" style={{ transform: `translateZ(${-n * 1.4}px)` }} />)}
              <div className="hs-ph-face">
                <span className="hs-ph-notch" />
                <div className="hs-ph-top"><i className="hs-ph-avatar" /><b /><b /></div>
                <div className="hs-ph-search" />
                {[0, 1, 2].map(n => <div key={n} className="hs-ph-row"><i /><span><b /><b /></span></div>)}
                <div className="hs-ph-cta" />
                <i className="hs-ph-gloss" />
              </div>
            </div>
          </div>
        </div>

        {/* floating glass cards & objects (flat layer above the 3D world) */}
        <div className="hs-fl hs-code hs-f1"><svg viewBox="0 0 48 40" aria-hidden="true"><path d="M16 9 5 20l11 11M32 9l11 11-11 11M28 6 20 34" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <div className="hs-fl hs-chart hs-f2">
          <i className="hs-chart-l1" /><i className="hs-chart-l2" />
          <div><b style={{ height: '38%' }} /><b style={{ height: '58%' }} /><b style={{ height: '86%' }} /></div>
        </div>
        <Cube className="hs-fl hs-cube hs-f3" />
        <Cube tone="gem" className="hs-fl hs-gem hs-f2" />
        <div className="hs-fl hs-cloud hs-f2"><Cloud /></div>
        <div className="hs-fl hs-gear hs-f1"><Gear /></div>
        <div className="hs-fl hs-pie hs-f3"><Pie /></div>
        <div className="hs-fl hs-cyl1 hs-f2"><Cylinder id="hs-cyl-v" /></div>
        <div className="hs-fl hs-cyl2 hs-f1"><Cylinder id="hs-cyl-c" /></div>
        <i className="hs-fl hs-orb hs-orb1 hs-f1" />
        <i className="hs-fl hs-orb hs-orb2 hs-f3" />
        <i className="hs-fl hs-orb hs-orb3 hs-f2" />
      </div>
    </div>
  )
}

