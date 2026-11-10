import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Icon } from '../components/common/Icon'
import { Reveal } from '../components/common/Reveal'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function ArticleBlock({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="article-lead">{block.text}</p>
    case 'h2':
      return <h2 id={slugify(block.text)}>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'quote':
      return (
        <blockquote>
          <span className="article-quote-mark">“</span>
          <p>{block.text}</p>
        </blockquote>
      )
    case 'list':
      return (
        <ul className="article-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <aside className="article-callout">
          <span className="mono-label">{block.title}</span>
          <p>{block.text}</p>
        </aside>
      )
    case 'divider':
      return <div className="article-divider" aria-hidden="true"><span /></div>
    default:
      return <p>{block.text}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = profile.posts.find((item) => item.slug === slug)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  useDocumentTitle(post?.title || 'Signal not found')

  const headings = useMemo(() => post?.content.filter((block) => block.type === 'h2') || [], [post])
  const currentIndex = profile.posts.findIndex((item) => item.slug === slug)
  const nextPost = currentIndex >= 0 ? profile.posts[(currentIndex + 1) % profile.posts.length] : null

  useEffect(() => {
    let rafId = 0
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [slug])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  if (!post) {
    return (
      <div className="page post-page">
        <section className="page-hero post-missing">
          <div className="container">
            <span className="mono-label">404 / TRANSMISSION LOST</span>
            <h1 className="page-title">This signal has<br /><span className="text-gradient">faded out.</span></h1>
            <p>The article you are looking for is not in the archive. It may have been moved, renamed or never existed.</p>
            <NeonButton to="/blog" icon="arrow">Return to the log</NeonButton>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page post-page">
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <article className="article">
        <header className="article-hero">
          <div className="container">
            <div className="article-hero__top">
              <Link to="/blog" className="back-link" data-cursor="link">
                <span>←</span> BACK TO LOG
              </Link>
              <span className="mono-label">{post.category} / {post.displayDate}</span>
            </div>
            <div className="article-hero__meta">
              <span className="post-category">{post.category}</span>
              <span className="mono-label">{post.readTime}</span>
              <span className="mono-label">BY {profile.meta.name}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="article-hero__subtitle">{post.subtitle}</p>
            <div className="article-hero__footer">
              <div className="tag-list">
                {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <button type="button" className="article-share" onClick={copyLink} data-cursor="link">
                <Icon name={copied ? 'check' : 'external'} size={15} />
                {copied ? 'LINK COPIED' : 'COPY LINK'}
              </button>
            </div>
          </div>
        </header>

        <div className="container article-layout">
          <aside className="article-toc">
            <span className="mono-label">CONTENTS</span>
            <nav aria-label="Article table of contents">
              {headings.map((heading, index) => (
                <a key={heading.text} href={`#${slugify(heading.text)}`} onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(slugify(heading.text))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {heading.text.replace(/^\d+\.\s*/, '')}
                </a>
              ))}
            </nav>
            <div className="article-toc__meta">
              <span className="mono-label">READING PROGRESS</span>
              <div className="article-toc__track"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
              <span>{Math.round(progress)}%</span>
            </div>
          </aside>

          <div className="article-body">
            <Reveal>
              <p className="article-standfirst">{post.excerpt}</p>
            </Reveal>
            {post.content.map((block, index) => (
              <Reveal key={`${block.type}-${index}`} delay={Math.min(index * 20, 150)}>
                <ArticleBlock block={block} />
              </Reveal>
            ))}

            <div className="article-author glass-panel">
              <div className="article-author__mark">{profile.meta.initials}</div>
              <div>
                <span className="mono-label">WRITTEN BY</span>
                <h3>{profile.meta.name}</h3>
                <p>{profile.meta.description}</p>
                <Link to="/about" className="text-link" data-cursor="link">
                  About the author <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="section post-next-section">
        <div className="container">
          <span className="mono-label">NEXT TRANSMISSION</span>
          <Link to={`/blog/${nextPost.slug}`} className="next-post" data-cursor="link" data-cursor-label="READ">
            <div>
              <span className="post-category">{nextPost.category}</span>
              <h2>{nextPost.title}</h2>
              <p>{nextPost.excerpt}</p>
            </div>
            <span className="next-post__arrow"><Icon name="arrow" size={32} /></span>
          </Link>
        </div>
      </section>

      <section className="section post-cta">
        <div className="container">
          <Reveal className="post-cta__panel">
            <span className="mono-label">END OF FILE / CHANNEL OPEN</span>
            <h2><ScrambleText text="Have a harder question?" trigger="view" /></h2>
            <p>I am always interested in conversations about interfaces that do not exist yet, systems that need to feel alive, and teams willing to prototype the impossible.</p>
            <NeonButton to="/contact" icon="send">Start a conversation</NeonButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
