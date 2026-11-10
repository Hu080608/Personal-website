/**
 * Global atmosphere: fixed grid, soft chromatic light leaks and scanlines.
 * Pure CSS/SVG so it stays available even if WebGL is disabled.
 */
export function AmbientBackdrop() {
  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <div className="ambient-backdrop__grid" />
      <div className="ambient-backdrop__orb ambient-backdrop__orb--cyan" />
      <div className="ambient-backdrop__orb ambient-backdrop__orb--violet" />
      <div className="ambient-backdrop__orb ambient-backdrop__orb--magenta" />
      <div className="ambient-backdrop__noise" />
      <div className="ambient-backdrop__scanlines" />
      <div className="ambient-backdrop__vignette" />
    </div>
  )
}
