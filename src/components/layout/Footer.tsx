import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, AtSign, Share2 } from 'lucide-react'

const footerLinks = [
  { label: 'Marcas', href: '#brands' },
  { label: 'Productos', href: '#products' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Contacto', href: '#contact' },
]

const socials = [
  { icon: AtSign, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
  { icon: Share2, label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal relative overflow-hidden">
      {/* Large background wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display font-black select-none text-gold/[0.025] leading-none"
          style={{ fontSize: 'clamp(120px, 22vw, 280px)', letterSpacing: '-0.05em' }}
        >
          TONALEG
        </span>
      </div>

      {/* Top gold line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #F5D680 50%, #C9A84C 70%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8 relative z-10">

        {/* Top CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 mb-12 border-b border-smoke/50"
        >
          <div>
            <h3 className="font-display font-bold text-pearl text-2xl md:text-3xl mb-1">
              ¿Listo para potenciar tu salón?
            </h3>
            <p className="text-platinum/50 text-sm">Hablemos y encontremos la solución ideal para tu negocio.</p>
          </div>
          <motion.button
            onClick={() => scrollTo('#contact')}
            className="flex-shrink-0 px-8 py-3 border border-gold text-gold font-mono text-sm tracking-widest uppercase hover:bg-gold hover:text-[#1A1A1A] transition-all duration-300 rounded-xl font-bold"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            Contactar Ahora
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-bold text-pearl">
                TONA<span className="text-gold">LEG</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <p className="text-platinum/50 text-sm leading-relaxed mb-6">
              Distribuidora premium de cosmética capilar profesional. Conectamos los mejores salones con las marcas de élite.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 border border-smoke rounded-xl flex items-center justify-center text-platinum/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-gold mb-6">Navegación</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-platinum/50 hover:text-gold transition-colors duration-300 text-sm nav-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-gold mb-6">Contacto</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-platinum/50 hover:text-platinum/80 transition-colors duration-300 group">
                <Phone size={13} className="text-gold flex-shrink-0" />
                <span>+54 11 0000-0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-platinum/50 hover:text-platinum/80 transition-colors duration-300">
                <Mail size={13} className="text-gold flex-shrink-0" />
                <span>ventas@tonaleg.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-platinum/50 hover:text-platinum/80 transition-colors duration-300">
                <MapPin size={13} className="text-gold flex-shrink-0" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-smoke/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-platinum/25 text-xs font-mono">
            © 2024 TONALEG. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-platinum/25 text-xs font-mono">
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            <span className="tracking-widest uppercase">Distribución Profesional · Cosmética Capilar</span>
            <span className="w-1 h-1 rounded-full bg-gold/40" />
          </div>
        </div>
      </div>
    </footer>
  )
}
