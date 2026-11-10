import { Link } from 'react-router-dom'
import { profile } from '../../config/profile'
import { Icon } from '../common/Icon'
import { ScrambleText } from '../common/ScrambleText'

const footerNav = [
  { to: '/about', label: '关于' },
  { to: '/projects', label: '作品' },
  { to: '/lab', label: '实验室' },
  { to: '/blog', label: '日志' },
  { to: '/contact', label: '联系' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__statement">
            <span className="mono-label">信号结束</span>
            <p>
              <ScrambleText text={profile.footer.statement} trigger="view" />
            </p>
          </div>
          <a href={`mailto:${profile.meta.email}`} className="site-footer__email" data-cursor="link" data-cursor-label="邮件">
            <span>{profile.meta.email}</span>
            <Icon name="arrow" size={28} />
          </a>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="footer-mark" aria-label="Back to home">
              <span className="footer-mark__glyph">{profile.meta.initials.slice(0, 1)}<span>/</span>{profile.meta.initials.slice(1)}</span>
            </Link>
            <p>{profile.footer.note}</p>
            <div className="site-footer__socials">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${social.label}: ${social.handle}`}
                  data-cursor="link"
                >
                  <Icon name={social.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__col">
            <h3 className="mono-label">站点地图</h3>
            {footerNav.map((item) => (
              <Link key={item.to} to={item.to} data-cursor="link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__col">
            <h3 className="mono-label">联系频道</h3>
            {profile.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" data-cursor="link">
                {social.label}
              </a>
            ))}
          </div>

          <div className="site-footer__col site-footer__col--meta">
            <h3 className="mono-label">坐标</h3>
            <p>{profile.meta.location}</p>
            <p>{profile.meta.timezone}</p>
            <p>{profile.meta.coordinates}</p>
            <span className="footer-availability">
              {profile.meta.availability}
            </span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} {profile.meta.name}. 保留所有信号。</p>
          <p className="site-footer__built">
            <span>公开设计与构建</span>
            <span className="footer-pulse" aria-hidden="true" />
            <span>未伤害任何模板</span>
          </p>
          <button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-cursor="link"
            aria-label="Back to top"
          >
            <span>返回顶部</span>
            <Icon name="arrow" size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
