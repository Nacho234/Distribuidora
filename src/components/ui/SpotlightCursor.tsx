import { useEffect, useRef } from 'react'

export default function SpotlightCursor() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = spotRef.current
      if (!el) return
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={spotRef}
      className="fixed pointer-events-none z-[9980]"
      style={{
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(201,168,76,0.055) 0%, rgba(201,168,76,0.015) 35%, transparent 70%)',
        transition: 'left 0.12s ease-out, top 0.12s ease-out',
      }}
    />
  )
}
