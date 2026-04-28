import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search, SlidersHorizontal, X, ShoppingCart, Check,
  ArrowLeft, ChevronDown, ChevronUp, ShoppingBag,
} from 'lucide-react'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'

const HAIR_TYPES = ['todo tipo', 'seco', 'graso', 'dañado', 'rizado', 'ondulado', 'lacio', 'teñido', 'decolorado', 'fino', 'rubio', 'rebelde']
const BRANDS = [...new Set(products.map(p => p.brand))]
const SORT_OPTIONS = [
  { value: 'default', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'stock', label: 'Mayor stock' },
]

const CATEGORY_COLORS: Record<string, { bg: string; accent: string }> = {
  color:      { bg: 'linear-gradient(160deg, #100d22 0%, #1e1540 100%)', accent: '#7c6fb5' },
  styling:    { bg: 'linear-gradient(160deg, #0a160c 0%, #112015 100%)', accent: '#4a8c5c' },
  treatments: { bg: 'linear-gradient(160deg, #1a1005 0%, #2e1e08 100%)', accent: '#c9a84c' },
}

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
      className={`w-full py-2.5 font-mono text-[11px] tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
        added
          ? 'bg-green-500/15 border border-green-500/30 text-green-400'
          : 'bg-transparent border border-gold/25 text-gold/70 hover:border-gold hover:bg-gold hover:text-[#1A1A1A]'
      }`}
      whileHover={added ? {} : { scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {added
        ? <><Check size={12} strokeWidth={2.5} /> Agregado</>
        : <><ShoppingCart size={12} /> Agregar al pedido</>}
    </motion.button>
  )
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="pb-5 mb-5 border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-4">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/70">{title}</span>
        {open ? <ChevronUp size={13} className="text-platinum/30" /> : <ChevronDown size={13} className="text-platinum/30" />}
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

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const colors = CATEGORY_COLORS[product.category] || CATEGORY_COLORS.treatments
  const stockOk = product.stock > 20
  const stockLow = product.stock > 8 && product.stock <= 20
  const stockDot = stockOk ? '#4ade80' : stockLow ? '#facc15' : '#f87171'
  const stockLabel = stockOk ? 'Disponible' : stockLow ? `${product.stock} uds.` : `${product.stock} uds.`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: (index % 12) * 0.03 }}
      className="group relative rounded-2xl overflow-hidden border border-gray-200 hover:border-gold/30 transition-all duration-500 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)' }}
      whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(201,168,76,0.2)' }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(200px, 28vw, 180px)', background: colors.bg }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        {/* Glow blob */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{
            width: 120, height: 120,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.accent}33 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }} />
        </div>

        {/* Brand initial */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
          <span
            className="font-display font-black leading-none select-none group-hover:scale-110 transition-transform duration-500"
            style={{
              fontSize: '3rem',
              backgroundImage: 'linear-gradient(135deg, #8B6914 0%, #F5D680 45%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {product.brand.charAt(0)}
          </span>
          <span className="font-mono text-[8px] tracking-[0.5em] uppercase text-white/40">{product.brand}</span>
        </div>

        {/* Top-left badge */}
        {(product.isNew || product.isBestseller || product.badge) && (
          <div className="absolute top-3 left-3 z-20">
            <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md font-bold ${
              product.isNew
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                : product.badge === 'ICON'
                ? 'bg-gold/15 text-gold border border-gold/20'
                : product.isBestseller
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/20'
                : 'bg-orange-500/20 text-orange-400 border border-orange-500/20'
            }`}>
              {product.isNew ? 'NUEVO' : product.badge || 'TOP'}
            </span>
          </div>
        )}

        {/* Volume — bottom right */}
        <span className="absolute bottom-3 right-3 z-20 font-mono text-[9px] text-white/50 border border-white/20 px-2 py-0.5 rounded-md bg-black/25 backdrop-blur-sm">
          {product.volume}
        </span>

        {/* Bottom fade into card */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F5F5F5] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Brand + name */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-gold/50 mb-1">{product.brand}</p>
          <h3 className="font-display font-bold text-pearl text-sm leading-snug">{product.name}</h3>
          <p className="text-platinum/35 text-[11px] mt-1 leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        {/* Hair type chips */}
        <div className="flex flex-wrap gap-1">
          {product.hairTypes.slice(0, 3).map(h => (
            <span key={h} className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-platinum/60">
              {h}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Price + stock */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[8px] tracking-widest uppercase text-platinum/25 mb-0.5">precio</p>
            <p className="font-display font-bold text-gold text-base leading-none">
              ${product.price.toLocaleString('es-AR')}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: stockDot, boxShadow: `0 0 6px ${stockDot}` }} />
            <span className="font-mono text-[10px] text-platinum/40">{stockLabel}</span>
          </div>
        </div>

        {/* CTA */}
        <AddButton product={product} />
      </div>
    </motion.div>
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

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const activeFilters =
    selectedCategories.length + selectedHairTypes.length + selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )
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
    setSelectedCategories([]); setSelectedHairTypes([]); setSelectedBrands([])
    setPriceRange([0, 20000]); setSearch('')
  }

  const FiltersContent = () => (
    <div>
      <FilterSection title="Categoría">
        <div className="space-y-2.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => toggle(selectedCategories, cat.id, setSelectedCategories)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                selectedCategories.includes(cat.id)
                  ? 'bg-gold/10 border border-gold/30 text-pearl'
                  : 'border border-transparent hover:border-gray-300 text-platinum/70 hover:text-pearl'
              }`}
            >
              <span className="text-sm">{cat.name}</span>
              {selectedCategories.includes(cat.id) && <Check size={12} className="text-gold flex-shrink-0" />}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tipo de Cabello">
        <div className="flex flex-wrap gap-1.5">
          {HAIR_TYPES.map(type => (
            <button
              key={type}
              onClick={() => toggle(selectedHairTypes, type, setSelectedHairTypes)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[9px] tracking-wider uppercase border transition-all duration-200 ${
                selectedHairTypes.includes(type)
                  ? 'bg-gold/15 border-gold/40 text-gold font-bold'
                  : 'border-gray-200 text-platinum/60 hover:border-gray-400 hover:text-platinum'
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
            <button
              key={brand}
              onClick={() => toggle(selectedBrands, brand, setSelectedBrands)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                selectedBrands.includes(brand)
                  ? 'bg-gold/10 border border-gold/30 text-pearl'
                  : 'border border-transparent hover:border-gray-300 text-platinum/70 hover:text-pearl'
              }`}
            >
              <span className="text-sm">{brand}</span>
              {selectedBrands.includes(brand) && <Check size={12} className="text-gold flex-shrink-0" />}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Precio máximo" defaultOpen={false}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-platinum/40">$0</span>
            <span className="font-mono text-xs text-gold font-bold">${priceRange[1].toLocaleString('es-AR')}</span>
          </div>
          <input
            type="range" min={0} max={20000} step={500}
            value={priceRange[1]}
            onChange={e => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-gold h-1 rounded-full"
          />
        </div>
      </FilterSection>

      {activeFilters > 0 && (
        <button
          onClick={clearAll}
          className="w-full py-2.5 border border-gray-200 text-platinum/60 hover:text-red-400 hover:border-red-500/30 font-mono text-[10px] tracking-widest uppercase rounded-xl transition-all"
        >
          Limpiar todos los filtros
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200"
        style={{ background: 'rgba(248,248,248,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 h-16 flex items-center gap-4">
          {/* Back */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-platinum/40 hover:text-gold transition-colors duration-200 flex-shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase">Inicio</span>
          </button>

          <div className="w-px h-4 bg-gray-300 flex-shrink-0" />

          <span className="font-display font-bold text-pearl text-base flex-shrink-0 tracking-wider">
            TONA<span className="text-gold">LEG</span>
          </span>

          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.3em] uppercase text-platinum/25 flex-shrink-0">
            / Catálogo
          </span>

          {/* Search bar */}
          <div className="flex-1 relative max-w-md mx-auto">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-platinum/25" />
            <input
              type="text"
              placeholder="Buscar producto o marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 rounded-xl pl-9 pr-8 text-xs text-pearl placeholder-platinum/40 focus:outline-none font-mono border border-gray-200 focus:border-gold/30 transition-colors"
              style={{ background: 'rgba(0,0,0,0.04)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-platinum/25 hover:text-gold transition-colors">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Mobile filter btn */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden relative text-platinum/50 hover:text-gold transition-colors flex-shrink-0 p-1.5"
          >
            <SlidersHorizontal size={18} />
            {activeFilters > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold rounded-full text-[#1A1A1A] text-[9px] font-bold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-platinum/50 hover:text-gold transition-colors flex-shrink-0 p-1.5"
          >
            <ShoppingBag size={19} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold rounded-full text-[#1A1A1A] text-[9px] font-bold flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-24 pb-20 flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden md:block w-60 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-platinum/50">Filtros</h2>
              {activeFilters > 0 && (
                <span className="font-mono text-[9px] tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full">
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                className="fixed top-0 left-0 h-full w-72 z-50 p-6 overflow-y-auto md:hidden border-r border-gray-200"
                style={{ background: '#F8F8F8' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-platinum/50">Filtros</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-platinum/40 hover:text-gold transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <FiltersContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-baseline gap-3">
              <h1 className="font-display font-bold text-pearl text-xl">
                {activeFilters > 0 || search ? 'Resultados' : 'Todos los Productos'}
              </h1>
              <span className="font-mono text-[10px] text-platinum/30 tracking-widest">
                {filtered.length} de {products.length}
              </span>
            </div>

            <div className="relative flex-shrink-0">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="h-9 rounded-xl px-3 pr-8 font-mono text-[10px] tracking-wider text-platinum/70 focus:outline-none appearance-none cursor-pointer border border-gray-200 focus:border-gold/30 transition-colors"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} style={{ background: '#F5F5F5' }}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={11} className="absolute right-3 top-1/2 -translate-y-1/2 text-platinum/30 pointer-events-none" />
            </div>
          </div>

          {/* Active chips */}
          {(selectedCategories.length > 0 || selectedHairTypes.length > 0 || selectedBrands.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategories.map(c => (
                <span key={c} className="flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-gold font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                  {categories.find(x => x.id === c)?.name}
                  <button onClick={() => toggle(selectedCategories, c, setSelectedCategories)} className="hover:text-white transition-colors"><X size={9} /></button>
                </span>
              ))}
              {selectedHairTypes.map(h => (
                <span key={h} className="flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-gold font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                  {h}
                  <button onClick={() => toggle(selectedHairTypes, h, setSelectedHairTypes)} className="hover:text-white transition-colors"><X size={9} /></button>
                </span>
              ))}
              {selectedBrands.map(b => (
                <span key={b} className="flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-gold font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                  {b}
                  <button onClick={() => toggle(selectedBrands, b, setSelectedBrands)} className="hover:text-white transition-colors"><X size={9} /></button>
                </span>
              ))}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Search size={40} className="text-gray-300" />
              <p className="font-mono text-[11px] tracking-widest uppercase text-platinum/25">Sin resultados</p>
              <button onClick={clearAll} className="font-mono text-[10px] tracking-widest uppercase text-gold/60 hover:text-gold border-b border-gold/20 hover:border-gold pb-0.5 transition-all">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
