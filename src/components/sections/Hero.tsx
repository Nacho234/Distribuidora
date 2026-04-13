import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
// useTransform kept for blob parallax
import { ArrowDown, Sparkles } from 'lucide-react'
import ParticleField from '../ui/ParticleField'

function useCountUp(target: number, duration = 1800, startDelay = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const steps = 60
      const increment = target / steps
      let step = 0
      const timer = setInterval(() => {
        step++
        setCount(Math.min(Math.round(increment * step), target))
        if (step >= steps) clearInterval(timer)
      }, duration / steps)
      return () => clearInterval(timer)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [target, duration, startDelay])
  return count
}

// Clip-path character reveal
function SplitReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`} style={{ verticalAlign: 'top' }}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%', rotateX: 40, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'inline-block', transformOrigin: 'bottom' }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  // Parallax layers
  const blobY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const blobY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  // textY and opacity removed — content stays fixed while scrolling

  const scrollToNext = () => {
    document.querySelector('#brands')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center bg-obsidian pt-20 pb-16"
    >
      {/* ── Decorative layer (overflow clipped here, NOT on section) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {/* Beauty store background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.shutterstock.com/image-illustration/wide-angle-modern-cosmetic-skincare-260nw-2494538155.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.6, mixBlendMode: 'luminosity' }}
          />
          {/* Gradient overlay to preserve dark edges */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.75) 70%, rgba(10,10,10,0.95) 100%)',
            }}
          />
        </div>

        {/* Aurora blobs */}
        <motion.div style={{ y: blobY1 }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{
              width: 700,
              height: 700,
              top: -200,
              left: -200,
              borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, rgba(139,105,20,0.06) 50%, transparent 75%)',
              filter: 'blur(60px)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute"
            style={{
              width: 600,
              height: 600,
              top: -100,
              right: -250,
              borderRadius: '40% 60% 45% 55% / 60% 40% 60% 40%',
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </motion.div>

        <motion.div style={{ y: blobY2 }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute"
            style={{
              width: 800,
              height: 400,
              bottom: -100,
              left: '10%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
        </motion.div>

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Particles */}
        <ParticleField />
      </div>

      {/* Vertical side text — left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold/40" />
        <span
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-gold/40 select-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Cosmética Capilar
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-gold/40" />
      </div>

      {/* Vertical side text — right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold/40" />
        <span
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-gold/40 select-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Est. 2012
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-gold/40" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-4 lg:mb-6"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block w-12 h-px bg-gold origin-left"
          />
          <span className="font-mono text-xs tracking-[0.45em] uppercase text-gold flex items-center gap-2">
            <Sparkles size={10} />
            Distribuidores Premium
            <Sparkles size={10} />
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block w-12 h-px bg-gold origin-right"
          />
        </motion.div>

        {/* ── Headline — clip-path word reveal ── */}
        <h1
          className="font-display font-black leading-[0.92] mb-4 lg:mb-6 tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 6rem)', perspective: 800 }}
        >
          {/* Line 1 */}
          <div className="flex flex-wrap justify-center gap-x-[0.22em] mb-2">
            <SplitReveal text="El" delay={0.25} className="text-pearl" />
            <SplitReveal text="Arte" delay={0.33} className="text-gold-shimmer italic" />
            <SplitReveal text="de" delay={0.41} className="text-pearl" />
            <SplitReveal text="la" delay={0.49} className="text-pearl" />
          </div>
          {/* Line 2 */}
          <div className="flex flex-wrap justify-center gap-x-[0.22em]">
            <SplitReveal text="Belleza" delay={0.57} className="text-gold-shimmer italic" />
            <SplitReveal text="Profesional" delay={0.68} className="text-pearl" />
          </div>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-platinum/55 text-sm md:text-base max-w-2xl mx-auto mb-6 lg:mb-10 leading-relaxed font-light"
        >
          Distribuimos las marcas más exclusivas de cosmética capilar para{' '}
          <span className="text-platinum font-normal">profesionales y salones de élite</span>{' '}
          en todo el país.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <RippleButton
            onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-8 md:px-12 py-3 md:py-4 text-white font-mono text-sm tracking-widest uppercase font-bold rounded-xl"
          >
            Ver Productos
          </RippleButton>
          <motion.button
            onClick={() => document.querySelector('#brands')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 md:px-12 py-3 md:py-4 border border-gold/40 text-gold font-mono text-sm tracking-widest uppercase hover:border-gold hover:bg-gold/5 transition-all duration-300 rounded-xl"
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(201,168,76,0.2)' }}
            whileTap={{ scale: 0.97 }}
          >
            Nuestras Marcas
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-center justify-center gap-8 lg:gap-12 mt-8 lg:mt-12 pt-4 lg:pt-6 border-t border-smoke/40"
        >
          {[
            { target: 500, suffix: '+', label: 'Salones' },
            { target: 12, suffix: '', label: 'Años' },
            { target: 30, suffix: '+', label: 'Marcas' },
          ].map((stat, i) => {
            const count = useCountUp(stat.target, 1600, 1800 + i * 100)
            return (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="font-display text-2xl font-bold text-gold-gradient">
                  {count}{stat.suffix}
                </div>
                <div className="font-mono text-xs tracking-widest uppercase text-platinum/35 mt-1">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/40 hover:text-gold transition-colors duration-300"
        whileHover={{ y: 4 }}
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}

// ── Ripple Button ──
function RippleButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position: absolute;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      transform: scale(0);
      left: ${x}px; top: ${y}px;
      margin-left: -2px; margin-top: -2px;
      animation: rippleOut 0.6s ease-out forwards;
      pointer-events: none;
    `
    btn.style.position = 'relative'
    btn.style.overflow = 'hidden'
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 650)
    onClick?.()
  }

  return (
    <motion.button
      className={className}
      onClick={handleClick}
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,168,76,0.4)' }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
