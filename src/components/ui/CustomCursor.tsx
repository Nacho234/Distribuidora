import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const scaleRef = useRef(1)
  const scaleMotion = useMotionValue(1)
  const springScale = useSpring(scaleMotion, { damping: 20, stiffness: 300 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      dotX.set(e.clientX - 3)
      dotY.set(e.clientY - 3)
    }

    const handleMouseEnter = () => {
      scaleRef.current = 1.8
      scaleMotion.set(1.8)
    }
    const handleMouseLeave = () => {
      scaleRef.current = 1
      scaleMotion.set(1)
    }

    window.addEventListener('mousemove', moveCursor)

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea, select')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea, select')
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [cursorX, cursorY, dotX, dotY, scaleMotion])

  return (
    <>
      {/* Ring */}
      <motion.div
        style={{ x: springX, y: springY, scale: springScale }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold pointer-events-none z-[99999] mix-blend-difference"
      />
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[99999]"
      />
    </>
  )
}
