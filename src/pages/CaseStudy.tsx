import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projects, type Metric, type ProcessPhase } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectCard from '../components/ProjectCard'

// ─── Text renderers ───────────────────────────────────────────────────

const renderText = (text: string) =>
  text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
  )

const renderAccentBold = (text: string) =>
  text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-bold text-accent">{part}</strong>
      : part
  )

// ─── Layout helpers ───────────────────────────────────────────────────

const Eyebrow = ({ label }: { label: string }) => (
  <p className="font-mono text-sm font-bold uppercase text-accent mb-4">
    {label}
  </p>
)

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-ui text-h3 font-bold tracking-tight text-default-accent leading-tight mb-5">
    {children}
  </h2>
)

const Divider = () => <div className="my-20" />

const ImageSlot = ({ height = 380, label = 'Image' }: { height?: number; label?: string }) => (
  <div
    className="bg-accent-soft border border-[#C49EFB] rounded-avatar flex items-center justify-center"
    style={{ height }}
  >
    <span className="font-ui text-sm font-semibold tracking-[0.12em] uppercase text-accent opacity-45">
      [ {label} ]
    </span>
  </div>
)

// ─── Metric stat block ────────────────────────────────────────────────

const MetricBlock = ({ value, label }: Metric) => (
  <div className="px-5 py-7 bg-surface rounded-avatar text-center shadow-card">
    <p className="font-ui text-[36px] font-bold tracking-[-0.04em] text-accent leading-none mb-[10px]">
      {value}
    </p>
    <p className="font-ui text-sm font-medium text-default-subtle leading-[1.45]">
      {label}
    </p>
  </div>
)

// ─── Process phase ────────────────────────────────────────────────────

const PhaseItem = ({ phase, index }: { phase: ProcessPhase; index: number }) => (
  <div className="flex gap-8">
    <span className="font-ui text-sm font-bold text-accent shrink-0 pt-[3px] min-w-[28px]">
      0{index + 1}
    </span>
    <div className="flex-1">
      <h3 className="font-ui text-h4 font-bold text-default-accent tracking-snug leading-tight mb-3">
        {phase.title}
      </h3>
      <p className={`text-md text-default-subtle leading-relaxed ${phase.bullets.length > 0 ? 'mb-4' : ''}`}>
        {phase.summary}
      </p>
      {phase.bullets.length > 0 && (
        <>
          {phase.bulletsLabel && (
            <p className="font-mono text-[12px] font-bold uppercase text-default-subtle mb-[10px]">
              {phase.bulletsLabel}
            </p>
          )}
          <ul className="pl-[18px] flex flex-col gap-[6px] m-0">
            {phase.bullets.map((b, i) => (
              <li key={i} className="text-md text-default-subtle leading-[1.65]">{b}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  </div>
)

// ─── Bullet list item ─────────────────────────────────────────────────

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-4 items-start list-none">
    <span className="text-accent font-bold shrink-0 pt-px leading-relaxed font-ui text-md">—</span>
    <span className="text-md text-default-subtle leading-relaxed">{children}</span>
  </li>
)

// ─── Quick overview callout ───────────────────────────────────────────

const EMAIL = 'mrlrcxn@gmail.com'

const QuickOverviewCallout = ({ text }: { text: string }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="rounded-avatar px-8 py-7 flex items-center justify-between gap-8 flex-wrap"
      style={{ background: 'var(--coal-9)', color: 'var(--text-ondark-accent)' }}
    >
      <div className="flex-1 min-w-0">
        <p
          className="font-mono text-[12px] font-bold uppercase mb-[10px]"
          style={{ color: 'var(--text-ondark-minimal)' }}
        >
          Quick overview
        </p>
        <p className="text-md leading-relaxed">
          {text}
        </p>
      </div>

      <button
        onClick={handleCopy}
        className={`shrink-0 inline-flex items-center gap-2 px-5 py-[10px] border border-white/25 rounded-pill font-ui text-sm font-semibold tracking-label cursor-pointer transition-[background-color] duration-200 whitespace-nowrap hover:bg-white/10 ${copied ? 'bg-white/15' : 'bg-transparent'}`}
      >
        {copied ? (
          <>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8.5 1H2.5A1.5 1.5 0 0 0 1 2.5v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            Contact me
          </>
        )}
      </button>
    </div>
  )
}

// ─── Constraints list ─────────────────────────────────────────────────

const ConstraintsList = ({ objectives, label = 'Constraints' }: {
  objectives: { title: string; body: string }[]
  label?: string
}) => (
  <div className="mt-9">
    <p className="font-mono text-[12px] font-bold uppercase text-default-subtle mb-5">
      {label}
    </p>
    <div className="flex flex-col gap-5">
      {objectives.map((obj, i) => (
        <div key={i} className="flex items-start gap-4">
          <span className="font-ui text-sm font-bold text-accent shrink-0 pt-[2px] min-w-[28px]">
            0{i + 1}
          </span>
          <div>
            <p className={`font-ui text-md font-semibold text-default-accent leading-[1.4] ${obj.body ? 'mb-[5px]' : ''}`}>
              {obj.title}
            </p>
            {obj.body && (
              <p className="text-md text-default-subtle leading-[1.7]">{obj.body}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Cover image with scroll zoom-out ────────────────────────────────

const CoverImage = ({ src, alt, bg = '#09091D' }: { src: string; alt: string; bg?: string }) => {
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const handleScroll = () => {
      const progress = Math.min(1, window.scrollY / 320)
      img.style.transform = `scale(${1.06 - progress * 0.06})`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="rounded-avatar overflow-hidden" style={{ background: bg }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-auto block scale-[1.06] origin-top transition-transform duration-[150ms] ease-out"
      />
    </div>
  )
}

// ─── Phone frame ─────────────────────────────────────────────────────

const PhoneFrame = ({ src, alt }: { src: string; alt: string }) => (
  <div
    className="bg-[#111] rounded-[44px] p-2 w-full"
    style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.22)' }}
  >
    <div className="rounded-[38px] overflow-hidden bg-black">
      <img src={src} alt={alt} className="w-full h-auto block" />
    </div>
  </div>
)

// ─── Video that plays on scroll into view ────────────────────────────

const VideoOnScroll = ({ src, cover = false }: { src: string; cover?: boolean }) => {
  const ref = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) video.play() },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      className={cover
        ? 'w-full h-auto block scale-110 origin-center'
        : 'w-full h-auto rounded-avatar block border border-border'
      }
    />
  )
}

// ─── Section wrapper with scroll reveal ──────────────────────────────

const Section = ({ children }: { children: React.ReactNode }) => {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref}>{children}</div>
}

// ─── Main component ───────────────────────────────────────────────────

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const heroRef = useScrollReveal<HTMLDivElement>()

  React.useEffect(() => { window.scrollTo(0, 0) }, [slug])

  const project = projects.find((p) => p.slug === slug)
  const otherProjects = projects.filter((p) => p.slug !== slug && !p.wip)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-sm text-default-subtle mb-6">Case study not found.</p>
        <button
          onClick={() => navigate('/')}
          className="text-[12px] font-semibold text-accent cursor-pointer bg-transparent border-none"
        >
          ← Back to work
        </button>
      </div>
    )
  }

  const overviewText = project.companyDescription || project.overview

  const metaItems = ([
    { label: 'Role',         value: project.role },
    { label: 'Contribution', value: project.tags?.join(', ') },
    { label: 'Team',         value: project.team },
    { label: 'Timeline',     value: project.duration },
  ] as { label: string; value?: string }[]).filter(item => item.value)

  return (
    <div className="min-h-screen">
      <div
        className="w-full px-4 md:px-10"
        style={{ maxWidth: 900, margin: '0 auto', paddingTop: 120, paddingBottom: 100 }}
      >

        {/* ── Back ── */}
        <button
          onClick={() => navigate('/')}
          className="font-ui text-sm font-semibold tracking-tag uppercase text-default-subtle cursor-pointer inline-flex items-center gap-2 mb-12 bg-transparent border-none transition-colors duration-200 hover:text-accent"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M3 7L7 3M3 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All projects
        </button>

        {/* Hero */}
        <div ref={heroRef}>

          <div className="reveal mb-4" style={{ transitionDelay: '0s' }}>
            <span className="font-mono text-sm font-normal text-default-subtle">
              {project.category} · {project.company} · {project.year}
            </span>
          </div>

          <h1
            className="reveal text-default-accent font-bold leading-[1.05] mb-5 tracking-[-0.04em]"
            style={{ fontSize: 'clamp(32px, 5.5vw, 60px)', transitionDelay: '0.04s' }}
          >
            {project.title}
          </h1>

          {project.companyUrl && (
            <div className="reveal mb-10" style={{ transitionDelay: '0.08s' }}>
              <a
                href={project.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-ui text-sm font-semibold tracking-label text-accent no-underline transition-opacity duration-200 hover:opacity-70"
              >
                Company website
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          )}

          {/* Cover image */}
          <div className="reveal mb-10" style={{ transitionDelay: '0.12s' }}>
            {project.coverImage
              ? <CoverImage src={project.coverImage} alt={`${project.title} cover`} bg={project.coverBg} />
              : <ImageSlot height={440} label="Cover image" />
            }
          </div>

          {/* 2-col: overview text + meta */}
          <div
            className="reveal grid grid-cols-1 md:grid-cols-5 gap-x-12 gap-y-8 items-start"
            style={{ transitionDelay: '0.16s' }}
          >
            {overviewText && (
              <div className="col-span-3">
                {project.companyDescription && <Eyebrow label="About the company" />}
                <p className="text-md text-default-subtle leading-[1.8]">
                  {renderText(overviewText)}
                </p>
              </div>
            )}

            {metaItems.length > 0 && (
              <div className="col-span-2 flex flex-col gap-5">
                {metaItems.map(item => (
                  <div key={item.label}>
                    <p className="font-mono text-[12px] font-bold uppercase text-default-subtle mb-1">
                      {item.label}
                    </p>
                    <p className="font-ui text-sm font-medium text-default-accent leading-[1.5]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* ─── Streamlined layout ─── */}
        {project.companyDescription ? (
          <>
            {project.roleDescription && (
              <>
                <Section>
                  <div className="reveal">
                    <Eyebrow label="My role" />
                    <p className="text-md text-default-subtle leading-[1.8] max-w-[680px]">
                      {project.roleDescription}
                    </p>
                  </div>
                </Section>
                <Divider />
              </>
            )}

            <Section>
              <div className="reveal">
                <Eyebrow label="Project & challenges" />
                <p className="text-md text-default-subtle leading-[1.8] mb-6 max-w-[680px]">
                  {project.challenge.intro}
                </p>
                {project.challenge.context && project.challenge.context.split('\n\n').map((para, i, arr) => (
                  <p key={i} className={`text-md text-default-subtle leading-[1.8] max-w-[680px] ${i < arr.length - 1 ? 'mb-5' : ''}`}>
                    {para}
                  </p>
                ))}
              </div>
              {project.challenge.objectives.length > 0 && (
                <div className="reveal">
                  <ConstraintsList objectives={project.challenge.objectives} label="Constraints" />
                </div>
              )}
            </Section>

            <Divider />

            {project.goals && project.goals.length > 0 && (
              <Section>
                <div className="reveal">
                  <Eyebrow label="Goals" />
                  <ul className="p-0 m-0 flex flex-col gap-4">
                    {project.goals.map((goal, i) => (
                      <li key={i} className="flex gap-4 items-start list-none">
                        <span className="w-[26px] h-[26px] rounded-full border-[1.5px] border-accent inline-flex items-center justify-center shrink-0 mt-[1px] font-ui text-[12px] font-bold text-accent">
                          {i + 1}
                        </span>
                        <span className="text-md text-default-subtle leading-relaxed">
                          {goal}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            )}

            <Divider />

            {project.results.impactItems && project.results.impactItems.length > 0 && (
              <>
                <Section>
                  <div className="reveal">
                    <Eyebrow label="Impact" />
                    <ul className="p-0 m-0 flex flex-col gap-[14px]">
                      {project.results.impactItems.map((item, i) => (
                        <BulletItem key={i}>{renderAccentBold(item)}</BulletItem>
                      ))}
                    </ul>
                  </div>
                </Section>
                <Divider />
              </>
            )}

            {project.beforeAfter && (
              <>
                <Divider />
                <Section>
                  <div className="reveal grid grid-cols-2 gap-6 max-w-[560px] mx-auto">
                    {[
                      { src: project.beforeAfter.before, caption: 'Before' },
                      { src: project.beforeAfter.after,  caption: 'After'  },
                    ].map(({ src, caption }) => (
                      <figure key={caption} className="m-0">
                        <PhoneFrame src={src} alt={caption} />
                        <figcaption className="font-mono text-[12px] font-bold uppercase text-default-subtle mt-[14px] text-center">
                          {caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {project.results.reflection && (
              <>
                <Divider />
                <Section>
                  <div className="reveal">
                    <Eyebrow label="Takeaway" />
                    <p className="text-md text-default-subtle leading-[1.8] max-w-[680px]">
                      {project.results.reflection}
                    </p>
                  </div>
                </Section>
              </>
            )}

            {project.prototypeVideo && (
              <>
                <Divider />
                <Section>
                  <div className="reveal">
                    <VideoOnScroll src={project.prototypeVideo} />
                    {project.prototypeVideoCaption && (
                      <p className="font-mono text-[12px] font-bold uppercase text-default-subtle mt-[14px] text-center">
                        {project.prototypeVideoCaption}
                      </p>
                    )}
                  </div>
                </Section>
              </>
            )}
          </>
        ) : (
          <>
            {/* ─── Legacy layout ─── */}
            <Section>
              <div className="reveal">
                <Eyebrow label="The Challenge" />
                <SectionHeading>A product that couldn't scale</SectionHeading>
                <p className="text-md text-default-subtle leading-[1.8] mb-6 max-w-[680px]">
                  {project.challenge.intro}
                </p>
                <p className="text-md text-default-subtle leading-[1.8] max-w-[680px]">
                  {project.challenge.context}
                </p>
              </div>
              {project.challenge.objectives.length > 0 && (
                <div className="reveal">
                  <ConstraintsList objectives={project.challenge.objectives} label="Key constraints" />
                </div>
              )}
            </Section>

            <Divider />

            {project.process.length > 0 && (
              <>
                <Section>
                  <div className="reveal mb-10">
                    <Eyebrow label="Process" />
                  </div>
                  <div className="reveal flex flex-col gap-12">
                    {project.process.map((phase, i) => (
                      <PhaseItem key={i} phase={phase} index={i} />
                    ))}
                  </div>
                </Section>
                <Divider />
              </>
            )}

            {(project.solution.description || project.solution.imageCount > 0) && (
              <>
                <Section>
                  <div className="reveal">
                    <Eyebrow label="Solution" />
                    {project.solution.description && (
                      <p className="text-md text-default-subtle leading-[1.8] max-w-[680px] mb-9">
                        {project.solution.description}
                      </p>
                    )}
                    {(project.solution.beforeItems?.length || project.solution.afterItems?.length) ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        {project.solution.beforeItems?.length ? (
                          <div className="px-7 py-6 bg-surface rounded-avatar shadow-card">
                            <p className="font-mono text-[12px] font-bold uppercase text-default-subtle mb-4">Before</p>
                            <ul className="pl-[18px] flex flex-col gap-2 m-0">
                              {project.solution.beforeItems.map((item, i) => (
                                <li key={i} className="text-md text-default-subtle leading-[1.6]">{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {project.solution.afterItems?.length ? (
                          <div className="px-7 py-6 bg-surface rounded-avatar shadow-card">
                            <p className="font-mono text-[12px] font-bold uppercase text-accent opacity-80 mb-4">After</p>
                            <ul className="pl-[18px] flex flex-col gap-2 m-0">
                              {project.solution.afterItems.map((item, i) => (
                                <li key={i} className="text-md text-default-subtle leading-[1.6]">{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="reveal">
                    {Array.from({ length: project.solution.imageCount }).map((_, i) => (
                      <ImageSlot key={i} height={i === 0 ? 480 : 360} label={`Screen ${i + 1}`} />
                    ))}
                  </div>
                </Section>
                <Divider />
              </>
            )}

            {project.results.metrics && project.results.metrics.length > 0 && (
              <>
                <Section>
                  <div className="reveal mb-7">
                    <Eyebrow label="Outcome" />
                  </div>
                  <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-[10px]">
                    {project.results.metrics.map((m) => <MetricBlock key={m.label} {...m} />)}
                  </div>
                </Section>
                <Divider />
              </>
            )}

            <Section>
              <div className="reveal">
                <Eyebrow label="Reflection" />
                {project.results.reflection ? (
                  <p className="text-md text-default-subtle leading-[1.8] max-w-[680px]">
                    {project.results.reflection}
                  </p>
                ) : project.results.learnings.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {project.results.learnings.map((l, i) => (
                      <div key={i} className="flex items-start gap-[14px]">
                        <span className="w-[6px] h-[6px] rounded-full bg-accent shrink-0 mt-2" />
                        <p className="text-md text-default-subtle leading-[1.7]">{l}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Section>
          </>
        )}

        {/* ─── Next projects ─── */}
        {project.secondaryVideo && (
          <>
            <Divider />
            <Section>
              <div className="reveal">
                <div className="rounded-avatar overflow-hidden border border-border">
                  <VideoOnScroll src={project.secondaryVideo} cover />
                </div>
                {project.secondaryVideoCaption && (
                  <p className="font-mono text-[12px] font-bold uppercase text-default-subtle mt-[14px] text-center">
                    {project.secondaryVideoCaption}
                  </p>
                )}
              </div>
            </Section>
          </>
        )}

        {project.quickOverview && (
          <>
            <Divider />
            <Section>
              <div className="reveal">
                <QuickOverviewCallout text={project.quickOverview} />
              </div>
            </Section>
          </>
        )}

        {otherProjects.length > 0 && (
          <>
            <Divider />
            <Section>
              <div className="reveal mb-7">
                <Eyebrow label="Next projects" />
              </div>
              <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherProjects.map(p => (
                  <ProjectCard key={p.slug} project={p} variant="compact" />
                ))}
              </div>
            </Section>
          </>
        )}

        {/* ── Bottom nav ── */}
        <div className="border-t border-border pt-8 mt-20 flex justify-between items-center">
          <button
            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 80) }}
            className="font-ui text-sm font-semibold tracking-tag uppercase text-default-subtle cursor-pointer inline-flex items-center gap-2 bg-transparent border-none transition-colors duration-200 hover:text-accent"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M3 7L7 3M3 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All projects
          </button>

          <span className="font-ui text-sm font-medium text-default-subtle tracking-label">
            {project.category} · {project.year}
          </span>
        </div>

      </div>
    </div>
  )
}

export default CaseStudy
