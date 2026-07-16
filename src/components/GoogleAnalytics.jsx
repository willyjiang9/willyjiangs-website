import { useEffect } from 'react'

// Public GA4 Measurement ID (safe to ship in client JS). Env override for local/testing.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-T6S77462WT'

/**
 * Loads Google Analytics 4 (gtag).
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined') return
    if (window.gtag) return

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return null
}
