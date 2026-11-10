import { Link } from 'react-router-dom'
import { profile } from '../config/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { GlitchText } from '../components/common/GlitchText'
import { NeonButton } from '../components/common/NeonButton'
import { ScrambleText } from '../components/common/ScrambleText'
import { Icon } from '../components/common/Icon'

export default function NotFound() {
  useDocumentTitle('Signal lost — 404')

  return (
    <div className="page not-found-page">
      <section className="not-found">
        <div className="not-found__grid" aria-hidden="true" />
        <div className="not-found__scan" aria-hidden="true" />
        <div className="container not-found__inner">
          <div className="not-found__top mono-label">
            <span>ERROR / ROUTE NOT FOUND</span>
            <span>NODE: {profile.meta.alias}</span>
            <span>PACKET LOST</span>
          </div>

          <div className="not-found__code" aria-label="Error 404">
            <GlitchText text="404" as="span" className="not-found__number" />
          </div>

          <div className="not-found__content">
            <span className="eyebrow">SIGNAL DECAY / NO ROUTE HOME</span>
            <h1>This dimension<br />does not <span className="text-gradient">exist.</span></h1>
            <p>
              The path you followed has collapsed into static. It may have been moved, renamed, or it may be waiting in a future release. The rest of the archive is still online.
            </p>
            <div className="not-found__actions">
              <NeonButton to="/" icon="arrow">Return to home</NeonButton>
              <NeonButton to="/projects" variant="ghost" icon="cube">Browse case files</NeonButton>
            </div>
          </div>

          <div className="not-found__diagnostics glass-panel">
            <div className="not-found__diag-head">
              <span className="mono-label">DIAGNOSTIC READOUT</span>
              <span className="not-found__diag-status"><i /> CRITICAL</span>
            </div>
            <div className="diagnostic-line"><span>REQUEST</span><span className="mono-label">{typeof window !== 'undefined' ? window.location.hash : '#/unknown'}</span></div>
            <div className="diagnostic-line"><span>RESPONSE</span><span className="mono-label">404 / NO CONTENT</span></div>
            <div className="diagnostic-line"><span>SUGGESTION</span><span className="mono-label">TRY /#/ OR /#/PROJECTS</span></div>
            <div className="not-found__wave" aria-hidden="true">
              {Array.from({ length: 38 }).map((_, index) => (
                <span key={index} style={{ '--i': index }} />
              ))}
            </div>
          </div>

          <div className="not-found__quick-links">
            <span className="mono-label">QUICK ROUTES</span>
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Projects', '/projects'],
              ['Lab', '/lab'],
              ['Log', '/blog'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <Link key={to} to={to} data-cursor="link">
                {label}
                <Icon name="arrow" size={13} />
              </Link>
            ))}
          </div>

          <span className="not-found__footer mono-label">
            <ScrambleText text="THE SYSTEM REMAINS ONLINE" trigger="mount" />
          </span>
        </div>
      </section>
    </div>
  )
}
