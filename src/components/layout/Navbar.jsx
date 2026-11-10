import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profile } from '../../config/profile'
import { Icon } from '../common/Icon'

const links = [
  { to: '/', label: 'Home', index: '00' },
  { to: '/about', label: 'About', index: '01' },
  { to: '/projects', label: 'Projects', index: '02' },
  { to: '/lab', label: 'Lab', index: '03' },
  { to: '/blog', label: 'Log', index: '04' },
  { to: '/contact', label: 'Contact', index: '05' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="site-header__inner container">
          <Link to="/" className="brand" aria-label={`${profile.meta.name} — home`} data-cursor="link">
            <span className="brand__mark" aria-hidden="true">
              <span className="brand__mark-core" />
            </span>
            <span className="brand__word">
              <span>{profile.meta.firstName}</span>
              <span className="brand__slash">/</span>
              <span>{profile.meta.lastName}</span>
            </span>
            <span className="brand__status" title="System online">
              <span className="status-dot" />
              ONLINE
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `desktop-nav__link ${isActive ? 'is-active' : ''}`}
                data-cursor="link"
              >
                <span className="desktop-nav__index">{link.index}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link to="/contact" className="header-cta" data-cursor="link" data-cursor-label="TALK">
              <span>Start a project</span>
              <Icon name="arrow" size={14} />
            </Link>
            <button
              type="button"
              className={`menu-toggle ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
              data-cursor="link"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="site-header__progress" aria-hidden="true" />
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__backdrop" onClick={() => setOpen(false)} />
        <div className="mobile-menu__panel">
          <div className="mobile-menu__top mono-label">
            <span>NAVIGATION / {profile.meta.alias}</span>
            <span>{profile.meta.coordinates}</span>
          </div>
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {links.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `mobile-menu__link ${isActive ? 'is-active' : ''}`}
                style={{ '--menu-index': index }}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-menu__index">{link.index}</span>
                <span className="mobile-menu__label">{link.label}</span>
                <Icon name="arrow" size={24} />
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <a href={`mailto:${profile.meta.email}`} className="mobile-menu__email">
              {profile.meta.email}
            </a>
            <div className="mobile-menu__socials">
              {profile.socials.map((social) => (
                <a key={social.label} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
