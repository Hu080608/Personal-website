import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import { AmbientBackdrop } from './components/background/AmbientBackdrop'
import { CustomCursor } from './components/common/CustomCursor'
import { Loader } from './components/common/Loader'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { useScrollToTop } from './hooks/useScrollToTop'

// Each route is code-split so the initial shell stays light. Three.js and the
// heavier lab modules only download when their route is actually visited.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Lab = lazy(() => import('./pages/Lab'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="route-fallback__mark" />
      <span className="mono-label">正在解码路由…</span>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  useScrollToTop()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="route-view"
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    if (!booted) return undefined
    const timer = window.setTimeout(() => {
      document.documentElement.classList.add('site-ready')
    }, 40)
    return () => clearTimeout(timer)
  }, [booted])

  return (
    <>
      <AmbientBackdrop />
      <CustomCursor />
      {!booted ? <Loader onComplete={() => setBooted(true)} /> : null}
      <a href="#main" className="skip-link">跳到主要内容</a>
      <Navbar />
      <main id="main" className="site-main">
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  )
}
