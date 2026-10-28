import { useState, useEffect } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom'

import {
  Menu,
  X,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Sun,
  Moon,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react'

import { SITE, NAV, SERVICES } from '../data/site'
import useReveal from '../hooks/useReveal'


/* =========================
   LOGO
========================= */

function Logo() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(
        document.documentElement.classList.contains('dark')
      )
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const logoSrc = dark
    ? '/images/projects/logo-white.png'
    : '/images/projects/logo.png'

  return (
    <Link
      to="/"
      aria-label="CodeZyntax Softwares LLP home"
      className="inline-flex shrink-0 items-center"
    >
      <img
        src={logoSrc}
        alt="CodeZyntax Softwares LLP"
        className="h-10 w-auto max-w-[220px] object-contain sm:h-12"
      />
    </Link>
  )
}


/* =========================
   NAVIGATION ITEMS
========================= */

const NavItems = ({ link }) =>
  NAV.map(([label, path]) =>
    path.includes('#') ? (
      <Link
        key={path}
        to={path}
        className={link({ isActive: false })}
      >
        {label}
      </Link>
    ) : (
      <NavLink
        key={path}
        to={path}
        end={path === '/'}
        className={link}
      >
        {label}
      </NavLink>
    )
  )


/* =========================
   THEME TOGGLE
========================= */

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggle = () => {
    const next = !dark

    setDark(next)

    document.documentElement.classList.toggle(
      'dark',
      next
    )

    document.documentElement.style.colorScheme =
      next ? 'dark' : 'light'

    try {
      localStorage.setItem(
        'cz-theme',
        next ? 'dark' : 'light'
      )
    } catch {
      // Storage unavailable
    }
  }

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={
        dark ? 'Switch to light mode' : 'Switch to dark mode'
      }
      title={dark ? 'Dark mode on' : 'Light mode on'}
      className="flex h-10 w-10 items-center justify-center
        rounded-full border border-line text-heading
        transition hover:border-blue-600 hover:text-blue-600"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}


/* =========================
   HEADER
========================= */

function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  const { pathname, hash } = useLocation()

  useEffect(() => {
    setOpen(false)

    if (hash) {
      setTimeout(() => {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  useEffect(() => {
    const handleScroll = () =>
      setSolid(window.scrollY > 12)

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  const link = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? 'text-blue-600'
        : 'text-body hover:text-blue-600'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition duration-300 ${
        solid || open
          ? 'border-line/70 bg-surface/85 shadow-sm backdrop-blur-xl'
          : 'border-transparent bg-surface/60 backdrop-blur-xl'
      }`}
    >
      <div className="container-x flex h-16 items-center
        justify-between gap-3 sm:h-20 sm:gap-4">

        <Logo />

        <nav
          className="hidden items-center gap-6 xl:flex"
          aria-label="Main"
        >
          <NavItems link={link} />
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/contact"
            className="btn-proposal-blue hidden !px-5 !py-2.5 xl:inline-flex"
          >
            Get a Proposal
          </Link>

          <button
            className="flex h-10 w-10 items-center justify-center
              rounded-full border border-line text-heading xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="container-x max-h-[calc(100dvh-4rem)]
            overflow-y-auto pb-6 sm:max-h-[calc(100dvh-5rem)] xl:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col
            [&>a]:border-b [&>a]:border-line/60
            [&>a]:py-3.5 [&>a]:text-base"
          >
            <NavItems link={link} />
          </div>

          <Link
            to="/contact"
            className="btn-proposal-blue mt-5 w-full"
          >
            Get a Proposal
          </Link>
        </nav>
      )}
    </header>
  )
}


/* =========================
   FOOTER
========================= */

function Footer() {
  const address =
    'Door No. 96/22, Karimbully, Pattambi, Kerala-679306'

  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(address)

  const { pathname, hash } = useLocation()

  const companyLinks = [
    ['Home', '/'],
    ['About', '/about'],
    ['Services', '/service'],
    ['Digital Marketing', '/digital-marketing'],
    ['vCards', '/vcards'],
    ['Contact', '/contact'],
    ['Blog', '/blog'],
  ]

  const currentPath = pathname.replace(/\/+$/, '') || '/'

  const filteredCompanyLinks = companyLinks.filter(([label, path]) => {
    if (path === '/') {
      return currentPath !== '/'
    }

    if (path === '/#contact') {
      return !(currentPath === '/contact' || (currentPath === '/' && hash === '#contact'))
    }

    if (path === '/service') {
      return !currentPath.startsWith('/service')
    }

    if (path === '/blog') {
      return !currentPath.startsWith('/blog')
    }

    return currentPath !== path
  })

  const socialLinks = [
    {
      label: 'Facebook',
      url: SITE.facebook,
      Icon: Facebook,
    },
    {
      label: 'Instagram',
      url: SITE.instagram,
      Icon: Instagram,
    },
    {
      label: 'LinkedIn',
      url: SITE.linkedin,
      Icon: Linkedin,
    },
  ].filter((item) => item.url)

  return (
    <footer
      className="site-footer relative overflow-hidden"
    >
      {/* Main Footer Content */}

      <div className="container-x grid grid-cols-1 gap-10
        py-12 sm:py-14 md:grid-cols-2
        lg:grid-cols-4 lg:gap-10 lg:py-16"
      >

        {/* Company Information */}

        <div className="min-w-0">
          <Logo />

          <p className="mt-5 max-w-sm text-sm
            leading-7 text-body"
          >
            Empowering businesses with innovative software
            solutions, crafted for growth and digital
            transformation across India and the Gulf region.
          </p>

          {socialLinks.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socialLinks.map(
                ({ label, url, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center
                      justify-center rounded-lg
                      border border-line text-heading
                      transition duration-200
                      hover:border-blue-600
                      hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                )
              )}
            </div>
          )}
        </div>


        {/* Services */}

        <div className="min-w-0">
          <h3 className="ft-title font-display
            text-base font-semibold"
          >
            Our Services
          </h3>

          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  className="text-body transition-colors
                    hover:text-blue-600"
                  to={`/service/${service.slug}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        {/* Company Links */}

        <div className="min-w-0">
         <h3 className="ft-title font-display text-base font-semibold">
  Quick Links
</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {filteredCompanyLinks.map(([label, path]) => (
              <li key={path}>
                <Link
                  className="text-body transition-colors
                    hover:text-blue-600"
                  to={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        {/* Contact Information */}

        <div className="min-w-0">
          <h3 className="ft-title font-display
            text-base font-semibold"
          >
            Get in Touch
          </h3>

          <ul className="mt-5 space-y-5 text-sm">

            {/* Address */}

            <li>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3
                  text-body transition-colors
                  hover:text-blue-600"
              >
                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-blue-600"
                />

                <span className="leading-6">
                  {address}
                </span>
              </a>
            </li>


            {/* Email */}

            <li>
              <a
                href={`mailto:${
                  SITE.email || 'contact@codezyntax.com'
                }`}
                className="flex items-start gap-3
                  text-body transition-colors
                  hover:text-blue-600"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <span className="break-all">
                  {SITE.email || 'contact@codezyntax.com'}
                </span>
              </a>
            </li>


            {/* Phone */}

            <li>
              <a
                href="tel:+918848418551"
                className="flex items-center gap-3
                  text-body transition-colors
                  hover:text-blue-600"
              >
                <Phone
                  size={18}
                  className="shrink-0 text-blue-600"
                />

                <span>+91 884 841 8551</span>
              </a>
            </li>


            {/* WhatsApp */}

            {SITE.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2
                    text-body transition-colors
                    hover:text-blue-600"
                >
                  <MessageCircle
                    size={18}
                    className="shrink-0"
                  />

                  Chat on WhatsApp

                  <ArrowUpRight size={14} />
                </a>
              </li>
            )}


            {/* Contact Button */}

            <li className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center
                  gap-2 rounded-lg bg-blue-600
                  px-4 py-2.5 text-sm font-semibold
                  text-white transition
                  hover:bg-blue-700"
              >
                Start a Project
                <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </div>


      {/* Footer Bottom Bar */}

      <div className="ft-bottom border-t border-line/70">
        <div className="container-x flex flex-col
          items-center justify-between gap-4
          py-5 text-center text-xs text-body
          sm:flex-row sm:text-left"
        >
          <p>
            © {new Date().getFullYear()} {SITE.name}.
            All rights reserved.
          </p>

          <div className="flex flex-wrap
            items-center justify-center gap-x-5 gap-y-2"
          >
            <Link
              to="/privacy-policy"
              className="transition-colors
                hover:text-blue-600"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors
                hover:text-blue-600"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


/* =========================
   MAIN LAYOUT
========================= */

export default function Layout() {
  useReveal()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only
          focus:absolute focus:z-50
          focus:bg-surface focus:p-2"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Outlet />
      </main>

      <Footer />

      {SITE.whatsapp && (
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-4 right-4 z-40
            flex items-center justify-center
            rounded-full bg-blue-600 p-3
            text-white shadow-xl transition
            hover:scale-110 hover:bg-blue-700
            sm:bottom-5 sm:right-5 sm:p-3.5"
        >
          <MessageCircle size={23} />
        </a>
      )}
    </>
  )
}