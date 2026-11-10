import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\<>[]{}#@$%&*+=—'

/**
 * Decodes text through a shifting character set. Starts when it enters the
 * viewport, replays on hover, and always cleans its timers up.
 */
export function ScrambleText({
  text,
  as: Tag = 'span',
  className = '',
  speed = 32,
  revealDelay = 0,
  trigger = 'view',
  ...props
}) {
  const [display, setDisplay] = useState(text)
  const ref = useRef(null)
  const timers = useRef([])
  const reduced = useReducedMotion()

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer))
    timers.current = []
  }, [])

  const scramble = useCallback(() => {
    if (reduced) {
      setDisplay(text)
      return
    }

    clearTimers()
    const length = text.length
    let frame = 0

    const tick = () => {
      const progress = Math.min(frame / Math.max(length * 0.9, 1), 1)
      const solved = Math.floor(progress * length)

      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < solved) return char
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )

      frame += 1
      if (progress < 1) {
        timers.current.push(setTimeout(tick, speed))
      } else {
        setDisplay(text)
      }
    }

    timers.current.push(setTimeout(tick, revealDelay))
  }, [clearTimers, reduced, revealDelay, speed, text])

  useEffect(() => {
    setDisplay(reduced ? text : text.replace(/[^\s]/g, '·'))
    if (reduced) return undefined

    if (trigger === 'mount') {
      scramble()
      return clearTimers
    }

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [clearTimers, reduced, scramble, text, trigger])

  return (
    <Tag
      ref={ref}
      className={`scramble-text ${className}`.trim()}
      onMouseEnter={trigger === 'hover' ? scramble : undefined}
      aria-label={text}
      {...props}
    >
      {display}
    </Tag>
  )
}
