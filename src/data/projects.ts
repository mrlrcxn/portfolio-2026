// ─── Types ────────────────────────────────────────────────────────────

export interface Metric {
  value: string
  label: string
}

export interface ProcessPhase {
  title:        string
  bulletsLabel?: string
  summary:      string
  bullets:      string[]
}

export interface Project {
  // ── Card / listing ──────────────────────────────
  id:          number
  slug:        string
  number:      string
  category:    string   // type / area  e.g. "SaaS · E-commerce"
  company:     string
  year:        string
  title:       string
  tagline:     string   // one-line challenge or result for hero
  description: string   // 2-sentence card description
  tags:        string[]
  wip?:        boolean  // marks the card as Work in Progress
  isPrivate?:  boolean  // password-protected case study

  // ── Streamlined layout fields (optional) ────────
  companyDescription?: string   // "About the company" paragraph (also used in 2-col below cover image)
  roleDescription?:    string   // Full "My role" paragraph
  goals?:              string[] // Project goals bullet list
  quickOverview?:      string   // Optional dark callout (e.g. NDA notice)

  companyUrl?: string           // External link for "Company website" CTA
  coverBg?:   string            // Background color behind the cover image (for transparent PNGs)

  // ── Media ────────────────────────────────────────
  coverImage?:          string   // Hero cover image path (public/)
  beforeAfter?:         { before: string; after: string }
  prototypeVideo?:      string   // Prototype video path (public/)
  prototypeVideoCaption?: string
  secondaryVideo?:        string   // Second video (e.g. prototype demo)
  secondaryVideoCaption?: string

  // ── 2. Overview ─────────────────────────────────
  overview:    string
  metrics:     Metric[]

  // ── 3. Role & Team (optional) ───────────────────
  role?:       string
  team?:       string
  duration?:   string
  tools?:      string[]

  // ── 4. The Challenge ────────────────────────────
  challenge: {
    intro:        string
    context:      string
    objectives:   { title: string; body: string }[]
    constraints?: string[]
  }

  // ── 5. Process ──────────────────────────────────
  process: ProcessPhase[]

  // ── 6. Solution ─────────────────────────────────
  solution: {
    description:  string
    beforeItems?: string[]
    afterItems?:  string[]
    imageCount:   number
  }

  // ── 7. Outcome + Reflection ──────────────────────
  results: {
    metrics?:     Metric[]
    impactItems?: string[]   // Impact bullet list (supports **bold** formatting)
    learnings:    string[]
    reflection?:  string
    nextSteps?:   string[]
  }
}

// ─── Data ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id:          1,
    slug:        'fourvenues-ecommerce',
    number:      '01',
    category:    'eCommerce',
    company:     'Fourvenues',
    year:        '2023',
    title:       'Rebuilding for scale and client autonomy',
    tagline:     'From a fragile legacy codebase with no analytics to a scalable, component-based eCommerce that gives venues real autonomy for the first time.',
    description: 'From a fragile legacy codebase with no analytics to a scalable, component-based eCommerce that gives venues real autonomy for the first time.',
    tags:        ['Product Design', 'UX Research', 'Strategy', 'Design System'],

    companyUrl:     'https://www.fourvenues.com/es',
    coverBg:        '#09091D',
    coverImage:     '/content/fourvenues_ecommerce/cover.png',
    beforeAfter:    { before: '/content/fourvenues_ecommerce/before.png', after: '/content/fourvenues_ecommerce/after.png' },
    prototypeVideo:        '/content/fourvenues_ecommerce/custom_services_order_video.mp4',
    prototypeVideoCaption: 'Promotional video — Custom services order feature',

    companyDescription: 'Fourvenues is a 360° SaaS platform for the nightlife industry, covering everything venues need to run their business: ticketing, access control, VIP reservations, team management, CRM, and real-time analytics. It serves thousands of venues, from nightclubs and festivals to beach clubs and promoters, with millions of users every week.',

    roleDescription: 'I joined this project as the sole designer, covering the full process from discovery to production QA. Over time, my involvement grew beyond design execution into product decisions and prioritisation, working closely with the PM and engineering team to define what to build, in what order, and why.',

    overview:    '',
    metrics:     [],

    role:      'Sole Product Designer',
    team:      'PM, Engineering, Customer Service',
    duration:  '2023',
    tools:     ['Figma', 'Amplitude', 'Hotjar', 'Notion'],

    challenge: {
      intro:   'The Fourvenues eCommerce, the microsites and embeddable iFrames where venues sell tickets, passes and lists directly to their audience, was running on a legacy PHP codebase with no analytics, no component system and accessibility issues. Every client customisation request had been solved slightly differently over the years, creating a fragile product that was expensive to maintain and impossible to scale.',
      context: 'The problem wasn\'t just technical. With no instrumentation on any flow, there was no way to know what was working or where users were dropping off. And several flows were unclear enough that users were regularly contacting Customer Service instead of completing purchases on their own.\n\nThree constraints shaped every decision throughout the project: no analytics baseline to measure from, a dual-context requirement where every component had to work both as a standalone microsite and as an embedded iFrame, and the need to introduce changes gradually to avoid disrupting venues that had built their operations around existing flows.',
      objectives: [],
    },

    quickOverview: 'This project is under NDA. Contact me to talk about the process and design decisions behind it.',

    goals: [
      'Migrate the eCommerce to a scalable, component-based architecture',
      'Build a configurable modular system giving venues real autonomy',
      'Instrument all flows to enable data-informed iteration going forward',
      'Improve existing SEO and introduce accessibility as a foundational requirement',
    ],

    process: [],

    solution: {
      description: '',
      imageCount:  0,
    },

    results: {
      metrics:     [],
      impactItems: [
        '**+9% conversion** and **−12% drop-off** via A/B testing across migrated flows',
        '**−30% Customer Service load** through UX improvements and automation',
        'Ad-hoc custom code **reduced to near zero** with the new component library',
        'Development velocity **doubled** after the component library was in place',
        '**Full analytics coverage** instrumented from zero across all migrated flows',
        '**SEO audited and improved** across all migrated screens',
        '**Accessibility built from scratch**: color contrast across all flows, screen reader support, keyboard navigation and constrained customisation to minimise user error',
      ],
      learnings:   [],
      reflection:  'Two things stayed with me from this project. Designing for configuration rather than for a single use case scales in ways that custom solutions never can. And in environments where product structure is still forming, a significant part of the work is creating the conditions for good decisions to happen. That work rarely shows up in the final design, but it is also what makes the final design possible.',
    },
  },

  {
    id:          2,
    slug:        'access-control-app',
    number:      '02',
    category:    'Mobile · Operations',
    company:     'Fourvenues',
    year:        '2024',
    title:       'Access App',
    tagline:     'A door-staff mobile app for real-time entry management, designed for high-pressure, low-light environments.',
    description: 'A door-staff mobile app for real-time entry management, guest list validation, and capacity tracking — designed for high-pressure, low-light environments.',
    tags:        ['Mobile', 'UX Research', 'Figma'],
    wip:         true,

    overview:    'TBD — describe the product, the problem, and the outcome in 3-4 lines.',
    metrics:     [],

    role:      'Product Designer',
    team:      'TBD',
    duration:  'TBD',
    tools:     ['Figma', 'Maze'],

    challenge: {
      intro:       'TBD — the core problem to solve.',
      context:     'TBD — what existed before and why it didn\'t work.',
      objectives:  [
        { title: 'Objective 1', body: '' },
        { title: 'Objective 2', body: '' },
      ],
    },

    process: [
      {
        title:   'Discovery',
        summary: 'TBD — research methods and key insights.',
        bullets: ['Field observation', 'Staff interviews'],
      },
      {
        title:   'Explore',
        summary: 'TBD — ideation and concept work.',
        bullets: ['Sketches', 'Low-fi flows'],
      },
      {
        title:   'Design & Validate',
        summary: 'TBD — prototyping and testing.',
        bullets: ['Interactive prototype', 'Usability sessions'],
      },
      {
        title:   'Ship & Measure',
        summary: 'TBD — release and measurement.',
        bullets: ['Beta rollout', 'Error rate tracking'],
      },
    ],

    solution: {
      description: 'TBD — describe the final solution.',
      imageCount:  2,
    },

    results: {
      learnings: ['Learning 1', 'Learning 2'],
    },
  },

  {
    id:          4,
    slug:        'fourvenues-ai-seo',
    number:      '04',
    category:    'eCommerce',
    company:     'Fourvenues',
    year:        '2025',
    title:       'AI SEO Assistant',
    tagline:     'Helping venue owners with no SEO knowledge take control of their search presence — through a short survey and AI-generated, fully editable content.',
    description: 'Helping venue owners take control of their search presence without prior knowledge, through a short survey and AI-generated content they can edit and regenerate at any time.',
    tags:        ['Product Design', 'UX Research', 'Strategy', 'AI'],

    companyUrl:   'https://www.fourvenues.com/es',
    coverBg:      '#09091D',
    coverImage:   '/content/ai_seo_assistant/cover.png',
    secondaryVideo:        '/content/ai_seo_assistant/prototype.mp4',
    secondaryVideoCaption: 'Early prototype (not final product)',
    quickOverview: 'This project is under NDA. Contact me to talk about the process and design decisions behind it.',

    companyDescription: 'Fourvenues is a 360° SaaS platform for the nightlife industry, covering everything venues need to run their business: ticketing, access control, VIP reservations, team management, CRM, and real-time analytics. It serves thousands of venues, from nightclubs and festivals to beach clubs and promoters, with millions of users every week.',

    roleDescription: 'I designed the end-to-end experience of the AI SEO Assistant as part of a small cross-functional team, working closely with Marketing and the PM. My ownership covered the full design process: from defining the flow and the survey structure to the interface, prototypes and handoff. Marketing led the AI configuration and prompt optimisation, and we ran several joint sessions to align the output with the product experience.',

    overview: '',
    metrics:  [],

    role:     'Product Designer',
    team:     'PM, Marketing',
    duration: '2025 — 8 weeks',
    tools:    ['Figma'],

    challenge: {
      intro:   'Most venue owners, especially smaller businesses like nightclubs or promoters without a dedicated marketing team, had no SEO knowledge and no clear reason to think those fields needed attention. The configuration existed, but it was invisible to the people who needed it most. Every venue had default SEO texts, but those defaults were the same for everyone. Hundreds of venues were being indexed by Google in almost identical ways, hurting their individual visibility and differentiation.',
      context: 'The challenge was to bring AI into that gap in a way that felt approachable and useful: a short survey collecting the venue\'s identity was enough for the assistant to generate personalised meta titles, descriptions and venue texts. Every output could be edited, regenerated or updated at any time, keeping the venue owner in control.',
      objectives: [],
    },

    goals: [
      'Make SEO configuration accessible to venue owners without prior knowledge',
      'Reduce duplicated default content across venues of the same category',
      'Keep the venue owner in control of every AI-generated output',
    ],

    process: [],

    solution: {
      description: '',
      imageCount:  0,
    },

    results: {
      impactItems: [
        'Venue owners with no SEO knowledge were able to complete their configuration autonomously',
        'Venue-specific content replacing generic defaults across the platform',
        'A tool that made a complex task feel simple, giving venue owners confidence without requiring them to become SEO experts',
      ],
      learnings:  [],
      reflection: 'As my first hands-on experience integrating AI into a product, what I cared most about was designing the assistant as a true partner for the user: useful without being overwhelming, and always leaving them in control. Finding that balance is what made this project exciting, and exploring how AI and users can work together in digital products is something I want to keep exploring further.',
    },
  },

  {
    id:          5,
    slug:        'preregistro-eventos',
    number:      '05',
    category:    'Mobile · Events',
    company:     'Fourvenues',
    year:        '2024',
    title:       'From idea to adopted feature in two weeks',
    tagline:     'A pre-registration flow that lets attendees secure their spot before the event, reducing queues and improving the entry experience.',
    description: 'From a two-week pre-registration MVP to one of the most adopted features on the platform, through research, fast scoping and data-driven iteration.',
    tags:        ['Product Design', 'UX Research', 'Strategy'],

    companyDescription: 'Fourvenues is a 360° SaaS platform for the nightlife industry, covering everything venues need to run their business: ticketing, access control, VIP reservations, team management, CRM, and real-time analytics. It serves thousands of venues, from nightclubs and festivals to beach clubs and promoters, with millions of users every week.',

    companyUrl: 'https://www.fourvenues.com/es',

    overview: '',
    metrics:  [],

    role:     'Product Designer',
    team:     'PM, Engineering, Account Management',
    duration: '2024',
    tools:    ['Figma'],

    challenge: {
      intro:   'Giving venue owners a way to measure interest and capture their audience before tickets go on sale.',
      context: 'Pre-registration had been on our radar for a while. Through benchmarking and research, we had identified it as a gap worth closing: venues had no structured way to build anticipation before an event went on sale, and pre-marketing was entirely informal. When a key enterprise client requested the feature, it gave us the opening to prioritise it and move fast.\n\nWe brought engineering into the room to scope the smallest version that would deliver real value, aligned with Account Managers on how clients were currently handling pre-marketing, and shipped in two weeks. But launching was only the beginning. Once live, we noticed a clear gap: enterprise clients, supported by account managers, adopted it immediately, while independent venues with no dedicated team struggled to get started. Rather than moving on, we ran a structured analysis, interviewing support staff and account managers to find the root cause, and used that insight to redesign the onboarding experience with contextual guidance for those venues. The gap closed, adoption grew, and the feature became something the whole client base could actually use.',
      objectives: [],
    },

    goals: [
      'Give venues a simple way to activate and manage pre-registration for any event',
      'Capture end user interest and consent in a privacy-compliant way',
      'Turn pre-registration data into actionable audiences for venue communication',
      'Ship a focused MVP fast enough to validate the concept before expanding it',
    ],

    process: [],

    solution: {
      description: '',
      imageCount:  0,
    },

    results: {
      impactItems: [
        '**70% of clients** activated pre-registration within the first weeks of launch',
        'Enterprise adoption was immediate; **independent venues grew by 25%** within six weeks after targeted onboarding improvements',
        'Venues able to **measure real demand** before tickets go on sale for the first time',
        'End user data segmented by consent type and automatically deleted after the event, ensuring **privacy compliance from day one**',
        'A **second iteration shipped one week** after launch, adding scheduled closing dates based on immediate user feedback',
      ],
      learnings:  [],
      reflection: 'The adoption rate mattered, but what stayed with me was what it represented. In an environment where product decisions were often driven by urgency or client requests, this project showed that taking the time to scope properly, validate early and iterate on real feedback is not slower. It is what makes speed sustainable.',
    },
  },

]
