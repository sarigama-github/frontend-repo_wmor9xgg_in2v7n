import { useEffect, useState } from 'react'

export default function CatGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadImages = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${baseUrl}/api/cat/images?limit=8`)
      if (!res.ok) throw new Error('Failed to load cat images')
      const data = await res.json()
      setImages(data.images || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadImages()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-5 text-red-600">{error}</div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <a
            key={img.id}
            href={img.url}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-xl bg-gray-100"
          >
            <img
              src={img.url}
              alt="Cute cat"
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </a>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={loadImages}
          className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-black transition-colors"
        >
          Load more
        </button>
      </div>
    </div>
  )
}
