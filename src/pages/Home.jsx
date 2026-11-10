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
  useDocumentTitle('首页')
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
            <span className="mono-label">始于 {profile.meta.copyrightStart}</span>
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
            <span className="hero__role-prefix mono-label">操作者档案 //</span>
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
          <span>信号强度 / 98.4</span>
        </div>
        <div className="hero__rail hero__rail--right" aria-hidden="true">
          <span>向下滚动解码</span>
          <span className="hero__rail-line" />
          <span>{profile.meta.initials.split('').join(' / ')} — 4.2</span>
        </div>

        <a href="#signal" className="scroll-cue" aria-label="向下滚动到内容" data-cursor="link">
          <span className="scroll-cue__text">向下</span>
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
                <span className="mono-label">起源信号</span>
                <span className="section-header__line" />
              </div>
              <h2 className="display-heading">
                在<span className="text-gradient">不可能</span>的艺术方向与可上线的代码之间。
              </h2>
            </Reveal>

            <Reveal className="signal-grid__copy" delay={120}>
              <p className="lead-copy">{profile.about.lead}</p>
              <p>{profile.about.paragraphs[0]}</p>
              <Link to="/about" className="text-link" data-cursor="link">
                阅读完整档案
                <Icon name="arrow" size={15} />
              </Link>
            </Reveal>

            <Reveal className="signal-grid__panel glass-panel" delay={180}>
              <span className="panel-collar">实时状态</span>
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
              eyebrow="精选传输"
              title="作品会留下痕迹。"
              copy="为那些站在浏览器能力边缘的团队，构建品牌识别、界面与系统。"
            />
            <Reveal delay={160}>
              <NeonButton to="/projects" variant="ghost" icon="arrow">
                全部案例
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
            eyebrow="能力矩阵"
            title="完整的创意实践。"
            copy="我在白板、设计文件和渲染循环之间来回移动。贯穿始终的，是对“回应时的手感”近乎偏执的关注。"
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
              <p className="mono-label">正在探索</p>
              <p className="capability-footer__marquee">空间界面 · 生成式品牌 · 实时数据 · WEBGPU · 环境计算</p>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/lab" className="text-link" data-cursor="link">
                进入实验室
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
            <span className="mono-label">设计宣言</span>
          </Reveal>
          <Reveal className="manifesto-grid__quote" delay={90}>
            <p data-parallax="-32">
              屏幕不是终点，而是通往未知的<span className="text-gradient">入口</span>。
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
              eyebrow="现场笔记"
              title="来自工作的信号。"
              copy="关于界面、动效、性能，以及构建可信数字世界这门奇怪手艺的随笔。"
            />
            <Reveal delay={120}>
              <NeonButton to="/blog" variant="ghost" icon="arrow">
                阅读日志
              </NeonButton>
            </Reveal>
          </div>

          <div className="home-posts">
            {latestPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 100}>
                <Link to={`/blog/${post.slug}`} className="home-post" data-cursor="link" data-cursor-label="阅读">
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
            <span className="mono-label">频道开放 / 48 小时内回复</span>
            <h2>有值得放大的信号吗？</h2>
            <p>{profile.contact.lead}</p>
            <div className="home-cta__actions">
              <NeonButton to="/contact" icon="send">开启频道</NeonButton>
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
