import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
const STEPS = [
  ['What do you need?', ['Company website', 'Website redesign', 'Web application', 'Mobile app', 'Windows / business software', 'SEO & marketing', 'Digital business card', 'Not sure yet']],
  ['What matters most?', ['Build credibility', 'Get more enquiries', 'Improve operations', 'Launch a new idea']],
  ['Where are you now?', ['Starting fresh', 'Replacing an existing system', 'Design ready, need development', 'Still exploring']],
  ['When would you like to start?', ['As soon as possible', 'Within 1–3 months', 'Later this year', 'Flexible']],
]
export default function Planner() {
  const [i, setI] = useState(0)
  const [ans, setAns] = useState([])
  const done = i >= STEPS.length
  const pick = o => { setAns([...ans.slice(0, i), o]); setI(i + 1) }
  const brief = encodeURIComponent(ans.join(' | '))
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8" aria-live="polite">
      {!done ? (<>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Question {i + 1} of {STEPS.length}</p>
        <h3 className="mt-2 text-xl">{STEPS[i][0]}</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {STEPS[i][1].map(o => <button key={o} onClick={() => pick(o)} className="rounded-lg border border-line px-4 py-3 text-left text-sm font-medium transition hover:border-accent hover:bg-accent/10">{o}</button>)}
        </div>
        {i > 0 && <button onClick={() => setI(i - 1)} className="mt-5 inline-flex items-center gap-1 text-sm text-muted hover:text-heading"><ArrowLeft size={14} />Back</button>}
      </>) : (<>
        <h3 className="text-xl">Your starting point is ready</h3>
        <p className="mt-2 text-sm">{ans.join(' · ')}</p>
        <Link to={`/contact?brief=${brief}`} className="btn-dark mt-5">Continue to project enquiry <ArrowRight size={16} /></Link>
        <button onClick={() => { setI(0); setAns([]) }} className="ml-4 text-sm text-muted underline">Start over</button>
      </>)}
    </div>
  )
}
