import { useEffect, useRef, useState } from 'react'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Reveal } from '../components/common/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { Icon } from '../components/common/Icon'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'

const initialForm = { name: '', email: '', company: '', budget: '', message: '', consent: false }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = '请填写你的名字。'
  else if (form.name.trim().length < 2) errors.name = '名字至少需要两个字符。'
  if (!form.email.trim()) errors.email = '请填写邮箱地址。'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errors.email = '这个邮箱地址看起来不太对。'
  if (!form.message.trim()) errors.message = '简单说说你的项目吧。'
  else if (form.message.trim().length < 24) errors.message = '请提供更多细节（至少 24 个字符）。'
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

  const mailtoBody = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company || '—'}\nBudget: ${form.budget || '—'}\n\n${form.message}`)
  const mailtoHref = `mailto:${profile.meta.email}?subject=${encodeURIComponent(`来自 ${form.name || 'NEXUS 网站'} 的项目信号`)}&body=${mailtoBody}`

  return (
    <div className="page contact-page">
      <section className="page-hero contact-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>05 // 开放频道</span>
            <span>48 小时内回复</span>
            <span>UTC+08:00</span>
          </div>
          <div className="contact-hero__grid">
            <Reveal>
              <span className="eyebrow">新项目 / 合作 / 咨询</span>
              <h1 className="page-title">
                发送一个<br /><span className="text-gradient">信号。</span>
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
              <span className="mono-label">加密信息表单 / 演示</span>
              <span className={`contact-form__state ${status}`}>
                {status === 'idle' ? '等待输入' : status === 'sending' ? '正在传输…' : '信号已接收'}
              </span>
            </div>

            {status === 'success' ? (
              <div className="contact-success" role="status">
                <div className="contact-success__icon"><Icon name="check" size={30} /></div>
                <span className="mono-label">传输完成</span>
                <h2>信息已收到。</h2>
                <p>
                  这是一个纯前端演示，因此没有任何内容被发送到服务器，你的信息只留在浏览器里。使用下面的邮件链接发送真实信息。
                </p>
                <div className="contact-success__actions">
                  <NeonButton href={mailtoHref} icon="mail">打开邮件客户端</NeonButton>
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
                    <label htmlFor="contact-name">01 / 你的姓名 <span>*</span></label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="你的名字"
                      autoComplete="name"
                    />
                    {errors.name ? <span id="name-error" className="form-error">{errors.name}</span> : null}
                  </div>
                  <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="contact-email">02 / 邮箱地址 <span>*</span></label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email ? <span id="email-error" className="form-error">{errors.email}</span> : null}
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-company">03 / 机构 / 公司</label>
                    <input id="contact-company" value={form.company} onChange={update('company')} placeholder="选填" autoComplete="organization" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-budget">04 / 预算范围</label>
                    <select id="contact-budget" value={form.budget} onChange={update('budget')}>
                      <option value="">请选择范围</option>
                      <option value="<10k">低于 ¥70k</option>
                      <option value="10-25k">¥70k — ¥180k</option>
                      <option value="25-50k">¥180k — ¥360k</option>
                      <option value="50k+">¥360k 以上</option>
                      <option value="unsure">还在探索</option>
                    </select>
                  </div>
                </div>

                <div className={`form-field form-field--message ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="contact-message">05 / 项目信号 <span>*</span></label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows="6"
                    placeholder="你在构建什么？什么正在改变？成功看起来是什么样？"
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
                    <span className="neon-button__label">{status === 'sending' ? '正在传输…' : '传输信息'}</span>
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
              <span className="mono-label">直接频道</span>
              <a href={`mailto:${profile.meta.email}`} className="contact-card__email" data-cursor="link">
                {profile.meta.email}
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
                <span className="mono-label">所在地</span>
                <strong>{profile.meta.location}</strong>
              </div>
              <div>
                <span className="mono-label">时区</span>
                <strong>{profile.meta.timezone}</strong>
              </div>
              <div>
                <span className="mono-label">坐标</span>
                <strong>{profile.meta.coordinates}</strong>
              </div>
              <div>
                <span className="mono-label">本地时间</span>
                <strong>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section contact-availability">
        <div className="container">
          <div className="availability-grid">
            <Reveal className="availability-intro">
              <span className="mono-label">可用状态 / 开放频道</span>
              <h2 className="display-heading">好的项目始于<br />一个<span className="text-gradient">清晰信号。</span></h2>
            </Reveal>
            <Reveal className="availability-list" delay={100}>
              {[
                ['沉浸式发布', '品牌世界、产品揭幕与活动微站——那些需要在浏览器里显得“不可能”的体验。'],
                ['空间界面', '为空间、环境或多终端产品构建原型与生产系统。'],
                ['设计工程', '嵌入团队，把大胆的艺术方向翻译成有韧性的前端系统。'],
                ['顾问会议', '用 90 分钟集中审视一个概念、原型或性能瓶颈。'],
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
            <span className="mono-label">没有需求书？没关系。</span>
            <h2><ScrambleText text="最好的对话，往往始于需求书出现之前。" trigger="view" /></h2>
          </Reveal>
          <Reveal delay={100}>
            <NeonButton href={`mailto:${profile.meta.email}`} icon="mail">给工作室发邮件</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
