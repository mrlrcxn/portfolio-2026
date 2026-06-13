import { useState, useEffect, useCallback } from 'react'

const FULL_TEXT     = 'Hey there!'
const TYPING_SPEED  = 72
const PAUSE_AFTER   = 900
const EXIT_DURATION = 420

interface IntroProps {
  onComplete: () => void
}

const Intro = ({ onComplete }: IntroProps) => {
  const [charCount, setCharCount]   = useState(0)
  const [phase, setPhase]           = useState<'typing' | 'pause' | 'exit'>('typing')
  const [cursorOn, setCursorOn]     = useState(true)

  const triggerExit = useCallback(() => {
    setPhase(p => p !== 'exit' ? 'exit' : p)
  }, [])

  useEffect(() => {
    if (phase !== 'typing') return
    if (charCount >= FULL_TEXT.length) { setPhase('pause'); return }
    const t = setTimeout(() => setCharCount(c => c + 1), TYPING_SPEED)
    return () => clearTimeout(t)
  }, [charCount, phase])

  useEffect(() => {
    if (phase !== 'pause') return
    const t = setTimeout(triggerExit, PAUSE_AFTER)
    return () => clearTimeout(t)
  }, [phase, triggerExit])

  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(onComplete, EXIT_DURATION)
    return () => clearTimeout(t)
  }, [phase, onComplete])

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 480)
    return () => clearInterval(t)
  }, [])

  const isExiting  = phase === 'exit'
  const doneTyping = charCount >= FULL_TEXT.length

  return (
    <div
      onClick={triggerExit}
      className="fixed inset-0 z-nav flex items-center justify-center bg-bg cursor-pointer select-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(28, 26, 23, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(28, 26, 23, 0.055) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        opacity: isExiting ? 0 : 1,
        transition: `opacity ${EXIT_DURATION}ms ease`,
      }}
    >
      {/* ── Speech bubble ── */}
      <div
        className="relative bg-surface border-[2.5px] border-text rounded-card px-[38px] py-[22px]"
        style={{
          boxShadow: '4px 4px 0 var(--color-text)',
          transform: isExiting ? 'scale(0.8)' : 'scale(1)',
          opacity: isExiting ? 0 : 1,
          transition: `transform ${EXIT_DURATION}ms cubic-bezier(0.4,0,0.2,1), opacity ${EXIT_DURATION}ms ease`,
          animation: 'bubbleIn 0.38s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        <p
          className="font-bold text-default-accent tracking-tight leading-none whitespace-nowrap m-0"
          style={{ fontSize: 'clamp(32px, 4.5vw, 48px)' }}
        >
          {FULL_TEXT.slice(0, charCount)}
          {/* Blinking cursor */}
          <span
            className="inline-block w-[3px] bg-accent ml-[3px] align-middle rounded-[1px]"
            style={{
              height: '0.85em',
              opacity: doneTyping ? (cursorOn ? 1 : 0) : 1,
              transition: 'opacity 0.08s',
            }}
          />
        </p>

        {/* Bubble tail — outer */}
        <div className="absolute" style={{
          bottom: -18, left: 38,
          width: 0, height: 0,
          borderLeft:  '11px solid transparent',
          borderRight: '11px solid transparent',
          borderTop:   '18px solid var(--color-text)',
        }} />
        {/* Bubble tail — inner */}
        <div className="absolute" style={{
          bottom: -13, left: 40,
          width: 0, height: 0,
          borderLeft:  '9px solid transparent',
          borderRight: '9px solid transparent',
          borderTop:   '13px solid var(--color-surface)',
        }} />
      </div>

      {/* Skip hint */}
      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-default-disabled tracking-[0.14em] uppercase font-medium whitespace-nowrap">
        Click to skip
      </span>
    </div>
  )
}

export default Intro
