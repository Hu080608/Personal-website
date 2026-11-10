# NEXUS/AETHER — Sci-Fi Portfolio

A multi-page, neon-sci-fi personal portfolio built as a **pure static site** and tuned for GitHub Pages. It pairs a production-minded React architecture with GPU particles, a live WebGL shader, a simulated terminal, canvas telemetry, custom typography and a full motion system.

> All personal content is fictional placeholder data. Replace one config file to make the site yours.

---

## 1. Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **React 18 + Vite 6** | Static export, fast builds, zero server runtime |
| Routing | **React Router 6 (HashRouter)** | `/#/about` style routes work on GitHub Pages sub-paths without server rewrites |
| Styling | **Native CSS + design tokens** | Fine control over glass, glow, grids, scanlines and responsive behaviour |
| 3D / GPU | **Three.js + custom GLSL ShaderMaterial** | GPU particle atmosphere on the home page |
| Motion | **GSAP + ScrollTrigger, Framer Motion, IntersectionObserver** | Parallax, route transitions, reveal choreography |
| Data visuals | **SVG + Canvas 2D + raw WebGL** | Capability radar, animated telemetry, interactive shader lab |
| Fonts | **@fontsource** (Orbitron, Space Grotesk, JetBrains Mono) | Self-hosted, no external font CDN |
| Icons | Inline SVG component | No icon-font or external asset request |
| Deploy | **GitHub Actions → GitHub Pages** | One push builds and publishes `dist/` |

Everything is local except the placeholder social profile links. No API keys, backend endpoints or private assets are required.

---

## 2. Pages and routes

| Route | Page | Content blocks / highlights |
| --- | --- | --- |
| `/#/` | Home | Full-screen 3D particle hero, glitch title, typewriter, marquee, origin signal, selected work, capability matrix, manifesto, field notes, contact CTA |
| `/#/about` | About | Profile hero, origin story, radar + capability matrix, timeline, principles, current focus |
| `/#/projects` | Projects | Filterable 3D tilt card grid, full case-study modal, process, archive table, CTA |
| `/#/lab` | Lab | WebGL shader switcher, simulated terminal, live telemetry canvas, glyph decoder, lab protocol notes |
| `/#/blog` | Log | Featured article, tag filters, live search, article rows, recurring themes, CTA |
| `/#/blog/:slug` | Article | Full long-form essay, reading progress, table of contents, author card, next article |
| `/#/contact` | Contact | Validated local form, success state with mailto handoff, contact cards, availability, FAQ accordion |
| `/#/anything-else` | 404 | Glitch 404, route diagnostics, quick links |

The 404 route is client-side and also works on GitHub Pages because all navigation lives after the hash.

---

## 3. Six required effect systems — where they live

1. **3D / GPU particle background**
   - Home hero: `src/components/background/ParticleField.jsx`
   - Three.js custom ShaderMaterial, additive particles, orbital rings, mouse + scroll parallax, adaptive particle density and DPR, full dispose cleanup.

2. **Scroll-triggered animation**
   - Home + About: GSAP `ScrollTrigger` for `[data-parallax]`; `Reveal.jsx` uses one-shot `IntersectionObserver` across every page for fade/slide-in sections.
   - Reduced-motion users get static content without parallax.

3. **Custom cursor and hover feedback**
   - `CustomCursor.jsx`: a fast dot + damped outer ring, press state, hover state and `data-cursor-label` verbs such as `VIEW`, `READ`, `OPEN`.
   - Disabled on coarse pointers / mobile. Native cursor is only hidden after the custom layer initialises.

4. **Page / route transition**
   - `App.jsx`: Framer Motion `AnimatePresence` with a blur + rise + fade route transition, lazy route chunks and a route decoding fallback.
   - Mobile navigation uses its own staggered full-screen transition.

5. **Text effects**
   - Hero: `GlitchText` (CSS pseudo-element glitch) and `Typewriter` (looping roles).
   - Section labels, footer and lab: `ScrambleText` (viewport-triggered glyph decode).
   - Lab EXP-004: standalone interactive `GlyphDecoder`.
   - All timers and observers clean up on unmount.

6. **Dynamic data / graphical visualisation**
   - About: animated SVG capability radar (`RadarChart.jsx`).
   - Lab: live Canvas 2D telemetry (`TelemetryChart.jsx`) and a raw WebGL fragment-shader switcher (`ShaderLab.jsx`).
   - Both adapt resolution and stop rAF work when their components unmount.

Additional details: loading screen, favicon, local fonts, glassmorphism, neon borders, scanlines, animated grid, magnetic-style buttons, accessible reduced-motion fallback.

---

## 4. Project structure

```text
nexus-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── .nojekyll
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── background/
│   │   │   ├── AmbientBackdrop.jsx
│   │   │   └── ParticleField.jsx
│   │   ├── common/
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── GlitchText.jsx
│   │   │   ├── Icon.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── NeonButton.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   ├── Reveal.jsx
│   │   │   ├── ScrambleText.jsx
│   │   │   ├── SectionHeader.jsx
│   │   │   └── Typewriter.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   └── visuals/
│   │       ├── GlyphDecoder.jsx
│   │       ├── RadarChart.jsx
│   │       ├── ShaderLab.jsx
│   │       ├── TelemetryChart.jsx
│   │       └── TerminalLab.jsx
│   ├── config/
│   │   └── profile.js          ← EDIT THIS FILE
│   ├── hooks/
│   │   ├── useDocumentTitle.js
│   │   ├── useIsTouch.js
│   │   ├── useReducedMotion.js
│   │   └── useScrollToTop.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Lab.jsx
│   │   ├── NotFound.jsx
│   │   └── Projects.jsx
│   ├── styles/
│   │   ├── animations.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 5. Local development

Requirements: **Node 20+** (Node 22 LTS recommended) and npm.

```bash
cd nexus-portfolio
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173/`).

Production build:

```bash
npm run build
npm run preview
```

`npm run build` outputs a fully static `dist/` folder.

---

## 6. Make it yours: one config file

Open **`src/config/profile.js`** and replace the fictional values with your own.

### Identity

```js
meta: {
  name: 'NOVA VOSS',
  firstName: 'NOVA',
  lastName: 'VOSS',
  alias: 'NEXUS/AETHER',
  role: 'Creative Technologist',
  email: 'hello@novavoss.studio',
  location: 'Neo-Tokyo / Remote',
  // ...
}
```

### Projects

Edit the `projects` array. Each project accepts:

```js
{
  slug: 'your-project',
  title: 'Project title',
  subtitle: 'One-line position',
  category: 'WebGL',
  year: '2026',
  client: 'Client name',
  role: 'Your role',
  accent: '#6ff7ff',
  featured: true,
  summary: 'Card copy',
  description: 'Case-study brief',
  challenge: 'The friction',
  outcome: 'The measurable result',
  metrics: [{ value: '2.1s', label: 'LCP' }],
  features: ['Feature one'],
  stack: ['React', 'Three.js'],
  links: [{ label: 'View site', href: 'https://example.com' }]
}
```

### Blog

Edit `posts`. Each post needs `slug`, metadata and a `content` array. Supported block types:

- `lead`
- `p`
- `h2`
- `h3`
- `quote`
- `list` (`{ type: 'list', items: [...] }`)
- `callout` (`{ type: 'callout', title, text }`)
- `divider`

Add a new post by copying an existing object. The list, search, next-post navigation and table of contents update automatically.

### Social links / contact / FAQ

Update `socials`, `contact.faqs`, `about.*`, `lab.experiments` and `footer`.

> Search the codebase for `NOVA`, `novavoss` or `hello@novavoss.studio` only if you add content outside `profile.js`. The rendered UI reads from this config.

---

## 7. GitHub Pages deployment (recommended: GitHub Actions)

The included workflow is at **`.github/workflows/deploy.yml`**.

1. Create a new GitHub repository.
2. Push this folder to the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to `main` (or run **Actions → Deploy to GitHub Pages → Run workflow**).
6. Wait for the `deploy` job. The site will be available at:

   `https://<username>.github.io/<repository-name>/`

### Why the sub-path works

- `vite.config.js` sets `base: './'`, so every built asset is referenced relatively.
- Routing uses `HashRouter`, so links become `https://<user>.github.io/<repo>/#/about`.
- No server rewrite, base path switching or `404.html` hack is required.
- `public/.nojekyll` is included so GitHub Pages does not ignore Vite's asset folder naming.

If you later switch to a custom domain or deploy at the repository root, the same relative config continues to work.

### Alternative: gh-pages branch

If you prefer not to use Actions:

```bash
npm run build
npx gh-pages -d dist
```

Then set **Settings → Pages → Source** to **Deploy from a branch** and choose the `gh-pages` branch / root.

---

## 8. Quality notes

- **Responsive:** tested at 1440px, 768px and 375px with no horizontal overflow. The CSS includes additional 1180 / 1020 / 480px breakpoints.
- **Mobile degradation:** lower Three.js particle count and DPR cap, disabled custom cursor on coarse pointers, CSS/static fallbacks for WebGL, reduced-motion media query across every animation.
- **Cleanup:** all rAF loops, resize observers, IntersectionObservers, timeouts, pointer listeners and WebGL resources are released on unmount.
- **Accessibility:** skip link, semantic landmarks, focus-visible states, keyboard-operable cards, modal, accordion and terminal, `aria-live` regions, reduced-motion support. `ScrambleText` exposes the final string to screen readers.
- **Form:** front-end validation only. The success state clearly explains that no data was transmitted and offers a `mailto:` handoff.
- **First load:** branded boot loader, lazy-loaded routes, local fonts, no large images, code-split Three.js / lab chunks.

---

## 9. Extending the site

1. **Replace the placeholder project links** with real case studies or add a `/#/projects/:slug` route to make each case study a standalone page.
2. **Connect the contact form** to Formspree, Basin or a serverless function. The validated values are already structured in `Contact.jsx`.
3. **Add an RSS feed** by generating `feed.xml` during the build from `profile.posts`.
4. **Add MDX or a headless CMS** if the blog grows; the current block renderer is intentionally small and portable.
5. **Explore WebGPU** for the particle field when browser support is broad enough.
6. **Add real analytics and Open Graph images** before launch; the current OG tags intentionally use no external images.

---

Built with too many gradients, an obsessive attention to easing, and a strict 60fps budget.
