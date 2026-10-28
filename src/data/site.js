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

export const NAV = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/service'],
  ['Digital Marketing', '/digital-marketing'],
  ['vCards', '/vcards'],
  ['Contact', '/contact'],
  ['Blog', '/blog'],
]
// `summary` = full description (Home page cards and service detail pages), taken from codezyntax.com/service.
// `short`   = concise text, used only where a card is rendered without the `full` prop (Services page).

export const SERVICES = [
 { slug:'custom-software-development', icon:'Code2', title:'Custom Software Development', summary:'Whether it is mobile to web and in desktop, we can create fully customized applications that are mainly based on your preferred unique workflows and branding needs. What helped us position us among the Best Software Company in Palakkad was our ability to create customized, highly accurate software solutions for our customers.', short:'Software built around your workflows, not the other way round.', benefits:['Requirements-led design','Scalable architecture','Documented, maintainable code'] },
 { slug:'website-design-development', icon:'Globe', title:'Website Design & Development', summary:'Our team can design modern, mobile friendly websites using the WordPress or the custom code. Fast loading times, mobile-friendly responsive layouts, and an effective SEO practices making our work distinguished by the qualities you would expect from us being the Best Software Company in Palakkad.', short:'Fast, mobile-friendly, SEO-ready websites on WordPress or custom code.', benefits:['Mobile-first layouts','SEO-ready structure','Easy content updates'] },
 { slug:'web-application-development', icon:'Layers', title:'Web Application Development', summary:'We are developing scalable and flexible web applications with real time functionality, automation, and user friendly interfaces. Many businesses are trusting our expertise without any doubt, which is why CodeZyntax Softwares LLP is widely known as the Best Software Company in Palakkad for providing custom web solutions.', short:'Secure, high-performance web apps with dashboards, reporting and API integrations.', benefits:['Secure user access','Dashboards and reporting','API integrations'] },
 { slug:'mobile-application-development', icon:'Smartphone', title:'Mobile Application Development', summary:'We are developing feature rich Android and iOS apps with a clean UI/UX, easy navigation, and the strong performance. Businesses often choose us for their mobile projects because they value the dependability of us as being the Best Software Company in Palakkad.', short:'Android and iOS apps for your customers and teams.', benefits:['Android and iOS','Clean user experience','Store submission support'] },
 { slug:'windows-application-development', icon:'Monitor', title:'Windows Application Development', summary:'We are building a secure, high-performance Windows applications which is personalized to your business needs. With our long term experience as being one of the Best Software Company in Palakkad, every tool we have create is mainly focusing on boosting the productivity and making sure a smooth integration with the Windows systems.', short:'Secure Windows software that fits your business and works with local hardware.', benefits:['Works with local hardware','Reliable offline use','Custom reports'] },
 { slug:'digital-marketing-seo', icon:'Megaphone', title:'Digital Marketing & SEO', summary:'We will improve your search visibility through a wide professional keyword research, technical SEO, and clear content & image optimization. These proven techniques has continuously delivered results and made us strengthen our reputation as a trusted firm and always the Best Software Company in Palakkad offering SEO support.', short:'Keyword research, technical SEO and content optimization to lift your search visibility.', benefits:['On-page and technical SEO','Content planning','Transparent reporting'] },
 { slug:'social-media-marketing', icon:'Share2', title:'Social Media Marketing', summary:'Our social media marketing services are mainly to help you grow your audience in social media through our strategic content, campaigns, and engagement. This strategy always assured the standard of expertise expected from us as the Best Software Company in Palakkad, making sure that your brand stays active and visible digitally.', short:'Content, campaigns and engagement that grow your audience and keep your brand visible.', benefits:['Content calendars','Campaign management','Audience engagement'] },
 { slug:'digital-business-cards', icon:'CreditCard', title:'Digital Business Cards (NFC & QR)', summary:'Our digital vCards are providing various features including clickable contact information\'s, social media links, and portfolios, providing a quick and innovative way to share your identity. This smart solution reflects the quality and innovation we are having as the Best Software Company in Palakkad.', short:'Share contact details instantly with NFC and QR vCards.', benefits:['Tap or scan to share','Updatable details','Branded design'] },
 { slug:'software-consulting', icon:'Lightbulb', title:'Software Consulting & Business Solutions', summary:'Our software consultation services can help you to choose the correct technologies, planning the solutions effectively, and optimizing your main marketing strategy. This guidance is one of the main reasons clients see us as one of the Best Software Company in Palakkad for long term software planning.', short:'Technology choices, solution planning and roadmaps for long-term growth.', benefits:['Technology assessment','Roadmap planning','Process improvement'] },
]
export const PROCESS = [['Discover','We study your goals, users and constraints.'],['Design','We plan the structure, interface and technical approach.'],['Develop','We build in stages with regular reviews.'],['Deploy & Support','We test, launch and keep improving.']]
// Add REAL projects only. Shape: { title, category, image: '/projects/x.webp', url: 'https://...', tags: ['Web', 'Design'], summary: '...' }
export const PROJECTS = [
  // Screenshots: run `node scripts/capture-screenshots.mjs` (see that file). Until an image exists, a browser-window placeholder is shown.
  
{
  slug: '1card',
  title: '1Card',
  category: 'DIGITAL BUSINESS CARD',
  summary: 'One tap. One scan. Endless possibilities. Share your professional identity effortlessly with 1Card.',
  url: 'https://1card.co.in/',
  image: '/images/projects/1card-home.webp',
  tags: [],
},


{
  slug: '1card-demo',
  title: 'Payroll',
  category: 'Live Demo',
  url: 'https://demo.payroll.zyntaweb.com/login.php',
  image: '/images/projects/payroll.webp',
  summary:
    'A reliable payroll management system for managing employee attendance, leave, and salary details in one place.',

  demoCredentials: [
    {
      role: 'Admin',
      username: 'admin_123',
      password: 'admin_123',
    },
    {
      role: 'Staff 1',
      username: 'staff1',
      password: 'staff123',
    },
    {
      role: 'Staff 2',
      username: 'staff2',
      password: 'staff123',
    },
  ],
},
{
  slug: 'zynta-erp',
  title: 'Zynta ERP',
  category: 'ERP Software',
  url: 'https://zyntaerp.com/',
  image: '/images/projects/zynta erp.webp',
  summary: 'An all-in-one ERP solution to manage projects, accounting, HRM, CRM, sales, and inventory in one platform.',
},

{
  slug: 'zyntaweb',
  title: 'Serlog',
  category: 'Website',
  url: 'https://zyntaweb.com/',
  image: '/images/projects/zynta.webp',
  summary: 'A comprehensive service management solution designed to streamline customer management, service operations, billing, and reporting.',
},
  {
  slug: 'zynta-crm',
  title: 'Zynta CRM',
  category: 'Software',
  url: 'https://crm.1card.co.in/',
  image: '/images/projects/hairship.webp',
  summary: 'A powerful CRM platform built to simplify customer relationships and streamline business operations.',
},
]
export const REGIONS = ['India', 'UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain']

export const LOGO_URL = 'https://www.codezyntax.com/wp-content/uploads/software_development_company_in_palakkad.webp'
// Fill only with items CodeZyntax confirms. Empty lists hide the related homepage sections.
export const TECHNOLOGIES = []
export const INDUSTRIES = []