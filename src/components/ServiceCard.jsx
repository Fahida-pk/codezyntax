import { useRef } from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import './ServiceCard.css'

/* Compact service card. Same props as before: s (service from SERVICES) and optional n (number).
   - Shows s.short (concise card copy) and falls back to s.summary; detail pages keep the full summary.
   - data-reveal sits on a wrapper so the site's reveal animation never fights the 3D tilt transform.
   - One real link (the "Learn More" row) whose hit area covers the whole card. */
export default function ServiceCard({ s, n, full = false }) {
  const ref = useRef(null)
  const Icon = Icons[s.icon] || Icons.Code2
  // full = true shows the complete summary paragraph (used on the Home page);
  // otherwise the concise s.short is used when it exists.
  const text = full ? s.summary : (s.short || s.summary)

  // Subtle 3D tilt for mouse users only; touch and reduced-motion get none.
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${((px - 0.5) * 7).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${((0.5 - py) * 7).toFixed(2)}deg`)
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  }
  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  // stagger the icon float by card number (or slug length if no number is passed)
  const seed = n ? Number(n) : s.slug.length

  return (
    <div data-reveal className="svc-wrap">
      <article
        ref={ref}
        className="svc"
        style={{ '--i': seed % 6 }}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <div className="svc-top">
          <span className="svc-ico" aria-hidden="true">
            <Icon size={26} strokeWidth={2} />
          </span>
          {n && <span className="svc-n" aria-hidden="true">{String(n).padStart(2, '0')}</span>}
        </div>
        <h3 className="svc-title">{s.title}</h3>
        <p className={`svc-text${full ? ' svc-text-full' : ''}`}>{text}</p>
        <Link to={`/service/${s.slug}`} className="svc-more">
          Learn More
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </article>
    </div>
  )
}