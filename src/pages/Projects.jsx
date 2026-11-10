import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ProjectCard } from '../components/common/ProjectCard'
import { ProjectModal } from '../components/common/ProjectModal'
import { Reveal } from '../components/common/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { NeonButton } from '../components/common/NeonButton'
import { Icon } from '../components/common/Icon'

const processSteps = [
  {
    index: '01',
    title: 'Locate the signal',
    text: 'A short, intense discovery sprint to find the one idea the project must make undeniable. We map audience, constraints, references and the technical unknown.',
  },
  {
    index: '02',
    title: 'Prototype the impossible',
    text: 'The riskiest assumption gets built first. A shader test, a motion study, a live data feed: something real enough to argue with, early enough to change the direction.',
  },
  {
    index: '03',
    title: 'Build the system',
    text: 'The prototype becomes a design system and an engineering plan. Tokens, components, performance budgets and accessibility rules are defined together.',
  },
  {
    index: '04',
    title: 'Tune the launch',
    text: 'The last 10% is where the magic lives. We profile, degrade gracefully, write documentation and make sure the work still feels alive after handoff.',
  },
]

export default function Projects() {
  useDocumentTitle('Projects')
  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)

  const categories = useMemo(() => ['All', ...new Set(profile.projects.map((project) => project.category))], [])
  const filtered = filter === 'All' ? profile.projects : profile.projects.filter((project) => project.category === filter)

  return (
    <div className="page projects-page">
      <section className="page-hero projects-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>02 // WORK ARCHIVE</span>
            <span>{profile.projects.length} CASE FILES</span>
            <span>STATUS: DECLASSIFIED</span>
          </div>
          <div className="projects-hero__grid">
            <Reveal>
              <span className="eyebrow">SELECTED TRANSMISSIONS</span>
              <h1 className="page-title">
                Work with a<br /><span className="text-gradient">pulse.</span>
              </h1>
            </Reveal>
            <Reveal className="projects-hero__copy" delay={120}>
              <p className="lead-copy">
                Brand worlds, spatial interfaces and real-time systems for people who believe the browser is still the most interesting canvas ever built.
              </p>
              <p>
                Every case file below began with a version of the same question: how do we make something complex feel immediate? Open any card for the brief, the friction and the measurable signal.
              </p>
              <div className="projects-hero__hint">
                <Icon name="cube" size={18} />
                <span className="mono-label">HOVER TO TILT / CLICK TO OPEN</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section projects-archive">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-bar__left">
              <span className="mono-label">FILTER BY DISCIPLINE</span>
              <div className="filter-chips" role="group" aria-label="Filter projects by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-chip ${filter === category ? 'is-active' : ''}`}
                    onClick={() => setFilter(category)}
                    aria-pressed={filter === category}
                    data-cursor="link"
                  >
                    {category}
                    <span>{category === 'All' ? profile.projects.length : profile.projects.filter((project) => project.category === category).length}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-bar__right mono-label">
              <span>SHOWING {String(filtered.length).padStart(2, '0')} / {String(profile.projects.length).padStart(2, '0')}</span>
              <span className="filter-bar__line" />
            </div>
          </div>

          <motion.div layout className="project-grid project-grid--archive">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: index * 0.025 }}
                >
                  <ProjectCard project={project} index={index} onOpen={setActiveProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHeader
            index="03"
            eyebrow="METHOD / SIGNAL TO SHIP"
            title="A process built for ambiguity."
            copy="Ambition needs a container. This is the four-stage operating rhythm I bring to complex creative projects."
          />
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal key={step.index} className="process-card" delay={index * 80}>
                <div className="process-card__top">
                  <span className="process-card__index">{step.index}</span>
                  <span className="process-card__line" />
                  <span className="mono-label">PHASE</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section archive-table-section">
        <div className="container">
          <div className="section-topline">
            <SectionHeader
              index="04"
              eyebrow="COMPLETE INDEX"
              title="Every file in the drawer."
              copy="A compact index of the archive, including self-initiated research and projects that are not ready for the public eye."
            />
          </div>
          <div className="archive-table">
            <div className="archive-table__head mono-label">
              <span>ID</span>
              <span>PROJECT</span>
              <span>DISCIPLINE</span>
              <span>YEAR</span>
              <span>STATUS</span>
            </div>
            {profile.projects.map((project, index) => (
              <button
                type="button"
                key={project.slug}
                className="archive-table__row"
                onClick={() => setActiveProject(project)}
                data-cursor="link"
                data-cursor-label="OPEN"
              >
                <span className="mono-label">0{index + 1}</span>
                <span className="archive-table__project">
                  <strong>{project.title}</strong>
                  <small>{project.client}</small>
                </span>
                <span>{project.category}</span>
                <span>{project.year}</span>
                <span className="archive-table__status"><i /> RELEASED</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-cta">
        <div className="container">
          <Reveal className="projects-cta__panel glass-panel">
            <span className="mono-label">NEXT CASE FILE / YOURS</span>
            <h2>The archive has room for one more signal.</h2>
            <p>Bring me the project that feels a little too ambitious for its timeline. That is usually where the interesting work lives.</p>
            <NeonButton to="/contact" icon="send">Begin a brief</NeonButton>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}
      </AnimatePresence>
    </div>
  )
}
