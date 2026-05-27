import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const LAYERS = [
  {
    num: '01',
    title: 'Visual Perception',
    color: 'rgba(139,92,246,',
    items: [
      'Real-time facial action unit detection (60+ AUs)',
      'Micro-expression recognition at 1/25-second resolution',
      'Gaze tracking & eye contact modelling',
      'Body language and gesture parsing',
    ],
    body: 'Computer vision processes subtle facial signals before a single word is spoken — feeding emotional context into every response.',
  },
  {
    num: '02',
    title: 'Audio Intelligence',
    color: 'rgba(56,189,248,',
    items: [
      'Sub-80ms emotion-aware speech synthesis',
      'Prosody, pitch & pace modulation',
      'Contextual accent and tone calibration',
      'Real-time sentiment detection from voice',
    ],
    body: 'Voice output isn\'t generated from text alone. Every syllable is shaped by the emotional state of both speakers at that moment.',
  },
  {
    num: '03',
    title: 'Behavioural Context',
    color: 'rgba(52,211,153,',
    items: [
      'Conversational turn-taking dynamics',
      'Relationship depth and familiarity modelling',
      'Cultural register and social norm awareness',
      'Long-context emotional memory',
    ],
    body: 'A transformer context engine tracks the arc of every conversation — adapting warmth, formality, and empathy continuously.',
  },
  {
    num: '04',
    title: 'Emotional Synthesis',
    color: 'rgba(251,146,60,',
    items: [
      'Cross-modal emotion fusion layer',
      'Empathy response generation',
      'Dynamic personality adaptation',
      'Multi-turn emotional coherence',
    ],
    body: 'All three modalities fuse into a single emotional intelligence output — the voice that emerges feels authentically human.',
  },
]

export default function Solution() {
  const [active, setActive] = useState(0)
  const L = LAYERS[active]

  return (
    <section className="bg-black py-36 px-8">
      <hr className="rule max-w-7xl mx-auto mb-36" />

      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="label mb-8">The Technology</motion.p>

        <motion.h2 {...fadeUp(0.08)} className="headline text-white mb-6 max-w-3xl">
          Four layers. One emotional<br />
          <span className="text-gradient">operating system.</span>
        </motion.h2>

        <motion.p {...fadeUp(0.16)}
          className="text-gray-500 text-lg max-w-xl mb-20 leading-relaxed">
          Trained on 50M+ real human interactions — our multimodal architecture
          sees, hears, and understands emotion simultaneously.
        </motion.p>

        {/* Layer selector + detail */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Selector */}
          <div className="flex flex-col gap-0 flex-shrink-0 lg:w-56">
            {LAYERS.map((l, i) => (
              <button
                key={l.num}
                onClick={() => setActive(i)}
                className={`group text-left py-4 border-l-2 pl-5 transition-all duration-300 ${
                  active === i
                    ? 'border-violet-500'
                    : 'border-white/8 hover:border-white/20'
                }`}
              >
                <span className={`block text-[10px] tracking-[0.15em] uppercase mb-0.5 ${active===i ? 'text-violet-400' : 'text-gray-700'}`}>
                  {l.num}
                </span>
                <span className={`text-sm font-medium ${active===i ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'} transition-colors`}>
                  {l.title}
                </span>
              </button>
            ))}
          </div>

          {/* Detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 border border-white/6 rounded-2xl p-8 lg:p-10"
          >
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">{L.body}</p>

            <ul className="space-y-3 mb-10">
              {L.items.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="mt-1 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Waveform visualiser */}
            <div className="pt-6 border-t border-white/5">
              <p className="label text-[10px] mb-3">Live emotion signal</p>
              <div className="flex items-end gap-0.5 h-10">
                {Array.from({ length: 28 }).map((_, i) => {
                  const h = (Math.sin(i * 0.65) * 0.4 + 0.6) * 100
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{ background: `${L.color}0.6)`, height: `${h * 0.5}%` }}
                      animate={{ height: [`${h*0.35}%`, `${h}%`, `${h*0.5}%`, `${h*0.85}%`, `${h*0.35}%`] }}
                      transition={{ duration: 1.6 + i*0.04, repeat: Infinity, ease:'easeInOut', delay: i*0.035 }}
                    />
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
