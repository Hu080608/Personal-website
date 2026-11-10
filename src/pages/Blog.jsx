import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Reveal } from '../components/common/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { Icon } from '../components/common/Icon'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'

const allTags = ['All', ...new Set(profile.posts.flatMap((post) => post.tags))]

export default function Blog() {
  useDocumentTitle('Log')
  const [tag, setTag] = useState('All')
  const [query, setQuery] = useState('')
  const featured = profile.posts.find((post) => post.featured) || profile.posts[0]

  const posts = useMemo(() => {
    return profile.posts.filter((post) => {
      const matchesTag = tag === 'All' || post.tags.includes(tag)
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase()
      return matchesTag && haystack.includes(query.toLowerCase().trim())
    })
  }, [query, tag])

  return (
    <div className="page blog-page">
      <section className="page-hero blog-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>04 // FIELD NOTES</span>
            <span>{profile.posts.length} TRANSMISSIONS</span>
            <span>RSS: SOON</span>
          </div>
          <div className="blog-hero__grid">
            <Reveal>
              <span className="eyebrow">ESSAYS / PROCESS / LAB NOTES</span>
              <h1 className="page-title">
                Notes from<br />the <span className="text-gradient">signal.</span>
              </h1>
            </Reveal>
            <Reveal className="blog-hero__copy" delay={100}>
              <p className="lead-copy">
                Essays on spatial interfaces, motion systems, generative atmospheres and the craft of making digital things feel alive.
              </p>
              <p>
                No growth-hacking, no listicles. Just field notes from inside the work: the decisions, the dead ends and the occasional useful framework.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section featured-post-section">
        <div className="container">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="featured-post glass-panel" data-cursor="link" data-cursor-label="READ">
              <div className="featured-post__visual" aria-hidden="true">
                <div className="featured-post__orbit featured-post__orbit--a" />
                <div className="featured-post__orbit featured-post__orbit--b" />
                <div className="featured-post__orbit featured-post__orbit--c" />
                <div className="featured-post__core" />
                <span className="featured-post__stamp">FEATURED<br />TRANSMISSION</span>
                <span className="featured-post__index">01 / 03</span>
              </div>
              <div className="featured-post__content">
                <div className="featured-post__meta">
                  <span className="post-category">{featured.category}</span>
                  <span className="mono-label">{featured.displayDate}</span>
                  <span className="mono-label">{featured.readTime}</span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="featured-post__bottom">
                  <div className="tag-list">
                    {featured.tags.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <span className="featured-post__read">
                    READ TRANSMISSION
                    <Icon name="arrow" size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section blog-archive">
        <div className="container">
          <SectionHeader
            index="02"
            eyebrow="THE ARCHIVE"
            title="All transmissions."
            copy="Browse by topic or search the log. Every article is written from a real project constraint, even when the project is fictional."
          />

          <div className="blog-toolbar">
            <div className="filter-chips" role="group" aria-label="Filter articles by topic">
              {allTags.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-chip ${tag === item ? 'is-active' : ''}`}
                  onClick={() => setTag(item)}
                  aria-pressed={tag === item}
                  data-cursor="link"
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="blog-search">
              <Icon name="spark" size={17} />
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="SEARCH THE LOG…"
              />
            </label>
          </div>

          <div className="post-list">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 60}>
                <Link to={`/blog/${post.slug}`} className="post-row" data-cursor="link" data-cursor-label="READ">
                  <span className="post-row__index mono-label">{String(index + 1).padStart(2, '0')}</span>
                  <span className="post-row__meta">
                    <span className="post-category">{post.category}</span>
                    <span className="mono-label">{post.displayDate}</span>
                  </span>
                  <span className="post-row__body">
                    <strong>{post.title}</strong>
                    <small>{post.excerpt}</small>
                  </span>
                  <span className="post-row__tags">
                    {post.tags.slice(0, 2).map((item) => <span key={item}>{item}</span>)}
                  </span>
                  <span className="post-row__time mono-label">{post.readTime}</span>
                  <span className="post-row__arrow"><Icon name="arrow" size={18} /></span>
                </Link>
              </Reveal>
            ))}
            {!posts.length ? (
              <div className="blog-empty glass-panel">
                <span className="mono-label">NO SIGNAL FOUND</span>
                <p>Try a different topic or search term. The archive is small but precise.</p>
                <button type="button" className="text-link" onClick={() => { setTag('All'); setQuery('') }}>
                  Reset filters
                  <Icon name="arrow" size={14} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section blog-topics-section">
        <div className="container blog-topics">
          <Reveal>
            <span className="mono-label">RECURRING THEMES</span>
            <h2 className="display-heading">The questions I keep returning to.</h2>
          </Reveal>
          <div className="topic-grid">
            {[
              ['Spatial UX', 'How hierarchy, distance and attention change once the rectangle dissolves.'],
              ['Motion Systems', 'Building a shared physics for interfaces so they feel inevitable.'],
              ['Real-time Craft', 'Shaders, performance budgets and the art of degrading with dignity.'],
              ['Creative Process', 'How to keep ambition alive without sacrificing the launch.'],
            ].map(([title, copy], index) => (
              <Reveal key={title} className="topic-card" delay={index * 70}>
                <span className="mono-label">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section blog-cta">
        <div className="container">
          <Reveal className="blog-cta__panel glass-panel">
            <span className="mono-label">THE CHANNEL IS OPEN</span>
            <h2><ScrambleText text="A good conversation is its own prototype." trigger="view" /></h2>
            <p>If one of these essays connects to something you are building, I would like to hear about it. The best projects usually start with a shared question.</p>
            <div className="blog-cta__actions">
              <NeonButton to="/contact" icon="send">Send a signal</NeonButton>
              <a href={`mailto:${profile.meta.email}`} className="text-link" data-cursor="link">
                {profile.meta.email}
                <Icon name="arrow" size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
