import { useEffect } from 'react'
import { profile } from '../config/profile'

/** Keeps the document title in sync with the active virtual route. */
export function useDocumentTitle(title) {
  useEffect(() => {
    const base = `${profile.meta.alias} — ${profile.meta.role}`
    document.title = title ? `${title} · ${base}` : base
    return () => {
      document.title = base
    }
  }, [title])
}
