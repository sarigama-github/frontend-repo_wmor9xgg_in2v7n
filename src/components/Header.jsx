import { Cat } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full py-6">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-pink-100 text-pink-600">
            <Cat className="w-6 h-6" />
          </div>
          <span className="text-xl font-semibold text-gray-800">Purrfect Cats</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="#facts" className="hover:text-gray-900">Facts</a>
          <a href="#gallery" className="hover:text-gray-900">Gallery</a>
          <a href="/test" className="hover:text-gray-900">Status</a>
        </nav>
      </div>
    </header>
  )
}
