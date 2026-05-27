import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const APPS = [
  { icon: '⬡', title: 'Humanoid Robots',     desc: 'Give Figure, Unitree, and Optimus a voice that builds genuine human trust at every interaction.' },
  { icon: '⬡', title: 'Healthcare Companions', desc: 'Detect patient anxiety, respond with authentic empathy, adapt bedside manner in real time.' },
  { icon: '⬡', title: 'Elder Care AI',         desc: 'Recognise loneliness and respond with warmth — genuine emotional connection at scale.' },
  { icon: '⬡', title: 'Education AI',          desc: 'Sense frustration, celebrate breakthroughs, adapt teaching style to emotional readiness.' },
  { icon: '⬡', title: 'Autonomous Retail',     desc: 'Read customer frustration and adjust approach in real time — human-grade service, zero marginal cost.' },
  { icon: '⬡', title: 'Enterprise Voice Agents', desc: 'De-escalate anger, match emotional energy, resolve issues with authentic human warmth.' },
]

export default function Applications() {
  return (
    <section id="applications" className="bg-black py-36 px-8">
      <hr className="rule max-w-7xl mx-auto mb-36" />

      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="label mb-8">Applications</motion.p>

        <motion.h2 {...fadeUp(0.08)} className="headline text-white mb-6 max-w-3xl">
          Every machine that talks<br />
          <span className="text-gradient">needs to feel.</span>
        </motion.h2>

        <motion.p {...fadeUp(0.16)}
          className="text-gray-500 text-lg max-w-xl mb-20 leading-relaxed">
          Emotional intelligence is horizontal infrastructure — deployable across every
          category where AI systems interact with humans.
        </motion.p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {APPS.map((a, i) => (
            <motion.div
              key={a.title}
              {...fadeUp(0.05 * i)}
              className="bg-black p-8 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="text-violet-500 text-lg mb-5 opacity-40 group-hover:opacity-70 transition-opacity">⬡</div>
              <h3 className="text-white text-sm font-semibold mb-2">{a.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* TAM */}
        <div className="mt-20 grid md:grid-cols-3 gap-px bg-white/5">
          {[
            { n: '$420B+', label: 'Total addressable market by 2035',    sub: 'Humanoid robots, AI companions & enterprise voice agents' },
            { n: '$38B',   label: 'Serviceable market by 2030',          sub: 'Emotional AI platform licensing' },
            { n: 'API + OEM', label: 'Business model',                   sub: 'Per-call API · OEM emotional intelligence licensing' },
          ].map(({ n, label, sub }) => (
            <motion.div key={n} {...fadeUp(0.1)} className="bg-black p-8">
              <div className="text-2xl font-bold text-white mb-2 tracking-tight">{n}</div>
              <div className="text-xs text-gray-400 mb-1">{label}</div>
              <div className="text-xs text-gray-700">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
