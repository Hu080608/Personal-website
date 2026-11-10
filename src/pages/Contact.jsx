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
  if (!form.name.trim()) errors.name = 'Please identify yourself.'
  else if (form.name.trim().length < 2) errors.name = 'A name needs at least two characters.'
  if (!form.email.trim()) errors.email = 'An email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errors.email = 'That email address does not look valid.'
  if (!form.message.trim()) errors.message = 'Tell me a little about the project.'
  else if (form.message.trim().length < 24) errors.message = 'Give the signal a little more detail (24+ characters).'
  if (!form.consent) errors.consent = 'Please confirm you are happy with the demo behaviour.'
  return errors
}

export default function Contact() {
  useDocumentTitle('Contact')
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
  const mailtoHref = `mailto:${profile.meta.email}?subject=${encodeURIComponent(`Project signal from ${form.name || 'the NEXUS site'}`)}&body=${mailtoBody}`

  return (
    <div className="page contact-page">
      <section className="page-hero contact-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>05 // OPEN CHANNEL</span>
            <span>RESPONSE &lt; 48H</span>
            <span>UTC+08:00</span>
          </div>
          <div className="contact-hero__grid">
            <Reveal>
              <span className="eyebrow">NEW PROJECT / COLLABORATION / ADVICE</span>
              <h1 className="page-title">
                Send a<br /><span className="text-gradient">signal.</span>
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
              <span className="mono-label">ENCRYPTED MESSAGE FORM / DEMO</span>
              <span className={`contact-form__state ${status}`}>
                {status === 'idle' ? 'AWAITING INPUT' : status === 'sending' ? 'TRANSMITTING…' : 'SIGNAL RECEIVED'}
              </span>
            </div>

            {status === 'success' ? (
              <div className="contact-success" role="status">
                <div className="contact-success__icon"><Icon name="check" size={30} /></div>
                <span className="mono-label">TRANSMISSION COMPLETE</span>
                <h2>Message received.</h2>
                <p>
                  This is a frontend-only demo, so nothing was sent to a server. Your details stayed in the browser. Use the mail link below to send the real thing.
                </p>
                <div className="contact-success__actions">
                  <NeonButton href={mailtoHref} icon="mail">Open mail client</NeonButton>
                  <button type="button" className="text-link" onClick={reset} data-cursor="link">
                    Send another
                    <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="form-grid">
                  <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="contact-name">01 / YOUR NAME <span>*</span></label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="Ada Lovelace"
                      autoComplete="name"
                    />
                    {errors.name ? <span id="name-error" className="form-error">{errors.name}</span> : null}
                  </div>
                  <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="contact-email">02 / EMAIL ADDRESS <span>*</span></label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="you@signal.space"
                      autoComplete="email"
                    />
                    {errors.email ? <span id="email-error" className="form-error">{errors.email}</span> : null}
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-company">03 / ORGANISATION</label>
                    <input id="contact-company" value={form.company} onChange={update('company')} placeholder="Optional" autoComplete="organization" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-budget">04 / BUDGET RANGE</label>
                    <select id="contact-budget" value={form.budget} onChange={update('budget')}>
                      <option value="">Select a range</option>
                      <option value="<10k">Under $10k</option>
                      <option value="10-25k">$10k — $25k</option>
                      <option value="25-50k">$25k — $50k</option>
                      <option value="50k+">$50k+</option>
                      <option value="unsure">Still exploring</option>
                    </select>
                  </div>
                </div>

                <div className={`form-field form-field--message ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="contact-message">05 / PROJECT SIGNAL <span>*</span></label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows="6"
                    placeholder="What are you building, what is changing, and what does success look like?"
                  />
                  <div className="form-field__footer">
                    {errors.message ? <span id="message-error" className="form-error">{errors.message}</span> : <span className="mono-label">BE AS SPECIFIC AS YOU CAN</span>}
                    <span className="mono-label">{form.message.length} / 1200</span>
                  </div>
                </div>

                <label className={`form-consent ${errors.consent ? 'has-error' : ''}`}>
                  <input type="checkbox" checked={form.consent} onChange={update('consent')} aria-invalid={Boolean(errors.consent)} />
                  <span className="form-consent__box"><Icon name="check" size={12} /></span>
                  <span>I understand this is a demo form and no data will be transmitted to a server.</span>
                </label>
                {errors.consent ? <span className="form-error form-error--consent">{errors.consent}</span> : null}

                <div className="contact-form__footer">
                  <button type="submit" className="neon-button neon-button--primary" disabled={status === 'sending'} data-cursor="link">
                    <span className="neon-button__label">{status === 'sending' ? 'TRANSMITTING…' : 'Transmit message'}</span>
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
              <span className="mono-label">DIRECT CHANNEL</span>
              <a href={`mailto:${profile.meta.email}`} className="contact-card__email" data-cursor="link">
                {profile.meta.email}
                <Icon name="arrow" size={18} />
              </a>
              <p>{profile.contact.responseTime}</p>
            </Reveal>

            <Reveal className="contact-card glass-panel" delay={80}>
              <span className="mono-label">SOCIAL FREQUENCIES</span>
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
                <span className="mono-label">LOCATION</span>
                <strong>{profile.meta.location}</strong>
              </div>
              <div>
                <span className="mono-label">TIMEZONE</span>
                <strong>{profile.meta.timezone}</strong>
              </div>
              <div>
                <span className="mono-label">COORDINATES</span>
                <strong>{profile.meta.coordinates}</strong>
              </div>
              <div>
                <span className="mono-label">LOCAL TIME</span>
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
              <span className="mono-label">AVAILABILITY / OPEN CHANNEL</span>
              <h2 className="display-heading">Good projects start<br />with a <span className="text-gradient">clear signal.</span></h2>
            </Reveal>
            <Reveal className="availability-list" delay={100}>
              {[
                ['Immersive launches', 'Brand worlds, product reveals and event microsites that need to feel impossible in a browser.'],
                ['Spatial interfaces', 'Prototypes and production systems for spatial, ambient or multi-surface products.'],
                ['Design engineering', 'Embedded support for teams translating a bold art direction into a resilient front-end system.'],
                ['Advisory sessions', 'A focused 90-minute review of a concept, prototype or performance bottleneck.'],
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
            eyebrow="FREQUENTLY ASKED"
            title="Before you open the channel."
            copy="A few answers that save us both a round trip. If your question is not here, it is probably a good one."
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
            <span className="mono-label">NO BRIEF? NO PROBLEM.</span>
            <h2><ScrambleText text="The best conversations start before the brief exists." trigger="view" /></h2>
          </Reveal>
          <Reveal delay={100}>
            <NeonButton href={`mailto:${profile.meta.email}`} icon="mail">Email the studio</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
