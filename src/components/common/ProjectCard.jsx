import { useRef } from 'react'
import { Icon } from './Icon'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Pointer-driven 3D tilt. The transform is applied through CSS variables so
 * hover lighting can reuse the same coordinates without extra React renders.
 * Touch and reduced-motion users get a static, fully accessible card.
 */
export function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null)
  const frameRef = useRef(0)
  const reduced = useReducedMotion()

  const onPointerMove = (event) => {
    if (reduced || event.pointerType === 'touch') return
    const card = cardRef.current
    if (!card) return

    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 9}deg`)
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 11}deg`)
      card.style.setProperty('--spot-x', `${x * 100}%`)
      card.style.setProperty('--spot-y', `${y * 100}%`)
    })
  }

  const onPointerLeave = () => {
    const card = cardRef.current
    if (!card) return
    cancelAnimationFrame(frameRef.current)
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
    card.style.setProperty('--spot-x', '50%')
    card.style.setProperty('--spot-y', '50%')
  }

  return (
    <button
      ref={cardRef}
      type="button"
      className="project-card"
      style={{ '--project-accent': project.accent, '--card-index': index }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={() => onOpen(project)}
      data-cursor="view"
      data-cursor-label="VIEW"
      aria-label={`Open case study: ${project.title}`}
    >
      <span className="project-card__border" aria-hidden="true" />
      <span className="project-card__spotlight" aria-hidden="true" />
      <span className="project-card__top">
        <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__year">{project.year}</span>
      </span>

      <span className="project-card__art" aria-hidden="true">
        <span className="project-card__orbit project-card__orbit--one" />
        <span className="project-card__orbit project-card__orbit--two" />
        <span className="project-card__core" />
        <span className="project-card__scan" />
        <span className="project-card__code">{project.slug.toUpperCase()}</span>
      </span>

      <span className="project-card__content">
        <span className="project-card__title">{project.title}</span>
        <span className="project-card__summary">{project.summary}</span>
        <span className="project-card__footer">
          <span className="project-card__stack">
            {project.stack.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
          <span className="project-card__open">
            OPEN FILE
            <Icon name="arrow" size={15} />
          </span>
        </span>
      </span>
    </button>
  )
}
