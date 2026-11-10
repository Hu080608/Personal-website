import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export function NeonButton({ to, href, children, variant = 'primary', icon = 'arrow', className = '', ...props }) {
  const classes = `neon-button neon-button--${variant} ${className}`.trim()
  const content = (
    <>
      <span className="neon-button__label">{children}</span>
      {icon ? <Icon name={icon} size={16} className="neon-button__icon" /> : null}
      <span className="neon-button__shine" aria-hidden="true" />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} data-cursor="link" {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} data-cursor="link" {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} data-cursor="link" {...props}>
      {content}
    </button>
  )
}
