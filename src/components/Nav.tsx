import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.svg'

const NAV_ITEMS = [
  { label: 'Work',    id: 'work'    },
  { label: 'About',   id: 'about'   },
  { label: 'Contact', id: 'contact' },
]

const Nav = () => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const navRef    = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let lastScrollY = 0

    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY && currentY > 80 && window.innerWidth >= 640) {
        nav.classList.add('nav-hidden')
      } else {
        nav.classList.remove('nav-hidden')
      }
      nav.classList.toggle('nav-scrolled', currentY > 20)
      lastScrollY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change or scroll
  useEffect(() => { setOpen(false) }, [location.pathname])

  const scrollTo = (id: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 z-nav h-nav backdrop-blur-[24px] border-b border-white/35"
        style={{
          background: 'rgba(246, 245, 244, 0.55)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease',
        }}
      >
        {/* Logo + wordmark */}
        <button
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
        >
          <img src={logo} alt="MA logo" className="h-6 w-auto block" />
          <span className="font-bold text-default-accent text-md tracking-snug">
            Mar Alarcón
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-md font-normal text-default-subtle tracking-label uppercase transition-colors duration-200 hover:text-accent"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden flex items-center justify-center text-default-accent hover:text-accent transition-colors duration-200"
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="sm:hidden fixed left-0 right-0 z-[199] flex flex-col overflow-hidden"
        style={{
          top: 'var(--spacing-nav, 60px)',
          background: 'rgba(246, 245, 244, 0.97)',
          backdropFilter: 'blur(24px)',
          borderBottom: open ? '1px solid rgba(28,26,23,0.1)' : 'none',
          maxHeight: open ? '240px' : '0px',
          transition: 'max-height 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {NAV_ITEMS.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="w-full text-left px-8 py-5 font-mono text-sm font-bold uppercase tracking-[2px] text-default-subtle hover:text-accent transition-colors duration-200 border-b border-border last:border-b-0"
          >
            {label}
          </button>
        ))}
      </div>
    </>
  )
}

export default Nav
