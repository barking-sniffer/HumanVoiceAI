import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Problem() {
  return (
    <section id="technology" className="relative bg-black py-36 px-8">
      <hr className="rule max-w-7xl mx-auto mb-36" />

      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <motion.p {...fadeUp(0)} className="label mb-8">The Problem</motion.p>

        {/* Statement */}
        <motion.h2 {...fadeUp(0.08)} className="headline text-white mb-6 max-w-3xl">
          Current AI can speak fluently.
          <br />
          <span className="text-gray-600">It still can't feel a thing.</span>
        </motion.h2>

        <motion.p {...fadeUp(0.16)}
          className="text-gray-500 text-lg leading-relaxed max-w-xl mb-24">
          Human communication is 93% non-verbal. Tone, pause, micro-expression, eye
          contact, body language — all of it invisible to today's voice models.
        </motion.p>

        {/* Stat + breakdown */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {[
            { pct: '93%', label: 'Non-verbal signals', sub: 'Emotion, tone, facial expression, body language — all lost.' },
            { pct: '7%',  label: 'Spoken words only', sub: 'What current Voice AI actually understands and responds to.' },
            { pct: '55%', label: 'Facial expression',  sub: 'The single largest channel of meaning in human communication.' },
            { pct: '38%', label: 'Voice tone & pace',  sub: 'Prosody, rhythm, and emotional colour — not just words.' },
          ].map(({ pct, label, sub }, i) => (
            <motion.div
              key={label}
              {...fadeUp(0.06 * i)}
              className="bg-black p-8 lg:p-10"
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">{pct}</div>
              <div className="text-sm text-gray-300 font-medium mb-1">{label}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Source footnote */}
        <motion.p {...fadeUp(0.3)} className="mt-6 text-xs text-gray-700">
          Research: Mehrabian (1971), MIT Media Lab, Stanford HCI Group
        </motion.p>
      </div>
    </section>
  )
}
