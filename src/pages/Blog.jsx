import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Reveal } from '../components/common/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { Icon } from '../components/common/Icon'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'

const allTags = ['全部', ...new Set(profile.posts.flatMap((post) => post.tags))]

export default function Blog() {
  useDocumentTitle('日志')
  const [tag, setTag] = useState('全部')
  const [query, setQuery] = useState('')
  const featured = profile.posts.find((post) => post.featured) || profile.posts[0]

  const posts = useMemo(() => {
    return profile.posts.filter((post) => {
      const matchesTag = tag === '全部' || post.tags.includes(tag)
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase()
      return matchesTag && haystack.includes(query.toLowerCase().trim())
    })
  }, [query, tag])

  return (
    <div className="page blog-page">
      <section className="page-hero blog-hero">
        <div className="container">
          <div className="page-hero__top mono-label">
            <span>04 // 现场笔记</span>
            <span>{profile.posts.length} 篇传输</span>
            <span>RSS：即将上线</span>
          </div>
          <div className="blog-hero__grid">
            <Reveal>
              <span className="eyebrow">随笔 / 过程 / 实验室笔记</span>
              <h1 className="page-title">
                来自<br /><span className="text-gradient">信号</span>的笔记。
              </h1>
            </Reveal>
            <Reveal className="blog-hero__copy" delay={100}>
              <p className="lead-copy">
                关于空间界面、动效系统、生成式氛围，以及如何让数字事物拥有生命感的文章。
              </p>
              <p>
                没有增长黑客，没有清单体。只有来自工作内部的现场笔记：决定、死路，以及偶尔有用的框架。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section featured-post-section">
        <div className="container">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="featured-post glass-panel" data-cursor="link" data-cursor-label="阅读">
              <div className="featured-post__visual" aria-hidden="true">
                <div className="featured-post__orbit featured-post__orbit--a" />
                <div className="featured-post__orbit featured-post__orbit--b" />
                <div className="featured-post__orbit featured-post__orbit--c" />
                <div className="featured-post__core" />
                <span className="featured-post__stamp">精选<br />文章</span>
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
                    阅读文章
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
            eyebrow="文章档案"
            title="全部传输记录。"
            copy="按主题浏览或搜索日志。每篇文章都源于真实项目的约束，即使项目本身是虚构的。"
          />

          <div className="blog-toolbar">
            <div className="filter-chips" role="group" aria-label="按主题筛选文章">
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
              <span className="sr-only">搜索文章</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索日志…"
              />
            </label>
          </div>

          <div className="post-list">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 60}>
                <Link to={`/blog/${post.slug}`} className="post-row" data-cursor="link" data-cursor-label="阅读">
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
                <span className="mono-label">未找到信号</span>
                <p>换一个主题或搜索词试试。档案不大，但很精确。</p>
                <button type="button" className="text-link" onClick={() => { setTag('全部'); setQuery('') }}>
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
            <span className="mono-label">反复出现的主题</span>
            <h2 className="display-heading">我反复回到的问题。</h2>
          </Reveal>
          <div className="topic-grid">
            {[
              ['空间 UX', '当矩形溶解之后，层级、距离与注意力如何改变。'],
              ['动效系统', '为界面建立共享的物理规则，让动效显得理所当然。'],
              ['实时工艺', 'Shader、性能预算，以及优雅降级的艺术。'],
              ['创意过程', '如何在不牺牲上线的同时，保住野心。'],
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
            <span className="mono-label">频道已开放</span>
            <h2><ScrambleText text="好的对话本身就是一种原型。" trigger="view" /></h2>
            <p>如果其中某篇文章与你正在构建的东西产生了连接，我很想听听。最好的项目通常始于一个共同的问题。</p>
            <div className="blog-cta__actions">
              <NeonButton to="/contact" icon="send">发送信号</NeonButton>
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
