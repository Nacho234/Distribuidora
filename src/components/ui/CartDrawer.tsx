import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, setOpen, remove, updateQty, total, count, clear } = useCart()

  const handleWhatsApp = () => {
    const lines = items.map(
      i => `• ${i.product.name} (${i.product.brand}) x${i.quantity} — $${(i.product.price * i.quantity).toLocaleString('es-AR')}`
    )
    const msg = `Hola! Quiero hacer un pedido:\n\n${lines.join('\n')}\n\n*Total: $${total.toLocaleString('es-AR')}*`
    window.open(`https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9994]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[9995] flex flex-col bg-charcoal border-l border-smoke/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-smoke/50">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold" />
                <span className="font-display font-bold text-pearl text-lg">Mi Pedido</span>
                {count > 0 && (
                  <span className="bg-gold text-[#1A1A1A] text-xs font-bold font-mono px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-platinum/50 hover:text-gold transition-colors p-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-smoke" />
                  <p className="text-platinum/40 font-mono text-sm tracking-widest uppercase">
                    Tu pedido está vacío
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gold font-mono text-xs tracking-widest uppercase border-b border-gold/30 pb-0.5 hover:border-gold transition-all"
                  >
                    Ver productos →
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 bg-charcoal-light border border-smoke/40 rounded-xl p-4"
                    >
                      {/* Color swatch */}
                      <div
                        className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center font-display font-black text-lg"
                        style={{
                          background:
                            product.category === 'color'
                              ? 'linear-gradient(135deg, #0d0a1a, #1a1033)'
                              : product.category === 'styling'
                              ? 'linear-gradient(135deg, #0a1a0e, #0d2614)'
                              : 'linear-gradient(135deg, #1a0e05, #2d1a08)',
                          backgroundImage: `linear-gradient(135deg, #8B6914, #F5D680, #C9A84C)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        <span
                          style={{
                            backgroundImage: 'linear-gradient(135deg, #8B6914, #F5D680, #C9A84C)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {product.brand.charAt(0)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[10px] text-gold/60 uppercase tracking-widest">{product.brand}</p>
                        <p className="text-pearl font-medium text-sm leading-tight mt-0.5 truncate">{product.name}</p>
                        <p className="text-platinum/40 text-xs mt-0.5">{product.volume}</p>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(product.id, quantity - 1)}
                              className="w-6 h-6 border border-smoke rounded-md flex items-center justify-center text-platinum/60 hover:border-gold hover:text-gold transition-all"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-pearl text-sm font-mono w-5 text-center">{quantity}</span>
                            <button
                              onClick={() => updateQty(product.id, quantity + 1)}
                              className="w-6 h-6 border border-smoke rounded-md flex items-center justify-center text-platinum/60 hover:border-gold hover:text-gold transition-all"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gold font-bold font-mono text-sm">
                              ${(product.price * quantity).toLocaleString('es-AR')}
                            </span>
                            <button
                              onClick={() => remove(product.id)}
                              className="text-platinum/30 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-smoke/50 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-platinum/50 font-mono text-xs tracking-widest uppercase">Total estimado</span>
                  <span className="font-display font-bold text-gold text-2xl">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
                <motion.button
                  onClick={handleWhatsApp}
                  className="w-full py-4 bg-[#25D366] text-white font-mono text-sm tracking-widest uppercase font-bold rounded-xl flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(37,211,102,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={18} />
                  Pedir por WhatsApp
                </motion.button>
                <button
                  onClick={clear}
                  className="w-full text-platinum/30 hover:text-platinum/60 font-mono text-xs tracking-widest uppercase transition-colors"
                >
                  Vaciar pedido
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
