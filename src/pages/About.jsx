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
  useDocumentTitle('关于')
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
            <span>01 // 起源信号</span>
            <span>{profile.meta.coordinates}</span>
            <span>档案：在线</span>
          </div>
          <div className="about-hero__grid">
            <div className="about-hero__title-wrap">
              <Reveal>
                <span className="eyebrow">人与机器的接口</span>
                <h1 className="page-title">
                  会<span className="text-gradient">落地</span>的设计师，<br />
                  会<span className="text-outline">做梦</span>的工程师。
                </h1>
              </Reveal>
            </div>
            <Reveal className="about-hero__portrait" delay={120}>
              <div className="portrait-frame">
                <div className="portrait-frame__grid" aria-hidden="true" />
                <div className="portrait-frame__scan" aria-hidden="true" />
                <div className="portrait-glyph" aria-hidden="true">{profile.meta.initials.slice(0, 1)}<span>/</span>{profile.meta.initials.slice(1)}</div>
                <div className="portrait-frame__meta">
                  <span className="mono-label">对象 / {profile.meta.name}</span>
                  <span className="mono-label">记录 / {new Date().getFullYear()}</span>
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
            <span className="mono-label">个人日志 / 001—003</span>
            <h2 className="display-heading">由好奇心构建，<br /><span className="text-gradient">在迭代中调校。</span></h2>
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
              <span className="mono-label">理念 / 斜杠</span>
              <p>先设计感受，再设计能够复现这种感受的系统。</p>
              <span className="story-side-note__sign">— {profile.meta.initials}</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section capability-section capability-section--about">
        <div className="container">
          <SectionHeader
            index="02"
            eyebrow="能力矩阵"
            title="T 型能力，一根很深的竖线。"
            copy="这张雷达图不是评分表，而是一张地图：我能在哪里快速移动，在哪里深挖，以及在哪里与专家协作。"
          />
          <div className="capability-layout">
            <Reveal className="capability-radar">
              <RadarChart data={profile.about.radar} />
              <div className="capability-radar__legend">
                <span><i className="legend-dot legend-dot--cyan" />当前范围</span>
                <span><i className="legend-dot legend-dot--violet" />成长边缘</span>
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
            eyebrow="传输历史"
            title="一份由有用意外组成的时间线。"
            copy="每一段经历都为我的工作室添了一件新乐器。这是这套实践如何被组装起来的简短版本。"
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
            eyebrow="运行原则"
            title="代码是材料，品味是约束。"
            copy="四条规则，让有野心的作品在截止日期逼近时仍然保持诚实。"
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
              <span className="mono-label">现在 / 关注领域</span>
              <h3><ScrambleText text="构建让复杂系统拥有生命感的工具。" trigger="view" /></h3>
            </div>
            <p>
              目前正在原型化一套实时品牌引擎，研究环境信息设计，并撰写一份关于创意工程的小型现场指南。当前状态：{profile.meta.availability}。
            </p>
            <NeonButton to="/contact" icon="arrow">开始对话</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
