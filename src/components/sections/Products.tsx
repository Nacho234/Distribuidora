import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Package, Tag, Beaker } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { categories, products } from '../../data/products'

const categoryIcons = {
  treatments: Beaker,
  color: Tag,
  styling: Package,
}

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 })
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(dx * 12)
    rotateX.set(-dy * 8)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const slideDirections = [
    { initial: { opacity: 0, x: -60 } },
    { initial: { opacity: 0, y: 60 } },
    { initial: { opacity: 0, x: 60 } },
  ]

  const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || Package

  return (
    <motion.div
      ref={ref}
      initial={slideDirections[index].initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
        className={`card-shimmer card-gold-border bg-gradient-to-br ${category.gradient} p-8 md:p-10 h-80 flex flex-col justify-between relative overflow-hidden group rounded-2xl`}
        whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(201,168,76,0.18)' }}
      >
        {/* Background number */}
        <span
          className="absolute -right-4 -bottom-8 font-display font-black text-gold/5 pointer-events-none select-none"
          style={{ fontSize: '8rem' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Top */}
        <div>
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="w-12 h-12 border border-gold/20 flex items-center justify-center text-gold rounded-xl bg-gold/5"
              whileHover={{ rotate: 15, scale: 1.1, backgroundColor: 'rgba(201,168,76,0.15)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon size={20} />
            </motion.div>
            <span className="font-mono text-xs tracking-widest text-gold/40 uppercase border border-smoke px-2.5 py-1">
              {category.count} productos
            </span>
          </div>
          <h3 className="font-display font-bold text-pearl text-2xl mb-3 leading-tight">
            {category.name}
          </h3>
          <p className="text-platinum/50 text-sm leading-relaxed">{category.description}</p>
        </div>

        {/* Bottom CTA */}
        <motion.button
          className="flex items-center gap-2 text-gold font-mono text-xs tracking-widest uppercase group-hover:gap-4 transition-all duration-300"
          whileHover={{ x: 4 }}
        >
          Explorar línea <ArrowRight size={14} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="card-shimmer card-gold-border bg-charcoal-light flex flex-col min-w-[220px] sm:min-w-0 rounded-2xl overflow-hidden"
      whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(201,168,76,0.15)' }}
    >
      {/* Product image placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center overflow-hidden group/img">
        <div className="text-4xl opacity-20 font-display font-bold text-gold transition-all duration-500 group-hover/img:opacity-40 group-hover/img:scale-125">
          {product.brand.charAt(0)}
        </div>
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/[0.04] transition-colors duration-500" />
        {/* Badge */}
        {(product.badge || product.isNew || product.isBestseller) && (
          <div className="absolute top-3 left-3">
            <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-1 ${
              product.isNew
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : product.badge === 'ICON'
                ? 'bg-gold/10 text-gold border border-gold/20'
                : product.isBestseller
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {product.isNew ? 'NUEVO' : product.badge || 'TOP'}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-[10px] tracking-widest text-platinum/30 border border-smoke px-2 py-0.5">
            {product.volume}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-gold/60">{product.brand}</span>
          <h4 className="font-display font-bold text-pearl text-base mt-1 leading-tight">{product.name}</h4>
          <p className="text-platinum/40 text-xs mt-1.5 leading-relaxed">{product.description}</p>
        </div>
        <motion.button
          className="mt-auto w-full py-2.5 border border-gold/20 text-gold/70 hover:border-gold hover:text-gold font-mono text-[11px] tracking-widest uppercase transition-all duration-300 hover:bg-gold/5 rounded-xl"
          whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(201,168,76,0.15)' }}
          whileTap={{ scale: 0.97 }}
        >
          Consultar Precio
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products

  return (
    <section id="products" className="py-32 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(201,168,76,0.03),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-gold">Catálogo</span>
            <span className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-pearl leading-none"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Líneas de Producto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-platinum/50 mt-4 text-lg"
          >
            Todo lo que necesitás para tu salón en un solo lugar
          </motion.p>
          <motion.div
            className="h-px bg-gold-gradient mx-auto mt-6"
            initial={{ width: 0 }}
            animate={titleInView ? { width: '80px' } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {categories.map((cat, i) => (
            <div key={cat.id} onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}>
              <CategoryCard category={cat} index={i} />
            </div>
          ))}
        </div>

        {/* Products grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display font-bold text-pearl text-2xl">
                {activeCategory ? categories.find((c) => c.id === activeCategory)?.name : 'Todos los Productos'}
              </h3>
              <p className="text-platinum/40 text-sm font-mono mt-1">
                {filtered.length} productos disponibles
              </p>
            </div>
            {activeCategory && (
              <motion.button
                onClick={() => setActiveCategory(null)}
                className="font-mono text-xs tracking-widest uppercase text-gold/60 hover:text-gold border border-gold/20 hover:border-gold px-4 py-2 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.03 }}
              >
                Ver todos
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-smoke"
        >
          <p className="text-platinum/40 mb-6 font-mono text-sm">
            ¿No encontrás lo que buscás? Tenemos más de 300 productos disponibles.
          </p>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-12 py-4 text-obsidian font-mono text-sm tracking-widest uppercase font-bold rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Catálogo Completo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
