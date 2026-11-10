import { Reveal } from './Reveal'
import { ScrambleText } from './ScrambleText'

export function SectionHeader({ index, eyebrow, title, copy, align = 'left', className = '' }) {
  return (
    <Reveal className={`section-header section-header--${align} ${className}`.trim()}>
      <div className="section-header__eyebrow">
        {index ? <span className="section-header__index">{index}</span> : null}
        <span className="mono-label">
          <ScrambleText text={eyebrow} trigger="view" />
        </span>
        <span className="section-header__line" aria-hidden="true" />
      </div>
      <h2 className="section-header__title">{title}</h2>
      {copy ? <p className="section-header__copy">{copy}</p> : null}
    </Reveal>
  )
}
