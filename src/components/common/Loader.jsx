import { useEffect, useRef, useState } from 'react'
import { profile } from '../../config/profile'

/**
 * First-load boot sequence. It only exists for the initial document load;
 * body scroll is restored as soon as the overlay is dismissed.
 */
export function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduced ? 350 : 1650
    const start = performance.now()
    let rafId = 0
    let exitTimer = 0

    document.body.classList.add('is-loading')

    const tick = (now) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))

      if (elapsed < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setExiting(true)
        exitTimer = window.setTimeout(() => {
          document.body.classList.remove('is-loading')
          completeRef.current?.()
        }, reduced ? 40 : 480)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(exitTimer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  return (
    <div className={`loader ${exiting ? 'is-exiting' : ''}`} role="status" aria-live="polite">
      <div className="loader__grid" aria-hidden="true" />
      <div className="loader__content">
        <div className="loader__mark">
          <span className="loader__mark-line" />
          <span className="loader__mark-text">{profile.meta.alias}</span>
        </div>
        <div className="loader__status">
          <span>正在校准光学场域</span>
          <span>{String(progress).padStart(3, '0')}%</span>
        </div>
        <div className="loader__track">
          <div className="loader__fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="loader__meta mono-label">
          <span>神经链路 / 安全</span>
          <span>公开构建 2026</span>
        </div>
      </div>
    </div>
  )
}
