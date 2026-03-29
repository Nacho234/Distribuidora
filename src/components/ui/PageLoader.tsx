import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'counting' | 'reveal' | 'exit'>('counting')
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Count up 0 → 100
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('reveal'), 200)
          return 100
        }
        return prev + Math.floor(Math.random() * 8) + 3
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (phase === 'reveal') {
      setTimeout(() => setPhase('exit'), 1200)
    }
    if (phase === 'exit') {
      setTimeout(onComplete, 900)
    }
  }, [phase, onComplete])

  const letters = ['T', 'O', 'N', 'A', 'L', 'E', 'G']

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-obsidian flex flex-col items-center justify-center"
        >
          {/* Top line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', transformOrigin: 'left' }}
          />

          {/* Logo letters stagger */}
          <div className="flex items-center gap-1 md:gap-2 overflow-hidden mb-8">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={
                  phase === 'reveal'
                    ? { y: 0, opacity: 1 }
                    : { y: '110%', opacity: 0 }
                }
                transition={{
                  delay: phase === 'reveal' ? i * 0.06 : 0,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display font-black leading-none select-none ${
                  i >= 5 ? 'text-gold' : 'text-pearl'
                }`}
                style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={phase === 'reveal' ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-mono text-xs tracking-[0.5em] uppercase text-gold/60"
          >
            Cosmética Capilar Premium
          </motion.p>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
            className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-10"
          >
            <span className="font-mono text-xs tracking-widest text-platinum/30 uppercase">Cargando</span>
            <span className="font-mono text-sm text-gold font-bold tabular-nums">
              {Math.min(count, 100).toString().padStart(3, '0')}
            </span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gold"
            style={{ width: `${Math.min(count, 100)}%`, transition: 'width 0.1s linear' }}
          />

          {/* Bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute bottom-0.5 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', transformOrigin: 'right' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
