import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { RadarChart } from '../components/visuals/RadarChart'
import { SectionHeader } from '../components/common/SectionHeader'
import { Reveal } from '../components/common/Reveal'
import { ScrambleText } from '../components/common/ScrambleText'
import { Icon } from '../components/common/Icon'
import { NeonButton } from '../components/common/NeonButton'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useDocumentTitle('About')
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(min-width: 769px)').matches) {
        gsap.utils.toArray('[data-parallax]').forEach((element) => {
          gsap.to(element, {
            y: Number(element.dataset.parallax || -40),
            ease: 'none',
            scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="page about-page" ref={rootRef}>
      <section className="page-hero about-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>01 // ORIGIN SIGNAL</span>
            <span>{profile.meta.coordinates}</span>
            <span>PROFILE: ACTIVE</span>
          </div>
          <div className="about-hero__grid">
            <div className="about-hero__title-wrap">
              <Reveal>
                <span className="eyebrow">HUMAN / MACHINE INTERFACE</span>
                <h1 className="page-title">
                  A designer who <span className="text-gradient">ships.</span><br />
                  An engineer who <span className="text-outline">dreams.</span>
                </h1>
              </Reveal>
            </div>
            <Reveal className="about-hero__portrait" delay={120}>
              <div className="portrait-frame">
                <div className="portrait-frame__grid" aria-hidden="true" />
                <div className="portrait-frame__scan" aria-hidden="true" />
                <div className="portrait-glyph" aria-hidden="true">N<span>/</span>A</div>
                <div className="portrait-frame__meta">
                  <span className="mono-label">SUBJECT / {profile.meta.name}</span>
                  <span className="mono-label">CAPTURE / {new Date().getFullYear()}</span>
                </div>
                <span className="portrait-frame__cross portrait-frame__cross--tl" />
                <span className="portrait-frame__cross portrait-frame__cross--br" />
              </div>
            </Reveal>
          </div>
          <Reveal className="about-hero__lead" delay={160}>
            <p className="lead-copy">{profile.about.lead}</p>
            <div className="about-hero__quote">
              <span className="quote-mark">“</span>
              <p>{profile.about.quote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story__grid">
          <Reveal className="about-story__sticky">
            <span className="mono-label">PERSONAL LOG / 001—003</span>
            <h2 className="display-heading">Built from curiosity,<br /><span className="text-gradient">tuned by iteration.</span></h2>
            <div className="about-status-list">
              {profile.about.status.map((item) => (
                <div key={item.label}>
                  <span className="mono-label">{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="about-story__copy">
            {profile.about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 70} className="story-paragraph">
                <span className="story-paragraph__index">0{index + 1}</span>
                <p>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal className="story-side-note glass-panel" delay={120}>
              <span className="mono-label">PHILOSOPHY / SLASH</span>
              <p>Design the feeling first. Then design the system that can reproduce it.</p>
              <span className="story-side-note__sign">— {profile.meta.initials}</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section capability-section capability-section--about">
        <div className="container">
          <SectionHeader
            index="02"
            eyebrow="CAPABILITY MATRIX"
            title="T-shaped, with a deep vertical."
            copy="The radar is not a scorecard. It is a map of where I can move fast, where I can go deep, and where I collaborate with specialists."
          />
          <div className="capability-layout">
            <Reveal className="capability-radar">
              <RadarChart data={profile.about.radar} />
              <div className="capability-radar__legend">
                <span><i className="legend-dot legend-dot--cyan" />Current range</span>
                <span><i className="legend-dot legend-dot--violet" />Growth edge</span>
              </div>
            </Reveal>
            <div className="skill-matrix">
              {profile.about.skillGroups.map((group, groupIndex) => (
                <Reveal key={group.title} className="skill-matrix__group" delay={groupIndex * 70}>
                  <div className="skill-matrix__head">
                    <Icon name={group.icon} size={19} />
                    <h3>{group.title}</h3>
                    <span className="mono-label">0{groupIndex + 1}</span>
                  </div>
                  <div className="skill-matrix__items">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <SectionHeader
            index="03"
            eyebrow="TRANSMISSION HISTORY"
            title="A timeline of useful accidents."
            copy="Every role added a new instrument to the studio. Here is the short version of how the practice was assembled."
          />
          <div className="timeline">
            <div className="timeline__line" aria-hidden="true" />
            {profile.about.timeline.map((item, index) => (
              <Reveal key={item.period + item.role} className="timeline-item" delay={index * 60}>
                <div className="timeline-item__node">
                  <span />
                </div>
                <div className="timeline-item__period mono-label">{item.period}</div>
                <div className="timeline-item__body">
                  <h3>{item.role}</h3>
                  <span className="timeline-item__org">{item.org}</span>
                  <p>{item.description}</p>
                  <div className="tag-list">
                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section principles-section">
        <div className="container">
          <SectionHeader
            index="04"
            eyebrow="OPERATING PRINCIPLES"
            title="Code is a material. Taste is a constraint."
            copy="Four rules that keep ambitious work honest when the deadline gets loud."
          />
          <div className="principles-grid">
            {profile.about.principles.map((principle, index) => (
              <Reveal key={principle.index} className="principle-card" delay={index * 80}>
                <span className="principle-card__index">{principle.index}</span>
                <div className="principle-card__line" />
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="about-now glass-panel" delay={100}>
            <div>
              <span className="mono-label">NOW / FOCUS FIELD</span>
              <h3><ScrambleText text="Building tools that make complex systems feel alive." trigger="view" /></h3>
            </div>
            <p>
              Currently prototyping a real-time brand engine, studying ambient information design, and writing a small field guide to creative engineering. Current availability: {profile.meta.availability}.
            </p>
            <NeonButton to="/contact" icon="arrow">Start a conversation</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
