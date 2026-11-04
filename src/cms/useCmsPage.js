import { useEffect, useState } from 'react'

/**
 * Fetch CMS content for a page slug from the PHP API.
 * Components keep their original hard-coded copy as a fallback while the CMS loads.
 */
const cache = new Map()

export function useCmsPage(slug) {
  const [state, setState] = useState(() => ({
    content: cache.get(slug) || {},
    loading: !cache.has(slug),
    error: '',
  }))

  useEffect(() => {
    let active = true
    fetch(`/api/content.php?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    })
      .then(async (res) => {
        let data
        try {
          data = await res.json()
        } catch {
          throw new Error(`Unexpected CMS response (${res.status}).`)
        }
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Unable to load page content')
        }
        return data.page?.content && typeof data.page.content === 'object'
          ? data.page.content
          : {}
      })
      .then((content) => {
        cache.set(slug, content)
        if (active) setState({ content, loading: false, error: '' })
      })
      .catch((err) => {
        if (active) {
          setState((current) => ({
            ...current,
            loading: false,
            error: err instanceof Error ? err.message : 'Unable to load page content',
          }))
        }
      })

    return () => {
      active = false
    }
  }, [slug])

  return state
}

/** Non-empty CMS string, otherwise the page's original copy. */
export const text = (value, fallback = '') =>
  typeof value === 'string' && value.trim() !== '' ? value : fallback

/** Return an object for a section; safely returns {} when a section is missing. */
export const section = (content, key) => {
  const value = content?.[key]
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

/**
 * Accepts either a plain array or the { items: [...] } shape saved by the CMS.
 * An empty/missing CMS list uses the original page data as a safe fallback.
 */
export const items = (value, fallback = []) => {
  const list = Array.isArray(value) ? value : Array.isArray(value?.items) ? value.items : null
  return list && list.length ? list : fallback
}
