import Seo from '../components/Seo'
import { PageHero, Cta } from '../components/ui'
// Placeholder-safe content: replace with real company facts, projects and posts. Nothing here is invented.
const PAGES = {
  about: { title: 'About Us', text: 'A software company focused on reliable, customizable solutions.', body: ['CodeZyntax Softwares LLP is a software development company providing software solutions for businesses of all sizes.', 'We focus on software that is easy to use, reliable and customizable to your business needs.'] },
  portfolio: { title: 'Portfolio', text: 'Selected work.', body: ['Add real projects and screenshots before launch. The placeholder tiles from the old site were intentionally removed.'] },
  industries: { title: 'Industries We Serve', text: 'Solutions across sectors.', body: ['Add the industries you have genuinely worked with.'] },
  blog: { title: 'Insights', text: 'Articles and updates.', body: ['Articles will appear here. Add real posts when ready.'] },
  'privacy-policy': { title: 'Privacy Policy', text: '', body: ['DRAFT: replace with a policy reviewed by a qualified professional. Describe what enquiry-form data you collect, how it is used and how to contact you.'] },
  terms: { title: 'Terms & Conditions', text: '', body: ['DRAFT: replace with terms reviewed by a qualified professional.'] },
}
export default function Static({ page }) {
  const p = PAGES[page]
  return (<><Seo title={p.title} description={p.text || p.title} /><PageHero title={p.title} text={p.text} />
    <section className="section"><div className="container-x max-w-3xl space-y-4">{p.body.map(t => <p key={t}>{t}</p>)}</div></section>
    {['about', 'portfolio'].includes(page) && <Cta />}</>)
}
