import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * A looping type / delete cycle. Keeps a single timeout in flight and clears
 * it on unmount so route changes never leave background work behind.
 */
export function Typewriter({ words, className = '', typeSpeed = 55, deleteSpeed = 28, hold = 1400 }) {
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduced = useReducedMotion()
  const timeout = useRef(null)

  useEffect(() => {
    if (reduced) {
      setIndex(0)
      setLength(words[0]?.length || 0)
      return undefined
    }

    const word = words[index % words.length] || ''
    let delay = deleting ? deleteSpeed : typeSpeed

    if (!deleting && length === word.length) delay = hold
    else if (deleting && length === 0) delay = 500

    timeout.current = setTimeout(() => {
      if (!deleting) {
        if (length < word.length) setLength(length + 1)
        else setDeleting(true)
      } else if (length > 0) {
        setLength(length - 1)
      } else {
        setDeleting(false)
        setIndex((current) => (current + 1) % words.length)
      }
    }, delay)

    return () => clearTimeout(timeout.current)
  }, [deleting, hold, index, length, reduced, typeSpeed, deleteSpeed, words])

  const word = words[index % words.length] || ''

  return (
    <span className={`typewriter ${className}`.trim()} aria-live="polite">
      <span aria-hidden="true">{word.slice(0, length)}</span>
      <span className="typewriter__caret" aria-hidden="true" />
      <span className="sr-only">{word}</span>
    </span>
  )
}
