const paths = {
  arrow: <><path d="M5 19 19 5"/><path d="M9 5h10v10"/></>,
  arrowRight: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  github: <><path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.4a3 3 0 0 0-.8-2.3c2.5-.3 5.1-1.3 5.1-5.5a4.2 4.2 0 0 0-1.2-3 4 4 0 0 0-.1-3s-1-.3-3.2 1.2a11 11 0 0 0-5.6 0C7 3.5 6 3.8 6 3.8a4 4 0 0 0-.1 3 4.2 4.2 0 0 0-1.2 3c0 4.2 2.6 5.2 5.1 5.5a3 3 0 0 0-.8 2.3V21"/></>,
  linkedin: <><path d="M6 9v10M6 5v.01M10 19v-5.5a4 4 0 0 1 8 0V19"/><path d="M10 9v10"/></>,
  x: <><path d="M4 4l16 16M20 4 4 20"/></>,
  arena: <><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/></>,
  code: <><path d="m9 18-6-6 6-6M15 6l6 6-6 6"/></>,
  cube: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
  pen: <><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m13.5 8.5 3 3"/></>,
  radar: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12 18 6M12 4v2M20 12h-2M12 20v-2M4 12h2"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  send: <><path d="m21 3-7 18-4-7-7-4 18-7Z"/><path d="M10 14 21 3"/></>,
  terminal: <><path d="m4 7 5 5-5 5M12 17h8"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  spark: <><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/></>,
  chevron: <><path d="m6 9 6 6 6-6"/></>,
  play: <><path d="m8 5 11 7-11 7V5Z"/></>,
  pause: <><path d="M8 5v14M16 5v14"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  external: <><path d="M14 4h6v6M20 4 10 14"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></>,
}

export function Icon({ name, size = 18, strokeWidth = 1.7, className = '', ...props }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name] || paths.spark}
    </svg>
  )
}
