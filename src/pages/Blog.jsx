import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import './Blog.css'

/* ------------------------------------------------------------------
   POSTS
   Newest first. Body blocks:
     { t: 'h2', c: 'Heading' }
     { t: 'h3', c: 'Sub heading' }
     { t: 'p',  c: ['text', { to: '/service', text: 'link text' }, 'more text'] }
     { t: 'ul', c: ['item 1', 'item 2'] }
   ------------------------------------------------------------------ */
const POSTS = [
  {
    slug: 'top-accounting-software-in-palakkad',
    tag: 'top accounting software in palakkad',
    title: 'Top Accounting Software for Modern Businesses: A Complete Guide to Smarter Financial Management',
    date: 'June 4, 2026',
    author: 'admin',
    image: '/images/blog/accounting-software-hero.svg',
    imageAlt: 'Isometric illustration of an accounting dashboard on a glass laptop',
    excerpt:
      'Choosing the right accounting software improves financial accuracy, compliance and decision making. Here is what to look for and how custom software can help.',
    body: [
      {
        t: 'p',
        c: [
          'In today’s digital-first business environment, managing finances accurately is no longer optional, it is essential. Whether you are a startup, small business, retail store, manufacturing unit or service provider, choosing the top accounting software in Palakkad can significantly improve your financial efficiency, compliance and decision making.',
        ],
      },
      {
        t: 'p',
        c: [
          'Businesses are going digital, automating the grunt work, tightening their grip on cash flow and finally making sense of where the money goes. At the heart of this shift sits accounting software: the quiet engine that keeps invoices moving, payroll on time, taxes in order and financial reports readable. This guide covers the benefits of accounting software, the key features to look for, and how a trusted ',
          { to: '/service', text: 'customized software development company in Palakkad' },
          ' can help you get more from it.',
        ],
      },

      { t: 'h2', c: 'Why Businesses Need Top Accounting Software' },
      {
        t: 'p',
        c: [
          'Spreadsheets and manual ledgers had their time, but that time has passed. Modern accounting software cuts hours of number crunching, catches mistakes before they cost you and keeps your business on the right side of financial regulations. Key benefits include:',
        ],
      },
      {
        t: 'ul',
        c: [
          'Automated bookkeeping and invoicing',
          'Real-time financial reporting',
          'Tax compliance and GST management',
          'Inventory and expense tracking',
          'Payroll management',
          'Better cash flow monitoring',
          'Secure cloud-based access',
        ],
      },

      { t: 'h2', c: 'Essential Features of Top Accounting Software' },
      {
        t: 'p',
        c: [
          'When selecting accounting software, look at the features that support your daily workflow and your long-term financial goals. The right program makes accounting tasks easier while improving accuracy, efficiency and business decisions.',
        ],
      },
      { t: 'h3', c: '1. Automated Financial Management' },
      {
        t: 'p',
        c: ['Automation reduces manual effort by handling recurring invoices, expense categorization, bank reconciliation and payment reminders.'],
      },
      { t: 'h3', c: '2. Real-Time Reporting' },
      {
        t: 'p',
        c: ['Business owners can quickly view profit and loss statements, balance sheets, cash flow summaries and tax-related information to make informed decisions.'],
      },
      { t: 'h3', c: '3. Cloud Accessibility' },
      {
        t: 'p',
        c: ['Cloud-based solutions let teams access financial information securely from anywhere, with real-time insights.'],
      },
      { t: 'h3', c: '4. GST and Tax Compliance' },
      {
        t: 'p',
        c: ['Tax regulations keep evolving. Modern accounting software keeps you compliant with automated tax calculations and reporting.'],
      },
      { t: 'h3', c: '5. Inventory Management' },
      {
        t: 'p',
        c: ['For retail and manufacturing companies, integrated inventory tracking helps prevent stock shortages and overstocking.'],
      },
      { t: 'h3', c: '6. Data Security' },
      {
        t: 'p',
        c: ['Financial data is one of a business’s most valuable assets. Reliable software protects it with encryption, role-based permissions, regular backups and secure access controls.'],
      },

      { t: 'h2', c: 'How Technology Is Transforming Business Accounting' },
      {
        t: 'p',
        c: [
          'AI, automation, the cloud and mobile apps have made accounting more efficient than ever. Businesses that want a sophisticated system often partner with a developer who specializes in ',
          { to: '/service', text: 'desktop application development in Palakkad' },
          ', building financial tools around their exact requirements. Custom software can bring accounting, inventory, HR, CRM and reporting together on one platform.',
        ],
      },

      { t: 'h2', c: 'The Importance of Customized Accounting Solutions' },
      {
        t: 'p',
        c: [
          'Pre-packaged accounting applications suit most needs, but some businesses require specialized features and processes. A customized software development company in Palakkad can build accounting applications around your standards. Custom solutions offer:',
        ],
      },
      {
        t: 'ul',
        c: [
          'Personalized dashboards',
          'Industry-specific reporting',
          'Integration with existing software',
          'Enhanced scalability',
          'Better user experience',
          'Improved operational efficiency',
        ],
      },

      { t: 'h2', c: 'The Role of Web Applications in Financial Management' },
      {
        t: 'p',
        c: [
          'Professional ',
          { to: '/service', text: 'custom web app development services in Palakkad' },
          ' can help you build secure accounting and financial management portals that work from any location. Benefits include:',
        ],
      },
      {
        t: 'ul',
        c: ['Multi-user accessibility', 'Real-time updates', 'Centralized data storage', 'Better collaboration', 'Easy maintenance and upgrades'],
      },
      {
        t: 'p',
        c: ['You can also add customer portals, vendor management and financial reporting tools to the same web application.'],
      },

      { t: 'h2', c: 'Establishing a Strong Digital Presence for Accounting Businesses' },
      {
        t: 'p',
        c: [
          'Accounting firms and financial consultants need a strong online presence to attract clients. Working with a provider of ',
          { to: '/service', text: 'affordable website designing services in Palakkad' },
          ' gives you a professional website that builds credibility. An effective site includes:',
        ],
      },
      {
        t: 'ul',
        c: ['Service information', 'Client testimonials', 'Contact forms', 'Educational resources', 'Blog content', 'Appointment scheduling'],
      },

      { t: 'h2', c: 'Mobile Accounting: Managing Finances on the Go' },
      {
        t: 'p',
        c: [
          'A reputable ',
          { to: '/service', text: 'mobile app development company in Palakkad' },
          ' can create accounting apps that let you:',
        ],
      },
      {
        t: 'ul',
        c: ['Generate invoices', 'Track expenses', 'Monitor cash flow', 'Approve transactions', 'Access reports remotely'],
      },

      { t: 'h2', c: 'IT Consulting for Financial Transformation' },
      {
        t: 'p',
        c: [
          'Implementing accounting software takes careful planning, proper system integration and technical expertise. An experienced IT consulting company for business in Palakkad helps organizations:',
        ],
      },
      {
        t: 'ul',
        c: ['Evaluate software requirements', 'Select suitable solutions', 'Plan implementation strategies', 'Ensure data migration'],
      },

      { t: 'h2', c: 'Final Thoughts' },
      {
        t: 'p',
        c: [
          'Choosing the top accounting software in Palakkad is a key decision that can improve business efficiency, financial accuracy and long-term growth.',
        ],
      },
      {
        t: 'p',
        c: [
          'Whether you need a custom-built accounting application, website design, mobile apps, digital marketing, software training or NFC business cards, working with skilled technology partners will help you transform your business.',
        ],
      },
      {
        t: 'p',
        c: [
          'Pair strong accounting software with services from a trustworthy ',
          { to: '/service', text: 'desktop software development company in Palakkad' },
          ', ',
          { to: '/service', text: 'customized software development company in Palakkad' },
          ', ',
          { to: '/service', text: 'mobile app development company in Palakkad' },
          ' and the ',
          { to: '/digital-marketing', text: 'best digital marketing agency in Palakkad' },
          ', and you build a solid digital base for the next decade.',
        ],
      },
      {
        t: 'p',
        c: [{ to: '/about', text: 'Learn more about my story and journey' }],
      },
    ],
  },
  {
    slug: 'meta-andromeda-and-the-future-of-digital-advertising',
    tag: 'digital marketing',
    title: 'Meta Andromeda and the Future of Digital Advertising',
    date: 'May 28, 2026',
    author: 'admin',
    image: '',
    imageAlt: '',
    excerpt: 'How Meta’s Andromeda ad retrieval system changes the way campaigns are delivered.',
    // TODO: replace with the real article content
    body: [{ t: 'p', c: ['Full article coming soon.'] }],
  },
]

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */
function Rich({ parts }) {
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      <span key={i}>{part}</span>
    ) : (
      <Link key={i} to={part.to}>
        {part.text}
      </Link>
    )
  )
}

function Block({ block }) {
  if (block.t === 'h2') return <h2>{block.c}</h2>
  if (block.t === 'h3') return <h3>{block.c}</h3>
  if (block.t === 'ul')
    return (
      <ul>
        {block.c.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  return (
    <p>
      <Rich parts={block.c} />
    </p>
  )
}

function PostImage({ post, className }) {
  if (!post.image) {
    return <div className={`blog-card-placeholder ${className || ''}`} aria-hidden="true" />
  }
  return <img className={className} src={post.image} alt={post.imageAlt} loading="lazy" />
}

/* ------------------------------------------------------------------
   Comment form (front-end only; wire onSubmit to your API when ready)
   ------------------------------------------------------------------ */
function CommentForm({ slug }) {
  const [form, setForm] = useState({ comment: '', name: '', email: '', website: '', save: false })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setSent(false)
    setForm(f => ({ ...f, comment: '' }))
  }, [slug])

  const update = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = e => {
    e.preventDefault()
    // TODO: send { slug, ...form } to your backend / email service
    setSent(true)
    setForm(f => ({ ...f, comment: '' }))
  }

  return (
    <section className="blog-comments" aria-labelledby="blog-comment-title">
      <h2 id="blog-comment-title">Leave a Comment</h2>
      <p className="blog-comments-note">
        Your email address will not be published. Required fields are marked <span aria-hidden="true">*</span>
      </p>

      <form onSubmit={submit}>
        <label className="blog-sr" htmlFor="blog-comment">Comment</label>
        <textarea
          id="blog-comment"
          name="comment"
          rows="8"
          placeholder="Type here.."
          value={form.comment}
          onChange={update}
          required
        />

        <div className="blog-comment-fields">
          <div>
            <label className="blog-sr" htmlFor="blog-name">Name</label>
            <input id="blog-name" name="name" type="text" placeholder="Name*" value={form.name} onChange={update} required />
          </div>
          <div>
            <label className="blog-sr" htmlFor="blog-email">Email</label>
            <input id="blog-email" name="email" type="email" placeholder="Email*" value={form.email} onChange={update} required />
          </div>
          <div>
            <label className="blog-sr" htmlFor="blog-website">Website</label>
            <input id="blog-website" name="website" type="url" placeholder="Website" value={form.website} onChange={update} />
          </div>
        </div>

        <label className="blog-check">
          <input type="checkbox" name="save" checked={form.save} onChange={update} />
          Save my name, email, and website in this browser for the next time I comment.
        </label>

        <button type="submit" className="blog-btn">Post Comment</button>
        {sent && (
          <p className="blog-comment-sent" role="status">
            Thanks. Your comment has been received and will appear after review.
          </p>
        )}
      </form>
    </section>
  )
}

/* ------------------------------------------------------------------
   Views
   ------------------------------------------------------------------ */
function BlogList() {
  useEffect(() => {
    document.title = 'Blog | CodeZyntax Softwares LLP'
  }, [])

  return (
    <main className="blog-page">
      <header className="blog-head">
        <h1>Blog</h1>
        <p>Guides on software, web, mobile and digital marketing for growing businesses.</p>
      </header>

      <div className="blog-grid">
        {POSTS.map(post => (
          <article className="blog-card" key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="blog-card-media" aria-label={post.title}>
              <PostImage post={post} />
            </Link>
            <div className="blog-card-body">
              <span className="blog-tag">{post.tag}</span>
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="blog-meta">
                {post.author} / {post.date}
              </p>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="blog-more">
                Read article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

function BlogPost() {
  const { slug } = useParams()
  const index = POSTS.findIndex(p => p.slug === slug)
  const post = POSTS[index]

  useEffect(() => {
    if (post) document.title = `${post.title} | CodeZyntax`
    window.scrollTo(0, 0)
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const newer = POSTS[index - 1]
  const older = POSTS[index + 1]

  return (
    <main className="blog-page">
      <article className="blog-article">
        <Link to="/blog" className="blog-back">Back to blog</Link>

        <span className="blog-tag">{post.tag}</span>
        <h1>{post.title}</h1>
        <p className="blog-meta">
          {post.author} / {post.date}
        </p>

        {post.image && <PostImage post={post} className="blog-hero" />}

        <div className="blog-content">
          {post.body.map((block, i) => (
            <Block block={block} key={i} />
          ))}
        </div>
      </article>

      <nav className="blog-pager" aria-label="More posts">
        {older ? (
          <Link to={`/blog/${older.slug}`} className="blog-pager-prev">
            <small>Previous</small>
            <span>{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link to={`/blog/${newer.slug}`} className="blog-pager-next">
            <small>Next</small>
            <span>{newer.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <CommentForm slug={post.slug} />
    </main>
  )
}

/* One component serves /blog and /blog/:slug */
export default function Blog() {
  const { slug } = useParams()
  return slug ? <BlogPost /> : <BlogList />
}