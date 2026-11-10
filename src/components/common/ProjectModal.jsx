import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Icon } from './Icon'

/** Full case-study overlay with focus management, ESC support and scroll lock. */
export function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    closeRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
      previouslyFocused.current?.focus?.()
    }
  }, [onClose])

  if (!project) return null

  return (
    <motion.div
      className="project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      role="presentation"
    >
      <motion.div
        className="project-modal__panel"
        style={{ '--project-accent': project.accent }}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="project-modal__topbar">
          <span className="mono-label">CASE FILE / {project.slug.toUpperCase()}</span>
          <button
            ref={closeRef}
            type="button"
            className="project-modal__close"
            onClick={onClose}
            aria-label="Close case study"
            data-cursor="link"
          >
            <span>CLOSE</span>
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="project-modal__hero">
          <div className="project-modal__meta">
            <span>{project.year}</span>
            <span>{project.category}</span>
            <span>{project.client}</span>
          </div>
          <h2 id="project-modal-title">{project.title}</h2>
          <p>{project.subtitle}</p>
        </div>

        <div className="project-modal__visual" aria-hidden="true">
          <span className="project-modal__visual-grid" />
          <span className="project-modal__visual-ring project-modal__visual-ring--a" />
          <span className="project-modal__visual-ring project-modal__visual-ring--b" />
          <span className="project-modal__visual-core" />
          <span className="project-modal__visual-label">{project.slug.replaceAll('-', ' / ').toUpperCase()}</span>
        </div>

        <div className="project-modal__metrics">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="project-modal__body">
          <div className="project-modal__copy">
            <h3>The brief</h3>
            <p>{project.description}</p>
            <h3>The friction</h3>
            <p>{project.challenge}</p>
            <h3>The signal</h3>
            <p>{project.outcome}</p>
          </div>
          <aside className="project-modal__aside">
            <div>
              <h4 className="mono-label">ROLE</h4>
              <p>{project.role}</p>
            </div>
            <div>
              <h4 className="mono-label">SYSTEMS</h4>
              <ul className="tag-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mono-label">CAPABILITIES</h4>
              <ul className="feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={13} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {project.links?.length ? (
              <div className="project-modal__links">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} className="text-link" data-cursor="link">
                    {link.label}
                    <Icon name="arrow" size={14} />
                  </a>
                ))}
              </div>
            ) : null}
       
          </aside>
        </div>
      </motion.div>
    </motion.div>
  )
}
