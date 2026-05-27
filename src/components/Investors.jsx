import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const METRICS = [
  { v: '50M+',  l: 'Human interaction samples' },
  { v: '120+',  l: 'Emotion categories' },
  { v: '<80ms', l: 'Inference latency' },
  { v: '94.7%', l: 'Emotion recognition accuracy' },
  { v: '8',     l: 'Robotics OEM partners (pipeline)' },
  { v: '42',    l: 'Emotionally calibrated languages' },
]

const EDGES = [
  { title: 'Foundational Infrastructure',  desc: 'Like AWS for compute — the emotional intelligence layer every AI and robotics company will need to license.' },
  { title: 'Proprietary Dataset Moat',     desc: '50M+ labelled interactions across 120+ emotion categories. Years and hundreds of millions to replicate.' },
  { title: 'API + OEM Licensing Model',    desc: 'Scalable SaaS from API calls plus high-margin OEM licensing fees from robotics companies embedding our layer.' },
  { title: 'First-Mover Timing',           desc: 'Humanoid robotics is at its iPhone moment. EmovoxAI is positioned to ship inside every future humanoid.' },
]

export default function Investors() {
  return (
    <section id="investors" className="bg-black py-36 px-8">
      <hr className="rule max-w-7xl mx-auto mb-36" />

      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="label mb-8">Investor Thesis</motion.p>

        <motion.h2 {...fadeUp(0.08)} className="headline text-white mb-6 max-w-3xl">
          Infrastructure for
          <br />
          <span className="text-gradient-warm">the robotics era.</span>
        </motion.h2>

        <motion.p {...fadeUp(0.16)}
          className="text-gray-500 text-lg max-w-xl mb-20 leading-relaxed">
          We are building the emotional intelligence layer that every robot, AI agent, and
          autonomous system will require to achieve mainstream human adoption.
        </motion.p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mb-20">
          {METRICS.map(({ v, l }, i) => (
            <motion.div key={l} {...fadeUp(0.05*i)} className="bg-black p-8">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">{v}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{l}</div>
            </motion.div>
          ))}
        </div>

        {/* Edges */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 mb-20">
          {EDGES.map(({ title, desc }, i) => (
            <motion.div key={title} {...fadeUp(0.06*i)} className="bg-black p-8">
              <h3 className="text-white text-sm font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Seed round CTA */}
        <motion.div {...fadeUp(0.2)}
          className="border border-white/8 rounded-2xl p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <p className="label mb-3">Seed Round</p>
            <div className="text-5xl font-bold text-white mb-3 tracking-tight">$8M</div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
              Model fine-tuning, ML research team expansion, robotics BD, and first OEM integrations.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Model R&D', 'Robotics BD', 'Platform Eng.', 'Data Acquisition'].map(tag => (
                <span key={tag} className="text-xs border border-white/8 rounded-full px-3 py-1 text-gray-500">{tag}</span>
              ))}
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-9 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Schedule Investor Call →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
