import { useState } from 'react'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { ShaderLab } from '../components/visuals/ShaderLab'
import { TerminalLab } from '../components/visuals/TerminalLab'
import { TelemetryChart } from '../components/visuals/TelemetryChart'
import { GlyphDecoder } from '../components/visuals/GlyphDecoder'
import { Reveal } from '../components/common/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { Icon } from '../components/common/Icon'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'

const labNotes = [
  {
    index: '01',
    title: '一切都是一次材料研究',
    text: '一个 Shader、一条转场曲线和一套字号比例，都是关于“事物如何回应”的决定。我把它们视为同一套连续的材料系统。',
  },
  {
    index: '02',
    title: '降级方案也是设计的一部分',
    text: '这个页面上的每个效果都有静态或减少动效版本。移动端用户会获得更少粒子和更低像素比，而不是一个坏掉的体验。',
  },
  {
    index: '03',
    title: '动效需要一个停下来的理由',
    text: '环境效果被严格约束。如果一个视觉不能解释状态、支撑层级或营造氛围，它就会被删掉。',
  },
]

export default function Lab() {
  useDocumentTitle('实验室')
  const [activeExperiment, setActiveExperiment] = useState('shader')

  const jumpTo = (id) => {
    setActiveExperiment(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page lab-page">
      <section className="page-hero lab-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>03 // 实验分部</span>
            <span>4 个活跃模块</span>
            <span>可安全探索</span>
          </div>
          <div className="lab-hero__grid">
            <Reveal>
              <span className="eyebrow">沙盒 / 无生产代码</span>
              <h1 className="page-title">
                <span className="text-gradient">实验室</span><br />永远开放。
              </h1>
            </Reveal>
            <Reveal className="lab-hero__copy" delay={110}>
              <p className="lead-copy">
                一块用于 Shader、文字、声音与数据实验的工作台。没有幻灯片，没有静态稿。这里的一切，此刻都在你的浏览器里运行。
              </p>
              <p>
                这些模块也是客户项目的积木：一个 Shader 可以变成品牌世界，一个终端可以变成引导流程，一条波形可以变成实时产品信号。
              </p>
            </Reveal>
          </div>

          <div className="experiment-index">
            {profile.lab.experiments.map((experiment, index) => (
              <Reveal key={experiment.id} delay={index * 60}>
                <button
                  type="button"
                  className={`experiment-card ${activeExperiment === experiment.id ? 'is-active' : ''}`}
                  onClick={() => jumpTo(experiment.id)}
                  data-cursor="link"
                  data-cursor-label="进入"
                >
                  <span className="experiment-card__code">{experiment.code}</span>
                  <span className="experiment-card__title">{experiment.title}</span>
                  <span className="experiment-card__description">{experiment.description}</span>
                  <span className="experiment-card__arrow"><Icon name="arrow" size={18} /></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section lab-module shader-section" id="shader">
        <div className="container">
          <div className="lab-module__head">
            <SectionHeader
              index="EXP-001"
              eyebrow="片元核心"
              title="用光作画。"
              copy="一个实时 WebGL 片元着色器，内置三种程序化氛围。移动鼠标穿过场域，切换模式，拉低强度，看看下面的结构。"
            />
            <div className="lab-module__tags">
              <span>GLSL</span><span>WEBGL 1.0</span><span>60FPS 目标</span>
            </div>
          </div>
          <Reveal>
            <ShaderLab />
          </Reveal>
          <div className="module-notes">
            <div><span className="mono-label">输入</span><p>指针位置被平滑成带阻尼的 uniform，因此场域会弯曲，而不是瞬间跳变。</p></div>
            <div><span className="mono-label">性能</span><p>一对全屏三角形，无纹理采样。DPR 上限 1.5，以保护集成显卡。</p></div>
            <div><span className="mono-label">降级</span><p>如果 WebGL 不可用，面板会切换为使用同一色板的 CSS 氛围背景。</p></div>
          </div>
        </div>
      </section>

      <section className="section lab-module terminal-section">
        <div className="container">
          <div className="lab-split">
            <div>
              <SectionHeader
                index="EXP-002"
                eyebrow="幽灵终端"
                title="和机器说说话。"
                copy="一个带可用命令集的模拟本地 Shell。输入 `help` 查看命令，也可以试试 `whoami`、`projects`、`skills` 和 `matrix`。"
              />
              <Reveal delay={90}>
                <TerminalLab />
              </Reveal>
            </div>
            <div id="telemetry" className="lab-split__side">
              <span className="mono-label">{profile.lab.experiments[2].code} / 实时信号</span>
              <Reveal delay={110}>
                <TelemetryChart />
              </Reveal>
              <Reveal className="telemetry-note glass-panel" delay={160}>
                <span className="mono-label">读数</span>
                <p>
                  合成网络数据驱动波形、柱状图与 HUD。画布以 30fps 运行，当浏览器标签页隐藏时会暂停 HUD 更新。
                </p>
                <NeonButton href="#/contact" variant="ghost" icon="arrow">聊聊数据作品</NeonButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section lab-module decoder-section" id="decoder">
        <div className="container">
          <div className="lab-module__head">
            <SectionHeader
              index="EXP-004"
              eyebrow="字符解码器"
              title="拆解语言。"
              copy="输入一句话，选择干扰强度，观察密文逐渐解析。这也是本站章节标签使用的同一套乱码系统。"
            />
            <div className="lab-module__tags">
              <span>字符串操作</span><span>定时器</span><span>无障碍输出</span>
            </div>
          </div>
          <Reveal>
            <GlyphDecoder />
          </Reveal>
        </div>
      </section>

      <section className="section lab-notes-section">
        <div className="container">
          <SectionHeader
            index="05"
            eyebrow="实验室协议"
            title="实验如何保持诚实。"
            copy="三条规则，避免“游乐场能量”变成生产债务。"
          />
          <div className="lab-notes">
            {labNotes.map((note, index) => (
              <Reveal key={note.index} className="lab-note" delay={index * 80}>
                <span className="lab-note__index">{note.index}</span>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lab-footer glass-panel" delay={100}>
            <div>
              <span className="mono-label">即将开源</span>
              <h3><ScrambleText text="这些实验想成为真正的工具。" trigger="view" /></h3>
            </div>
            <p>
              我正在把实验室里可复用的部分抽成一套小型开源工具包：动效原语、Shader 辅助函数，以及可由屏幕阅读器安全读取的文字乱码器。想提前体验，欢迎联系。
            </p>
            <NeonButton to="/contact" icon="send">申请访问</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
