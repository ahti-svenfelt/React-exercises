export interface CategoryFilterProps {
    categories: string[];
    selected: string;
    onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect}: CategoryFilterProps) {
    return(
        <div className="flex flex-wrap gap-2 mb-8">
            <button 
                onClick={() => onSelect('all')}
                className={`px-4 py-2 rounded-md font-medium transition-colors 
                ${selected === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                }
                `}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`px-4 py-2 rounded-md font-medium capitalize transition-colors
                        ${selected === category
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                    `}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};