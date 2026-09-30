import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Lenis from 'lenis'
import CustomCursor from './components/CustomCursor'
import GoogleAnalytics from './components/GoogleAnalytics'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import About from './components/About'
import Resume from './components/Resume'
import Notes from './components/Notes'
import Note from './components/Note'
import Footer from './components/Footer'
import { getPost } from './lib/posts'

function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  return path
}

export default function App() {
  const path = usePathname()
  const noteSlug = path.match(/^\/blog\/([^/]+)\/?$/)?.[1] || ''
  const isHome = path === '/' || path === '/blog' || path === '/blog/'

  useEffect(() => {
    if (!isHome || !window.location.hash) return
    const el = document.querySelector(window.location.hash)
    if (!el) return
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 68)
  }, [isHome])

  useEffect(() => {
    if (path !== '/blog' && path !== '/blog/') return
    window.history.replaceState(null, '', '/#blog')
    const el = document.querySelector('#blog')
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 68)
  }, [path])

  useEffect(() => {
    if (noteSlug) {
      const post = getPost(noteSlug)
      document.title = post ? `${post.title} — Willy Jiang` : 'Willy Jiang'
    } else {
      document.title = 'Willy Jiang'
    }
  }, [noteSlug])

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

    let lenis = null
    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const a = e.target.closest('a[href]')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      let url
      try { url = new URL(a.getAttribute('href'), window.location.href) } catch { return }
      if (url.origin !== window.location.origin) return
      const internal = url.pathname === '/' || url.pathname === '/blog' || url.pathname.startsWith('/blog/')
      if (!internal) return

      const scrollToHash = () => {
        const el = document.querySelector(url.hash)
        if (!el) { window.scrollTo(0, 0); return }
        if (lenis && window.location.pathname === '/') lenis.scrollTo(el, { offset: -68 })
        else window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 68)
      }

      if (url.pathname === window.location.pathname && url.hash) {
        e.preventDefault()
        scrollToHash()
        window.history.pushState(null, '', url.pathname + url.hash)
        return
      }

      if (url.pathname === window.location.pathname && url.search === window.location.search && !url.hash) return

      e.preventDefault()
      window.history.pushState(null, '', url.pathname + url.search + url.hash)
      window.dispatchEvent(new PopStateEvent('popstate'))
      if (url.hash) requestAnimationFrame(() => requestAnimationFrame(scrollToHash))
      else window.scrollTo(0, 0)
    }
    document.addEventListener('click', onClick)

    // Native scroll feels better on phones; Lenis is desktop-only.
    if (reduce || coarse || !isHome) {
      return () => {
        io.disconnect()
        document.removeEventListener('click', onClick)
      }
    }

    lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [isHome])

  return (
    <>
      <CustomCursor />
      <Nav />
      {noteSlug ? <Note slug={noteSlug} /> : (
        <>
          <Hero />
          <Marquee />
          <main><Work /><About /><Resume /><Notes /></main>
        </>
      )}
      <Footer />
      <Analytics />
      <GoogleAnalytics />
    </>
  )
}

