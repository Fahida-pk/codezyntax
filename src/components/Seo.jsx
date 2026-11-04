import { useEffect } from 'react'

const SITE_URL = 'https://www.codezyntax.com'
const SITE_FALLBACK = 'CodeZyntax Softwares LLP'

function getCurrentPagePath() {
  const hash = window.location.hash || ''

  // React HashRouter: #/about -> /about
  if (hash.startsWith('#/')) {
    return normalizePath(hash.slice(1).split('?')[0])
  }

  return normalizePath(window.location.pathname)
}

function normalizePath(path = '/') {
  let value = String(path).trim()

  if (value.startsWith('#')) {
    value = value.slice(1)
  }

  if (!value.startsWith('/')) {
    value = '/' + value
  }

  value = value.split('?')[0]

  return value.length > 1
    ? value.replace(/\/+$/, '').toLowerCase()
    : '/'
}

function setMeta(selector, attribute, value) {
  let element = document.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute === 'name' ? 'name' : 'property', selector.includes('property=') ? selector.match(/property="([^"]+)"/)?.[1] : selector.match(/name="([^"]+)"/)?.[1])
    document.head.appendChild(element)
  }

  element.content = value || ''
}

function absoluteImageUrl(value) {
  if (!value) return ''

  try {
    return new URL(value, SITE_URL).href
  } catch {
    return ''
  }
}

function applySeo({ title, description, image }) {
  document.title = title

  setMeta('meta[name="description"]', 'name', description)
  setMeta('meta[property="og:title"]', 'property', title)
  setMeta('meta[property="og:description"]', 'property', description)
  setMeta('meta[property="og:type"]', 'property', 'website')

  if (image) {
    setMeta('meta[property="og:image"]', 'property', image)
    setMeta('meta[name="twitter:image"]', 'name', image)
  }

  setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image')
  setMeta('meta[name="twitter:title"]', 'name', title)
  setMeta('meta[name="twitter:description"]', 'name', description)

  let canonical = document.querySelector('link[rel="canonical"]')

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }

  canonical.href = SITE_URL + window.location.pathname
}

export default function Seo({ title, description }) {
  useEffect(() => {
    let active = true

    const fallbackTitle = title
      ? `${title} | ${SITE_FALLBACK}`
      : SITE_FALLBACK

    // Show the React page's fallback SEO immediately.
    applySeo({
      title: fallbackTitle,
      description: description || '',
      image: '',
    })

    async function loadSeo() {
      try {
        const response = await fetch(
          '/api/content.php?slug=seo',
          {
            cache: 'no-store',
            credentials: 'same-origin',
          }
        )

        if (!response.ok) {
          throw new Error('SEO settings could not be loaded')
        }

        const result = await response.json()

        if (!result.success || !result.page) {
          throw new Error('Invalid SEO response')
        }

        const content = result.page.content || {}
        const globalSeo = content.global || {}
        const pageSeoItems = content.pages?.items || []

        const currentPath = getCurrentPagePath()

        // Find SEO settings for the current React route.
        const pageSeo = pageSeoItems.find((item) => {
          return normalizePath(item.path) === currentPath
        }) || {}

        const siteName = globalSeo.siteName || SITE_FALLBACK

        // Priority:
        // 1. Individual page SEO
        // 2. Global SEO settings
        // 3. Existing React SEO fallback
        const selectedTitle =
          pageSeo.title ||
          globalSeo.defaultTitle ||
          title ||
          siteName

        const selectedDescription =
          pageSeo.description ||
          globalSeo.defaultDescription ||
          description ||
          ''

        const finalTitle = selectedTitle
          .toLowerCase()
          .includes(siteName.toLowerCase())
          ? selectedTitle
          : `${selectedTitle} | ${siteName}`

        const selectedImage = absoluteImageUrl(
          pageSeo.ogImage || globalSeo.ogImage || ''
        )

        if (!active) return

        applySeo({
          title: finalTitle,
          description: selectedDescription,
          image: selectedImage,
        })
      } catch (error) {
        console.error('CMS SEO:', error)
        // Keep existing React SEO if the API is unavailable.
      }
    }

    loadSeo()

    return () => {
      active = false
    }
  }, [title, description])

  return null
}
