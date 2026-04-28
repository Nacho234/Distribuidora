import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const contactInfo = [
  { icon: Phone, label: 'Teléfono', value: '+54 11 0000-0000', sub: 'Lun – Vie: 9:00 a 18:00' },
  { icon: Mail, label: 'Email', value: 'ventas@tonaleg.com', sub: 'Respondemos en menos de 2hs' },
  { icon: MapPin, label: 'Ubicación', value: 'Buenos Aires, Argentina', sub: 'Envíos a todo el país' },
  { icon: Clock, label: 'Horario', value: 'Lun – Vie: 9:00–18:00', sub: 'Sáb: 9:00–13:00' },
]

const businessTypes = [
  'Salón de peluquería',
  'Barbería',
  'Centro de estética',
  'Distribuidor/Revendedor',
  'Particular',
  'Otro',
]

export default function Contact() {
  const { ref: leftRef, isInView: leftInView } = useScrollAnimation({ threshold: 0.2 })
  const { ref: rightRef, isInView: rightInView } = useScrollAnimation({ threshold: 0.1 })

  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', negocio: '', mensaje: '' })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [shaking, setShaking] = useState(false)

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    if (!form.nombre.trim()) newErrors.nombre = true
    if (!form.email.includes('@')) newErrors.email = true
    if (!form.mensaje.trim()) newErrors.mensaje = true
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
      return
    }
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-20" />

      {/* Rotating background T */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
          className="font-display font-black text-gold/[0.025] select-none"
          style={{ fontSize: 'clamp(300px, 50vw, 800px)' }}
        >
          T
        </motion.span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Title */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-gold">Contacto</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-pearl"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Hablemos de Negocios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-platinum/50 mt-4 text-lg"
          >
            Estamos listos para potenciar tu salón con los mejores productos
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact info */}
          <div ref={leftRef} className="space-y-5">
            {contactInfo.map((info, i) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -40 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="card-shimmer card-gold-border glass flex items-start gap-5 p-6 group rounded-2xl"
                  whileHover={{ x: 6, boxShadow: '0 8px 32px rgba(201,168,76,0.12)' }}
                >
                  <motion.div
                    className="w-11 h-11 border border-smoke flex items-center justify-center text-gold/50 group-hover:text-gold group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-300 flex-shrink-0 rounded-xl"
                    whileHover={{ rotate: 15 }}
                  >
                    <Icon size={18} />
                  </motion.div>
                  <div>
                    <p className="font-mono text-xs tracking-widest uppercase text-gold/50 mb-1">{info.label}</p>
                    <p className="text-pearl font-medium">{info.value}</p>
                    <p className="text-platinum/40 text-sm mt-0.5">{info.sub}</p>
                  </div>
                </motion.div>
              )
            })}

            {/* WhatsApp CTA */}
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 py-4 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 font-mono text-sm tracking-widest uppercase"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Consultar por WhatsApp
            </motion.a>
          </div>

          {/* Right - Form */}
          <div ref={rightRef}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass border border-gold/20 p-12 text-center h-full flex flex-col items-center justify-center gap-6 rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={64} className="text-gold mx-auto" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl text-pearl font-bold mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-platinum/50">Nos pondremos en contacto contigo en menos de 2 horas hábiles.</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                animate={
                  shaking
                    ? { x: [0, -10, 10, -10, 10, 0], opacity: 1 }
                    : { opacity: rightInView ? 1 : 0, x: rightInView ? 0 : 40 }
                }
                transition={{ duration: 0.5 }}
                className="glass border border-smoke p-5 sm:p-8 space-y-5 rounded-2xl"
                initial={{ opacity: 0, x: 40 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs tracking-widest uppercase text-platinum/40 block mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => { setForm({ ...form, nombre: e.target.value }); setErrors({ ...errors, nombre: false }) }}
                      className={`w-full bg-charcoal border px-4 py-3 text-pearl text-sm outline-none focus:border-gold transition-colors duration-300 placeholder:text-platinum/20 rounded-xl ${errors.nombre ? 'border-red-500' : 'border-smoke'}`}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-widest uppercase text-platinum/40 block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: false }) }}
                      className={`w-full bg-charcoal border px-4 py-3 text-pearl text-sm outline-none focus:border-gold transition-colors duration-300 placeholder:text-platinum/20 rounded-xl ${errors.email ? 'border-red-500' : 'border-smoke'}`}
                      placeholder="email@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs tracking-widest uppercase text-platinum/40 block mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full bg-charcoal border border-smoke px-4 py-3 text-pearl text-sm outline-none focus:border-gold transition-colors duration-300 placeholder:text-platinum/20 rounded-xl"
                      placeholder="+54 11 0000-0000"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-widest uppercase text-platinum/40 block mb-2">
                      Tipo de Negocio
                    </label>
                    <select
                      value={form.negocio}
                      onChange={(e) => setForm({ ...form, negocio: e.target.value })}
                      className="w-full bg-charcoal border border-smoke px-4 py-3 text-pearl text-sm outline-none focus:border-gold transition-colors duration-300 appearance-none rounded-xl"
                    >
                      <option value="" className="bg-charcoal">Seleccionar...</option>
                      {businessTypes.map((t) => (
                        <option key={t} value={t} className="bg-charcoal">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs tracking-widest uppercase text-platinum/40 block mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    value={form.mensaje}
                    onChange={(e) => { setForm({ ...form, mensaje: e.target.value }); setErrors({ ...errors, mensaje: false }) }}
                    rows={5}
                    className={`w-full bg-charcoal border px-4 py-3 text-pearl text-sm outline-none focus:border-gold transition-colors duration-300 placeholder:text-platinum/20 rounded-xl resize-none ${errors.mensaje ? 'border-red-500' : 'border-smoke'}`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-gold w-full py-4 text-obsidian font-mono text-sm tracking-widest uppercase font-bold flex items-center justify-center gap-3 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  Enviar Consulta
                </motion.button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
