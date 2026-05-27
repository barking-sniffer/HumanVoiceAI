import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ─── math helpers ──────────────────────────────────────────────────────────────
const lerp  = (a, b, t) => a + (b - a) * t
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const ease  = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3) / 2
const bz    = (t, p0, p1, p2) => (1-t)*(1-t)*p0 + 2*(1-t)*t*p1 + t*t*p2  // quadratic bezier

// ─── face particle generator ───────────────────────────────────────────────────
function buildParticles(W, H) {
  const cx = W * 0.5
  const cy = H * 0.46

  // Scale face proportionally to viewport
  const unit = Math.min(W * 0.22, H * 0.28, 160)
  const fw   = unit * 1.4   // face width
  const fh   = unit * 1.8   // face height
  const sp   = Math.max(6, Math.round(unit * 0.075))  // grid spacing

  const fx = cx - fw / 2
  const fy = cy - fh / 2

  // ── Machine face regions ──────────────────────────────────────────────────
  // Eye boxes (left & right)
  const eW   = Math.round(fw * 0.27)
  const eH   = Math.round(fh * 0.155)
  const eLX  = fx + Math.round(fw * 0.09)
  const eRX  = fx + fw - Math.round(fw * 0.09) - eW
  const eY   = fy + Math.round(fh * 0.22)

  // Mouth bar
  const mW   = Math.round(fw * 0.62)
  const mX   = fx + Math.round(fw * 0.19)
  const mY   = fy + Math.round(fh * 0.72)

  // Nose dot cluster
  const nS   = sp * 2
  const nX   = cx - nS / 2
  const nY   = fy + Math.round(fh * 0.50)

  const inEyes = (x, y) =>
    (x >= eLX && x < eLX+eW && y >= eY && y < eY+eH) ||
    (x >= eRX && x < eRX+eW && y >= eY && y < eY+eH)

  // Head fill (exclude eye boxes)
  const mHead = [], mEyeL = [], mEyeR = [], mMouth = [], mNose = []

  for (let y = fy; y < fy + fh; y += sp)
    for (let x = fx; x < fx + fw; x += sp)
      if (!inEyes(x, y)) mHead.push([x + sp/2, y + sp/2])

  for (let y = eY; y < eY + eH; y += sp) {
    for (let x = eLX; x < eLX + eW; x += sp) mEyeL.push([x+sp/2, y+sp/2])
    for (let x = eRX; x < eRX + eW; x += sp) mEyeR.push([x+sp/2, y+sp/2])
  }

  // Two-line pixel mouth
  for (let x = mX; x < mX + mW; x += sp) {
    mMouth.push([x+sp/2, mY])
    mMouth.push([x+sp/2, mY + sp])
  }

  // Nose cluster
  for (let y = nY; y < nY+nS; y += sp)
    for (let x = nX; x < nX+nS; x += sp)
      mNose.push([x+sp/2, y+sp/2])

  // ── Human face regions (same counts) ─────────────────────────────────────
  const ha = fw * 0.50  // head ellipse radii
  const hb = fh * 0.50

  // Head fill – rejection-sample inside ellipse
  const hHead = []
  for (let tries = 0; hHead.length < mHead.length && tries < mHead.length * 40; tries++) {
    const px = cx + (Math.random()*2-1) * ha
    const py = cy + (Math.random()*2-1) * hb
    if (((px-cx)/ha)**2 + ((py-cy)/hb)**2 < 0.94) hHead.push([px, py])
  }
  while (hHead.length < mHead.length)
    hHead.push([cx+(Math.random()-0.5)*ha*.85, cy+(Math.random()-0.5)*hb*.85])

  // Eye – soft almond clusters
  const eyeOffX = ha * 0.38, eyeOffY = -hb * 0.18
  const eyeR    = ha * 0.155

  const fillEye = (n, ox) => {
    const pts = []
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * eyeR
      pts.push([cx+ox + Math.cos(a)*r, cy+eyeOffY + Math.sin(a)*r*0.50])
    }
    return pts
  }
  const hEyeL = fillEye(mEyeL.length, -eyeOffX)
  const hEyeR = fillEye(mEyeR.length, +eyeOffX)

  // Mouth – gentle smile arc
  const hMouth = []
  const smW = ha * 0.44, smCY = cy + hb * 0.43
  for (let i = 0; i < mMouth.length; i++) {
    const a = (i / mMouth.length) * Math.PI * 0.75 - Math.PI * 0.375
    hMouth.push([
      cx + Math.sin(a) * smW + (Math.random()-0.5)*3,
      smCY - (1-Math.cos(a)) * hb*0.07 + (Math.random()-0.5)*2,
    ])
  }

  // Nose – small soft cluster
  const hNose = mNose.map(() => [
    cx + (Math.random()-0.5) * ha * 0.13,
    cy + hb*0.08 + Math.random() * hb*0.14,
  ])

  // ── Combine into flat particle array ─────────────────────────────────────
  const combine = (mArr, hArr, kind) =>
    mArr.map((mp, i) => {
      const hp = hArr[i] || [cx, cy]
      // Bezier via-point: midpoint + random deflection
      const vx = lerp(mp[0], hp[0], 0.5) + (Math.random()-0.5) * unit * 1.2
      const vy = lerp(mp[1], hp[1], 0.5) + (Math.random()-0.5) * unit * 1.0 - unit * 0.3
      return { mx:mp[0], my:mp[1], hx:hp[0], hy:hp[1], vx, vy, kind, seed:Math.random() }
    })

  return [
    ...combine(mHead,  hHead,  'head'),
    ...combine(mEyeL,  hEyeL,  'eyeL'),
    ...combine(mEyeR,  hEyeR,  'eyeR'),
    ...combine(mMouth, hMouth, 'mouth'),
    ...combine(mNose,  hNose,  'nose'),
  ]
}

// ─── color tables ──────────────────────────────────────────────────────────────
const MC = { head:[15,155,200], eyeL:[0,240,255], eyeR:[0,240,255], mouth:[10,195,235], nose:[15,150,175] }
const HC = { head:[175,145,255], eyeL:[255,195,130], eyeR:[255,195,130], mouth:[255,140,175], nose:[195,165,235] }

// Animation timing (ms)
const T_ASSEMBLE_START = 300
const T_ASSEMBLE_DUR   = 1800
const T_HOLD           = 1200
const T_TRANS_START    = T_ASSEMBLE_START + T_ASSEMBLE_DUR + T_HOLD
const T_TRANS_DUR      = 3200
const T_TEXT_SHOW      = T_TRANS_START + T_TRANS_DUR * 0.55

export default function Hero() {
  const canvasRef    = useRef(null)
  const rafRef       = useRef(null)
  const ptRef        = useRef([])         // particles
  const startRef     = useRef(null)
  const mouseRef     = useRef({ x: 0.5, y: 0.5 })
  const showTextFlag = useRef(false)
  const [showText, setShowText] = useState(false)

  // ─ resize / init particles ────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const W   = canvas.offsetWidth
    const H   = canvas.offsetHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    canvas.getContext('2d').scale(dpr, dpr)
    ptRef.current = buildParticles(W, H)
  }, [])

  useEffect(() => {
    resize()
    const obs = new ResizeObserver(resize)
    obs.observe(canvasRef.current)
    return () => obs.disconnect()
  }, [resize])

  // ─ mouse tracking ─────────────────────────────────────────────────────────
  useEffect(() => {
    const move = (e) => {
      const r = canvasRef.current?.getBoundingClientRect()
      if (!r) return
      mouseRef.current = { x:(e.clientX-r.left)/r.width, y:(e.clientY-r.top)/r.height }
    }
    window.addEventListener('mousemove', move, { passive:true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // ─ animation loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    startRef.current = performance.now()

    // Blink state
    let blinkT = 0, blinkDir = 0, blinkProgress = 0, nextBlink = 4000

    const frame = (now) => {
      const W   = canvas.offsetWidth
      const H   = canvas.offsetHeight
      const ms  = now - startRef.current
      const cx  = W * 0.5
      const cy  = H * 0.46

      // — assemble progress (0→1 for machine face appearing) —
      const assembleT = ease(clamp((ms - T_ASSEMBLE_START) / T_ASSEMBLE_DUR, 0, 1))

      // — morph progress (0→1 for machine→human transition) —
      const morphRaw = clamp((ms - T_TRANS_START) / T_TRANS_DUR, 0, 1)
      const morphT   = ease(morphRaw)

      // — show text trigger —
      if (ms > T_TEXT_SHOW && !showTextFlag.current) {
        showTextFlag.current = true
        setShowText(true)
      }

      // — blink (only after human face is formed) —
      if (morphRaw > 0.9) {
        blinkT += 16
        if (blinkT > nextBlink && blinkDir === 0) {
          blinkDir = 1
          nextBlink = 3000 + Math.random() * 3000
          blinkT = 0
        }
        if (blinkDir === 1) {
          blinkProgress = Math.min(blinkProgress + 0.14, 1)
          if (blinkProgress >= 1) blinkDir = -1
        } else if (blinkDir === -1) {
          blinkProgress = Math.max(blinkProgress - 0.09, 0)
          if (blinkProgress <= 0) { blinkDir = 0 }
        }
      }

      ctx.clearRect(0, 0, W, H)

      // — subtle background vignette —
      const vgr = ctx.createRadialGradient(cx, cy, H*0.1, cx, cy, H*0.75)
      vgr.addColorStop(0, 'rgba(10,5,20,0)')
      vgr.addColorStop(1, 'rgba(0,0,0,0.6)')
      ctx.fillStyle = vgr
      ctx.fillRect(0, 0, W, H)

      const breathY = morphRaw > 0.9 ? Math.sin(ms * 0.0007) * 2.5 : 0
      const eyeFX   = (mouseRef.current.x - 0.5) * 7 * morphT
      const eyeFY   = (mouseRef.current.y - 0.5) * 5 * morphT

      // — machine face scanline (during hold phase) —
      if (assembleT > 0.95 && morphRaw < 0.1) {
        const scanPhase = ((ms - (T_ASSEMBLE_START + T_ASSEMBLE_DUR)) % 900) / 900
        const unit = Math.min(W * 0.22, H * 0.28, 160)
        const fh   = unit * 1.8
        const fy   = cy - fh / 2
        const scanY = fy + scanPhase * (fh + 20) - 20
        const scanGr = ctx.createLinearGradient(0, scanY-6, 0, scanY+6)
        scanGr.addColorStop(0, 'rgba(0,240,255,0)')
        scanGr.addColorStop(0.5, 'rgba(0,240,255,0.06)')
        scanGr.addColorStop(1, 'rgba(0,240,255,0)')
        ctx.fillStyle = scanGr
        ctx.fillRect(0, scanY-6, W, 12)
      }

      // — human face aura glow —
      if (morphT > 0.5) {
        const auraA = (morphT - 0.5) * 0.28
        const agr = ctx.createRadialGradient(cx, cy+breathY, 0, cx, cy+breathY, H*0.35)
        agr.addColorStop(0, `rgba(175,100,255,${auraA * 0.35})`)
        agr.addColorStop(0.5, `rgba(120,80,200,${auraA * 0.15})`)
        agr.addColorStop(1, 'rgba(100,60,180,0)')
        ctx.fillStyle = agr
        ctx.fillRect(0, 0, W, H)
      }

      // — draw particles ——
      for (const p of ptRef.current) {
        // Each particle has its own staggered assemble timing
        const aLocal = ease(clamp((assembleT - p.seed * 0.25) / 0.75, 0, 1))

        // Morph progress with per-particle stagger
        const mLocal = ease(clamp((morphRaw - p.seed * 0.12) / 0.88, 0, 1))

        // Position: starts off-screen (above), assembles to machine, then morphs to human
        const startX = p.mx + (Math.random()-0.5) * 200   // (stable per frame via seed below)
        const startY = p.my - H * 0.6

        // Stable spawn offset (using seed as a simple pseudo-random)
        const spawnOX = (p.seed * 197 % 1 - 0.5) * 180
        const spawnOY = -(H * 0.3 + p.seed * 200)

        // Assemble: fly in from above
        let x = lerp(p.mx + spawnOX, p.mx, aLocal)
        let y = lerp(p.my + spawnOY, p.my, aLocal)

        // Morph: bezier arc to human position
        if (mLocal > 0) {
          x = bz(mLocal, p.mx, p.vx, p.hx)
          y = bz(mLocal, p.my, p.vy, p.hy) + breathY
        }

        // Eye follow cursor
        if ((p.kind==='eyeL'||p.kind==='eyeR') && mLocal > 0.8) {
          const str = (mLocal-0.8)/0.2
          x += eyeFX * str
          y += eyeFY * str
        }

        // Blink: squish eye particles toward eye center-Y
        if ((p.kind==='eyeL'||p.kind==='eyeR') && blinkProgress > 0 && mLocal > 0.9) {
          const eyeBaseY = cy + (-H*0.082) + breathY
          y = lerp(y, eyeBaseY, blinkProgress * 0.88)
        }

        // Skip invisible particles
        if (aLocal < 0.01) continue

        // Color: cold machine → warm human
        const mc = MC[p.kind], hc = HC[p.kind]
        const r = lerp(mc[0], hc[0], mLocal)
        const g = lerp(mc[1], hc[1], mLocal)
        const b = lerp(mc[2], hc[2], mLocal)
        const alpha = p.kind==='head'
          ? lerp(0.50, 0.60, mLocal) * aLocal
          : 0.88 * aLocal

        ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${alpha.toFixed(2)})`

        // Shape: square → circle as morph progresses
        const squareness = Math.max(0, 1 - mLocal * 2.4)
        const sz = 1.9

        if (squareness > 0.05) {
          const s = sz * (1 + squareness * 0.55)
          ctx.fillRect(x-s, y-s, s*2, s*2)
        } else {
          ctx.beginPath()
          ctx.arc(x, y, sz, 0, Math.PI*2)
          ctx.fill()
        }

        // Bit labels on head particles (machine phase only)
        if (p.kind==='head' && mLocal < 0.15 && aLocal > 0.6 && p.seed > 0.75) {
          ctx.fillStyle = `rgba(0,220,255,${(0.15-mLocal)/0.15 * 0.55 * aLocal})`
          ctx.font = `${Math.round(sz*2.2)}px monospace`
          ctx.fillText(p.seed > 0.875 ? '1' : '0', x-sz, y+sz)
        }

        // Eye glow halos
        if ((p.kind==='eyeL'||p.kind==='eyeR') && mLocal < 0.35) {
          // Machine LED glow
          ctx.beginPath()
          ctx.arc(x, y, sz*3.5, 0, Math.PI*2)
          ctx.fillStyle = `rgba(0,255,255,${(0.35-mLocal)/0.35 * 0.12 * aLocal})`
          ctx.fill()
        }
        if ((p.kind==='eyeL'||p.kind==='eyeR') && mLocal > 0.55) {
          // Human warm glow
          const glA = (mLocal-0.55)/0.45 * 0.18 * (1 - blinkProgress * 0.9)
          ctx.beginPath()
          ctx.arc(x, y, sz*4.5, 0, Math.PI*2)
          ctx.fillStyle = `rgba(255,185,110,${glA})`
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* Full-screen canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay text — appears after morph completes */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 flex flex-col items-center text-center pointer-events-none select-none">

        {/* Label */}
        <motion.p
          className="label mb-10 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ duration: 1.4 }}
        >
          Emotional Intelligence · Multimodal Voice AI · Robotics
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="display text-white mb-7"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 28 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Teaching Machines<br />
          <span className="text-gradient">to Feel Human.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-gray-500 text-lg max-w-lg leading-relaxed mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ duration: 1.1, delay: 0.55 }}
        >
          Multimodal Voice AI trained on human emotion, expression,
          and social dynamics — the emotional operating system for robotics.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center pointer-events-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 12 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#applications"
            className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            Request Demo
          </a>
          <a
            href="#investors"
            className="px-8 py-3.5 rounded-full border border-white/20 text-white text-sm hover:border-white/40 transition-colors"
          >
            Partner With Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span className="label text-[10px]">Scroll</span>
        <motion.div
          className="w-px h-9 bg-gradient-to-b from-white/25 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Caption during animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: showText ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="label text-[10px] tracking-[0.22em]">Initialising emotional core…</p>
      </motion.div>
    </section>
  )
}
