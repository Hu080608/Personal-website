/**
 * CSS-driven glitch treatment. The pseudo-elements read the text from
 * `data-text`, so the effect costs no extra JS frames.
 */
export function GlitchText({ text, as: Tag = 'span', className = '', ...props }) {
  return (
    <Tag className={`glitch-text ${className}`.trim()} data-text={text} {...props}>
      {text}
    </Tag>
  )
}
