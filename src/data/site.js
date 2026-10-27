// Contact values come from .env (see .env.example). Nothing is invented: empty values hide the related link.
// Contact values come from .env (see .env.example). Nothing is invented: empty values hide the related link.
export const SITE = {
  name: 'CodeZyntax Softwares LLP',
  url: 'https://www.codezyntax.com',
  email: import.meta.env.VITE_EMAIL || '',
  whatsapp: import.meta.env.VITE_WHATSAPP || '', // digits only, with country code
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
  // Optional extras for the Contact page. Each one is shown only when you set it in .env.
  phone: import.meta.env.VITE_PHONE || '',
  address: import.meta.env.VITE_ADDRESS || '',
  hours: import.meta.env.VITE_HOURS || '',
  mapUrl: import.meta.env.VITE_MAP_URL || '',         // link that opens the location in Google Maps etc.
  mapEmbed: import.meta.env.VITE_MAP_EMBED_URL || '', // the "Embed a map" src URL (https://www.google.com/maps/embed?...)
}
export const NAV = [['Home','/'],['About','/about'],['Services','/service'],['Digital Marketing','/digital-marketing'],['vCards','/vcards'],['Contact','/#contact'],['Blog','/blog']]
export const SERVICES = [
 { slug:'custom-software-development', icon:'Code2', title:'Custom Software Development', summary:'Software built around your workflows, not the other way round.', benefits:['Requirements-led design','Scalable architecture','Documented, maintainable code'] },
 { slug:'website-design-development', icon:'Globe', title:'Website Design & Development', summary:'Fast, responsive business websites that build trust.', benefits:['Mobile-first layouts','SEO-ready structure','Easy content updates'] },
 { slug:'web-application-development', icon:'Layers', title:'Web Application Development', summary:'Browser-based applications with dependable back-end logic.', benefits:['Secure user access','Dashboards and reporting','API integrations'] },
 { slug:'mobile-application-development', icon:'Smartphone', title:'Mobile Application Development', summary:'Android and iOS applications for your customers and teams.', benefits:['Android and iOS','Clean user experience','Store submission support'] },
 { slug:'windows-application-development', icon:'Monitor', title:'Windows Application Development', summary:'Desktop software for billing, inventory and operations.', benefits:['Works with local hardware','Reliable offline use','Custom reports'] },
 { slug:'digital-marketing-seo', icon:'Megaphone', title:'Digital Marketing & SEO', summary:'Improve visibility with search-focused, measurable marketing.', benefits:['On-page and technical SEO','Content planning','Transparent reporting'] },
 { slug:'social-media-marketing', icon:'Share2', title:'Social Media Marketing', summary:'Consistent brand presence across social platforms.', benefits:['Content calendars','Campaign management','Audience engagement'] },
 { slug:'digital-business-cards', icon:'CreditCard', title:'Digital Business Cards (NFC & QR)', summary:'Share contact details instantly with NFC and QR vCards.', benefits:['Tap or scan to share','Updatable details','Branded design'] },
 { slug:'software-consulting', icon:'Lightbulb', title:'Software Consulting & Business Solutions', summary:'Practical advice on technology choices and digital processes.', benefits:['Technology assessment','Roadmap planning','Process improvement'] },
]
export const PROCESS = [['Discover','We study your goals, users and constraints.'],['Design','We plan the structure, interface and technical approach.'],['Develop','We build in stages with regular reviews.'],['Deploy & Support','We test, launch and keep improving.']]
// Add REAL projects only. Shape: { title, category, image: '/projects/x.webp', url: 'https://...', tags: ['Web', 'Design'], summary: '...' }
export const PROJECTS = [
  // Screenshots: run `node scripts/capture-screenshots.mjs` (see that file). Until an image exists, a browser-window placeholder is shown.
  {
    slug: '1card',
    title: '1Card',
    category: 'DIGITAL BUSINESS CARD',
    summary: 'A modern digital business card platform for professionals and businesses.',
    url: 'https://1card.co.in//',
    image: '/images/projects/1card-home.webp',
    tags: ['UI/UX Design', 'Responsive Build'],
  },
  {
  slug: 'zynta-crm',
  title: 'Zynta CRM',
  category: 'Software',
  url: 'https://crm.1card.co.in/',
  image: '/images/projects/hairship.webp',
  summary: 'A powerful CRM platform built to simplify customer relationships and streamline business operations.',
  tags: ['CRM', 'Business Software']
},
{
  slug: '1card-demo',
  title: 'Payroll',
  category: 'Live Demo',
  url: 'https://payroll.zyntaweb.com/',
  image: '/images/projects/payroll.webp',
  summary: 'A reliable payroll management system for managing employee attendance, leave, and salary details in one place.',
  tags: ['Digital Cards', 'Live Demo'],
},

{
  slug: 'zynta-erp',
  title: 'Zynta ERP',
  category: 'ERP Software',
  url: 'https://zyntaerp.com/',
  image: '/images/projects/zynta erp.webp',
  summary: 'An all-in-one ERP solution to manage projects, accounting, HRM, CRM, sales, and inventory in one platform.',
  tags: ['ERP', 'Live Website'],
},

{
  slug: 'zyntaweb',
  title: 'Serlog',
  category: 'Website',
  url: 'https://zyntaweb.com/',
  image: '/images/projects/zynta.webp',
  summary: 'A comprehensive service management solution designed to streamline customer management, service operations, billing, and reporting.',
  tags: ['Live Website'],
},
]
export const REGIONS = ['India', 'UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain']

export const LOGO_URL = 'https://www.codezyntax.com/wp-content/uploads/software_development_company_in_palakkad.webp'
// Fill only with items CodeZyntax confirms. Empty lists hide the related homepage sections.
export const TECHNOLOGIES = []
export const INDUSTRIES = []
