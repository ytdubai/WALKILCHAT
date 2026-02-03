interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryChips({
  categories,
  selectedCategory,
  onSelect,
}: CategoryChipsProps) {
  return (
    <div className="overflow-x-auto py-4 px-4 -mx-4">
      <div className="flex gap-2 min-w-max">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === ''
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => onSelect('')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}