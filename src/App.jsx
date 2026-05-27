import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Applications from './components/Applications'
import Vision from './components/Vision'
import Investors from './components/Investors'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Applications />
      <Vision />
      <Investors />
      <CTA />
      <Footer />
    </div>
  )
}
