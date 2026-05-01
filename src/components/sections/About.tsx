import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function About() {
  const { ref: textRef, isInView: textInView } = useScrollAnimation({ threshold: 0.15 })

  return (
    <section id="about" className="py-16 md:py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Text side */}
          <div ref={textRef}>
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-xs tracking-[0.35em] uppercase text-gold font-semibold mb-4"
            >
              Sobre Nosotros
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-pearl leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Más de una Década Vistiendo el Éxito de los Mejores{' '}
              <span className="text-gold-gradient italic">Salones</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-platinum/60 leading-relaxed"
            >
              <p>
                Somos una distribuidora especializada en cosmética capilar profesional, con más de 12 años conectando a los mejores salones del país con las marcas de mayor prestigio internacional.
              </p>
              <p>
                Trabajamos directamente con los fabricantes para garantizar productos 100% originales, con los mejores precios y la logística más eficiente del mercado.
              </p>
              <p>
                TONALEG, nuestra marca insignia, nació de la necesidad del mercado de contar con una línea de alta calidad a precio accesible, y hoy es sinónimo de confianza en toda la industria.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={textInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8"
            >
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm border-b border-gold/30 pb-1 hover:border-gold transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                Contactanos &rarr;
              </motion.button>
            </motion.div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Salones asociados', desc: 'en todo el país' },
              { value: '12', label: 'Años de trayectoria', desc: 'desde 2012' },
              { value: '30+', label: 'Marcas exclusivas', desc: 'distribución oficial' },
              { value: '98%', label: 'Satisfacción', desc: 'clientes que repiten' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="card-gold-border bg-charcoal-light p-6 rounded-2xl"
                whileHover={{ y: -4, boxShadow: '0 10px 32px rgba(201,168,76,0.12)' }}
              >
                <div className="font-display font-bold text-3xl text-gold mb-1">{item.value}</div>
                <div className="text-pearl text-sm font-semibold">{item.label}</div>
                <div className="text-platinum/40 text-xs mt-0.5">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
