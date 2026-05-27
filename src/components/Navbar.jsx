import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Technology',   href: '#technology' },
  { label: 'Applications', href: '#applications' },
  { label: 'Vision',       href: '#vision' },
  { label: 'Investors',    href: '#investors' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
              <circle cx="10" cy="7"  r="3.5" fill="white" opacity="0.9"/>
              <path d="M3 18c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-white text-sm font-semibold tracking-tight">
            Emovox<span className="text-violet-400">AI</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
              className="text-xs text-gray-500 hover:text-white transition-colors duration-200 tracking-wide">
              {l.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-5">
          <a href="#contact"
            className="text-xs text-gray-500 hover:text-white transition-colors">
            Contact
          </a>
          <a href="#demo"
            className="text-xs font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Request Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white p-1"
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          <svg viewBox="0 0 20 14" fill="none" className="w-5 h-4">
            <motion.line x1="0" y1="1"  x2="20" y2="1"  stroke="currentColor" strokeWidth="1.5"
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} style={{ transformOrigin: '10px 1px' }}/>
            <motion.line x1="0" y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="1.5"
              animate={{ opacity: open ? 0 : 1 }}/>
            <motion.line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5"
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} style={{ transformOrigin: '10px 13px' }}/>
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/95 border-b border-white/5"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="text-sm text-gray-400 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="#demo" onClick={() => setOpen(false)}
                className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full text-center mt-1">
                Request Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
