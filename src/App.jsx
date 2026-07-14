import { useEffect } from 'react'
import Lenis from 'lenis'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import About from './components/About'
import Resume from './components/Resume'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: coarse ? 0.06 : 0.14, rootMargin: coarse ? '0px 0px -4% 0px' : '0px 0px -8% 0px' })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    // Native scroll feels better on phones; Lenis is desktop-only.
    if (reduce || coarse) {
      return () => io.disconnect()
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id === '#') return
      const el = document.querySelector(id)
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -68 }) }
    }
    document.addEventListener('click', onClick)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <main><Work /><About /><Resume /></main>
      <Footer />
    </>
  )
}
