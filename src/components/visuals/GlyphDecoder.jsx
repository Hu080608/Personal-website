import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CIPHER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\/[]{}—=+*^?#'
const DEFAULT_TEXT = 'THE FUTURE IS A MATERIAL WE CAN PROTOTYPE'

/** Interactive text decoder with a controllable interference field. */
export function GlyphDecoder() {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [output, setOutput] = useState(DEFAULT_TEXT)
  const [running, setRunning] = useState(false)
  const [intensity, setIntensity] = useState(62)
  const frameRef = useRef(0)
  const timerRef = useRef(null)
  const reduced = useReducedMotion()

  const decode = () => {
    if (running) return
    if (reduced) {
      setOutput(text.toUpperCase())
      return
    }

    setRunning(true)
    const target = text.toUpperCase()
    const totalFrames = Math.max(18, Math.round((100 - intensity) * 0.55) + target.length)
    frameRef.current = 0

    const tick = () => {
      const progress = frameRef.current / totalFrames
      const solved = Math.floor(progress * target.length)
      setOutput(
        target
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < solved) return char
            return CIPHER[Math.floor(Math.random() * CIPHER.length)]
          })
          .join(''),
      )
      frameRef.current += 1
      if (frameRef.current <= totalFrames) {
        timerRef.current = window.setTimeout(tick, 34)
      } else {
        setOutput(target)
        setRunning(false)
      }
    }

    tick()
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div className="glyph-decoder glass-panel">
      <div className="glyph-decoder__head">
        <div>
          <span className="mono-label">GLYPH DECODER / EXP-004</span>
          <h3>Interference engine</h3>
        </div>
        <span className={`glyph-decoder__state ${running ? 'is-running' : ''}`}>
          {running ? 'DECODING' : 'READY'}
        </span>
      </div>

      <label className="glyph-decoder__label mono-label" htmlFor="glyph-source">SOURCE STRING</label>
      <input
        id="glyph-source"
        className="glyph-decoder__input"
        value={text}
        maxLength={80}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter a transmission…"
      />

      <div className="glyph-decoder__output" aria-live="polite">
        <span className="glyph-decoder__bracket">[</span>
        <span>{output || '·'}</span>
        <span className="glyph-decoder__bracket">]</span>
        <span className="glyph-decoder__cursor" aria-hidden="true">_</span>
      </div>

      <div className="glyph-decoder__controls">
        <label htmlFor="glyph-intensity" className="glyph-decoder__range-label">
          <span className="mono-label">INTERFERENCE</span>
          <span>{intensity}%</span>
        </label>
        <input
          id="glyph-intensity"
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={(event) => setIntensity(Number(event.target.value))}
        />
        <button type="button" className="glyph-decoder__button" onClick={decode} disabled={running} data-cursor="link">
          {running ? 'RESOLVING…' : 'DECODE SIGNAL'}
        </button>
      </div>
    </div>
  )
}
