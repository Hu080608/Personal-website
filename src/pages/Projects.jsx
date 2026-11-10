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
    title: '定位信号',
    text: '一次短促而高强度的探索冲刺，找到项目必须讲清楚的唯一核心。我们共同梳理受众、约束、参考与技术未知。',
  },
  {
    index: '02',
    title: '原型化不可能',
    text: '最危险的假设会最先被做出来。一个 Shader 测试、一段动效研究、一条实时数据流：它要真实到可以被争论，又足够早，能够改变方向。',
  },
  {
    index: '03',
    title: '构建系统',
    text: '原型会变成设计系统与工程计划。令牌、组件、性能预算与无障碍规则，从一开始就一起定义。',
  },
  {
    index: '04',
    title: '调校上线',
    text: '最后 10% 才是魔法所在。我们做性能分析、优雅降级、写文档，并确保作品在交接之后依然有生命感。',
  },
]

export default function Projects() {
  useDocumentTitle('作品')
  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)

  const categories = useMemo(() => ['All', ...new Set(profile.projects.map((project) => project.category))], [])
  const filtered = filter === 'All' ? profile.projects : profile.projects.filter((project) => project.category === filter)

  return (
    <div className="page projects-page">
      <section className="page-hero projects-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>02 // 作品档案</span>
            <span>{profile.projects.length} 个案例</span>
            <span>状态：已解密</span>
          </div>
          <div className="projects-hero__grid">
            <Reveal>
              <span className="eyebrow">精选传输</span>
              <h1 className="page-title">
                创造有<br /><span className="text-gradient">脉搏</span>的作品。
              </h1>
            </Reveal>
            <Reveal className="projects-hero__copy" delay={120}>
              <p className="lead-copy">
                为那些仍然相信浏览器是世界上最有趣画布的人，构建品牌世界、空间界面与实时系统。
              </p>
              <p>
                下面每一个案例都始于同一个问题的变体：如何让复杂的东西感觉即刻可懂？打开任意卡片，查看项目背景、核心挑战与可量化的结果。
              </p>
              <div className="projects-hero__hint">
                <Icon name="cube" size={18} />
                <span className="mono-label">悬停倾斜 / 点击打开</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section projects-archive">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-bar__left">
              <span className="mono-label">按领域筛选</span>
              <div className="filter-chips" role="group" aria-label="按类别筛选作品">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-chip ${filter === category ? 'is-active' : ''}`}
                    onClick={() => setFilter(category)}
                    aria-pressed={filter === category}
                    data-cursor="link"
                  >
                    {category === 'All' ? '全部' : category}
                    <span>{category === 'All' ? profile.projects.length : profile.projects.filter((project) => project.category === category).length}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-bar__right mono-label">
              <span>显示 {String(filtered.length).padStart(2, '0')} / {String(profile.projects.length).padStart(2, '0')}</span>
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
            eyebrow="方法 / 从信号到上线"
            title="为模糊而生的流程。"
            copy="野心需要一个容器。这是我带给复杂创意项目的四阶段工作节奏。"
          />
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal key={step.index} className="process-card" delay={index * 80}>
                <div className="process-card__top">
                  <span className="process-card__index">{step.index}</span>
                  <span className="process-card__line" />
                  <span className="mono-label">阶段</span>
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
              eyebrow="完整索引"
              title="抽屉里的每一份档案。"
              copy="一份紧凑的档案索引，包含自主研究和尚未准备好公开的项目。"
            />
          </div>
          <div className="archive-table">
            <div className="archive-table__head mono-label">
              <span>编号</span>
              <span>项目</span>
              <span>领域</span>
              <span>年份</span>
              <span>状态</span>
            </div>
            {profile.projects.map((project, index) => (
              <button
                type="button"
                key={project.slug}
                className="archive-table__row"
                onClick={() => setActiveProject(project)}
                data-cursor="link"
                data-cursor-label="打开"
              >
                <span className="mono-label">0{index + 1}</span>
                <span className="archive-table__project">
                  <strong>{project.title}</strong>
                  <small>{project.client}</small>
                </span>
                <span>{project.category}</span>
                <span>{project.year}</span>
                <span className="archive-table__status"><i /> 已发布</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-cta">
        <div className="container">
          <Reveal className="projects-cta__panel glass-panel">
            <span className="mono-label">下一个案例 / 属于你</span>
            <h2>档案库里，还留着一个信号的位置。</h2>
            <p>把那个相对于时间线显得有点过于有野心的项目带给我。有趣的作品通常就住在那里。</p>
            <NeonButton to="/contact" icon="send">开始一份需求</NeonButton>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}
      </AnimatePresence>
    </div>
  )
}
