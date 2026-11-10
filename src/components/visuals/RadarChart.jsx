import { useId } from 'react'

const SIZE = 340
const CENTER = 170
const RADIUS = 112

function pointAt(index, total, radius) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return [CENTER + Math.cos(angle) * radius, CENTER + Math.sin(angle) * radius]
}

/** SVG capability radar. Values are normalised from the profile config. */
export function RadarChart({ data }) {
  const gradientId = useId().replaceAll(':', '')
  const total = data.length
  const maxValue = Math.max(...data.map((item) => item.value), 1)
  const gridLevels = [0.25, 0.5, 0.75, 1]
  const points = data
    .map((item, index) => pointAt(index, total, (item.value / maxValue) * RADIUS))
    .map(([x, y]) => `${x},${y}`)
    .join(' ')

  return (
    <div className="radar-chart">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-labelledby={`${gradientId}-title`}>
        <title id={`${gradientId}-title`}>技术方向项目数量：{data.map((item) => `${item.label} ${item.value}`).join('，')}</title>
        <defs>
          <radialGradient id={`${gradientId}-fill`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#6ff7ff" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#9b6cff" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#ff4fd8" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id={`${gradientId}-stroke`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ff7ff" />
            <stop offset="55%" stopColor="#9b6cff" />
            <stop offset="100%" stopColor="#ff4fd8" />
          </linearGradient>
        </defs>

        {gridLevels.map((level) => {
          const gridPoints = Array.from({ length: total }, (_, index) => pointAt(index, total, RADIUS * level).join(',')).join(' ')
          return (
            <polygon
              key={level}
              points={gridPoints}
              fill={level === 1 ? 'rgba(111, 247, 255, 0.018)' : 'none'}
              stroke="rgba(143, 226, 255, 0.15)"
              strokeWidth="1"
            />
          )
        })}

        {data.map((item, index) => {
          const [x, y] = pointAt(index, total, RADIUS)
          return <line key={item.label} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="rgba(143, 226, 255, 0.11)" />
        })}

        <polygon
          className="radar-chart__shape"
          points={points}
          fill={`url(#${gradientId}-fill)`}
          stroke={`url(#${gradientId}-stroke)`}
          strokeWidth="1.6"
        />

        {data.map((item, index) => {
          const [x, y] = pointAt(index, total, (item.value / maxValue) * RADIUS)
          return <circle key={item.label} cx={x} cy={y} r="3" fill="#d7fbff" className="radar-chart__node" />
        })}

        {data.map((item, index) => {
          const [x, y] = pointAt(index, total, RADIUS + 29)
          const anchor = Math.abs(x - CENTER) < 8 ? 'middle' : x > CENTER ? 'start' : 'end'
          return (
            <g key={item.label}>
              <text x={x} y={y - 3} textAnchor={anchor} className="radar-chart__label">
                {item.label}
              </text>
              <text x={x} y={y + 12} textAnchor={anchor} className="radar-chart__value">
                {item.value}
              </text>
            </g>
          )
        })}

        <circle cx={CENTER} cy={CENTER} r="2.5" fill="#6ff7ff" />
      </svg>
      <div className="radar-chart__corner radar-chart__corner--tl" />
      <div className="radar-chart__corner radar-chart__corner--br" />
    </div>
  )
}
