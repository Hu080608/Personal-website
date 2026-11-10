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
    title: '发现问题',
    text: '先确认它是不是一个真实、重复、值得自动化的麻烦。输入是什么？输出是什么？失败时会发生什么？',
  },
  {
    index: '02',
    title: '本地实现',
    text: '优先用 Python、FFmpeg、SQLite 或浏览器原生能力做出可运行版本。先让主流程跑通，再决定哪些部分需要 AI 或云服务。',
  },
  {
    index: '03',
    title: '补齐异常',
    text: '批量任务会失败，接口会变，编码器会不可用。日志、重试、回退、取消、清理临时文件和可读错误提示，和主流程同等重要。',
  },
  {
    index: '04',
    title: '文档发布',
    text: '写清 README、安装方式、参数说明、许可证和发布记录。一个别人能安装、能验证、能反馈的工具才算真正上线。',
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
            <span>02 // 项目档案</span>
            <span>{profile.projects.length} 个公开项目</span>
            <span>状态：已解密</span>
          </div>
          <div className="projects-hero__grid">
            <Reveal>
              <span className="eyebrow">精选项目</span>
              <h1 className="page-title">
                把麻烦<br />做成<span className="text-gradient">工具。</span>
              </h1>
            </Reveal>
            <Reveal className="projects-hero__copy" delay={120}>
              <p className="lead-copy">
                这里收录我的原创项目：Python 桌面工具、AI 应用、音视频处理与静态 Web。它们都公开在 GitHub 上。
              </p>
              <p>
                每个项目都从一个具体问题开始。打开卡片可以查看项目背景、技术难点、当前状态和真实仓库链接。
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
              <div className="filter-chips" role="group" aria-label="按类别筛选项目">
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
            eyebrow="方法 / 从问题到发布"
            title="一套务实的开发流程。"
            copy="这套流程来自我的个人项目：先解决真实问题，再处理异常、写文档并发布。它不是装饰性的方法论。"
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
              title="全部公开项目。"
              copy="包含全部 7 个公开项目，点击即可查看技术栈、当前状态与真实仓库链接。"
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
                <span className="archive-table__status"><i /> 已公开</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-cta">
        <div className="container">
          <Reveal className="projects-cta__panel glass-panel">
            <span className="mono-label">项目反馈 / 交流</span>
            <h2>有 Bug、建议或新的项目想法？</h2>
            <p>欢迎通过 GitHub Issues 反馈，或到 GitHub 主页查看全部公开仓库。</p>
            <NeonButton href={profile.meta.contactUrl} icon="external">前往 GitHub</NeonButton>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}
      </AnimatePresence>
    </div>
  )
}
