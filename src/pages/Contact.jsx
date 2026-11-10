import { useEffect, useRef, useState } from 'react'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Reveal } from '../components/common/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { Icon } from '../components/common/Icon'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'

const initialForm = { name: '', contact: '', topic: '', repo: '', message: '', consent: false }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = '请填写你的称呼。'
  else if (form.name.trim().length < 2) errors.name = '称呼至少需要两个字符。'
  if (!form.topic) errors.topic = '请选择反馈类型。'
  if (!form.message.trim()) errors.message = '简单说说你想反馈的内容。'
  else if (form.message.trim().length < 12) errors.message = '请提供更多细节（至少 12 个字符）。'
  if (!form.consent) errors.consent = '请确认你了解这个演示表单的行为。'
  return errors
}

export default function Contact() {
  useDocumentTitle('联系')
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [openFaq, setOpenFaq] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const update = (field) => (event) => {
    const value = field === 'consent' ? event.target.checked : event.target.value
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }

    setStatus('sending')
    timeoutRef.current = window.setTimeout(() => {
      setStatus('success')
    }, 1250)
  }

  const reset = () => {
    setForm(initialForm)
    setErrors({})
    setStatus('idle')
  }

  const issueBody = [
    `称呼：${form.name}`,
    `联系方式：${form.contact || '—'}`,
    `仓库/项目：${form.repo || '—'}`,
    '',
    form.message,
  ].join(String.fromCharCode(10))
  const issueHref = `${profile.meta.issuesUrl}/new?title=${encodeURIComponent(`[网站反馈] ${form.topic || '新反馈'}`)}&body=${encodeURIComponent(issueBody)}`

  return (
    <div className="page contact-page">
      <section className="page-hero contact-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>05 // 联系方式</span>
            <span>GitHub 开放</span>
            <span>按项目协商</span>
          </div>
          <div className="contact-hero__grid">
            <Reveal>
              <span className="eyebrow">反馈 / 交流 / 项目</span>
              <h1 className="page-title">
                通过 GitHub<br /><span className="text-gradient">找到我。</span>
              </h1>
            </Reveal>
            <Reveal className="contact-hero__copy" delay={100}>
              <p className="lead-copy">{profile.contact.lead}</p>
              <div className="contact-hero__status">
                <span className="status-dot" />
                <span>{profile.meta.availability}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-layout">
          <Reveal className="contact-form-wrap glass-panel">
            <div className="contact-form__head">
              <span className="mono-label">站内演示表单 / 不会发送</span>
              <span className={`contact-form__state ${status}`}>
                {status === 'idle' ? '等待输入' : status === 'sending' ? '正在检查…' : '本地校验通过'}
              </span>
            </div>

            {status === 'success' ? (
              <div className="contact-success" role="status">
                <div className="contact-success__icon"><Icon name="check" size={30} /></div>
                <span className="mono-label">本地校验完成</span>
                <h2>信息已校验。</h2>
                <p>
                  这是一个纯前端演示，因此没有任何内容被发送到服务器，你的信息只留在浏览器里。真实反馈请到 GitHub Issues 提交。
                </p>
                <div className="contact-success__actions">
                  <NeonButton href={issueHref} icon="external">前往 GitHub 提交</NeonButton>
                  <button type="button" className="text-link" onClick={reset} data-cursor="link">
                    再写一封
                    <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="form-grid">
                  <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="contact-name">01 / 你的称呼 <span>*</span></label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="怎么称呼你"
                      autoComplete="name"
                    />
                    {errors.name ? <span id="name-error" className="form-error">{errors.name}</span> : null}
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">02 / GitHub / 邮箱</label>
                    <input
                      id="contact-email"
                      value={form.contact}
                      onChange={update('contact')}
                      placeholder="@Hu080608 或邮箱（选填）"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-company">03 / 反馈类型</label>
                    <select id="contact-company" value={form.topic} onChange={update('topic')} aria-invalid={Boolean(errors.topic)}>
                      <option value="">请选择</option>
                      <option value="Bug 反馈">Bug 反馈</option>
                      <option value="功能建议">功能建议</option>
                      <option value="项目交流">项目交流</option>
                      <option value="使用问题">使用问题</option>
                      <option value="其他">其他</option>
                    </select>
                    {errors.topic ? <span className="form-error">{errors.topic}</span> : null}
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-budget">04 / 相关仓库</label>
                    <input id="contact-budget" value={form.repo} onChange={update('repo')} placeholder="仓库链接或项目名（选填）" />
                  </div>
                </div>

                <div className={`form-field form-field--message ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="contact-message">05 / 具体内容 <span>*</span></label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows="6"
                    placeholder="发生了什么？如何复现？你期待看到什么结果？"
                  />
                  <div className="form-field__footer">
                    {errors.message ? <span id="message-error" className="form-error">{errors.message}</span> : <span className="mono-label">尽可能具体一点</span>}
                    <span className="mono-label">{form.message.length} / 1200</span>
                  </div>
                </div>

                <label className={`form-consent ${errors.consent ? 'has-error' : ''}`}>
                  <input type="checkbox" checked={form.consent} onChange={update('consent')} aria-invalid={Boolean(errors.consent)} />
                  <span className="form-consent__box"><Icon name="check" size={12} /></span>
                  <span>我了解这是一个演示表单，数据不会被发送到服务器。</span>
                </label>
                {errors.consent ? <span className="form-error form-error--consent">{errors.consent}</span> : null}

                <div className="contact-form__footer">
                  <button type="submit" className="neon-button neon-button--primary" disabled={status === 'sending'} data-cursor="link">
                    <span className="neon-button__label">{status === 'sending' ? '正在检查…' : '传输信息'}</span>
                    <Icon name="send" size={16} className="neon-button__icon" />
                    <span className="neon-button__shine" aria-hidden="true" />
                  </button>
                  <p className="mono-label">{profile.contact.formNote}</p>
                </div>
              </form>
            )}
          </Reveal>

          <div className="contact-side">
            <Reveal className="contact-card glass-panel">
              <span className="mono-label">GitHub 主页</span>
              <a href={profile.meta.contactUrl} className="contact-card__email" data-cursor="link" target="_blank" rel="noreferrer">
                github.com/Hu080608
                <Icon name="arrow" size={18} />
              </a>
              <p>{profile.contact.responseTime}</p>
            </Reveal>

            <Reveal className="contact-card glass-panel" delay={80}>
              <span className="mono-label">社交频率</span>
              <div className="contact-socials">
                {profile.socials.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noreferrer" data-cursor="link">
                    <span>
                      <Icon name={social.icon} size={18} />
                      {social.label}
                    </span>
                    <span className="mono-label">{social.handle}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal className="contact-card contact-card--meta glass-panel" delay={140}>
              <div>
                <span className="mono-label">公开平台</span>
                <strong>GitHub</strong>
              </div>
              <div>
                <span className="mono-label">主要语言</span>
                <strong>Python / JS</strong>
              </div>
              <div>
                <span className="mono-label">公开仓库</span>
                <strong>10 个</strong>
              </div>
              <div>
                <span className="mono-label">联系方式</span>
                <strong>Issues / 主页</strong>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section contact-availability">
        <div className="container">
          <div className="availability-grid">
            <Reveal className="availability-intro">
              <span className="mono-label">反馈方式 / GitHub</span>
              <h2 className="display-heading">有效的反馈始于<br />一个<span className="text-gradient">具体问题。</span></h2>
            </Reveal>
            <Reveal className="availability-list" delay={100}>
              {[
                ['Bug 反馈', '附上系统版本、复现步骤、日志或截图，让问题可以被验证。'],
                ['功能建议', '说明使用场景、当前限制和你希望新增的能力。'],
                ['项目交流', '讨论 Python 工具、AI 应用、Cloudflare 或静态 Web 的实现方式。'],
                ['使用问题', '先查看对应仓库的 README 和 Issues，再补充你的环境与操作步骤。'],
              ].map(([title, copy], index) => (
                <div key={title} className="availability-item">
                  <span className="mono-label">0{index + 1}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <Icon name="arrow" size={17} />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-layout">
          <SectionHeader
            index="04"
            eyebrow="常见问题"
            title="在打开频道之前。"
            copy="一些能帮我们省去来回沟通的回答。如果你的问题不在这里，那大概是个好问题。"
          />
          <div className="faq-list">
            {profile.contact.faqs.map((faq, index) => {
              const open = openFaq === index
              return (
                <Reveal key={faq.q} delay={index * 50}>
                  <div className={`faq-item ${open ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-item__question"
                      onClick={() => setOpenFaq(open ? -1 : index)}
                      aria-expanded={open}
                      data-cursor="link"
                    >
                      <span className="mono-label">0{index + 1}</span>
                      <span>{faq.q}</span>
                      <span className="faq-item__toggle">{open ? '−' : '+'}</span>
                    </button>
                    <div className="faq-item__answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section contact-last">
        <div className="container contact-last__inner">
          <Reveal>
            <span className="mono-label">想交流项目？从 GitHub 开始。</span>
            <h2><ScrambleText text="公开仓库、Issues 和讨论区都是开放的。" trigger="view" /></h2>
          </Reveal>
          <Reveal delay={100}>
            <NeonButton href={profile.meta.contactUrl} icon="external">前往 GitHub</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
