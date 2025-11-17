import React, { useEffect, useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

// Lazy-load Spline so failures don't crash the whole app
const LazySpline = lazy(() => import('@splinetool/react-spline'))

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err) {
    // eslint-disable-next-line no-console
    console.error('Spline crashed:', err)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function SplineFallback() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
    </div>
  )
}

export default function ThreeCatHero() {
  const [isClient, setIsClient] = useState(false)
  const [showSpline, setShowSpline] = useState(false)

  // Ensure we only render Spline on client, and give it a moment to mount
  useEffect(() => {
    setIsClient(true)
    const t = setTimeout(() => setShowSpline(true), 200) // small delay avoids layout thrash
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      {/* 3D Scene (with safe fallbacks) */}
      <SplineFallback />
      {isClient && showSpline && (
        <ErrorBoundary fallback={<SplineFallback />}>
          <Suspense fallback={<SplineFallback />}>
            <div className="absolute inset-0 -z-10">
              <LazySpline
                scene="https://prod.spline.design/1Gm7sPFSr2YoU3aH/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Overlay content */}
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-sm text-rose-600 ring-1 ring-rose-200">
            🐾 Now in 3D
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
            Purrfect 3D Catverse
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Explore an interactive 3D cat scene and scroll down for the gallery. Spin, pan, and enjoy the vibes.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#gallery" className="px-5 py-3 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition">Explore Gallery</a>
            <a href="/test" className="px-5 py-3 rounded-lg bg-white text-gray-700 font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition">Check Backend</a>
          </div>
        </motion.div>

        {/* Floating stats cards */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="pointer-events-auto rounded-2xl bg-white/80 backdrop-blur px-4 py-3 ring-1 ring-gray-200 shadow-md"
          >
            <div className="text-xs uppercase tracking-wide text-gray-500">Interactive</div>
            <div className="text-sm font-semibold text-gray-900">Drag to Orbit · Scroll to Zoom</div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="pointer-events-auto rounded-2xl bg-white/80 backdrop-blur px-4 py-3 ring-1 ring-gray-200 shadow-md"
          >
            <div className="text-xs uppercase tracking-wide text-gray-500">Live</div>
            <div className="text-sm font-semibold text-gray-900">Real-time likes down below</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
