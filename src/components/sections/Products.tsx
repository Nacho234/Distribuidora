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
    product.stock > 20 ? 'text-emerald-600' : product.stock > 8 ? 'text-amber-600' : 'text-red-500'
  const stockLabel =
    product.stock > 20 ? 'En stock' : product.stock > 8 ? `Últimas ${product.stock}` : `Solo ${product.stock}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="bg-white flex flex-col rounded-xl overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
    >
      {/* Image area */}
      <div className="relative h-44 flex flex-col items-center justify-center bg-[#F7F6F4]">
        {/* Brand initial */}
        <span className="font-display font-bold text-5xl text-obsidian/10 select-none leading-none">
          {product.brand.charAt(0)}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-obsidian/25 font-medium mt-2">
          {product.brand}
        </span>

        {/* Badge */}
        {(product.isNew || product.badge || product.isBestseller) && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${
              product.isNew
                ? 'bg-emerald-50 text-emerald-700'
                : product.badge === 'ICON'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-blue-50 text-blue-700'
            }`}>
              {product.isNew ? 'Nuevo' : product.badge || 'Top'}
            </span>
          </div>
        )}

        {/* Volume */}
        <span className="absolute bottom-3 right-3 text-[10px] text-obsidian/30 font-medium">
          {product.volume}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3 border-t border-obsidian/5">
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold mb-1">{product.brand}</p>
          <h4 className="font-display font-bold text-obsidian text-sm leading-snug">{product.name}</h4>
          <p className="text-obsidian/40 text-xs mt-1.5 leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-obsidian/5">
          <p className="font-display font-bold text-obsidian text-lg">
            ${product.price.toLocaleString('es-AR')}
          </p>
          <p className={`text-[10px] font-semibold uppercase tracking-wide ${stockColor}`}>{stockLabel}</p>
        </div>

        <motion.button
          onClick={handleAdd}
          className={`w-full py-2.5 text-xs font-semibold tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
            added
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-obsidian text-white hover:bg-obsidian/85'
          }`}
          whileTap={{ scale: 0.97 }}
        >
          {added ? <><Check size={12} /> Agregado</> : <><ShoppingCart size={12} /> Agregar</>}
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
    <section id="products" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#C8C7C5' }}>
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
