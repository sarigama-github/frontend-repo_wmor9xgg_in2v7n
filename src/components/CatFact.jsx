import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

export default function CatFact() {
  const [fact, setFact] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadFact = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${baseUrl}/api/cat/fact`)
      if (!res.ok) throw new Error('Failed to load cat fact')
      const data = await res.json()
      setFact(data.fact || 'Cats are mysterious!')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFact()
  }, [])

  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-start gap-4">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1">Random Cat Fact</h3>
        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading fact...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p className="text-gray-700">{fact}</p>
        )}
      </div>
      <button
        onClick={loadFact}
        className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-md transition-colors"
        title="New fact"
      >
        <RefreshCw className="w-4 h-4" />
        New
      </button>
    </div>
  )
}
