import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function CTA() {
  const [email, setEmail]   = useState('')
  const [done, setDone]     = useState(false)

  return (
    <section id="contact" className="bg-black py-36 px-8">
      <hr className="rule max-w-7xl mx-auto mb-36" />

      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="label mb-8">Join the Future</motion.p>

        <motion.h2 {...fadeUp(0.08)} className="headline text-white mb-6 max-w-3xl">
          Build the future of
          <br />
          <span className="text-gradient">human-centred AI.</span>
        </motion.h2>

        <motion.p {...fadeUp(0.16)}
          className="text-gray-500 text-lg max-w-xl mb-16 leading-relaxed">
          Whether you're a robotics company, an investor, or a researcher —
          join us in building the emotional intelligence layer that defines the next era.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-4 mb-16">
          <a href="#demo"
            className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors">
            Get Early Access
          </a>
          <a href="#investors"
            className="px-8 py-3.5 rounded-full border border-white/15 text-white text-sm hover:border-white/30 transition-colors">
            Schedule Investor Call
          </a>
          <a href="mailto:hello@emovoxai.com"
            className="px-8 py-3.5 rounded-full border border-white/15 text-white text-sm hover:border-white/30 transition-colors">
            Contact Us
          </a>
        </motion.div>

        {/* Email form */}
        <motion.div {...fadeUp(0.3)} className="max-w-md">
          {done ? (
            <div className="border border-white/8 rounded-xl p-6">
              <div className="text-white font-medium mb-1">You're on the list.</div>
              <div className="text-gray-600 text-sm">We'll reach out as we onboard early partners.</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }}
              className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Work email"
                required
                className="flex-1 bg-transparent border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-white/25 transition-colors"
              />
              <button type="submit"
                className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors shrink-0">
                Join Waitlist
              </button>
            </form>
          )}
        </motion.div>

        {/* Robotics companies */}
        <motion.div {...fadeUp(0.38)} className="mt-24">
          <p className="label text-[10px] mb-8">In conversation with</p>
          <div className="flex flex-wrap gap-10 items-center opacity-20">
            {['Figure AI', 'Agility Robotics', 'Boston Dynamics', 'Unitree', 'Apptronik', 'Sanctuary AI'].map(n => (
              <span key={n} className="text-sm font-semibold text-white tracking-wide">{n}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
