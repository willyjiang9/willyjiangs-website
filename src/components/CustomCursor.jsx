import { useEffect, useRef } from 'react'

// A trailing ring + dot that follows the cursor and grows over interactive elements.
export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const d = dot.current, r = ring.current
    let mx = -100, my = -100, rx = -100, ry = -100, raf
    const move = (e) => { mx = e.clientX; my = e.clientY; d.style.transform = `translate(${mx}px, ${my}px)` }
    const loop = () => { rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2; r.style.transform = `translate(${rx}px, ${ry}px)`; raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', move)
    const over = (e) => { if (e.target.closest('a, button, .idx-row')) r.classList.add('is-active') }
    const out = (e) => { if (e.target.closest('a, button, .idx-row')) r.classList.remove('is-active') }
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.body.classList.add('has-cursor')
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.body.classList.remove('has-cursor')
    }
  }, [])
  return (<>
    <div ref={ring} className="cursor-ring" aria-hidden="true" />
    <div ref={dot} className="cursor-dot" aria-hidden="true" />
  </>)
}
