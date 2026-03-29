import { motion } from 'framer-motion'
import { ArrowRight, Crown } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { brands, marqueeLogos } from '../../data/brands'

function SectionTitle({ eyebrow, title, subtitle, align = 'center' }: {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <div ref={ref} className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="w-8 h-px bg-gold" />
        <span className="font-mono text-xs tracking-[0.4em] uppercase text-gold">{eyebrow}</span>
        <span className="w-8 h-px bg-gold" />
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '110%', opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-pearl leading-none"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-platinum/50 mt-4 text-lg max-w-xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Gold rule */}
      <motion.div
        className={`h-px bg-gold-gradient mt-6 ${align === 'center' ? 'mx-auto' : ''}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: align === 'center' ? '80px' : '60px' } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </div>
  )
}

export default function Brands() {
  const featuredBrands = brands.filter((b) => b.featured)
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section id="brands" className="py-32 bg-charcoal relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(201,168,76,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionTitle
          eyebrow="Nuestras Marcas"
          title="Las Mejores del Mercado"
          subtitle="Distribuimos las marcas líderes del sector capilar profesional"
        />
      </div>

      {/* Marquee ticker */}
      <div className="overflow-hidden py-8 mb-20 border-y border-smoke/50 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-charcoal to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-charcoal to-transparent z-10" />
        <div className="marquee-track">
          {marqueeLogos.map((logo, i) => (
            <span key={i} className="inline-flex items-center gap-8 mx-10">
              <span className="font-display font-bold text-2xl md:text-3xl text-platinum/15 hover:text-gold/70 transition-all duration-500 whitespace-nowrap tracking-[0.2em]">
                {logo}
              </span>
              <span className="text-gold/20 text-lg">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured brand cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredBrands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card-shimmer card-gold-border bg-charcoal-light p-6 flex flex-col gap-4 group rounded-2xl"
            >
              {/* Brand icon */}
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 flex items-center justify-center border font-display font-bold text-lg rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ color: brand.color, borderColor: brand.color + '40', background: brand.color + '10' }}
                >
                  {brand.name.charAt(0)}
                </div>
                {brand.id === 'tonaleg' && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full">
                    <Crown size={10} className="text-gold" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-gold">Principal</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-pearl text-lg mb-1 group-hover:text-gold transition-colors duration-300">
                  {brand.name}
                </h3>
                <p className="font-mono text-xs tracking-wider text-gold/60 uppercase mb-3">{brand.specialty}</p>
                <p className="text-platinum/50 text-sm leading-relaxed">{brand.description}</p>
              </div>

              <motion.button
                className="mt-auto flex items-center gap-2 text-gold/60 group-hover:text-gold text-xs font-mono tracking-widest uppercase transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                Ver Catálogo <ArrowRight size={12} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* All brands count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-platinum/30 text-sm font-mono">
            + {brands.length - featuredBrands.length} marcas más disponibles en nuestro catálogo
          </p>
        </motion.div>
      </div>
    </section>
  )
}
