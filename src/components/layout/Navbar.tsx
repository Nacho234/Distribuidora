import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Marcas', href: '#brands' },
  { label: 'Productos', href: '#products' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
          </nav>

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
