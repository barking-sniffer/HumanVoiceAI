import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12 px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3">
              <circle cx="10" cy="7" r="3.5" fill="white" opacity="0.9"/>
              <path d="M3 18c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-white text-xs font-semibold">Emovox<span className="text-violet-400">AI</span></span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6">
          {['Technology', 'Applications', 'Vision', 'Investors', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors">{l}</a>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-xs text-gray-800">
          © 2025 EmovoxAI ·{' '}
          <span className="text-gradient font-medium text-xs">Humanizing Machines.</span>
        </p>
      </div>
    </footer>
  )
}
