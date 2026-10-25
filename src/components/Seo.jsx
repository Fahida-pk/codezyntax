import { useEffect } from 'react'
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = `${title} | CodeZyntax Softwares LLP`
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
    m.content = description
    let c = document.querySelector('link[rel="canonical"]')
    if (!c) { c = document.createElement('link'); c.rel = 'canonical'; document.head.appendChild(c) }
    c.href = 'https://www.codezyntax.com' + window.location.pathname
  }, [title, description])
  return null
}
