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
            <span>{profile.posts.length} 篇文章</span>
            <span>RSS：即将上线</span>
          </div>
          <div className="blog-hero__grid">
            <Reveal>
              <span className="eyebrow">随笔 / 过程 / 实验室笔记</span>
              <h1 className="page-title">
                项目<br /><span className="text-gradient">复盘</span>与工程笔记。
              </h1>
            </Reveal>
            <Reveal className="blog-hero__copy" delay={100}>
              <p className="lead-copy">
                关于 Python 工具、AI 应用、音视频处理和静态 Web 的项目复盘与工程笔记。
              </p>
              <p>
                所有文章都从公开仓库里的真实实现出发：为什么这样选型、哪里踩过坑，以及最后怎样把它发布出去。
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
            title="全部文章。"
            copy="按主题浏览或搜索日志。每篇文章都对应一个公开仓库，涉及 Python、AI、Cloudflare 和静态 Web。"
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
                <span className="mono-label">未找到文章</span>
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
            <h2 className="display-heading">项目里反复出现的技术问题。</h2>
          </Reveal>
          <div className="topic-grid">
            {[
              ['Python 桌面工具', '把本地脚本做成可安装、可更新、可排错的 Windows 程序。'],
              ['AI 应用', '在不暴露密钥的前提下接入 DeepSeek、流式对话与本地数据。'],
              ['边缘与静态部署', 'GitHub Pages、Cloudflare Worker 和 KV 能承担多少产品逻辑。'],
              ['发布与维护', 'README、测试、版本号、Release 和问题反馈同样是产品的一部分。'],
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
            <p>如果其中某篇文章与你正在做的项目有关，欢迎到 GitHub 交流，或直接打开对应仓库查看源码与 Issues。</p>
            <div className="blog-cta__actions">
              <NeonButton to="/contact" icon="send">联系我</NeonButton>
              <a href={profile.meta.contactUrl} className="text-link" data-cursor="link" target="_blank" rel="noreferrer">
                github.com/Hu080608
                <Icon name="arrow" size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
