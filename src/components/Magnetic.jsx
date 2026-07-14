import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Wraps a link so it drifts slightly toward the cursor on hover (desktop only).
export default function Magnetic({ href, className, children, strength = 0.3, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [magnetic, setMagnetic] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)')
    const sync = () => setMagnetic(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  function onMove(e) {
    if (reduce || !magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  function reset() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={magnetic ? onMove : undefined}
      onMouseLeave={magnetic ? reset : undefined}
      {...rest}
    >
      {children}
    </a>
  )
}
