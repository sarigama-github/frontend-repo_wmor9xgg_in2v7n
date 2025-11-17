import { Cat } from 'lucide-react'

export default function CatHeader() {
  return (
    <header className="flex flex-col items-center text-center space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-pink-100 text-pink-600">
          <Cat className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">Cat Corner</h1>
      </div>
      <p className="text-gray-600 max-w-2xl">
        A cozy place for random cat facts and a gallery of adorable kitties. Refresh for more meowgic!
      </p>
    </header>
  )
}
