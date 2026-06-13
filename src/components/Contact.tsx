import { useState } from 'react'
import { Copy } from 'lucide-react'

const EMAIL    = 'm.alarconarbona@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/maralarcon/'
const BEHANCE  = 'https://www.behance.net/mrlrcxn'

const Contact = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <section
      id="contact"
      className="w-full overflow-hidden flex flex-col"
      style={{
        background:   'var(--coal-9)',
        borderRadius: '20px 20px 0 0',
        color:        'var(--text-ondark-accent)',
      }}
    >

      {/* ── Main content ── */}
      <div className="flex flex-col px-10 md:px-16 pt-16 pb-14 gap-8 flex-1">

        {/* Availability tag */}
        <div className="flex items-center gap-[10px]">
          <span className="status-dot" />
          <span className="font-mono text-[12px] font-bold uppercase text-available">
            Open to new opportunities
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-ui font-bold tracking-tight leading-[1.05] m-0"
          style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', maxWidth: '14ch' }}
        >
          Let's make something worth using.
        </h2>

        {/* Subtitle */}
        <p
          className="font-body text-md leading-relaxed"
          style={{ color: 'var(--text-ondark-minimal)', maxWidth: '44ch' }}
        >
          I'm always open to new challenges and innovative projects. If you have an idea, let's talk.
        </p>

        {/* CTA */}
        <div>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 font-ui text-sm font-semibold tracking-label uppercase rounded-pill px-7 py-[13px] border transition-all duration-200 cursor-pointer"
            style={copied ? {
              background:  'rgba(34,197,94,0.15)',
              borderColor: '#22c55e',
              color:       '#22c55e',
            } : {
              background:  'transparent',
              borderColor: 'rgba(246,245,244,0.25)',
              color:       'var(--text-ondark-accent)',
            }}
          >
            {!copied && <Copy size={14} />}
            {copied ? 'Email copied ✓' : 'Copy my email'}
          </button>
        </div>

      </div>

      {/* ── Footer bar ── */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 px-10 md:px-16 py-5"
        style={{ borderTop: '1px solid rgba(246,245,244,0.08)' }}
      >
        <span
          className="font-ui text-sm font-medium tracking-wide"
          style={{ color: 'var(--text-ondark-minimal)' }}
        >
          © {new Date().getFullYear()} Mar Alarcón · Product Designer
        </span>

        <nav className="flex items-center gap-6">
          {[
            { label: 'LinkedIn', href: LINKEDIN },
            { label: 'Behance',  href: BEHANCE  },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: 'var(--text-ondark-medium)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-ondark-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-ondark-medium)')}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

    </section>
  )
}

export default Contact
