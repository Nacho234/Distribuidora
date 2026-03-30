import { Truck, ShieldCheck, Headphones, MapPin, Zap, Award } from 'lucide-react'

const features = [
  { icon: Truck, label: 'Entrega 24hs', sub: 'Todo el país' },
  { icon: ShieldCheck, label: '100% Originales', sub: 'Garantía de marca' },
  { icon: Headphones, label: 'Asesoramiento', sub: 'Equipo especializado' },
  { icon: Zap, label: 'Stock Permanente', sub: '+300 productos' },
  { icon: MapPin, label: 'Cobertura Nacional', sub: 'Todas las provincias' },
  { icon: Award, label: 'Marcas Premium', sub: 'Distribución oficial' },
]

// Duplicate for seamless infinite loop
const doubled = [...features, ...features]

export default function Features() {
  return (
    <div className="relative bg-charcoal-light border-y border-smoke/60 overflow-hidden py-5">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-charcoal-light to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-charcoal-light to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-0"
        style={{ animation: 'marquee 30s linear infinite', display: 'inline-flex', whiteSpace: 'nowrap' }}
      >
        {doubled.map((f, i) => {
          const Icon = f.icon
          return (
            <div
              key={i}
              className="inline-flex items-center gap-3 px-10 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                <Icon size={14} className="text-gold" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest uppercase text-platinum/80 font-medium">{f.label}</span>
                <span className="text-gold/30">·</span>
                <span className="font-mono text-xs text-platinum/40">{f.sub}</span>
              </div>
              <span className="ml-10 text-gold/20">◆</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
