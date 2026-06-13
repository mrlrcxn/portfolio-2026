import { useState, useEffect, useRef } from 'react'
import simpleStarImg from '../assets/simple_star.png'

type Corner = 'tl' | 'tr' | 'bl' | 'br'
type Inset  = { top: number; right: number; bottom: number; left: number }

const INITIAL: Inset = { top: -10, right: -16, bottom: -10, left: -16 }
const HIT_PAD = 10

const CORNERS: {
  corner:     Corner
  pos:        React.CSSProperties
  hintAnim:   string
  entryDelay: string
}[] = [
  { corner: 'tl', pos: { top: -5,    left:  -5 }, hintAnim: 'hintNudgeTL', entryDelay: '0.65' },
  { corner: 'tr', pos: { top: -5,    right: -5 }, hintAnim: 'hintNudgeTR', entryDelay: '0.78' },
  { corner: 'bl', pos: { bottom: -5, left:  -5 }, hintAnim: 'hintNudgeBL', entryDelay: '0.91' },
  { corner: 'br', pos: { bottom: -5, right: -5 }, hintAnim: 'hintNudgeBR', entryDelay: '1.04' },
]

// Shift position outward by HIT_PAD so the wrapper centres on the same anchor
function padPos(pos: React.CSSProperties): React.CSSProperties {
  const result: React.CSSProperties = {}
  for (const [k, v] of Object.entries(pos)) {
    result[k as keyof React.CSSProperties] = (v as number) - HIT_PAD
  }
  return result
}

const Hero = () => {
  const [inset, setInset]     = useState<Inset>(INITIAL)
  const [dragging, setDragging] = useState(false)

  const drag = useRef<{
    corner:     Corner
    startMouse: { x: number; y: number }
    startInset: Inset
  } | null>(null)

  const starRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (starRef.current) {
        starRef.current.style.transform = `rotate(${window.scrollY * 0.2}deg)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const startDrag = (corner: Corner, e: React.MouseEvent) => {
    e.preventDefault()
    drag.current = {
      corner,
      startMouse: { x: e.clientX, y: e.clientY },
      startInset: { ...inset },
    }
    setDragging(true)
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current) return
      const { corner, startMouse, startInset } = drag.current
      const dx = e.clientX - startMouse.x
      const dy = e.clientY - startMouse.y
      setInset({
        top:    (corner === 'tl' || corner === 'tr') ? startInset.top    + dy : startInset.top,
        bottom: (corner === 'bl' || corner === 'br') ? startInset.bottom - dy : startInset.bottom,
        left:   (corner === 'tl' || corner === 'bl') ? startInset.left   + dx : startInset.left,
        right:  (corner === 'tr' || corner === 'br') ? startInset.right  - dx : startInset.right,
      })
    }
    const onUp = () => { drag.current = null; setDragging(false) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-[60px]"
      style={{ cursor: dragging ? 'grabbing' : 'default' }}
    >
      <div className="grain-overlay" />

      {/* ── Eyebrow ── */}
      <p className="hero-eyebrow font-mono text-sm font-bold uppercase text-default-accent text-center mb-6 relative z-10 tracking-[2px]">
        Product Design &amp; Strategy
      </p>

      {/* ── Name block + draggable selection frame ── */}
      <div
        className="relative text-center select-none z-[5] px-2"
        style={{ lineHeight: 0.82 }}
      >
        {/* Figma-style selection frame */}
        <div
          className="absolute pointer-events-none z-30 border border-[#8938F8]"
          style={{
            top:    inset.top,
            right:  inset.right,
            bottom: inset.bottom,
            left:   inset.left,
            animation: 'fadeIn 0.5s ease 0.45s both',
          }}
        >
          {CORNERS.map(({ corner, pos, hintAnim, entryDelay }) => (
            /* Transparent hit area — larger than the visible square */
            <div
              key={corner}
              className="absolute"
              style={{
                ...padPos(pos),
                padding:       HIT_PAD,
                pointerEvents: 'auto',
                cursor:        dragging ? 'grabbing' : 'pointer',
                // bubbleIn entry + hint nudge (plays twice, starts after all handles are in)
                animation: `bubbleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) ${entryDelay}s both,
                            ${hintAnim} 0.55s ease-in-out 1.8s 2`,
              }}
              onMouseDown={e => startDrag(corner, e)}
            >
              {/* Visible 9 × 9 square */}
              <div className="w-3 h-3 bg-accent-soft border border-[#8938F8]" />
            </div>
          ))}
        </div>

        {/* Line 1 */}
        <div
          className="hero-line-1 block font-bold text-accent tracking-snug"
          style={{ fontSize: 'clamp(72px, 17vw, 240px)' }}
        >
          MAR
        </div>

        {/* Line 2 */}
        <div
          className="hero-line-2 block font-bold text-accent tracking-snug"
          style={{ fontSize: 'clamp(72px, 17vw, 240px)' }}
        >
          ALARCÓN
        </div>
      </div>

      {/* ── Chip: Product Designer — floating ── */}
      <div
        className="absolute bottom-[18%] left-[6%] flex items-center gap-[9px] bg-accent-soft text-accent rounded-pill py-[10px] pl-3 pr-4 font-mono text-[12px] font-normal uppercase whitespace-nowrap z-10 shadow-accent-sm"
        style={{
          border: '1px solid rgba(82, 3, 196, 0.18)',
          animation: 'fadeIn 0.55s ease 0.82s both, floatLeft 4s ease-in-out 1.5s infinite',
        }}
      >
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
          <rect x="1" y="4.5" width="12" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M4.5 4.5V3C4.5 2.17 5.17 1.5 6 1.5H8C8.83 1.5 9.5 2.17 9.5 3V4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M1 8.5H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        Product Designer
      </div>

      {/* ── Chip: Location — floating ── */}
      <div
        className="absolute top-[34%] right-[6%] flex items-center gap-2 bg-accent text-white rounded-pill py-[10px] pl-[14px] pr-[18px] font-mono text-[12px] font-normal uppercase whitespace-nowrap z-10 shadow-accent-md"
        style={{
          animation: 'fadeIn 0.55s ease 0.82s both, floatRight 3.5s ease-in-out 1.9s infinite',
        }}
      >
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
          <path d="M5.5 1C3.01 1 1 3.01 1 5.5C1 8.75 5.5 13 5.5 13C5.5 13 10 8.75 10 5.5C10 3.01 7.99 1 5.5 1Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="5.5" cy="5.5" r="1.5" stroke="white" strokeWidth="1.4"/>
        </svg>
        Valencia, ES
      </div>

      {/* ── Subtitle block ── */}
      <div className="hero-sub flex flex-col items-center gap-3 mt-11 relative z-10 text-center">
        <img ref={starRef} src={simpleStarImg} alt="" aria-hidden className="w-5 h-5 opacity-60 block" />
        <p className="text-h3 font-normal text-default-accent leading-[1.4] max-w-[480px]">
          Connecting human behaviour, business goals and technical constraints
          to build experiences that scale.
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div
          className="w-[3px] h-10 relative overflow-hidden rounded-[2px]"
          style={{ background: '#CFCFCF' }}
        >
          <div className="absolute top-0 left-0 w-full h-[13px] bg-accent rounded-[2px] animate-[scrollLine_1.4s_cubic-bezier(0.45,0,0.55,1)_infinite_alternate]" />
        </div>
        <span className="font-mono text-sm font-normal uppercase text-default-subtle tracking-[2px]">
          Scroll
        </span>
      </div>

    </section>
  )
}

export default Hero
