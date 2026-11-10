import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ParticleField } from '../components/background/ParticleField'
import { GlitchText } from '../components/common/GlitchText'
import { ScrambleText } from '../components/common/ScrambleText'
import { Typewriter } from '../components/common/Typewriter'
import { Icon } from '../components/common/Icon'
import { NeonButton } from '../components/common/NeonButton'
import { SectionHeader } from '../components/common/SectionHeader'
import { ProjectCard } from '../components/common/ProjectCard'
import { ProjectModal } from '../components/common/ProjectModal'
import { Reveal } from '../components/common/Reveal'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useDocumentTitle('Home')
  const rootRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)
  const featured = profile.projects.filter((project) => project.featured).slice(0, 3)
  const latestPosts = profile.posts.slice(0, 2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero__content > *',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.1 },
      )
      gsap.fromTo('.hero__rail, .scroll-cue', { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.9 })

      if (window.matchMedia('(min-width: 769px)').matches) {
        gsap.utils.toArray('[data-parallax]').forEach((element) => {
          gsap.to(element, {
            y: Number(element.dataset.parallax || -60),
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="page home-page" ref={rootRef}>
      <section className="hero">
        <ParticleField />
        <div className="hero__aurora" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__content container">
          <div className="hero__overline">
            <span className="status-dot" />
            <ScrambleText text={profile.hero.overline} trigger="mount" speed={24} />
            <span className="hero__overline-line" />
            <span className="mono-label">EST. {profile.meta.copyrightStart}</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line">
              <GlitchText text={profile.meta.firstName} as="span" className="hero__title-first" />
            </span>
            <span className="hero__title-line hero__title-line--second">
              <span className="hero__title-outline">{profile.meta.lastName}</span>
              <span className="hero__title-dot">.</span>
            </span>
          </h1>

          <div className="hero__role-row">
            <span className="hero__role-prefix mono-label">OPERATOR PROFILE //</span>
            <Typewriter words={profile.hero.roles} className="hero__role" />
          </div>

          <p className="hero__intro">{profile.hero.intro}</p>

          <div className="hero__actions">
            <NeonButton to={profile.hero.primaryCta.to} icon="arrow">
              {profile.hero.primaryCta.label}
            </NeonButton>
            <NeonButton to={profile.hero.secondaryCta.to} variant="ghost" icon="send">
              {profile.hero.secondaryCta.label}
            </NeonButton>
          </div>

          <div className="hero__stats">
            {profile.hero.stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <span className="hero-stat__value">{stat.value}</span>
                <span className="hero-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__rail hero__rail--left" aria-hidden="true">
          <span>{profile.meta.coordinates}</span>
          <span className="hero__rail-line" />
          <span>SIGNAL / 98.4</span>
        </div>
        <div className="hero__rail hero__rail--right" aria-hidden="true">
          <span>SCROLL TO DECODE</span>
          <span className="hero__rail-line" />
          <span>{profile.meta.initials.split('').join(' / ')} — 4.2</span>
        </div>

        <a href="#signal" className="scroll-cue" aria-label="Scroll to content" data-cursor="link">
          <span className="scroll-cue__text">SCROLL</span>
          <span className="scroll-cue__track"><span className="scroll-cue__thumb" /></span>
        </a>

        <div className="hero__corner hero__corner--tl" aria-hidden="true" />
        <div className="hero__corner hero__corner--br" aria-hidden="true" />
      </section>

      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-strip__track">
          {[...profile.hero.marquee, ...profile.hero.marquee].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>

      <section className="section signal-section" id="signal">
        <div className="container">
          <div className="signal-grid">
            <Reveal className="signal-grid__intro">
              <div className="section-header__eyebrow">
                <span className="section-header__index">01</span>
                <span className="mono-label">ORIGIN SIGNAL</span>
                <span className="section-header__line" />
              </div>
              <h2 className="display-heading">
                Between <span className="text-gradient">impossible</span> art direction and production-ready code.
              </h2>
            </Reveal>

            <Reveal className="signal-grid__copy" delay={120}>
              <p className="lead-copy">{profile.about.lead}</p>
              <p>{profile.about.paragraphs[0]}</p>
              <Link to="/about" className="text-link" data-cursor="link">
                Read the full dossier
                <Icon name="arrow" size={15} />
              </Link>
            </Reveal>

            <Reveal className="signal-grid__panel glass-panel" delay={180}>
              <span className="panel-collar">LIVE STATUS</span>
              {profile.about.status.map((item) => (
                <div className="status-row" key={item.label}>
                  <span className="mono-label">{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
              <div className="signal-wave" aria-hidden="true">
                {Array.from({ length: 22 }).map((_, index) => (
                  <span key={index} style={{ '--wave-index': index }} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section work-section">
        <div className="container">
          <div className="section-topline">
            <SectionHeader
              index="02"
              eyebrow="SELECTED TRANSMISSIONS"
              title="Work that leaves a trace."
              copy="A selection of identities, interfaces and systems built for teams operating at the edge of what the browser can do."
            />
            <Reveal delay={160}>
              <NeonButton to="/projects" variant="ghost" icon="arrow">
                All case files
              </NeonButton>
            </Reveal>
          </div>

          <div className="project-grid project-grid--home">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 90}>
                <ProjectCard project={project} index={index} onOpen={setActiveProject} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section capability-section">
        <div className="container">
          <SectionHeader
            index="03"
            eyebrow="CAPABILITY MATRIX"
            title="A full-stack creative practice."
            copy="I move between the whiteboard, the design file and the render loop. The through-line is an obsession with how things feel when they respond."
          />

          <div className="capability-grid">
            {profile.about.skillGroups.map((group, index) => (
              <Reveal key={group.title} className="capability-card" delay={index * 80}>
                <div className="capability-card__icon">
                  <Icon name={group.icon} size={24} />
                </div>
                <span className="capability-card__index">0{index + 1}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <div className="capability-footer">
            <Reveal>
              <p className="mono-label">CURRENTLY EXPLORING</p>
              <p className="capability-footer__marquee">SPATIAL UI · GENERATIVE IDENTITY · REALTIME DATA · WEBGPU · AMBIENT COMPUTING</p>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/lab" className="text-link" data-cursor="link">
                Enter the lab
                <Icon name="arrow" size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section manifesto-section">
        <div className="container manifesto-grid">
          <Reveal className="manifesto-grid__marker">
            <span className="manifesto-index">04</span>
            <span className="mono-label">DESIGN MANIFESTO</span>
          </Reveal>
          <Reveal className="manifesto-grid__quote" delay={90}>
            <p data-parallax="-32">
              The screen is not the destination. It is the <span className="text-gradient">threshold</span>.
            </p>
            <div className="manifesto-grid__foot">
              <span className="mono-label">{profile.meta.name} / {new Date().getFullYear()}</span>
              <span className="manifesto-sign">{profile.meta.initials}</span>
            </div>
          </Reveal>
          <Reveal className="manifesto-grid__principles" delay={180}>
            {profile.about.principles.slice(0, 3).map((principle) => (
              <div key={principle.index} className="mini-principle">
                <span className="mono-label">{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section journal-section">
        <div className="container">
          <div className="section-topline">
            <SectionHeader
              index="05"
              eyebrow="FIELD NOTES"
              title="Signals from the work."
              copy="Essays on interfaces, motion, performance and the strange craft of building believable digital worlds."
            />
            <Reveal delay={120}>
              <NeonButton to="/blog" variant="ghost" icon="arrow">
                Read the log
              </NeonButton>
            </Reveal>
          </div>

          <div className="home-posts">
            {latestPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 100}>
                <Link to={`/blog/${post.slug}`} className="home-post" data-cursor="link" data-cursor-label="READ">
                  <div className="home-post__meta">
                    <span className="mono-label">{post.displayDate}</span>
                    <span className="mono-label">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="home-post__link">
                    {post.category}
                    <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-cta">
        <div className="container">
          <Reveal className="home-cta__panel glass-panel">
            <div className="home-cta__orb" aria-hidden="true" />
            <span className="mono-label">CHANNEL OPEN / RESPONSE &lt; 48H</span>
            <h2>Have a signal worth amplifying?</h2>
            <p>{profile.contact.lead}</p>
            <div className="home-cta__actions">
              <NeonButton to="/contact" icon="send">Open a channel</NeonButton>
              <a href={`mailto:${profile.meta.email}`} className="text-link" data-cursor="link">
                {profile.meta.email}
                <Icon name="arrow" size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}
      </AnimatePresence>
    </div>
  )
}
