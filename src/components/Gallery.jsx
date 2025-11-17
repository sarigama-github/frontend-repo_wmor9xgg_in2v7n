import { useEffect, useState } from 'react'
import CatCard from './CatCard'

export default function Gallery() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCats = async () => {
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/cats`)
      if (!res.ok) throw new Error('Failed to load cats')
      const data = await res.json()
      setCats(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCats()
  }, [])

  const likeCat = async (cat) => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/cats/${cat._id}/like`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to like')
      const data = await res.json()
      setCats((prev) => prev.map((c) => (c._id === cat._id ? { ...c, likes: data.likes } : c)))
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return (
      <div id="gallery" className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-gray-600">Loading adorable cats...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div id="gallery" className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg bg-rose-50 text-rose-700 p-4 ring-1 ring-rose-200">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div id="gallery" className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Cats</h2>
        <button onClick={fetchCats} className="text-sm text-gray-600 hover:text-gray-900">Refresh</button>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cats.map((cat) => (
          <CatCard key={cat._id} cat={cat} onLike={likeCat} />
        ))}
      </div>
    </div>
  )
}
