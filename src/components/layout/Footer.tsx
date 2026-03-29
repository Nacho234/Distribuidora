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
    <footer className="bg-charcoal border-t border-smoke">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-bold text-pearl">
                TONA<span className="text-gold">LEG</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <p className="text-platinum/60 text-sm leading-relaxed mb-6">
              Distribuidora premium de cosmética capilar profesional. Conectamos los mejores salones con las marcas de élite.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -3, color: '#C9A84C' }}
                  className="w-10 h-10 border border-smoke flex items-center justify-center text-platinum/50 hover:border-gold transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={16} />
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
                    className="text-platinum/60 hover:text-gold transition-colors duration-300 text-sm nav-link"
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
              <li className="flex items-center gap-3 text-sm text-platinum/60">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <span>+54 11 0000-0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-platinum/60">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <span>ventas@tonaleg.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-platinum/60">
                <MapPin size={14} className="text-gold flex-shrink-0" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-smoke pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-platinum/30 text-xs font-mono">
            © 2024 TONALEG. Todos los derechos reservados.
          </p>
          <p className="text-platinum/30 text-xs font-mono tracking-widest uppercase">
            Distribución Profesional · Cosmética Capilar
          </p>
        </div>
      </div>
    </footer>
  )
}
