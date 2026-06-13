import { useEffect, useRef } from 'react'

// Attaches an IntersectionObserver to the returned ref.
// When the element enters the viewport, '.visible' is added to it
// (and all its children with class 'reveal'), then the observer disconnects.
export function useScrollReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal the container itself if it has the class
          container.classList.add('visible')
          // Also reveal any direct reveal children (lets parent control stagger via style)
          container.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
            el.classList.add('visible')
          })
          observer.unobserve(container)
        }
      },
      { threshold: 0.08, ...options }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return ref
}
