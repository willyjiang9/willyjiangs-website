import { useEffect, useState, Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Magnetic from './Magnetic'

// Lazy-load Spline so the heavy 3D runtime never blocks first paint.
const Spline = lazy(() => import('@splinetool/react-spline'))

// ─────────────────────────────────────────────────────────────
// Robot scene (Export → Code → React → scene URL). Background is set to
// transparent inside Spline, so it floats on the bone canvas.
// Leave '' and the hero stays full-width type (no robot zone).
const SPLINE_SCENE = 'https://prod.spline.design/Fr7lPOcvpFHdjFRm/scene.splinecode'
// ─────────────────────────────────────────────────────────────

function useDesktopBot() {
  const [ok, setOk] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 821px) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 821px) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const sync = () => setOk(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return ok
}

export default function Hero() {
  const reduce = useReducedMotion()
  const showBot = useDesktopBot() && !!SPLINE_SCENE
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t) }, [])

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } }
  const line = { hidden: { y: '112%' }, show: { y: 0, transition: { duration: 0.7, ease: [0.6, 0, 0.2, 1] } } }
  const Line = ({ children }) => (
    <span className="line-mask">
      {reduce ? <span style={{ display: 'block' }}>{children}</span>
              : <motion.span style={{ display: 'block' }} variants={line}>{children}</motion.span>}
    </span>
  )

  return (
    <header className={`hero wrap ${loaded ? 'loaded' : ''} ${showBot ? 'has-bot' : ''}`} id="top">
      <div className="hero-copy">
        <motion.h1
          variants={reduce ? undefined : container}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? false : 'show'}
        >
          <Line>thanks for</Line>
          <Line>stopping by.</Line>
          <Line><span className="accent">i'm willy</span></Line>
        </motion.h1>

        <div className="hero-foot reveal">
          <p className="hero-intro">
            i enjoy solving problems, learning new things, and building the occasional side project. right now, i'm focused on making a lasting impact at Boeing
          </p>
          <div className="hero-cta">
            <Magnetic className="btn btn-solid" href="#work">see the work ↓</Magnetic>
            <Magnetic className="btn btn-ghost" href="#hi">get in touch</Magnetic>
          </div>
        </div>
      </div>

      {showBot && (
        <div className="hero-bot" aria-hidden="true">
          <Suspense fallback={null}>
            <Spline
              scene={SPLINE_SCENE}
              onLoad={(spline) => spline.setZoom(1.05)}
            />
          </Suspense>
        </div>
      )}
    </header>
  )
}
