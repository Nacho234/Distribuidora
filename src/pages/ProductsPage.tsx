import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search, SlidersHorizontal, X, ShoppingCart, Check,
  ArrowLeft, ChevronDown, ChevronUp,
} from 'lucide-react'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'

const HAIR_TYPES = ['todo tipo', 'seco', 'graso', 'dañado', 'rizado', 'ondulado', 'lacio', 'teñido', 'decolorado', 'fino', 'rubio', 'rebelde', 'resistente', 'debilitado', 'corto']
const BRANDS = [...new Set(products.map(p => p.brand))]
const SORT_OPTIONS = [
  { value: 'default', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'stock', label: 'Mayor stock' },
]

function AddButton({ product }: { product: typeof products[0] }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const handleAdd = () => {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }
  return (
    <motion.button
      onClick={handleAdd}
      className={`w-full py-3 font-mono text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
        added
          ? 'bg-green-500/20 border border-green-500/40 text-green-400'
          : 'bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-obsidian'
      }`}
      whileHover={added ? {} : { scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {added ? <><Check size={13} /> Agregado</> : <><ShoppingCart size={13} /> Agregar</>}
    </motion.button>
  )
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-smoke/40 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-gold">{title}</span>
        {open ? <ChevronUp size={14} className="text-platinum/40" /> : <ChevronDown size={14} className="text-platinum/40" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductsPage() {
  const navigate = useNavigate()
  const { count, setOpen: setCartOpen } = useCart()

  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedHairTypes, setSelectedHairTypes] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sort, setSort] = useState('default')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const activeFilters =
    selectedCategories.length + selectedHairTypes.length + selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    if (selectedCategories.length) list = list.filter(p => selectedCategories.includes(p.category))
    if (selectedHairTypes.length) list = list.filter(p => p.hairTypes.some(h => selectedHairTypes.includes(h)))
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand))
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'stock') list.sort((a, b) => b.stock - a.stock)

    return list
  }, [search, selectedCategories, selectedHairTypes, selectedBrands, sort, priceRange])

  const clearAll = () => {
    setSelectedCategories([])
    setSelectedHairTypes([])
    setSelectedBrands([])
    setPriceRange([0, 20000])
    setSearch('')
  }

  const FiltersContent = () => (
    <div>
      <FilterSection title="Categoría">
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => toggle(selectedCategories, cat.id, setSelectedCategories)}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-gold border-gold'
                    : 'border-smoke group-hover:border-gold/50'
                }`}
              >
                {selectedCategories.includes(cat.id) && <Check size={10} className="text-obsidian" />}
              </div>
              <span
                onClick={() => toggle(selectedCategories, cat.id, setSelectedCategories)}
                className="text-sm text-platinum/60 group-hover:text-platinum transition-colors"
              >
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tipo de Cabello">
        <div className="flex flex-wrap gap-2">
          {HAIR_TYPES.map(type => (
            <button
              key={type}
              onClick={() => toggle(selectedHairTypes, type, setSelectedHairTypes)}
              className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase border transition-all duration-200 ${
                selectedHairTypes.includes(type)
                  ? 'bg-gold border-gold text-obsidian font-bold'
                  : 'border-smoke text-platinum/50 hover:border-gold/40 hover:text-platinum'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Marca">
        <div className="space-y-2">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => toggle(selectedBrands, brand, setSelectedBrands)}
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                  selectedBrands.includes(brand)
                    ? 'bg-gold border-gold'
                    : 'border-smoke group-hover:border-gold/50'
                }`}
              >
                {selectedBrands.includes(brand) && <Check size={10} className="text-obsidian" />}
              </div>
              <span
                onClick={() => toggle(selectedBrands, brand, setSelectedBrands)}
                className="text-sm text-platinum/60 group-hover:text-platinum transition-colors"
              >
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Precio" defaultOpen={false}>
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-platinum/50">
            <span>${priceRange[0].toLocaleString('es-AR')}</span>
            <span>${priceRange[1].toLocaleString('es-AR')}</span>
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={500}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-gold"
          />
        </div>
      </FilterSection>

      {activeFilters > 0 && (
        <button
          onClick={clearAll}
          className="w-full py-2 border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 font-mono text-xs tracking-widest uppercase rounded-xl transition-all"
        >
          Limpiar filtros ({activeFilters})
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-smoke/50">
        <div className="max-w-8xl mx-auto px-4 md:px-8 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-platinum/60 hover:text-gold transition-colors font-mono text-xs tracking-widest uppercase flex-shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Inicio</span>
          </button>

          <div className="w-px h-5 bg-smoke/50 flex-shrink-0" />

          <span className="font-display font-bold text-pearl text-lg flex-shrink-0">
            TONA<span className="text-gold">LEG</span>
          </span>

          {/* Search */}
          <div className="flex-1 relative max-w-lg mx-auto">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-platinum/30" />
            <input
              type="text"
              placeholder="Buscar producto o marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-charcoal border border-smoke/50 rounded-xl pl-9 pr-4 py-2 text-sm text-pearl placeholder-platinum/30 focus:outline-none focus:border-gold/50 font-mono"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-platinum/30 hover:text-gold">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center gap-1.5 text-platinum/60 hover:text-gold transition-colors flex-shrink-0"
          >
            <SlidersHorizontal size={18} />
            {activeFilters > 0 && (
              <span className="bg-gold text-obsidian text-[10px] font-bold px-1.5 py-0.5 rounded-full">{activeFilters}</span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-platinum/60 hover:text-gold transition-colors flex-shrink-0"
          >
            <ShoppingCart size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-gold text-obsidian text-[10px] font-bold min-w-[16px] min-h-[16px] rounded-full flex items-center justify-center px-1"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 md:px-8 pt-24 pb-16 flex gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-pearl text-lg">Filtros</h2>
              {activeFilters > 0 && (
                <span className="bg-gold/10 text-gold border border-gold/20 text-xs font-mono px-2 py-0.5 rounded-full">
                  {activeFilters} activos
                </span>
              )}
            </div>
            <FiltersContent />
          </div>
        </aside>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-obsidian/70 z-50 md:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                className="fixed top-0 left-0 h-full w-80 bg-charcoal z-50 p-6 overflow-y-auto md:hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-pearl text-lg">Filtros</h2>
                  <button onClick={() => setSidebarOpen(false)} className="text-platinum/50 hover:text-gold">
                    <X size={20} />
                  </button>
                </div>
                <FiltersContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Products grid */}
        <main className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div>
              <h1 className="font-display font-bold text-pearl text-2xl">
                {filtered.length === products.length ? 'Todos los Productos' : `${filtered.length} productos`}
              </h1>
              <p className="text-platinum/40 font-mono text-xs mt-0.5">
                {filtered.length} de {products.length} resultados
              </p>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="bg-charcoal border border-smoke/50 text-platinum/70 font-mono text-xs tracking-wider rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-platinum/40 pointer-events-none" />
            </div>
          </div>

          {/* Active filter chips */}
          {(selectedCategories.length > 0 || selectedHairTypes.length > 0 || selectedBrands.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map(c => (
                <span key={c} className="flex items-center gap-1 bg-gold/10 border border-gold/20 text-gold font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                  {categories.find(x => x.id === c)?.name}
                  <button onClick={() => toggle(selectedCategories, c, setSelectedCategories)}><X size={10} /></button>
                </span>
              ))}
              {selectedHairTypes.map(h => (
                <span key={h} className="flex items-center gap-1 bg-gold/10 border border-gold/20 text-gold font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                  {h}
                  <button onClick={() => toggle(selectedHairTypes, h, setSelectedHairTypes)}><X size={10} /></button>
                </span>
              ))}
              {selectedBrands.map(b => (
                <span key={b} className="flex items-center gap-1 bg-gold/10 border border-gold/20 text-gold font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                  {b}
                  <button onClick={() => toggle(selectedBrands, b, setSelectedBrands)}><X size={10} /></button>
                </span>
              ))}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <Search size={48} className="text-smoke" />
              <p className="text-platinum/40 font-mono text-sm tracking-widest uppercase">Sin resultados</p>
              <button onClick={clearAll} className="text-gold font-mono text-xs border-b border-gold/30 pb-0.5 hover:border-gold transition-all">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => {
                  const stockColor = product.stock > 20 ? 'text-green-400' : product.stock > 8 ? 'text-yellow-400' : 'text-red-400'
                  const stockDot = product.stock > 20 ? 'bg-green-400' : product.stock > 8 ? 'bg-yellow-400' : 'bg-red-400'
                  const stockLabel = product.stock > 20 ? 'En stock' : product.stock > 8 ? `${product.stock} disponibles` : `Solo ${product.stock}`

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: (i % 8) * 0.04 }}
                      className="bg-charcoal-light border border-smoke/40 rounded-2xl overflow-hidden flex flex-col hover:border-gold/30 transition-all duration-300 group"
                      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(201,168,76,0.12)' }}
                    >
                      {/* Image placeholder */}
                      <div
                        className="relative h-32 flex items-center justify-center overflow-hidden"
                        style={{
                          background:
                            product.category === 'color'
                              ? 'linear-gradient(135deg, #0d0a1a 0%, #1a1033 50%, #0d0a1a 100%)'
                              : product.category === 'styling'
                              ? 'linear-gradient(135deg, #0a1a0e 0%, #0d2614 50%, #0a1a0e 100%)'
                              : 'linear-gradient(135deg, #1a0e05 0%, #2d1a08 50%, #1a0e05 100%)',
                        }}
                      >
                        <div className="absolute inset-0 opacity-[0.06]"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,1) 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                          }}
                        />
                        <div className="relative z-10 text-center">
                          <div
                            className="font-display font-black leading-none select-none group-hover:scale-110 transition-transform duration-500"
                            style={{
                              fontSize: '2.5rem',
                              backgroundImage: 'linear-gradient(135deg, #8B6914 0%, #F5D680 50%, #C9A84C 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            {product.brand.charAt(0)}
                          </div>
                          <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-gold/40 mt-1">{product.brand}</div>
                        </div>
                        {/* Badge */}
                        {(product.badge || product.isNew || product.isBestseller) && (
                          <div className="absolute top-3 left-3">
                            <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded ${
                              product.isNew ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : product.badge === 'ICON' ? 'bg-gold/10 text-gold border border-gold/20'
                              : product.isBestseller ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {product.isNew ? 'NUEVO' : product.badge || 'TOP'}
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3">
                          <span className="font-mono text-[10px] text-platinum/30 border border-smoke px-2 py-0.5">{product.volume}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 flex flex-col flex-1 gap-2">
                        <div>
                          <span className="font-mono text-[10px] tracking-widest uppercase text-gold/60">{product.brand}</span>
                          <h3 className="font-display font-bold text-pearl text-sm mt-0.5 leading-tight">{product.name}</h3>
                          <p className="text-platinum/40 text-xs mt-1 leading-relaxed line-clamp-2">{product.description}</p>
                        </div>

                        {/* Hair types */}
                        <div className="flex flex-wrap gap-1">
                          {product.hairTypes.slice(0, 3).map(h => (
                            <span key={h} className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 bg-charcoal border border-smoke/60 text-platinum/40 rounded-full">
                              {h}
                            </span>
                          ))}
                        </div>

                        {/* Price + stock */}
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="font-mono text-[9px] tracking-widest uppercase text-platinum/30">Precio</p>
                            <p className="font-display font-bold text-gold text-base">${product.price.toLocaleString('es-AR')}</p>
                          </div>
                          <div className={`flex items-center gap-1.5 ${stockColor}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${stockDot} animate-pulse`} />
                            <span className="font-mono text-[10px] tracking-wider">{stockLabel}</span>
                          </div>
                        </div>

                        <AddButton product={product} />
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
