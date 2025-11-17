import { useEffect, useState } from 'react'

const sampleCats = [
  {
    name: 'Luna',
    description: 'Playful window-sill sunbather',
    image_url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1600&auto=format&fit=crop',
    breed: 'Domestic Shorthair',
    likes: 0,
  },
  {
    name: 'Mochi',
    description: 'Snack enthusiast and lap-warmer',
    image_url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1600&auto=format&fit=crop',
    breed: 'Ragdoll',
    likes: 0,
  },
  {
    name: 'Tiger',
    description: 'Dramatic zoomies after 10pm',
    image_url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1600&auto=format&fit=crop',
    breed: 'Tabby',
    likes: 0,
  },
]

export default function Hero() {
  const [created, setCreated] = useState(false)

  const seedIfEmpty = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/cats`)
      const cats = await res.json()
      if (!Array.isArray(cats) || cats.length > 0) return
      await Promise.all(
        sampleCats.map((c) =>
          fetch(`${baseUrl}/api/cats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(c),
          })
        )
      )
      setCreated(true)
    } catch (e) {
      console.error('Seeding failed', e)
    }
  }

  useEffect(() => {
    seedIfEmpty()
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50" />
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-sm text-rose-600 ring-1 ring-rose-200">🐾 Purrrfectly curated</div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              The Internet Cat Gallery
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Browse adorable cats, smash the like button, and share your favorites.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#gallery" className="px-5 py-3 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition">Explore Gallery</a>
              <a href="/test" className="px-5 py-3 rounded-lg bg-white text-gray-700 font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition">Check Backend</a>
            </div>
            {created && (
              <p className="mt-3 text-sm text-emerald-600">Sample cats added. Enjoy!</p>
            )}
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1200&auto=format&fit=crop" alt="Hero cat" className="rounded-2xl shadow-xl ring-1 ring-black/5" />
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur shadow-md rounded-xl p-4 ring-1 ring-gray-200">
              <div className="text-2xl">😺</div>
              <div className="text-sm text-gray-600">100% Good Cats</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
