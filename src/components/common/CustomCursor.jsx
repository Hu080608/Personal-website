import { useEffect, useRef } from 'react'

/**
 * Two-layer cursor: a fast dot and a lagging outer ring. Only activates on
 * fine-pointer devices; the rAF loop is cancelled and listeners removed on
 * unmount. `data-cursor-label` lets any element give the ring a verb.
 */
export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    if (!finePointer.matches) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return undefined

    document.body.classList.add('custom-cursor-active')
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let rafId = 0

    const render = () => {
      ringX += (pointerX - ringX) * 0.16
      ringY += (pointerY - ringY) * 0.16
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      rafId = window.requestAnimationFrame(render)
    }

    const onMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
    }

    const onOver = (event) => {
      const target = event.target.closest('a, button, [data-cursor], input, textarea, select')
      if (!target) {
        ring.classList.remove('is-hovering', 'has-label')
        label.textContent = ''
        return
      }

      ring.classList.add('is-hovering')
      const cursorLabel = target.getAttribute('data-cursor-label')
      if (cursorLabel) {
        label.textContent = cursorLabel
        ring.classList.add('has-label')
      } else {
        label.textContent = ''
        ring.classList.remove('has-label')
      }
    }

    const onDown = () => ring.classList.add('is-pressed')
    const onUp = () => ring.classList.remove('is-pressed')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    rafId = window.requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-ring__label" />
      </div>
    </div>
  )
}
