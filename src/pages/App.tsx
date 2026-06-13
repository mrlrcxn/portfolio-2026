import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import { ToolsMarquee, AboutSection } from '../components/About'
import Contact from '../components/Contact'
import CaseStudy from './CaseStudy'
import GlowBackground from '../components/GlowBackground'
import Intro from '../components/Intro'

// ─── Main page ────────────────────────────────────────────────────────
const MainPage = () => (
  <>
    <Hero />
    <ToolsMarquee />

    <div
      className="flex flex-col w-full px-4 md:px-10"
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        paddingTop: 48,
        paddingBottom: 80,
        gap: 80,
      }}
    >
      {/* 1 · Selected Work */}
      <Projects />

      {/* 2 · About */}
      <AboutSection />
    </div>
  </>
)

// ─── App ──────────────────────────────────────────────────────────────
const App = () => {
  const [ready, setReady] = useState(false)

  if (!ready) return <Intro onComplete={() => setReady(true)} />

  return (
    <div className="min-h-screen">
      <GlowBackground />
      <Nav />
      <div className="relative z-[3]">
        <Routes>
          <Route path="/"           element={<MainPage />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
        <Contact />
      </div>
    </div>
  )
}

export default App
