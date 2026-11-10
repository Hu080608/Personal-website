/**
 * ─────────────────────────────────────────────────────────────
 *  NEXUS/AETHER — SINGLE SOURCE OF TRUTH
 * -------------------------------------------------------------
 *  Replace the values in this file to make the site yours.
 *  Every name, project, article, skill and contact detail is
 *  rendered from this object. No other file needs editing.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  meta: {
    name: 'NOVA VOSS',
    firstName: 'NOVA',
    lastName: 'VOSS',
    alias: 'NEXUS/AETHER',
    initials: 'NV',
    role: 'Creative Technologist',
    subtitle: 'Spatial Interface Engineer',
    tagline: 'I build interfaces for the next dimension.',
    description:
      'Creative technologist working where design systems, real-time graphics and human behaviour collide. I turn ambitious ideas into tactile, performant digital worlds.',
    location: 'Neo-Tokyo / Remote',
    timezone: 'UTC+08:00',
    availability: 'Open for select collaborations — Q3 2026',
    email: 'hello@novavoss.studio',
    phone: '+00 000 000 000',
    coordinates: '35.6762° N / 139.6503° E',
    copyrightStart: 2021,
  },

  socials: [
    { label: 'GitHub', handle: '@novavoss', url: 'https://github.com/', icon: 'github' },
    { label: 'LinkedIn', handle: '/in/novavoss', url: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'X / Twitter', handle: '@novavoss', url: 'https://x.com/', icon: 'x' },
    { label: 'Are.na', handle: '/novavoss', url: 'https://www.are.na/', icon: 'arena' },
  ],

  hero: {
    overline: 'SYSTEM ONLINE // PORTFOLIO BUILD 4.2.0',
    roles: [
      'Creative Technologist',
      'WebGL Interface Designer',
      'Motion Systems Architect',
      'Digital Experience Engineer',
    ],
    intro:
      'A digital atelier at the intersection of code, cinema and speculative design. I design systems that feel alive — and engineer them until they run at sixty frames per second.',
    primaryCta: { label: 'Explore selected work', to: '/projects' },
    secondaryCta: { label: 'Open a channel', to: '/contact' },
    stats: [
      { value: '08+', label: 'Years in the lab' },
      { value: '42', label: 'Shipped experiments' },
      { value: '17', label: 'Design awards' },
      { value: '60fps', label: 'Non-negotiable' },
    ],
    marquee: [
      'SPATIAL INTERFACES',
      'REAL-TIME GRAPHICS',
      'GENERATIVE SYSTEMS',
      'HUMAN-CENTRED CODE',
      'SPECULATIVE FUTURES',
    ],
  },

  about: {
    eyebrow: '01 // ORIGIN SIGNAL',
    title: 'A designer who ships, an engineer who dreams.',
    lead:
      'I work in the narrow, electric space between an impossible art direction and a production-ready interface. For the past eight years I have helped studios and product teams turn abstract futures into things people can actually touch.',
    paragraphs: [
      'My practice began with motion graphics and a stubborn curiosity about what happens when you replace a timeline with an API. That curiosity became a career spent building immersive product surfaces, interactive brand worlds and tools for creative teams. I am equally comfortable sketching in Figma, profiling a shader in the browser, or untangling a routing bug at 2am.',
      'Today I lead small, cross-functional teams through high-ambiguity projects: the kind where nobody knows exactly what the thing is yet. My role is to make the ambiguity visible, prototype it quickly, and then build the smallest beautiful system that can survive contact with reality.',
      'Away from the screen I collect field recordings, study industrial interfaces, and take long walks with a camera set to black and white. Those inputs find their way back into the work: rhythm, restraint, texture, and a respect for the person on the other side of the glass.',
    ],
    quote:
      'The future is not a screen we stare at. It is a space we move through. My job is to make that space legible.',
    status: [
      { label: 'Based in', value: 'Neo-Tokyo / Remote' },
      { label: 'Focus', value: 'Spatial web & generative systems' },
      { label: 'Currently', value: 'Building a real-time brand engine' },
      { label: 'Listening to', value: 'Ambient works / field recordings' },
    ],
    radar: [
      { label: 'Creative Dev', value: 94 },
      { label: '3D / WebGL', value: 88 },
      { label: 'Interaction', value: 96 },
      { label: 'Motion', value: 91 },
      { label: 'Architecture', value: 86 },
      { label: 'Product', value: 82 },
    ],
    skillGroups: [
      {
        title: 'Interface Engineering',
        icon: 'code',
        items: ['React / Vite', 'TypeScript', 'Next.js', 'CSS architecture', 'Accessibility', 'Performance budgets'],
      },
      {
        title: 'Real-time Graphics',
        icon: 'cube',
        items: ['Three.js / R3F', 'GLSL', 'GSAP', 'Canvas 2D', 'SVG systems', 'Shader optimisation'],
      },
      {
        title: 'Design & Direction',
        icon: 'pen',
        items: ['Art direction', 'Design systems', 'Prototyping', 'Motion language', 'Type systems', 'Narrative UX'],
      },
      {
        title: 'Product & Process',
        icon: 'radar',
        items: ['Discovery', 'Technical strategy', 'Workshop facilitation', 'Cross-team leadership', 'QA / launch', 'Documentation'],
      },
    ],
    timeline: [
      {
        period: '2023 — PRESENT',
        role: 'Independent Creative Technologist',
        org: 'NEXUS/AETHER Studio',
        description:
          'Leading immersive web and brand-system projects for culture, fashion and emerging technology clients. Building reusable WebGL and motion foundations that cut delivery time by 35%.',
        tags: ['Direction', 'WebGL', 'Systems'],
      },
      {
        period: '2021 — 2023',
        role: 'Senior Experience Engineer',
        org: 'Oblique Collective',
        description:
          'Owned the front-end craft for award-winning digital campaigns. Introduced a shared motion toolkit and performance culture across three product squads.',
        tags: ['Frontend', 'Motion', 'Team lead'],
      },
      {
        period: '2019 — 2021',
        role: 'Interactive Designer',
        org: 'Studio Mono',
        description:
          'Designed and coded editorial experiences, interactive installations and speculative product prototypes. First deep dive into real-time graphics and procedural art direction.',
        tags: ['Creative code', 'Installation', 'Editorial'],
      },
      {
        period: '2017 — 2019',
        role: 'Visual Designer',
        org: 'Northstar Lab',
        description:
          'Built identities, type systems and motion languages for early-stage technology brands. Learned that the best visual identities are systems, not static marks.',
        tags: ['Identity', 'Typography', 'Brand'],
      },
      {
        period: '2014 — 2017',
        role: 'BA, Interaction Design',
        org: 'Central Institute of Media Arts',
        description:
          'Graduated with a thesis on spatial interfaces and embodied interaction. Spent an unreasonable amount of time in the motion-capture studio.',
        tags: ['Research', 'Spatial', 'HCI'],
      },
    ],
    principles: [
      {
        index: '01',
        title: 'Make it legible',
        text: 'Spectacle without clarity is noise. Every glow, transition and parallax layer must help a person understand where they are and what happens next.',
      },
      {
        index: '02',
        title: 'Design the system',
        text: 'One beautiful screen is a sketch. A resilient set of tokens, components and rules is a product. I build for the second and third release, not just the launch.',
      },
      {
        index: '03',
        title: 'Performance is art direction',
        text: 'A smooth 60fps frame is part of the aesthetic. I profile early, degrade gracefully on mobile, and never let effects hold the content hostage.',
      },
      {
        index: '04',
        title: 'Leave a trail',
        text: 'The best handoff is a legible one. Clear code, concise documentation and a team that knows why the system works the way it does.',
      },
    ],
  },

  projects: [
    {
      slug: 'aether-interface',
      title: 'Aether Interface',
      subtitle: 'A generative brand engine for a spatial computing studio',
      category: 'WebGL',
      year: '2025',
      client: 'Aether Systems',
      role: 'Creative direction · Design · WebGL development',
      accent: '#6ff7ff',
      featured: true,
      summary:
        'A real-time identity system that turns studio data into an ever-shifting topographic landscape. Built as a reusable WebGL engine instead of a static campaign.',
      description:
        'Aether needed a launch site that could explain an abstract spatial operating system without relying on stock imagery or a conventional product demo. We built a living visual language from the product’s own telemetry: particle fields, contour lines, and a modular type system that responds to scroll velocity.',
      challenge:
        'The identity had to remain recognisable while changing every frame — and still load in under 2.5 seconds on a mid-range phone. The answer was a compact shader pipeline, procedural geometry and a strict adaptive quality budget.',
      outcome:
        'The launch generated a 4.8× increase in qualified demo requests and was featured across three design publications. The engine now powers the client’s event microsites and investor deck.',
      metrics: [
        { value: '2.1s', label: 'LCP on 4G' },
        { value: '60fps', label: 'Desktop target' },
        { value: '4.8×', label: 'Demo requests' },
      ],
      features: ['Procedural particle identity', 'Scroll-reactive shader', 'Adaptive quality tiers', 'Reusable engine'],
      stack: ['React', 'Three.js', 'GLSL', 'GSAP', 'Vite'],
      links: [{ label: 'Open live experiment', href: '#/lab' }],
    },
    {
      slug: 'nocturne-os',
      title: 'Nocturne OS',
      subtitle: 'A calm command centre for distributed creative teams',
      category: 'Interface',
      year: '2025',
      client: 'Nocturne',
      role: 'Product design · Design system · Front-end',
      accent: '#9b6cff',
      featured: true,
      summary:
        'An operating layer for hybrid studios: projects, signals and people in one quiet, high-density workspace designed to reduce cognitive load.',
      description:
        'Nocturne OS replaces the tab graveyard with a single spatial canvas. The interface uses layers of depth, a command palette, and live presence to keep large teams oriented without drowning them in notifications.',
      challenge:
        'High information density usually fights calm. We created a hierarchy of glow and blur — a visual grammar where urgency has a specific luminance and everything else recedes.',
      outcome:
        'Adopted by 120 studios in the first quarter. Average time-to-find dropped by 38% in usability testing, and the system now covers 74 production components.',
      metrics: [
        { value: '120', label: 'Studios onboard' },
        { value: '−38%', label: 'Time to find' },
        { value: '74', label: 'System components' },
      ],
      features: ['Spatial project canvas', 'Command-first navigation', 'Live presence layer', 'Token-driven theming'],
      stack: ['React', 'TypeScript', 'Framer Motion', 'SVG', 'Storybook'],
      links: [{ label: 'View interaction notes', href: '#/lab' }],
    },
    {
      slug: 'neural-tides',
      title: 'Neural Tides',
      subtitle: 'Making machine perception visible through live data art',
      category: 'Data',
      year: '2024',
      client: 'Institute for Computational Poetics',
      role: 'Concept · Data design · Creative code',
      accent: '#3ff2b0',
      featured: true,
      summary:
        'An exhibition and web companion that visualises a neural network’s attention as an ocean of changing currents. Data becomes atmosphere, not dashboard.',
      description:
        'Working with an archive of 40,000 annotated images, Neural Tides translates model confidence into wave height, attention into current direction, and uncertainty into bioluminescent noise. The result is an ambient data instrument that invites visitors to feel the model rather than read it.',
      challenge:
        'The visualisation had to remain scientifically honest while being emotionally resonant. We exposed the raw data on demand and documented every mapping decision in an accompanying field guide.',
      outcome:
        'Exhibited at two museums and accessed by more than 90,000 online visitors. The project was cited in a peer-reviewed paper on affective data visualisation.',
      metrics: [
        { value: '40k', label: 'Images mapped' },
        { value: '90k', label: 'Online visitors' },
        { value: '2', label: 'Museum runs' },
      ],
      features: ['Attention-current mapping', 'Bioluminescent uncertainty', 'Exhibition mode', 'Open data layer'],
      stack: ['Canvas 2D', 'd3-shape', 'Web Audio', 'React', 'Node tooling'],
      links: [{ label: 'Inspect the signal lab', href: '#/lab' }],
    },
    {
      slug: 'halo-archive',
      title: 'Halo Archive',
      subtitle: 'An interactive memorial for disappearing digital cultures',
      category: 'Experiment',
      year: '2024',
      client: 'Self-initiated',
      role: 'Research · Design · Development',
      accent: '#ff4fd8',
      featured: false,
      summary:
        'A slow, tactile archive of defunct communities, early web rituals and interface ghosts — navigated through a radio dial instead of a search bar.',
      description:
        'Halo Archive treats the history of the web as a landscape to be tuned into. Visitors rotate a virtual dial, catching fragments of old homepages, forum signatures and ambient soundscapes. Metadata is revealed gradually, rewarding patience over efficiency.',
      challenge:
        'The archive needed to feel precious without becoming nostalgic kitsch. A restrained palette, original field recordings and a typographic system based on early terminal displays keep the experience precise.',
      outcome:
        'Selected for the Digital Preservation Biennale and used as teaching material in two interaction design programmes.',
      metrics: [
        { value: '312', label: 'Artifacts preserved' },
        { value: '1', label: 'Biennale selection' },
        { value: '∞', label: 'Radio hours' },
      ],
      features: ['Tuning interaction', 'Ambient audio field', 'Metadata reveal', 'Preservation-first CMS'],
      stack: ['React', 'Web Audio', 'CSS Houdini', 'Sanity', 'Cloudflare'],
      links: [{ label: 'Read the field notes', href: '#/blog/post-screen-interfaces' }],
    },
    {
      slug: 'vector-bloom',
      title: 'Vector Bloom',
      subtitle: 'A browser-based generative fashion collection',
      category: 'WebGL',
      year: '2023',
      client: 'Maison Flux',
      role: 'Art direction · Shader development',
      accent: '#ffb86b',
      featured: false,
      summary:
        'A collection that exists only for the length of a scroll. Garment silhouettes grow from a shared seed, reacting to cursor velocity and device light.',
      description:
        'Maison Flux wanted a digital drop that felt like a living textile rather than a lookbook. We designed a growth system where every visitor generates a unique silhouette from a collection seed, then can mint a high-resolution still of their encounter.',
      challenge:
        'The shader had to produce couture-grade detail on everything from a flagship phone to a gallery projector. Procedural noise, vector field textures and a compact palette got us there.',
      outcome:
        'The drop sold out in 11 minutes. Over 28,000 unique silhouettes were generated during the campaign window.',
      metrics: [
        { value: '11min', label: 'Sell-out time' },
        { value: '28k', label: 'Silhouettes' },
        { value: '14', label: 'Countries' },
      ],
      features: ['Procedural couture', 'Cursor velocity fields', 'Collectible stills', 'Gallery projection mode'],
      stack: ['Three.js', 'GLSL', 'React', 'Vercel', 'Figma'],
      links: [{ label: 'Try the shader lab', href: '#/lab' }],
    },
    {
      slug: 'ghost-protocol',
      title: 'Ghost Protocol',
      subtitle: 'A privacy-first collaboration tool for sensitive research',
      category: 'Interface',
      year: '2023',
      client: 'Undisclosed',
      role: 'UX architecture · Front-end',
      accent: '#8aa7ff',
      featured: false,
      summary:
        'A secure workspace designed for teams handling fragile information. Identity, permissions and provenance are visible at every moment without becoming paranoid.',
      description:
        'Ghost Protocol needed to make complex security states understandable to non-technical researchers. We built a visual language of translucent boundaries, explicit custody trails and calm, contextual warnings.',
      challenge:
        'Security interfaces often default to alarm. We reduced the visual temperature and used motion to explain state changes, while keeping every critical action deliberate and reversible.',
      outcome:
        'Passed an external security review with zero high-severity UX findings and reduced support tickets around sharing permissions by 46%.',
      metrics: [
        { value: '0', label: 'High-sev findings' },
        { value: '−46%', label: 'Permission tickets' },
        { value: '3', label: 'Research pilots' },
      ],
      features: ['Custody trail UI', 'Progressive trust states', 'Reversible actions', 'Accessible motion model'],
      stack: ['React', 'TypeScript', 'Zustand', 'Radix UI', 'Playwright'],
      links: [{ label: 'Explore the interface lab', href: '#/lab' }],
    },
  ],

  lab: {
    experiments: [
      {
        id: 'shader',
        code: 'EXP-001',
        title: 'Aether Shader',
        description: 'A live fragment-shader playground with three procedural atmospheres. Move your cursor to bend the field.',
      },
      {
        id: 'terminal',
        code: 'EXP-002',
        title: 'Ghost Terminal',
        description: 'A simulated command console with a working local command set. Type `help` to establish a link.',
      },
      {
        id: 'telemetry',
        code: 'EXP-003',
        title: 'Signal Telemetry',
        description: 'A real-time canvas visualisation of synthetic network traffic and attention load.',
      },
      {
        id: 'decoder',
        code: 'EXP-004',
        title: 'Glyph Decoder',
        description: 'An interactive scramble engine that resolves text through a shifting glyph cipher.',
      },
    ],
  },

  posts: [
    {
      slug: 'post-screen-interfaces',
      title: 'Designing interfaces for the post-screen era',
      subtitle:
        'What spatial computing teaches us about hierarchy, restraint, and the quiet violence of a notification badge.',
      date: '2026-02-18',
      displayDate: '18 FEB 2026',
      readTime: '11 MIN READ',
      category: 'ESSAY',
      tags: ['Spatial UX', 'Interaction', 'Future'],
      featured: true,
      excerpt:
        'Screens are not disappearing. They are dissolving into rooms, gestures and ambient signals. Here is what survives when the rectangle stops being the container.',
      content: [
        { type: 'lead', text: 'For thirty years, the rectangle did two jobs at once: it was the surface we designed and the boundary we thought within. Spatial computing removes the second job. That should change more than your navigation pattern.' },
        { type: 'p', text: 'The first time you use a well-made spatial interface, the strange thing is not the depth. It is the silence. There is no chrome insisting on its own importance, no browser tab counting your sins, no badge begging for attention. Content simply occupies a place in the room. The interface becomes an environment, and environments are judged by how they feel to inhabit.' },
        { type: 'p', text: 'Most teams respond to that shift by recreating the rectangle in 3D: floating panels, translucent browsers, a carousel suspended in a void. It is an understandable first step. It is also a category error. A screen is a stage; a room is a social contract. The design questions change when the user can stand up and leave.' },
        { type: 'h2', text: '01. Hierarchy becomes distance' },
        { type: 'p', text: 'On a screen, hierarchy is mostly expressed through position, scale and contrast. In a space, it is also expressed through distance and orientation. The thing nearest to your body is the thing most likely to demand action. The thing behind you is ambient memory. The thing at the edge of your vision is a possibility, not a task.' },
        { type: 'p', text: 'This gives us a powerful new tool and a dangerous new failure mode. Put a notification in someone’s field of view and you have done something closer to tapping them on the shoulder than showing them a red dot. The craft is to reserve proximity for what genuinely deserves a body-level response. Everything else can live further away, in peripheral space, available without being urgent.' },
        { type: 'quote', text: 'A notification is not a component. It is a claim on someone’s attention. Design it like you are spending their money.' },
        { type: 'h2', text: '02. The rectangle was a load-bearing metaphor' },
        { type: 'p', text: 'We have built an enormous amount of interface grammar on the assumption that content is clipped by a frame. Cards, drawers, modals, tabs, carousels and sidebars all depend on the edge of the screen to create meaning. Remove the frame and those patterns do not become immersive. They become arbitrary.' },
        { type: 'p', text: 'A better starting point is to ask what the content wants to be in space. A document might want a wall. A conversation might want a table. A control surface might want to follow the hand. A memory might want to be a small object you can pick up and put down. This is not about novelty; it is about matching the affordance of the medium to the nature of the content.' },
        { type: 'list', items: [
          'Start with the social geometry: who is present, and where is their attention?',
          'Decide what deserves proximity and what should live at the edge of vision.',
          'Design transitions as spatial movement, not as opacity fades.',
          'Test with the body, not only with the cursor. Sit, stand, turn, step back.',
        ] },
        { type: 'h2', text: '03. Motion is a form of explanation' },
        { type: 'p', text: 'In flat interfaces, motion is often decoration applied after layout. In spatial interfaces, motion is how people build a cognitive map. An object that slides out of a menu and settles into the room teaches you where it came from. An object that simply appears teaches you nothing except that the system is confident.' },
        { type: 'p', text: 'This raises the bar for motion systems. Easing is no longer a brand signature alone; it is a legibility tool. Duration must communicate mass. Interruption must preserve place. And because the user’s head is constantly in motion, interfaces need to distinguish between animation and parallax. One belongs to the object. The other belongs to the observer.' },
        { type: 'callout', title: 'A practical rule', text: 'If a transition would make no sense as physical movement in the room, it probably should not be the primary transition. A fade is a fine fallback, not a spatial argument.' },
        { type: 'h2', text: '04. Ambient does not mean invisible' },
        { type: 'p', text: 'The most interesting opportunity in spatial interfaces is not immersion. It is ambience: the ability to communicate state without occupying the foreground. A room can tell you that a collaborator is nearby, that a build is running, or that a document is being edited, without asking you to read a sentence.' },
        { type: 'p', text: 'But ambient information needs its own discipline. It must be consistent, low-bandwidth, and safe to ignore. The moment ambient signals start competing for attention, they have become notifications with extra steps. Think of them as weather, not alerts: present, legible, and emotionally neutral until something genuinely changes.' },
        { type: 'h2', text: '05. What survives the screen' },
        { type: 'p', text: 'The end of the rectangle does not end interface design. It renews it. The fundamentals survive: clarity, feedback, hierarchy, accessibility, performance. But the material changes. We move from arranging pixels to composing spaces, from designing states to designing atmospheres, from capturing attention to earning presence.' },
        { type: 'p', text: 'The teams that succeed will be the ones that treat spatial computing as a design problem rather than a rendering problem. A beautiful shader cannot rescue a confusing room. A convincing 3D model cannot make an interaction respectful. The future is not more immersive. It is more considered.' },
        { type: 'divider' },
        { type: 'p', text: 'This essay is part of the NEXUS/AETHER field notes: a series about building digital experiences that are ambitious, humane and fast enough to feel effortless. If you want to compare notes, the channel is open.' },
      ],
    },
    {
      slug: 'quiet-physics-interaction',
      title: 'The quiet physics of good interaction',
      subtitle: 'Why the best micro-interactions feel less like effects and more like matter.',
      date: '2026-01-09',
      displayDate: '09 JAN 2026',
      readTime: '7 MIN READ',
      category: 'CRAFT',
      tags: ['Motion', 'Craft', 'Detail'],
      featured: false,
      excerpt:
        'The best buttons have weight. The best modals have a sense of place. A short field guide to making interface motion feel inevitable.',
      content: [
        { type: 'lead', text: 'Good interaction design is a study in plausible physics. Not literal simulation — plausible consequence.' },
        { type: 'p', text: 'When a panel opens, your eye asks two questions before your conscious mind catches up: where did it come from, and what did it displace? If the answer is “nowhere” and “nothing”, the interface may still be usable, but it will not feel real. The user is forced to parse a state change rather than perceive a movement.' },
        { type: 'h2', text: 'Give every surface a material' },
        { type: 'p', text: 'Material in interface design is not a texture. It is a set of expectations about mass, friction and elasticity. A crisp button that snaps back on release feels different from a soft card that settles into place. Neither is universally correct. The mistake is mixing materials without intention.' },
        { type: 'p', text: 'I keep a small motion palette on every project: one easing for surfaces, one for content, one for feedback, and one for interruptible gestures. That constraint creates coherence faster than a folder of bespoke animations.' },
        { type: 'quote', text: 'Motion should explain the interface, not perform for the reviewer.' },
        { type: 'h2', text: 'The 120ms secret' },
        { type: 'p', text: 'A surprising amount of perceived quality comes from the first 120 milliseconds after input. A button that acknowledges the press immediately can afford a longer exit animation. A button that waits for the server before changing state feels broken even if the response arrives within 300ms. Optimistic feedback is not a lie; it is courtesy.' },
        { type: 'list', items: [
          'Acknowledge input within one frame when possible.',
          'Reserve spring physics for playful or physical objects, not every tooltip.',
          'Use opacity changes sparingly; scale and translation preserve spatial memory.',
          'Always test reduced-motion version as a first-class design, not a removal.',
        ] },
        { type: 'p', text: 'The goal is not to make the interface disappear. The goal is to make its behaviour feel so proportional that it stops consuming attention. That is the quiet physics of a well-made thing.' },
      ],
    },
    {
      slug: 'generative-atmospheres',
      title: 'A field guide to generative atmospheres',
      subtitle: 'Notes on building WebGL backgrounds that support content instead of competing with it.',
      date: '2025-11-23',
      displayDate: '23 NOV 2025',
      readTime: '9 MIN READ',
      category: 'LAB NOTES',
      tags: ['WebGL', 'Generative', 'Performance'],
      featured: false,
      excerpt:
        'A practical checklist for procedural visuals that stay atmospheric: palette discipline, frame budgets, mobile fallbacks and the art of stopping.',
      content: [
        { type: 'lead', text: 'A generative background is not a wallpaper. It is a lighting rig for an idea. The moment it asks for more attention than the content, it has failed.' },
        { type: 'p', text: 'Over the last few years I have built particle fields, shader landscapes and data sculptures for a variety of brands. The technical details change; the constraints do not. Here is the short version of the checklist I return to.' },
        { type: 'h2', text: 'Start with a palette of three' },
        { type: 'p', text: 'One near-black, one luminous accent, one transition hue. More than that and motion turns into noise. The constraint also makes performance easier: fewer uniforms, fewer texture samples, a stronger visual signature.' },
        { type: 'h2', text: 'Budget in milliseconds, not particles' },
        { type: 'p', text: 'Particle count is a poor proxy for quality. On mobile, target a 6–8ms render budget and adapt resolution before density. A smaller, high-contrast field often reads better than a dense fog of points.' },
        { type: 'callout', title: 'Degrade with dignity', text: 'The reduced version should still feel designed. A static gradient, a single animated ring, or a subtle CSS grid can carry the same atmosphere without a single draw call.' },
        { type: 'p', text: 'Finally, know when to stop. The best generative systems leave negative space for typography, faces, product shots and silence. Atmosphere is a supporting character. Cast it accordingly.' },
      ],
    },
  ],

  contact: {
    eyebrow: '06 // OPEN CHANNEL',
    title: 'Let’s build something that should not exist yet.',
    lead:
      'I take on a small number of collaborations each season: brand worlds, immersive product launches, spatial interfaces and ambitious prototypes. If the brief is clear, send it. If it is not, send it anyway — clarity is what the first conversation is for.',
    responseTime: 'Usually responds within 2 working days',
    formNote:
      'This demo form validates locally and does not send data. Connect it to Formspree, Basin or your own endpoint when ready.',
    faqs: [
      {
        q: 'What kinds of projects are a good fit?',
        a: 'Immersive brand experiences, WebGL-heavy product launches, design systems for complex software, and early-stage prototypes where the interaction itself is the product. I am less useful for pure production handoff with no discovery phase.',
      },
      {
        q: 'How do you usually work?',
        a: 'Most engagements begin with a short discovery sprint, followed by a fixed-scope prototype and a production phase. I work best embedded with a product or creative team, but I also assemble a trusted network for larger builds.',
      },
      {
        q: 'Can you work with our existing design team?',
        a: 'Yes. I often act as a bridge between design and engineering: translating an art direction into a technical system, building the first production components, and documenting the motion and performance rules for the team.',
      },
      {
        q: 'What is your availability?',
        a: 'I am currently booking selective projects for Q3 2026. For urgent launches or advisory work, mention your timeline in the first message and I will tell you honestly whether it is possible.',
      },
    ],
  },

  footer: {
    statement: 'Built in the open. Tuned for the unknown.',
    note: 'This is a fictional portfolio template. Replace the profile config with your own signal.',
  },
}

export default profile
