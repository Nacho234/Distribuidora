import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Marcas', href: '#brands' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setOpen: setCartOpen } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
          scrolled
            ? 'glass'
            : 'bg-transparent md:bg-transparent bg-charcoal/95 backdrop-blur-md border-b border-smoke/50 md:border-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo('#hero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-display text-2xl font-bold tracking-wider text-pearl">
              TONA<span className="text-gold">LEG</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-sm font-medium text-platinum hover:text-gold transition-colors duration-300 font-mono tracking-widest uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => navigate('/productos')}
              className="nav-link text-sm font-medium text-gold hover:text-gold/80 transition-colors duration-300 font-mono tracking-widest uppercase border border-gold/30 px-3 py-1 rounded-lg hover:bg-gold/5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 + 0.3 }}
              whileHover={{ y: -2 }}
            >
              Productos
            </motion.button>
          </nav>

          {/* Cart + CTA */}
          <div className="flex items-center gap-3">
            {/* Cart icon */}
            <motion.button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-platinum/60 hover:text-gold transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={21} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-gold text-obsidian text-[10px] font-bold font-mono w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none px-1"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA Button */}
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-gold text-gold text-sm font-mono tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contactar
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gold p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9989] bg-charcoal flex flex-col items-center justify-center gap-8 border-t border-gold/20"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-display text-4xl text-pearl hover:text-gold transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ x: 10 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => { setMenuOpen(false); navigate('/productos') }}
              className="font-display text-4xl text-gold hover:text-gold/70 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: links.length * 0.07 }}
              whileHover={{ x: 10 }}
            >
              Productos
            </motion.button>
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="mt-4 px-10 py-3 bg-gold text-obsidian font-mono tracking-widest uppercase text-sm font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Contactar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
