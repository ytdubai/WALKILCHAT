interface FilterBarProps {
  onSearch: (query: string) => void;
  onPriceRange: (min: number, max: number) => void;
  onLocation: (location: string) => void;
  selectedLocation: string;
  minPrice: number;
  maxPrice: number;
}

export function FilterBar({
  onSearch,
  onPriceRange,
  onLocation,
  selectedLocation,
  minPrice,
  maxPrice,
}: FilterBarProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search products, services, businesses..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={minPrice || ''}
              onChange={(e) => onPriceRange(Number(e.target.value), maxPrice)}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={maxPrice || ''}
              onChange={(e) => onPriceRange(minPrice, Number(e.target.value))}
            />
          </div>

          {/* Location */}
          <select
            className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedLocation}
            onChange={(e) => onLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="lagos">Lagos</option>
            <option value="addis-ababa">Addis Ababa</option>
            <option value="nairobi">Nairobi</option>
            <option value="accra">Accra</option>
          </select>
        </div>
      </div>
    </div>
  );
}