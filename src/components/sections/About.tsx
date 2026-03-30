import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Users, Clock, TrendingUp } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const stats = [
  { value: 500, suffix: '+', label: 'Salones Asociados', icon: Users },
  { value: 12, suffix: '', label: 'Años de Experiencia', icon: Clock },
  { value: 30, suffix: '+', label: 'Marcas Distribuidas', icon: Award },
  { value: 98, suffix: '%', label: 'Clientes Satisfechos', icon: TrendingUp },
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!inView || hasStarted.current) return
    hasStarted.current = true

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (current >= value) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  const { ref: textRef, isInView: textInView } = useScrollAnimation({ threshold: 0.2 })
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation({ threshold: 0.2 })
  const imageRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])

  return (
    <section id="about" className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_40%,rgba(201,168,76,0.04),transparent)]" />

      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display font-black text-gold/[0.02] select-none" style={{ fontSize: 'clamp(200px, 35vw, 500px)' }}>
          TONALEG
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Text side */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-gold">Sobre Nosotros</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-pearl leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Más de una Década Vistiendo el Éxito de los Mejores{' '}
              <span className="text-gold-gradient italic">Salones</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-platinum/60 leading-relaxed"
            >
              <p>
                Somos una distribuidora especializada en cosmética capilar profesional, con más de 12 años conectando a los mejores salones del país con las marcas de mayor prestigio internacional.
              </p>
              <p>
                Nuestra misión es simple: llevar la excelencia al alcance de cada profesional. Trabajamos directamente con los fabricantes para garantizar productos 100% originales, con los mejores precios y la logística más eficiente del mercado.
              </p>
              <p>
                TONALEG, nuestra marca insignia, nació de la necesidad del mercado de contar con una línea de alta calidad a precio accesible, y hoy es sinónimo de confianza en toda la industria.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={textInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-3 text-gold font-mono text-sm tracking-widest uppercase border-b border-gold/30 pb-1 hover:border-gold transition-all duration-300"
                whileHover={{ x: 6, gap: '1rem' }}
              >
                Nuestra Historia &rarr;
              </motion.button>
            </motion.div>
          </div>

          {/* Visual side */}
          <div ref={imageRef} className="relative">
            <motion.div style={{ y: imageY }}>
              {/* Main card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={textInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative bg-charcoal-light border border-smoke/60 h-80 flex items-center justify-center rounded-2xl overflow-hidden"
              >
                {/* Radial grid */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,1) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                {/* Gradient ring */}
                <div className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
                  }}
                />
                {/* Diagonal lines */}
                <div className="absolute inset-0 overflow-hidden opacity-10 rounded-2xl">
                  {[20, 40, 60, 80].map(p => (
                    <div key={p} className="absolute w-px bg-gold h-[200%] rotate-[35deg]" style={{ left: `${p}%`, top: '-50%' }} />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-8">
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-display font-black leading-none mb-3 select-none"
                    style={{
                      fontSize: 'clamp(4rem, 12vw, 7rem)',
                      backgroundImage: 'linear-gradient(135deg, #8B6914 0%, #F5D680 40%, #C9A84C 70%, #8B6914 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'shimmerText 4s linear infinite',
                    }}
                  >
                    TONA<br/>LEG
                  </motion.div>
                  <div className="font-mono text-[10px] tracking-[0.6em] uppercase text-gold/40">EST. 2012</div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="w-8 h-px bg-gold/30" />
                    <div className="w-1 h-1 rounded-full bg-gold/40" />
                    <div className="w-8 h-px bg-gold/30" />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />
              </motion.div>

              {/* Floating mini cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass p-4 border border-gold/20"
              >
                <p className="font-mono text-xs text-gold uppercase tracking-widest">Envío Express</p>
                <p className="text-pearl text-sm font-medium mt-0.5">24hs · Todo el País</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute -top-6 -right-6 glass p-4 border border-gold/20"
              >
                <p className="font-mono text-xs text-gold uppercase tracking-widest">Stock</p>
                <p className="text-pearl text-sm font-medium mt-0.5">+300 Productos</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card-shimmer card-gold-border bg-charcoal p-6 text-center group hover:bg-charcoal-light transition-all duration-300 rounded-2xl"
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(201,168,76,0.14)' }}
              >
                <motion.div
                  className="w-10 h-10 border border-smoke flex items-center justify-center text-gold/50 group-hover:text-gold group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-300 mx-auto mb-4 rounded-xl"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <Icon size={18} />
                </motion.div>
                <div className="font-display font-bold text-3xl text-gold mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                </div>
                <div className="font-mono text-xs tracking-wider uppercase text-platinum/40 mt-1">
                  {stat.label}
                </div>
                {/* Underline animate */}
                <motion.div
                  className="h-px bg-gold-gradient mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={statsInView ? { width: '40px' } : {}}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
