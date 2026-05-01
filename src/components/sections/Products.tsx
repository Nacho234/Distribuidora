import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { categories, products } from '../../data/products'
import { useCart } from '../../context/CartContext'

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const stockColor =
    product.stock > 20 ? 'text-green-400' : product.stock > 8 ? 'text-yellow-400' : 'text-red-400'
  const stockLabel =
    product.stock > 20 ? 'Disponible' : product.stock > 8 ? `Últimas ${product.stock}` : `Solo ${product.stock}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
      className="card-gold-border bg-charcoal-light flex flex-col rounded-2xl overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(201,168,76,0.13)' }}
    >
      {/* Product image placeholder */}
      <div
        className="relative h-44 flex items-center justify-center"
        style={{
          background: product.category === 'color'
            ? 'linear-gradient(135deg, #0d0a1a 0%, #1a1033 100%)'
            : product.category === 'styling'
            ? 'linear-gradient(135deg, #0a1a0e 0%, #0d2614 100%)'
            : 'linear-gradient(135deg, #1a0e05 0%, #2d1a08 100%)',
        }}
      >
        <div className="relative z-10 text-center">
          <div
            className="font-display font-black text-transparent bg-clip-text select-none leading-none"
            style={{
              fontSize: '3.5rem',
              backgroundImage: 'linear-gradient(135deg, #8B6914 0%, #F5D680 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {product.brand.charAt(0)}
          </div>
          <div className="text-[9px] tracking-[0.4em] uppercase text-gold/40 mt-1 font-medium">{product.brand}</div>
        </div>
        {(product.badge || product.isNew || product.isBestseller) && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] tracking-widest uppercase px-2 py-1 font-semibold rounded ${
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
          <span className="text-[10px] tracking-widest text-platinum/30 border border-smoke px-2 py-0.5 rounded">
            {product.volume}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-gold/60 font-semibold">{product.brand}</span>
          <h4 className="font-display font-bold text-pearl text-base mt-1 leading-tight">{product.name}</h4>
          <p className="text-platinum/40 text-xs mt-1 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="font-display font-bold text-gold text-xl">
              ${product.price.toLocaleString('es-AR')}
            </p>
          </div>
          <p className={`text-[10px] tracking-wide uppercase font-semibold ${stockColor}`}>{stockLabel}</p>
        </div>

        <motion.button
          onClick={handleAdd}
          className={`w-full py-2.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-500/20 border border-green-500/40 text-green-400'
              : 'border border-gold/20 text-gold/70 hover:border-gold hover:text-gold hover:bg-gold/5'
          }`}
          whileHover={added ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {added ? <><Check size={13} /> Agregado</> : <><ShoppingCart size={13} /> Agregar</>}
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
    <section id="products" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F4F3F0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Title */}
        <div ref={titleRef} className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-display font-bold text-obsidian leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Catálogo de Productos
            </h2>
            <p className="text-obsidian/50 mt-2 text-base">
              Todo lo que necesitás para tu salón en un solo lugar
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center gap-2 mt-6"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                !activeCategory
                  ? 'bg-gold text-obsidian'
                  : 'border border-obsidian/20 text-obsidian/60 hover:border-gold hover:text-obsidian'
              }`}
            >
              Todos ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gold text-obsidian'
                    : 'border border-obsidian/20 text-obsidian/60 hover:border-gold hover:text-obsidian'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </motion.div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-obsidian/10 mt-10"
        >
          <p className="text-obsidian/40 mb-5 text-sm">
            ¿No encontrás lo que buscás? Tenemos más de 300 productos disponibles.
          </p>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-10 py-3.5 text-white font-bold text-sm tracking-wider uppercase rounded-xl"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Catálogo Completo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
