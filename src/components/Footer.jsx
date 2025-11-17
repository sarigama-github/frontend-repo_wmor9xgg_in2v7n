export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200/80 bg-white/60 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">Made with ❤️ for cat people</p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/test" className="text-gray-600 hover:text-gray-900">Backend</a>
          <a href="#gallery" className="text-gray-600 hover:text-gray-900">Gallery</a>
        </nav>
      </div>
    </footer>
  )
}
