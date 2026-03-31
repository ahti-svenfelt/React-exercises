import React from "react";

export interface CategoryFilterProps {
    categories: string[];
    selected: string;
    onSelect: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selected,
    onSelect,
}) => {
    return(
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`
                        px-3 py-1 rounded-md border text-sm transition
                        ${selected === category
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                        }
                    `}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};