import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

function useCountUp(target: number, duration = 1600, startDelay = 600) {
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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToNext = () => {
    document.querySelector('#brands')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background image */}
      <img
        src="/hero-model.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay so text is legible */}
      <div className="absolute inset-0 bg-obsidian/50" />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="inline-block w-10 h-px bg-gold/70" />
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-semibold">
            Distribuidores Premium
          </span>
          <span className="inline-block w-10 h-px bg-gold/70" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black leading-[0.93] mb-5 tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
        >
          <span className="text-pearl">El Arte de la </span>
          <span className="text-gold-shimmer italic">Belleza</span>
          <br />
          <span className="text-pearl">Profesional</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-platinum/70 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Distribuimos las marcas más exclusivas de cosmética capilar para{' '}
          <span className="text-platinum/90 font-medium">profesionales y salones</span>{' '}
          en todo el país.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-10 py-3.5 text-white font-bold text-sm tracking-wider uppercase rounded-xl"
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(201,168,76,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            Ver Productos
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#brands')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-3.5 border border-gold/40 text-gold font-semibold text-sm tracking-wider uppercase hover:border-gold hover:bg-gold/5 transition-all duration-300 rounded-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Nuestras Marcas
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center justify-center gap-10 lg:gap-16 pt-6 border-t border-smoke/40"
        >
          {[
            { target: 500, suffix: '+', label: 'Salones' },
            { target: 12, suffix: '', label: 'Años' },
            { target: 30, suffix: '+', label: 'Marcas' },
          ].map((stat, i) => {
            const count = useCountUp(stat.target, 1400, 800 + i * 80)
            return (
              <div key={i} className="text-center">
                <div className="font-display text-2xl font-bold text-gold-gradient">
                  {count}{stat.suffix}
                </div>
                <div className="text-xs tracking-widest uppercase text-platinum/40 mt-1 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/40 hover:text-gold transition-colors duration-300 z-10"
        whileHover={{ y: 3 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
