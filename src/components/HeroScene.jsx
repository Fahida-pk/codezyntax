import { useRef } from 'react'
// Lightweight CSS-3D hero (no WebGL): fast on phones, static under reduced motion. Tilt follows the pointer on desktop only.
export default function HeroScene() {
  const ref = useRef(null)
  const move = e => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = e.currentTarget.getBoundingClientRect()
    ref.current.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 14 + 'deg')
    ref.current.style.setProperty('--rx', ((e.clientY - r.top) / r.height - 0.5) * -10 + 'deg')
  }
  const reset = () => { ref.current?.style.setProperty('--ry', '0deg'); ref.current?.style.setProperty('--rx', '0deg') }
  return <div onPointerMove={move} onPointerLeave={reset} className="relative"><div className="scene" aria-hidden="true"><div className="stage" ref={ref}>
<div className="p floor"></div>
<div className="p dash b1"><div className="dh"><i></i><i></i><i></i><span></span></div><div className="db"><div className="ds"><b></b><b></b><b></b><b></b></div><div className="dm"><div className="st"><u></u><u></u></div><div className="ch"><s className="h1"></s><s className="h2"></s><s className="h3"></s><s className="h4"></s><s className="h5"></s><s className="h6"></s></div></div></div></div>
<div className="p phone b2"><div className="scr"><span className="n"></span><div className="c1"></div><div className="c2"></div><div className="c3"></div><div className="bt"></div></div></div>
<div className="p code b3"><div><span className="m">// your idea</span></div><div><span className="k">const</span> app = build(</div><div>{"\u00a0\u00a0"}<span className="s">"web"</span>, <span className="s">"mobile"</span>,</div><div>{"\u00a0\u00a0"}<span className="s">"windows"</span>);</div><div><span className="k">await</span> app.launch();</div></div>
<div className="p cw b3"><div className="cube"><em className="f f1"></em><em className="f f2"></em><em className="f f3"></em><em className="f f4"></em><em className="f f5"></em><em className="f f6"></em></div></div>
<div className="p cl b2"><i></i><i></i><i></i></div>
<div className="p orb o1 b1"></div><div className="p orb o2 b3"></div>
</div></div>
</div>
}
