import { useEffect, useRef } from 'react'

const GlowBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let scrollY = window.scrollY
    let targetScrollY = scrollY

    let glowX = mouseX
    let glowY = mouseY
    let glowScroll = scrollY
    let raf: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onScroll = () => {
      targetScrollY = window.scrollY
    }

    const animate = () => {
      glowX = lerp(glowX, mouseX, 0.004)
      glowY = lerp(glowY, mouseY, 0.004)
      glowScroll = lerp(glowScroll, targetScrollY, 0.004)

      if (glowRef.current) {
        const x = glowX - 450
        const y = glowY - 300 - glowScroll * 0.08
        glowRef.current.style.transform = `translate(${x}px, ${y}px)`
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      <div
        ref={glowRef}
        className="w-[900px] h-[600px] rounded-full absolute top-0 left-0 will-change-transform opacity-25"
        style={{
          background: 'conic-gradient(from 200deg at 50% 50%, #F4EAFF 0%, #A468FA 42%, #C49EFB 100%)',
          filter: 'blur(110px)',
        }}
      />
    </div>
  )
}

export default GlowBackground
