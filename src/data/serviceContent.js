import {
  Layers, Plug, Lock, BarChart3, Wrench, Workflow, Smartphone, Bell, Cloud,
  Gauge, RefreshCw, Monitor, HardDrive, Printer, Settings, Search,
  Target, QrCode, Link2, Palette,
  LayoutTemplate, MousePointerClick, PenTool, Database, ShieldCheck, Zap,
  FileText, Users, Wifi, Leaf, UserPlus, Contact,
  MapPin, Calendar, Image as ImageIcon, MessageCircle, Lightbulb,
  ClipboardCheck, Compass, Route, Handshake, Presentation,
} from 'lucide-react'

/**
 * One separate content profile per service (9 in total).
 * Each SERVICES entry is matched to a profile by slug/title in getServiceKind below.
 *
 * Headings are [plain, highlighted] pairs. The highlighted part is rendered
 * with the animated blue / violet / cyan gradient.
 */
export const SERVICE_CONTENT = {
  /* ========== 1. CUSTOM SOFTWARE DEVELOPMENT ========== */
  software: {
    h: {
      hero: ['Custom Software Built Around', 'Your Business'],
      features: ['Features that automate', 'how you work'],
      benefits: ['Benefits of', 'Custom Software'],
      process: ['How we', 'build with you'],
    },
    lead:
      'We design and build software around the way your business actually works, from internal tools and automation to complete platforms, so your team stops bending processes to fit off-the-shelf products.',
    points: ['Built around your workflow', 'Secure, scalable architecture', 'Support after launch'],
    features: [
      [Workflow, 'Workflow Automation', 'Replace repetitive manual work and spreadsheets with reliable, automated processes.'],
      [Plug, 'Integrations & APIs', 'Connect your software with payment gateways, accounting tools, CRMs and third-party services.'],
      [Lock, 'Role-Based Access', 'Give every user the right level of access with secure authentication and audit trails.'],
      [BarChart3, 'Reports & Analytics', 'Clear dashboards and exportable reports that turn your data into decisions.'],
      [Layers, 'Scalable Architecture', 'A clean, modular foundation that grows with your users, data and features.'],
      [Wrench, 'Maintenance & Support', 'Updates, monitoring and quick fixes so your software keeps running smoothly.'],
    ],
    benefits: [
      ['Fits your process exactly', 'No unused features or workarounds. Every screen and rule reflects how your team works.'],
      ['Lower long-term cost', 'Skip recurring licence fees and per-seat pricing from generic tools that never quite fit.'],
      ['Full ownership and control', 'You decide the roadmap, the data rules and when to add new capabilities.'],
      ['Ready to scale', 'Built to handle more users, branches and transactions without a rewrite.'],
    ],
    advText: 'Software that fits how your team already works, grows with your business and keeps your data safe.',
    advantages: [
      [Workflow, 'Workflow Automation', 'Replace manual steps and spreadsheets with processes that run reliably on their own.'],
      [Layers, 'Scales With You', 'A modular foundation that handles more users, branches and data without a rewrite.'],
      [Lock, 'Secure by Design', 'Role-based access, encrypted data and audit trails protect your information.'],
      [Plug, 'Fits Your Processes', 'Connects with your accounting, payments and CRM so nothing is entered twice.'],
    ],
    process: [
      ['Discovery', 'We study your workflow, users and goals, then define the scope together.'],
      ['Architecture & Design', 'We plan the system, data model and interface before writing code.'],
      ['Agile Development', 'You see working builds every sprint and can steer the product early.'],
      ['Launch & Support', 'Testing, deployment, training and continued improvements after go-live.'],
    ],
    value:
      'Custom software turns your know-how into a lasting asset: fewer manual steps, fewer errors and a system you fully own.',
    cta: ['Ready to plan', 'your software?'],
    ctaText: 'Tell us about your process and the problems you want solved. We will suggest a practical way to build it.',
  },

  /* ========== 2. WEBSITE DESIGN & DEVELOPMENT ========== */
  website: {
    h: {
      hero: ['Websites That Build Trust and', 'Bring Enquiries'],
      features: ['Everything your website needs to', 'perform'],
      benefits: ['Benefits of a', 'Professionally Built Website'],
      process: ['A clear path from', 'brief to launch'],
    },
    lead:
      'Your website is often the first impression customers get. We design fast, beautiful, search-friendly websites that explain what you do clearly and turn visitors into enquiries.',
    points: ['Responsive on every device', 'SEO-ready structure', 'Fast loading pages'],
    features: [
      [LayoutTemplate, 'Custom Page Design', 'Original layouts that reflect your brand instead of a recycled template.'],
      [Smartphone, 'Mobile-First Layouts', 'Pages that look and work perfectly on phones, tablets and desktops.'],
      [Search, 'SEO Foundations', 'Clean markup, metadata and structure that help you get found on Google.'],
      [Gauge, 'Performance Tuning', 'Optimised images and code for quick loading and strong Core Web Vitals.'],
      [MousePointerClick, 'Conversion-Focused CTAs', 'Clear calls to action, contact forms and WhatsApp links placed where they work.'],
      [PenTool, 'Content Management', 'Easy ways for you to update text, images and offers without a developer.'],
    ],
    benefits: [
      ['A stronger first impression', 'A polished, trustworthy design helps visitors take your business seriously.'],
      ['More enquiries', 'Clear messaging and simple navigation guide people towards contacting you.'],
      ['Better search visibility', 'A well-structured site gives you a solid base for ranking and growth.'],
      ['Easy to maintain', 'Simple updates and dependable hosting keep your site fresh and online.'],
    ],
    advText: 'A website that looks professional, loads fast and is set up to bring you enquiries.',
    advantages: [
      [Smartphone, 'Responsive Design', 'Pages that look and work perfectly on phones, tablets and desktops.'],
      [Search, 'SEO-Ready Structure', 'Clean markup and metadata give you a solid base for ranking on Google.'],
      [Gauge, 'Fast Performance', 'Optimised images and code keep pages quick and Core Web Vitals strong.'],
      [MousePointerClick, 'Built to Convert', 'Clear calls to action, forms and WhatsApp links placed where visitors act.'],
    ],
    process: [
      ['Brief & Sitemap', 'We understand your audience and plan the pages and content you need.'],
      ['Design Concepts', 'You review visual designs in Figma before development begins.'],
      ['Build & Optimise', 'We develop the site, test it on real devices and tune its speed.'],
      ['Launch & Handover', 'Go live with analytics set up and a short guide to managing your content.'],
    ],
    value:
      'A well-built website works for you around the clock, building trust, answering questions and bringing in new enquiries.',
    cta: ['Ready for a website that', 'works harder?'],
    ctaText: 'Share your business and your goals. We will recommend a design and a plan that fits your budget.',
  },

  /* ========== 3. WEB APPLICATION DEVELOPMENT ========== */
  webapp: {
    h: {
      hero: ['Secure Web Applications for', 'Modern Businesses'],
      features: ['Features that power your', 'web application'],
      benefits: ['Why businesses choose', 'web applications'],
      process: ['From requirements to', 'cloud launch'],
    },
    lead:
      'From customer portals to admin dashboards and SaaS products, we build secure, data-driven web applications that your team and customers can use from any browser.',
    points: ['Secure login and roles', 'Real-time dashboards', 'Cloud-ready deployment'],
    features: [
      [BarChart3, 'Interactive Dashboards', 'Live charts, filters and KPIs that give you a clear view of your business.'],
      [Users, 'User & Role Management', 'Accounts, permissions and approval flows for staff, partners and customers.'],
      [Database, 'Database Design', 'Well-structured, indexed data models built for accuracy and speed.'],
      [Plug, 'API Development', 'Clean REST APIs that power your web app and connect to other systems.'],
      [Cloud, 'Cloud Deployment', 'Reliable hosting, backups and monitoring with room to scale.'],
      [ShieldCheck, 'Security Best Practices', 'Encrypted data, validated inputs and protected sessions from day one.'],
    ],
    benefits: [
      ['Access from anywhere', 'Nothing to install. Your team works from any browser on any device.'],
      ['One source of truth', 'Centralised data removes duplication and keeps everyone aligned.'],
      ['Faster operations', 'Automated approvals, notifications and reports save hours every week.'],
      ['Easy to extend', 'Add modules, users and integrations as your business evolves.'],
    ],
    advText: 'Web applications that bring your people, data and processes together in one secure place.',
    advantages: [
      [ShieldCheck, 'Secure by Design', 'Encrypted data, validated inputs and protected sessions from day one.'],
      [Cloud, 'Access From Anywhere', 'Nothing to install. Your team and customers use it from any browser.'],
      [BarChart3, 'Live Business Insight', 'Dashboards and reports that show what is happening as it happens.'],
      [Plug, 'Connects to Your Systems', 'Clean APIs link the app with your payments, CRM and other tools.'],
    ],
    process: [
      ['Requirements', 'We map user roles, features and data so the scope is clear and realistic.'],
      ['UX & Prototype', 'Interactive wireframes let you test the flow before development starts.'],
      ['Build & Test', 'Frontend, backend and database are developed and tested in short cycles.'],
      ['Deploy & Improve', 'We launch on secure cloud hosting and keep improving from user feedback.'],
    ],
    value:
      'A web application brings your people, data and processes into one secure place, so decisions are faster and operations run smoothly.',
    cta: ['Ready to build your', 'web application?'],
    ctaText: 'Describe the users and tasks you have in mind. We will outline the features, timeline and approach.',
  },

  /* ========== 4. MOBILE APPLICATION DEVELOPMENT ========== */
  mobile: {
    h: {
      hero: ['Mobile Apps Your Customers Will', 'Love to Use'],
      features: ['Features that keep users', 'coming back'],
      benefits: ['Benefits of', 'Owning Your App'],
      process: ['From idea to', 'app store'],
    },
    lead:
      'We create smooth, intuitive Android and iOS apps that keep your customers connected, with thoughtful design, dependable performance and publishing support on the app stores.',
    points: ['Android and iOS', 'Intuitive, modern UI', 'Store publishing support'],
    features: [
      [Smartphone, 'Android & iOS Apps', 'Native-quality experiences on both platforms from a shared, efficient codebase.'],
      [Palette, 'Thoughtful UI/UX', 'Simple navigation and clean visuals designed for thumbs and small screens.'],
      [Bell, 'Push Notifications', 'Timely alerts and offers that bring users back to your app.'],
      [Plug, 'Backend & API Integration', 'Secure connection to your server, database, payments and maps.'],
      [RefreshCw, 'Offline & Sync Support', 'Keep core features working with poor connectivity and sync when online.'],
      [Zap, 'Store Launch & Updates', 'Help with Play Store and App Store submission, plus regular updates.'],
    ],
    benefits: [
      ['Closer to your customers', 'Your brand sits on their home screen with instant, personal engagement.'],
      ['Better retention', 'Notifications, saved preferences and smooth flows keep people coming back.'],
      ['Faster delivery', 'Cross-platform development reaches both stores sooner and costs less.'],
      ['Built to grow', 'A clean architecture makes new features and updates straightforward.'],
    ],
    advText: 'Apps that keep your customers connected, on the devices they use every day.',
    advantages: [
      [Smartphone, 'Android and iOS Reach', 'One efficient codebase delivers a native-quality experience on both platforms.'],
      [Bell, 'Stay Engaged', 'Push notifications and saved preferences bring users back to your app.'],
      [RefreshCw, 'Works Offline', 'Core features keep working on weak connections and sync when back online.'],
      [Zap, 'Store-Ready Launch', 'We handle Play Store and App Store submission and ongoing updates.'],
    ],
    process: [
      ['Idea & Scope', 'We define your audience, core features and the first version to launch.'],
      ['Design & Prototype', 'Clickable screens let you experience the app before it is built.'],
      ['Develop & Test', 'We build and test on real Android and iOS devices.'],
      ['Publish & Support', 'We handle store submission and support the app after release.'],
    ],
    value:
      'A mobile app gives customers a direct, always-available channel to your business, which builds loyalty and repeat sales.',
    cta: ['Ready to put your app', 'in their pocket?'],
    ctaText: 'Tell us who the app is for and what it should do. We will help you shape a launch-ready first version.',
  },

  /* ========== 5. WINDOWS APPLICATION DEVELOPMENT ========== */
  windows: {
    h: {
      hero: ['Fast, Dependable Software for', 'Windows Desktops'],
      features: ['Built for counters, offices and', 'daily operations'],
      benefits: ['Benefits of', 'Windows Applications'],
      process: ['How we deliver', 'desktop software'],
    },
    lead:
      'For billing, inventory, accounts and daily operations, a fast desktop application is still the most dependable choice. We build robust Windows software that works smoothly, even with limited internet.',
    points: ['Fast, reliable desktop software', 'Works offline', 'Printing and hardware support'],
    features: [
      [Monitor, 'Desktop Software', 'Responsive, keyboard-friendly applications designed for daily, high-volume use.'],
      [HardDrive, 'Local & Network Database', 'Store data on a single PC or share it securely across your office network.'],
      [Printer, 'Invoices & Printing', 'Bills, labels and reports with barcode, thermal and standard printer support.'],
      [Settings, 'Hardware Integration', 'Connect scanners, weighing machines, biometric devices and more.'],
      [RefreshCw, 'Backup & Data Safety', 'Automatic backups and restore options that protect your records.'],
      [Wrench, 'Updates & Support', 'Installers, version updates and remote support when you need them.'],
    ],
    benefits: [
      ['Works without constant internet', 'Keep billing and operations running even when the connection drops.'],
      ['Speed for busy counters', 'Instant response and shortcuts built for staff who handle many tasks per hour.'],
      ['Data stays under your control', 'Keep sensitive business data on your own systems with controlled access.'],
      ['Familiar to your team', 'A clean Windows interface that staff learn quickly with minimal training.'],
    ],
    advText: 'Desktop software that keeps billing, stock and accounts fast, even when the internet is not.',
    advantages: [
      [Zap, 'Fast at the Counter', 'Keyboard-friendly screens built for staff who handle many tasks every hour.'],
      [HardDrive, 'Works Offline', 'Local and network databases keep operations running without internet.'],
      [Printer, 'Hardware Ready', 'Barcode scanners, thermal printers and weighing scales connect out of the box.'],
      [Lock, 'Your Data, Your Control', 'Sensitive records stay on your own systems with automatic backups.'],
    ],
    process: [
      ['Understand the Workflow', 'We observe how your staff work, from billing to stock to reports.'],
      ['Design the Screens', 'We plan simple, fast screens and the data behind them.'],
      ['Build & Field Test', 'We test with your real data, printers and devices before release.'],
      ['Install & Train', 'On-site or remote installation, staff training and ongoing support.'],
    ],
    value:
      'Reliable desktop software keeps daily operations fast and uninterrupted, protecting revenue at your busiest counters and desks.',
    cta: ['Ready for', 'dependable desktop software?'],
    ctaText: 'Tell us how your team works today. We will propose a Windows application that makes it faster.',
  },

  /* ========== 6. DIGITAL MARKETING & SEO ========== */
  seo: {
    h: {
      hero: ['Digital Marketing & SEO That Brings', 'Qualified Enquiries'],
      features: ['Everything that helps customers', 'find you first'],
      benefits: ['Benefits of', 'Search-Led Marketing'],
      process: ['How we grow', 'your visibility'],
    },
    lead:
      'When customers search for what you offer, we make sure they find you. We combine technical SEO, local search, Google Ads and clear reporting so your marketing budget is tied to enquiries, not guesswork.',
    points: ['Technical and local SEO', 'Google Ads management', 'Plain-language monthly reports'],
    features: [
      [Search, 'Technical & On-Page SEO', 'Site structure, metadata, speed and schema fixes that help search engines understand your pages.'],
      [MapPin, 'Local SEO & Google Business', 'Optimised business profiles, reviews and local citations so nearby customers find you.'],
      [Target, 'Google Ads Management', 'Search and display campaigns built around calls, forms and WhatsApp enquiries.'],
      [FileText, 'Content & Keyword Strategy', 'Pages and articles planned around the words your customers actually search.'],
      [Link2, 'Authority & Link Building', 'Relevant, quality links and listings that strengthen your site over time.'],
      [BarChart3, 'Analytics & Reporting', 'Tracking for traffic, calls and leads, with clear monthly reports and next steps.'],
    ],
    benefits: [
      ['Found when people are ready to act', 'Appear in front of customers who are already searching for your service.'],
      ['Compounding organic traffic', 'Good SEO keeps working after the work is done, unlike a campaign you stop paying for.'],
      ['Spend you can account for', 'Every call and enquiry is tracked back to the channel that produced it.'],
      ['Stronger local presence', 'A complete, trusted business profile helps you win nearby searches in India and the Gulf.'],
    ],
    advText: 'Search marketing run with clear goals, honest reporting and no inflated promises.',
    advantages: [
      [Search, 'Search-First Approach', 'We start with what your customers type into Google, then build around it.'],
      [Gauge, 'Technical Foundation', 'Fast, crawlable pages give every campaign a stronger base.'],
      [BarChart3, 'Transparent Reporting', 'You see traffic, leads and actions in plain language every month.'],
      [Target, 'Focused on Enquiries', 'Campaigns are judged by calls and leads, not by clicks alone.'],
    ],
    process: [
      ['Audit & Keywords', 'We review your site, competitors and search demand, then set priorities.'],
      ['Fix & Optimise', 'We resolve technical issues and improve key pages and profiles.'],
      ['Content & Campaigns', 'We publish content and run ads aimed at your target enquiries.'],
      ['Report & Refine', 'Monthly reviews show what is working and what we will improve next.'],
    ],
    value:
      'Search visibility is one of the few marketing assets that keeps paying back. Done properly, it brings steady, high-intent enquiries.',
    cta: ['Ready to be found', 'on Google?'],
    ctaText: 'Share your website and your market. We will review it and suggest a practical SEO and advertising plan.',
  },

  /* ========== 7. SOCIAL MEDIA MARKETING ========== */
  social: {
    h: {
      hero: ['Social Media Marketing That Builds', 'Your Brand'],
      features: ['Everything your brand needs to', 'stay active and visible'],
      benefits: ['Benefits of', 'Consistent Social Presence'],
      process: ['How we manage', 'your social channels'],
    },
    lead:
      'We plan, design and publish content that keeps your brand active on the platforms your customers use, and we run paid campaigns that turn attention into messages and enquiries.',
    points: ['Content calendar and creatives', 'Meta ad campaigns', 'Community engagement'],
    features: [
      [Calendar, 'Content Calendar', 'A monthly plan of posts, offers and festivals so your channels never go quiet.'],
      [ImageIcon, 'Posts, Reels & Creatives', 'Branded designs, short videos and carousels made for each platform.'],
      [Target, 'Meta Ads Campaigns', 'Facebook and Instagram ads aimed at messages, calls and store visits.'],
      [MessageCircle, 'Community Engagement', 'Replies to comments and messages that keep your audience active and cared for.'],
      [Users, 'Audience & Page Setup', 'Profiles, bios, highlights and links set up properly so your pages look professional.'],
      [BarChart3, 'Insights & Reports', 'Reach, engagement and lead reports with clear suggestions for the next month.'],
    ],
    benefits: [
      ['A professional, active image', 'Regular, well-designed posts show customers that your business is alive and reliable.'],
      ['Closer customer relationships', 'Replies and conversations build trust before a customer ever calls.'],
      ['Reach beyond your followers', 'Targeted ads put your offers in front of the right local and regional audiences.'],
      ['Time back for you', 'We handle planning, design and posting so you can focus on running the business.'],
    ],
    advText: 'Social media handled by a team that understands your brand, your audience and your goals.',
    advantages: [
      [Palette, 'On-Brand Creatives', 'Every post follows your colours, tone and style so the feed feels like one brand.'],
      [Calendar, 'Consistent Posting', 'A planned schedule keeps you visible without last-minute scrambling.'],
      [Target, 'Ads With a Purpose', 'Campaigns are built around enquiries, not vanity numbers.'],
      [MessageCircle, 'Real Engagement', 'We talk with your audience, not just post at them.'],
    ],
    process: [
      ['Brand & Audience', 'We learn your offer, tone and the people you want to reach.'],
      ['Plan the Month', 'We prepare a content calendar and creatives for your approval.'],
      ['Publish & Engage', 'We post, reply and run campaigns on your chosen platforms.'],
      ['Review & Improve', 'Monthly insights guide what we keep, change and try next.'],
    ],
    value:
      'Steady, thoughtful social media turns followers into customers and keeps your brand in mind between purchases.',
    cta: ['Ready to grow your', 'social presence?'],
    ctaText: 'Tell us about your brand and the platforms you use. We will suggest a content and campaign plan to match.',
  },

  /* ========== 8. DIGITAL BUSINESS CARDS (NFC & QR) ========== */
  card: {
    h: {
      hero: ['V-Cards: The Future of', 'Business Networking'],
      features: ['Smart features for', 'modern networking'],
      benefits: ['Benefits of', 'Digital Business Cards'],
      process: ['From your details to', 'a live V-Card'],
    },
    lead:
      'Replace paper cards with a smart, shareable digital profile. Share your contact details, services, location and social links instantly with a QR code, a link or an NFC tap, and capture every lead along the way.',
    points: ['QR code and NFC sharing', 'Update details anytime', 'Eco-friendly networking'],
    features: [
      [QrCode, 'QR Code Sharing', 'A unique QR code on your desk, products or signage opens your profile in one scan, with no app needed.'],
      [Wifi, 'NFC Tap-to-Share', 'NFC-compatible cards and tags let people tap their phone to open your profile instantly.'],
      [Contact, 'Digital Contact Profile', 'Your photo, designation, services and one-tap Save to Contacts, all on a single branded page.'],
      [Link2, 'Social & Contact Links', 'Call, WhatsApp, email, website, maps and social profiles in one link that never goes out of date.'],
      [UserPlus, 'Lead Generation', 'Enquiry forms, click-to-call and WhatsApp buttons turn every introduction into a lead you can follow up.'],
      [Leaf, 'Eco-Friendly Networking', 'Reusable and always current, so there is no reprinting and no paper waste.'],
    ],
    benefits: [
      ['Always up to date', 'Change a phone number or offer once and every share shows the latest version.'],
      ['Eco-friendly and economical', 'No reprinting, no running out of cards, no wasted paper.'],
      ['Memorable first impression', 'A modern profile shows you are professional and tech-savvy.'],
      ['Turns contacts into leads', 'Direct call, WhatsApp and enquiry buttons make it easy to reach you.'],
    ],
    advText: 'A digital identity that is easy to share, always current and built to bring in new leads.',
    advantages: [
      [QrCode, 'Instant Sharing', 'Share your profile with a QR code, a link or an NFC tap in a few seconds.'],
      [Contact, 'Digital Identity', 'One branded profile with your services, location and social links.'],
      [Users, 'Contact Management', 'Visitors save you to their phone and you update your details in one place.'],
      [UserPlus, 'Lead Generation', 'Enquiry forms, click-to-call and WhatsApp buttons turn introductions into leads.'],
    ],
    process: [
      ['Share Your Details', 'Send us your logo, contact information, services and links.'],
      ['Design the Card', 'We design a branded profile page that looks great on every phone.'],
      ['Review & Launch', 'You approve the card and we publish it with its QR code and link.'],
      ['Share & Track', 'Share it anywhere and see how people engage with it.'],
    ],
    value:
      'A smart business card makes every introduction effortless and keeps your details current, so no opportunity is lost.',
    cta: ['Ready for your', 'digital business card?'],
    ctaText: 'Send us your details and we will design a smart card that makes every introduction easy.',
  },

  /* ========== 9. SOFTWARE CONSULTING & BUSINESS SOLUTIONS ========== */
  consulting: {
    h: {
      hero: ['Software Consulting That Turns Ideas Into', 'Clear Plans'],
      features: ['Advice that gets you from idea to', 'a sound build'],
      benefits: ['Benefits of', 'Expert Consulting'],
      process: ['How a consulting', 'engagement works'],
    },
    lead:
      'Before you invest in software, get clarity. We review your processes, recommend the right solution and give you a roadmap, estimate and architecture you can build on, with us or with any team.',
    points: ['Process and requirement review', 'Technology and architecture advice', 'Roadmap and estimates'],
    features: [
      [ClipboardCheck, 'Requirement Analysis', 'We turn rough ideas and scattered notes into clear, prioritised requirements.'],
      [Workflow, 'Process Review', 'We map how work flows today and find the steps worth automating first.'],
      [Compass, 'Technology Selection', 'Honest guidance on build versus buy, and on the stack that suits your needs and budget.'],
      [Layers, 'Solution Architecture', 'A clear structure for data, modules and integrations before development begins.'],
      [Route, 'Roadmap & Estimates', 'A phased plan with scope, timeline and cost ranges you can plan around.'],
      [ShieldCheck, 'Review & Risk Check', 'An independent look at existing software for security, performance and maintainability.'],
    ],
    benefits: [
      ['Decide with confidence', 'Know what to build, in what order and at what cost before you commit budget.'],
      ['Avoid expensive rework', 'Catching gaps in the plan costs far less than fixing them after launch.'],
      ['Right-sized solutions', 'We recommend what fits your stage, not the biggest system we could sell.'],
      ['A plan you own', 'Documents are yours to use with any developer or vendor.'],
    ],
    advText: 'Practical, unbiased advice from a team that builds software every day.',
    advantages: [
      [Lightbulb, 'Practical Advice', 'Recommendations grounded in what works for real businesses, not theory.'],
      [Handshake, 'Unbiased Guidance', 'We tell you when an existing tool is a better fit than custom development.'],
      [Presentation, 'Clear Deliverables', 'Written requirements, architecture and roadmap you can share with your team.'],
      [Layers, 'Ready to Build', 'If you choose to proceed, the plan flows straight into development.'],
    ],
    process: [
      ['Discovery Session', 'We listen to your goals, challenges and current tools.'],
      ['Analysis', 'We study your processes, users and data to find what matters most.'],
      ['Recommendation', 'We present options, trade-offs and a suggested solution.'],
      ['Roadmap Handover', 'You receive the plan, estimates and next steps in writing.'],
    ],
    value:
      'A little planning up front saves months later. Consulting gives you a clear, realistic path from problem to working software.',
    cta: ['Ready to plan your', 'next solution?'],
    ctaText: 'Tell us what you are trying to solve. We will arrange a consultation and outline the best way forward.',
  },
}

/** Heading for the shared "Built to Work With Your Business" section. */
export const ADVANTAGES_HEADING = {
  label: 'WHY IT FITS',
  title: 'Built to Work With Your Business',
}

/**
 * Decide which content profile a SERVICES entry should use.
 * Order matters: more specific services are tested before general ones.
 */
export function getServiceKind(service) {
  const text = `${service?.slug || ''} ${service?.title || ''}`.toLowerCase()

  if (/card|vcard|nfc|qr/.test(text)) return 'card'
  if (/consult|business[\s-]*solution/.test(text)) return 'consulting'
  if (/social|smm/.test(text)) return 'social'
  if (/seo|digital[\s-]*marketing|marketing|advertis/.test(text)) return 'seo'
  if (/mobile|android|\bios\b|flutter/.test(text)) return 'mobile'
  if (/windows|desktop|pc[\s-]*software/.test(text)) return 'windows'
  if (/web[\s-]*app|portal|saas/.test(text)) return 'webapp'
  if (/website|web[\s-]*design|web[\s-]*dev|ui[\s/-]*ux/.test(text)) return 'website'
  return 'software'
}