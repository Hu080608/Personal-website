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
    title: 'Everything is a material study',
    text: 'A shader, a transition curve and a type scale are all decisions about how something responds. I treat them as one continuous material system.',
  },
  {
    index: '02',
    title: 'The fallback is part of the design',
    text: 'Every effect on this page has a static or reduced-motion equivalent. Mobile users get fewer particles and lower pixel ratios — not a broken experience.',
  },
  {
    index: '03',
    title: 'Motion needs a reason to stop',
    text: 'Ambient effects are held on a tight leash. If a visual does not explain state, support hierarchy or create atmosphere, it gets cut.',
  },
]

export default function Lab() {
  useDocumentTitle('Lab')
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
            <span>03 // EXPERIMENTAL DIVISION</span>
            <span>4 ACTIVE MODULES</span>
            <span>SAFE TO EXPLORE</span>
          </div>
          <div className="lab-hero__grid">
            <Reveal>
              <span className="eyebrow">SANDBOX / NO PRODUCTION CODE</span>
              <h1 className="page-title">
                The <span className="text-gradient">lab</span> is<br />always open.
              </h1>
            </Reveal>
            <Reveal className="lab-hero__copy" delay={110}>
              <p className="lead-copy">
                A working surface for experiments in shaders, text, sound and data. No slides, no mockups. Everything here is running in your browser right now.
              </p>
              <p>
                These modules are also the building blocks of client work: a shader becomes a brand world, a terminal becomes an onboarding flow, a waveform becomes a real-time product signal.
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
                  data-cursor-label="ENTER"
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
              eyebrow="FRAGMENT CORE"
              title="Paint with light."
              copy="A live WebGL fragment shader with three procedural atmospheres. Move your cursor across the field, switch modes, and pull the intensity down to see the structure underneath."
            />
            <div className="lab-module__tags">
              <span>GLSL</span><span>WEBGL 1.0</span><span>60FPS TARGET</span>
            </div>
          </div>
          <Reveal>
            <ShaderLab />
          </Reveal>
          <div className="module-notes">
            <div><span className="mono-label">INPUT</span><p>Pointer position is smoothed into a damped uniform, so the field bends rather than snaps.</p></div>
            <div><span className="mono-label">PERFORMANCE</span><p>One fullscreen triangle pair, no textures. DPR capped at 1.5 to protect integrated GPUs.</p></div>
            <div><span className="mono-label">FALLBACK</span><p>If WebGL is unavailable, the panel swaps to a CSS atmosphere with the same palette.</p></div>
          </div>
        </div>
      </section>

      <section className="section lab-module terminal-section">
        <div className="container">
          <div className="lab-split">
            <div>
              <SectionHeader
                index="EXP-002"
                eyebrow="GHOST TERMINAL"
                title="Talk to the machine."
                copy="A simulated local shell with a working command set. Type `help` to list commands, or try `whoami`, `projects`, `skills` and `matrix`."
              />
              <Reveal delay={90}>
                <TerminalLab />
              </Reveal>
            </div>
            <div id="telemetry" className="lab-split__side">
              <span className="mono-label">{profile.lab.experiments[2].code} / LIVE SIGNAL</span>
              <Reveal delay={110}>
                <TelemetryChart />
              </Reveal>
              <Reveal className="telemetry-note glass-panel" delay={160}>
                <span className="mono-label">READOUT</span>
                <p>
                  Synthetic network data drives the waveform, bars and HUD. The canvas runs at 30fps and pauses its HUD updates whenever the tab is hidden by the browser.
                </p>
                <NeonButton href="#/contact" variant="ghost" icon="arrow">Discuss a data piece</NeonButton>
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
              eyebrow="GLYPH DECODER"
              title="Unmake language."
              copy="Type a phrase, choose the interference level and watch the cipher resolve. This is the same scramble system used for the site’s section labels."
            />
            <div className="lab-module__tags">
              <span>STRING OPS</span><span>SET TIMEOUT</span><span>ACCESSIBLE OUTPUT</span>
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
            eyebrow="LAB PROTOCOL"
            title="How the experiments stay honest."
            copy="Three rules that keep Playground energy from turning into production debt."
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
              <span className="mono-label">OPEN SOURCE / SOON</span>
              <h3><ScrambleText text="These experiments want to become tools." trigger="view" /></h3>
            </div>
            <p>
              I am extracting the reusable parts of this lab into a small open toolkit: motion primitives, shader helpers and a screen-reader-safe text scrambler. Join the channel if you want early access.
            </p>
            <NeonButton to="/contact" icon="send">Request access</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
