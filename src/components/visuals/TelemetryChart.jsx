import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const POINTS = 120
const ACCENTS = ['#6ff7ff', '#9b6cff', '#3ff2b0']

/**
 * Canvas telemetry monitor. The render loop runs at a fixed 30fps cadence,
 * draws a random-walk signal plus frequency bars, and cleans up every
 * observer / listener / animation frame on unmount.
 */
export function TelemetryChart() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const latencyRef = useRef(null)
  const throughputRef = useRef(null)
  const stabilityRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let rafId = 0
    let disposed = false
    let lastDraw = 0
    let lastHud = 0
    let frame = 0
    let hueShift = 0
    const data = Array.from({ length: POINTS }, (_, index) => 50 + Math.sin(index * 0.18) * 10)
    const bars = Array.from({ length: 34 }, () => 0.2 + Math.random() * 0.6)
    const pointer = { x: 0.5, y: 0.5, active: false }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(rect.width, 1)
      height = Math.max(rect.height, 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event) => {
      const rect = wrap.getBoundingClientRect()
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const step = () => {
      const previous = data[data.length - 1]
      const wave = Math.sin(frame * 0.045) * 4.8 + Math.sin(frame * 0.012) * 9
      const next = Math.max(10, Math.min(90, previous + (Math.random() - 0.5) * 8 + wave * 0.13))
      data.push(next)
      data.shift()

      bars.forEach((value, index) => {
        const target = 0.16 + Math.abs(Math.sin(frame * 0.035 + index * 0.6)) * 0.68 + Math.random() * 0.1
        bars[index] += (target - bars[index]) * 0.16
      })
      frame += 1
      hueShift += 0.25
    }

    const draw = (now) => {
      if (disposed) return
      if (now - lastDraw > 1000 / 30) {
        step()
        lastDraw = now

        ctx.clearRect(0, 0, width, height)

        // Grid
        ctx.strokeStyle = 'rgba(111, 247, 255, 0.08)'
        ctx.lineWidth = 1
        for (let x = 0; x < width; x += 34) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }
        for (let y = 0; y < height; y += 30) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }

        // Frequency bars in the lower third
        const barWidth = width / bars.length
        bars.forEach((value, index) => {
          const barHeight = value * height * 0.34
          const x = index * barWidth + barWidth * 0.25
          const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight)
          gradient.addColorStop(0, 'rgba(111, 247, 255, 0.02)')
          gradient.addColorStop(1, index % 3 === 0 ? 'rgba(255, 79, 216, 0.36)' : 'rgba(155, 108, 255, 0.34)')
          ctx.fillStyle = gradient
          ctx.fillRect(x, height - barHeight - 12, barWidth * 0.5, barHeight)
        })

        // Signal area
        const plotTop = height * 0.15
        const plotHeight = height * 0.5
        const pointWidth = width / (POINTS - 1)
        const toY = (value) => plotTop + (1 - value / 100) * plotHeight

        const area = ctx.createLinearGradient(0, plotTop, 0, plotTop + plotHeight)
        area.addColorStop(0, 'rgba(111, 247, 255, 0.22)')
        area.addColorStop(0.6, 'rgba(155, 108, 255, 0.07)')
        area.addColorStop(1, 'rgba(155, 108, 255, 0)')

        ctx.beginPath()
        data.forEach((value, index) => {
          const x = index * pointWidth
          const y = toY(value)
          if (index === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        ctx.fillStyle = area
        ctx.fill()

        ctx.beginPath()
        data.forEach((value, index) => {
          const x = index * pointWidth
          const y = toY(value)
          if (index === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        const line = ctx.createLinearGradient(0, 0, width, 0)
        line.addColorStop(0, '#6ff7ff')
        line.addColorStop(0.55, '#9b6cff')
        line.addColorStop(1, '#ff4fd8')
        ctx.strokeStyle = line
        ctx.lineWidth = 1.6
        ctx.shadowColor = '#6ff7ff'
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.shadowBlur = 0

        // Moving scan cursor
        const current = data[data.length - 1]
        const cursorX = width - 2
        ctx.strokeStyle = 'rgba(111, 247, 255, 0.75)'
        ctx.beginPath()
        ctx.moveTo(cursorX, toY(current) - 8)
        ctx.lineTo(cursorX, toY(current) + 8)
        ctx.stroke()

        if (pointer.active) {
          const px = pointer.x * width
          const py = pointer.y * height
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
          ctx.beginPath()
          ctx.moveTo(px, 0)
          ctx.lineTo(px, height)
          ctx.moveTo(0, py)
          ctx.lineTo(width, py)
          ctx.stroke()
        }

        if (now - lastHud > 450) {
          lastHud = now
          if (latencyRef.current) latencyRef.current.textContent = `${(8 + Math.random() * 12).toFixed(1)} ms`
          if (throughputRef.current) throughputRef.current.textContent = `${(2.1 + Math.random() * 2.7).toFixed(2)} GB/s`
          if (stabilityRef.current) stabilityRef.current.textContent = `${(97.2 + Math.random() * 2.4).toFixed(1)}%`
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    wrap.addEventListener('pointermove', onPointerMove, { passive: true })
    wrap.addEventListener('pointerleave', onPointerLeave)

    if (reduced) {
      step()
      draw(1000)
      cancelAnimationFrame(rafId)
    } else {
      rafId = requestAnimationFrame(draw)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      observer.disconnect()
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduced])

  return (
    <div className="telemetry glass-panel" ref={wrapRef}>
      <div className="telemetry__head">
        <div>
          <span className="mono-label">SIGNAL TELEMETRY / LIVE</span>
          <h3>Network attention field</h3>
        </div>
        <span className="telemetry__live"><span className="status-dot" /> STREAMING</span>
      </div>
      <div className="telemetry__canvas-wrap">
        <canvas ref={canvasRef} aria-label="Animated synthetic network telemetry chart" />
        <div className="telemetry__axis telemetry__axis--y" aria-hidden="true">
          <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
        </div>
        <div className="telemetry__scanline" aria-hidden="true" />
      </div>
      <div className="telemetry__stats">
        <div><span className="mono-label">LATENCY</span><strong ref={latencyRef}>12.0 ms</strong></div>
        <div><span className="mono-label">THROUGHPUT</span><strong ref={throughputRef}>3.10 GB/s</strong></div>
        <div><span className="mono-label">STABILITY</span><strong ref={stabilityRef}>98.4%</strong></div>
        <div><span className="mono-label">SAMPLE RATE</span><strong>30 fps</strong></div>
      </div>
      <div className="telemetry__footer mono-label">
        <span>TX: NEXUS-07</span>
        <span>RX: LOCALHOST</span>
        <span>PACKETS: 1,204,882</span>
      </div>
    </div>
  )
}
