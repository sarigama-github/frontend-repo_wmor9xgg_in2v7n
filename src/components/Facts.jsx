import { useEffect, useState } from 'react'
import { Quote } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Facts() {
  const [fact, setFact] = useState('Loading a fun cat fact...')

  const loadFact = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/cat/fact`)
      const data = await res.json()
      setFact(data.fact)
    } catch (e) {
      setFact('Could not fetch a fact right now. Please try again.')
    }
  }

  useEffect(() => {
    loadFact()
  }, [])

  return (
    <section id="facts" className="w-full py-16 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Random Cat Fact</h2>
        <div className="bg-white rounded-xl border border-pink-100 p-6 shadow-sm flex items-start gap-3">
          <Quote className="w-5 h-5 text-pink-600 mt-1" />
          <p className="text-gray-700">{fact}</p>
        </div>
        <button onClick={loadFact} className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg">
          New Fact
        </button>
      </div>
    </section>
  )
}
