import { Link } from 'react-router-dom'
import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { GlitchText } from '../components/common/GlitchText'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'
import { Icon } from '../components/common/Icon'

export default function NotFound() {
  useDocumentTitle('信号丢失 — 404')

  return (
    <div className="page not-found-page">
      <section className="not-found">
        <div className="not-found__grid" aria-hidden="true" />
        <div className="not-found__scan" aria-hidden="true" />
        <div className="container not-found__inner">
          <div className="not-found__top mono-label">
            <span>错误 / 未找到路由</span>
            <span>节点：{profile.meta.alias}</span>
            <span>数据包丢失</span>
          </div>

          <div className="not-found__code" aria-label="错误 404">
            <GlitchText text="404" as="span" className="not-found__number" />
          </div>

          <div className="not-found__content">
            <span className="eyebrow">信号衰减 / 无路可归</span>
            <h1>这个维度<br />并不<span className="text-gradient">存在。</span></h1>
            <p>
              你跟随的路径已经坍缩成雪花噪点。它可能被移动、重命名，或者正在未来某个版本里等待。档案的其余部分仍然在线。
            </p>
            <div className="not-found__actions">
              <NeonButton to="/" icon="arrow">返回首页</NeonButton>
              <NeonButton to="/projects" variant="ghost" icon="cube">浏览作品档案</NeonButton>
            </div>
          </div>

          <div className="not-found__diagnostics glass-panel">
            <div className="not-found__diag-head">
              <span className="mono-label">诊断读数</span>
              <span className="not-found__diag-status"><i /> 严重</span>
            </div>
            <div className="diagnostic-line"><span>请求</span><span className="mono-label">{typeof window !== 'undefined' ? window.location.hash : '#/unknown'}</span></div>
            <div className="diagnostic-line"><span>响应</span><span className="mono-label">404 / 无内容</span></div>
            <div className="diagnostic-line"><span>建议</span><span className="mono-label">尝试 /#/ 或 /#/PROJECTS</span></div>
            <div className="not-found__wave" aria-hidden="true">
              {Array.from({ length: 38 }).map((_, index) => (
                <span key={index} style={{ '--i': index }} />
              ))}
            </div>
          </div>

          <div className="not-found__quick-links">
            <span className="mono-label">快速路由</span>
            {[
              ['首页', '/'],
              ['关于', '/about'],
              ['作品', '/projects'],
              ['实验室', '/lab'],
              ['日志', '/blog'],
              ['联系', '/contact'],
            ].map(([label, to]) => (
              <Link key={to} to={to} data-cursor="link">
                {label}
                <Icon name="arrow" size={13} />
              </Link>
            ))}
          </div>

          <span className="not-found__footer mono-label">
            <ScrambleText text="系统仍然在线" trigger="mount" />
          </span>
        </div>
      </section>
    </div>
  )
}
