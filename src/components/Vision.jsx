import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const MILESTONES = [
  { year: '2025', title: 'Foundation',        desc: 'Core multimodal emotional AI model. Visual + audio + behavioural fusion architecture.' },
  { year: '2026', title: 'Platform',          desc: 'Developer API and SDK released. First OEM partnerships with robotics companies.' },
  { year: '2027', title: 'Scale',             desc: '100,000+ deployed robots and AI agents running on EmovoxAI globally.' },
  { year: '2028+', title: 'Standard',         desc: 'Emotional intelligence becomes the default expectation for every humanoid system.' },
]

export default function Vision() {
  return (
    <section id="vision" className="bg-black py-36 px-8">
      <hr className="rule max-w-7xl mx-auto mb-36" />

      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="label mb-8">The Vision</motion.p>

        {/* Manifesto quote */}
        <motion.blockquote {...fadeUp(0.08)} className="mb-24 max-w-4xl">
          <p className="text-3xl lg:text-4xl font-bold leading-[1.25] tracking-tight">
            <span className="text-gray-600">"In the next decade, humans will interact daily with robots and AI agents.</span>
            {' '}
            <span className="text-white">The companies that succeed will not just build intelligent systems —</span>
            {' '}
            <span className="text-gradient">they will build emotionally believable ones."</span>
          </p>
          <footer className="mt-8 text-xs text-gray-700 uppercase tracking-widest">
            — EmovoxAI Company Vision, 2025
          </footer>
        </motion.blockquote>

        {/* Roadmap */}
        <div className="border-l border-white/8 pl-8 space-y-0 mb-24">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              {...fadeUp(0.08 * i)}
              className="relative pb-12 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute -left-[37px] top-1 w-2 h-2 rounded-full bg-violet-500" />

              <span className="label text-[10px] block mb-2">{m.year}</span>
              <h3 className="text-white text-base font-semibold mb-1">{m.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {[
            { title: 'Universal Standard',  desc: 'As CUDA became the standard for GPU compute — EmovoxAI aims to be the standard emotional intelligence layer for robotics.' },
            { title: 'Compounding Data',    desc: 'Models improve with every interaction across the fleet. A data advantage that grows stronger with every new deployment.' },
            { title: 'Human-Centred AI',    desc: 'Emotionally intelligent AI will be safer, more trusted, and more beneficial — the aligned path toward human-AI integration.' },
          ].map(({ title, desc }) => (
            <motion.div key={title} {...fadeUp(0.1)} className="bg-black p-8">
              <h4 className="text-white text-sm font-semibold mb-3">{title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
