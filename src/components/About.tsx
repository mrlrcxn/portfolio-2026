import { useState, type ReactNode } from 'react'
import { Brain, Compass, FlaskConical, Repeat, ChevronDown, Copy, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import avatarImg from '../assets/avatar.png'
import astheriscSvg from '../assets/astherisc.svg'

// ─── Data ─────────────────────────────────────────────────────────────

const EMAIL    = 'm.alarconarbona@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/maralarcon/'

const approach = [
  {
    title: 'Understand first',
    body: "I start with the problem, not the solution. Interviews, data and stakeholder alignment to make sure we're solving the right thing before any design work begins.",
  },
  {
    title: 'Explore before committing',
    body: 'I explore multiple directions in low fidelity before committing to one. Sketches, flows and quick concepts to challenge assumptions before investing in detail.',
  },
  {
    title: 'Validate, then refine',
    body: 'High-fidelity prototypes, usability testing, A/B experiments. I document decisions and the reasoning behind them so handoff is actually useful.',
  },
  {
    title: 'Ship. Then keep going.',
    body: 'Shipping is the beginning of the feedback loop, not the end. I track metrics after launch and treat them as the brief for the next iteration.',
  },
]

const faqs = [
  {
    q: 'How do you handle feedback?',
    a: "Knowing how to interpret feedback and ask the right questions to turn it into something useful is the foundation of good design. Every piece of feedback has value, as long as you understand what's behind it. I defend decisions based on data, user insights and validated hypotheses, not on whether the design looks good.",
  },
  {
    q: 'How do you collaborate with product, developers and stakeholders?',
    a: "I try to involve developers and PMs from the earliest stages, not just at handoff. Shared context early means fewer surprises later. I also have frontend knowledge, which helps me understand technical constraints before they become blockers and communicate in a language that makes collaboration smoother.",
  },
  {
    q: 'How do you balance user needs with business goals?',
    a: "Users are at the center of any business. Without them, your product won't go far. But a good solution always has to work for both sides, and sometimes that means making trade-offs. I'm comfortable having those conversations, as long as the core outcome for the user is still respected.",
  },
  {
    q: 'How do you handle tight deadlines or shifting priorities?',
    a: "The key is having enough context to identify the critical problem and never lose sight of it when re-prioritizing. I think in iterations: not everything needs to be perfect on day one, but it does need to be functional and solve what it was meant to solve.",
  },
]

const tools = [
  'Figma', 'Amplitude', 'Hotjar', 'Framer', 'Lovable',
  'HTML & CSS', 'React', 'Adobe Suite', 'Notion', 'Jira',
  'Slack', 'Claude', 'OpenAI',
]
const marqueeItems = [...tools, ...tools]

const approachIcons = [Brain, Compass, FlaskConical, Repeat]

// ─── Sub-components ───────────────────────────────────────────────────

const DataRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex gap-5 py-[13px] items-start">
    <span className="font-mono text-[11px] font-normal uppercase text-default-subtle shrink-0 w-[84px] pt-[3px] leading-none">
      {label}
    </span>
    <div className="flex-1 text-sm text-default-accent leading-[1.65] min-w-0">
      {children}
    </div>
  </div>
)

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-sm font-bold text-default-accent uppercase">
    {children}
  </p>
)

const FaqItem = ({ q, a, isOpen, onToggle, delay }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void; delay: string
}) => (
  <div
    className="reveal border-b border-border last:border-b-0"
    style={{ transitionDelay: delay }}
  >
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center px-6 py-5 bg-transparent border-none cursor-pointer text-left gap-4"
    >
      <span className="text-md font-semibold text-default-accent tracking-snug leading-[1.3]">{q}</span>
      <span
        className="text-default-subtle shrink-0 inline-flex transition-transform duration-[350ms]"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <ChevronDown size={16} />
      </span>
    </button>
    <div style={{
      maxHeight: isOpen ? 300 : 0,
      overflow: 'hidden',
      transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <p className="text-md text-default-subtle leading-relaxed px-6 pb-5 w-full">{a}</p>
    </div>
  </div>
)

// ─── Tools marquee ────────────────────────────────────────────────────
export const ToolsMarquee = () => (
  <div className="py-5">
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {marqueeItems.map((name, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-ui text-[24px] font-medium text-default-accent whitespace-nowrap">{name}</span>
            <img
              aria-hidden
              src={astheriscSvg}
              alt=""
              className="mx-9 shrink-0 select-none"
              style={{ width: 20, height: 20 }}
            />
          </span>
        ))}
      </div>
    </div>
  </div>
)

// ─── Unified About section ────────────────────────────────────────────
export const AboutSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copied, setCopied]   = useState(false)

  const headerRef   = useScrollReveal<HTMLDivElement>()
  const cardRef     = useScrollReveal<HTMLDivElement>()
  const expRef      = useScrollReveal<HTMLDivElement>()
  const approachRef = useScrollReveal<HTMLDivElement>()
  const faqRef      = useScrollReveal<HTMLDivElement>()

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="about" className="flex flex-col gap-16">

      {/* ── Title + bio ── */}
      <div ref={headerRef}>
        <h2 className="reveal section-title mb-7">
          <span className="text-accent">[</span> About me <span className="text-accent">]</span>
        </h2>
        <p className="reveal text-md text-default-subtle leading-[1.8]" style={{ transitionDelay: '0.08s' }}>
          What I love about design is simple: it helps real people do <em>real things</em>.
          I approach product design from a systems perspective, connecting user needs, business
          goals and technical constraints to build experiences that are both intuitive and scalable.
          Whether it's building something from scratch or improving what already exists, for me,
          users are always at the core. I'd rather be wrong fast than fall in love with the wrong
          solution. That means getting things in front of users early, making decisions based on
          what we know rather than what we want, and being direct about trade-offs, even when
          it's uncomfortable.
        </p>
      </div>

      {/* ── Card: image + data ── */}
      <div
        ref={cardRef}
        className="reveal border border-border rounded-card overflow-hidden shadow-card"
        style={{ transitionDelay: '0.06s' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">

          {/* Left: photo — fixed height on mobile, matches data column height from sm up */}
          <div className="relative h-52 sm:h-auto">
            <img
              src={avatarImg}
              alt="Mar Alarcón"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* Right: data — separated by left border from sm up */}
          <div className="bg-surface sm:border-l sm:border-border px-6 py-2 divide-y divide-border">
            <DataRow label="Based in:">Spain</DataRow>
            <DataRow label="Education:">Fine Arts · Graphic Design · UX / UI &amp; Frontend</DataRow>
            <DataRow label="Skills:">Product Design, Web Design, User Research, Design Systems</DataRow>
            <DataRow label="Softwares:">Figma, Adobe Creative Suite, Amplitude, Hotjar, Notion, Visual Studio Code</DataRow>
            <DataRow label="Contact:">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-[6px] text-accent font-medium hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none p-0 font-ui text-sm"
                >
                  {copied ? 'Copied ✓' : 'Copy email'}
                  {!copied && <Copy size={13} />}
                </button>
                <span className="text-border select-none">·</span>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[5px] font-ui text-sm font-medium text-default-subtle hover:text-accent transition-colors duration-200"
                >
                  LinkedIn
                  <ExternalLink size={12} />
                </a>
              </div>
            </DataRow>
          </div>

        </div>
      </div>

      {/* ── Fourvenues secondary text ── */}
      <div ref={expRef}>
        <p className="reveal text-md text-default-subtle leading-[1.8]" style={{ transitionDelay: '0.04s' }}>
          Over the past 3 years I've worked in Fourvenues shaping the product experience for one of
          the leading nightlife management platforms in Europe — from discovery features to complex
          back-office tools used daily by thousands of venues.
        </p>
      </div>

      {/* ── My approach to design ── */}
      <div ref={approachRef} className="flex flex-col gap-10">
        <div>
          <SectionLabel>
            <span className="reveal" style={{ display: 'block' }}>My approach to design</span>
          </SectionLabel>
          <p className="reveal text-md text-default-subtle leading-[1.8] mt-4" style={{ transitionDelay: '0.07s' }}>
            While projects can vary widely in industry and requirements, there are some core
            principles I uphold each time I approach design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-12">
          {approach.map((item, i) => {
            const Icon = approachIcons[i]
            return (
              <div
                key={item.title}
                className="reveal flex flex-col gap-3"
                style={{ transitionDelay: `${0.06 + i * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-accent shrink-0"><Icon size={20} /></span>
                  <p className="font-ui text-md font-bold text-default-accent tracking-snug leading-[1.3] m-0">
                    {item.title}
                  </p>
                </div>
                <p className="text-md text-default-subtle leading-[1.7] m-0">
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Why me? + FAQ ── */}
      <div ref={faqRef} className="flex flex-col gap-6">
        <div>
          <SectionLabel>
            <span className="reveal" style={{ display: 'block' }}>Why me?</span>
          </SectionLabel>
          <p className="reveal text-md text-default-subtle leading-[1.8] mt-4" style={{ transitionDelay: '0.07s' }}>
            If you are still wondering if we would be a good fit to work together, don't hesitate
            to contact me! Anyway, I've also gathered some typical questions so you can know a
            little bit more about working with me:
          </p>
        </div>

        <div className="border border-border rounded-card overflow-hidden bg-surface">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              delay={`${0.04 + i * 0.07}s`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}

// ─── Legacy exports ───────────────────────────────────────────────────
export const AboutLanding    = () => null
export const AboutHowIWork   = () => null
export const AboutFAQ        = () => null
export const AboutExperience = () => null
export const AboutBio        = () => null

export default AboutSection
