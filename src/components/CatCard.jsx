/* eslint-disable react/prop-types */
export default function CatCard({ cat, onLike }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={cat.image_url}
          alt={cat.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
          <button
            onClick={() => onLike(cat)}
            className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-rose-600 hover:bg-rose-100 active:scale-95 transition"
            aria-label={`Like ${cat.name}`}
          >
            <span>❤️</span>
            <span className="text-sm font-medium">{cat.likes ?? 0}</span>
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{cat.description}</p>
        {cat.breed && (
          <p className="mt-2 inline-flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-300" /> {cat.breed}
          </p>
        )}
      </div>
    </div>
  )
}
