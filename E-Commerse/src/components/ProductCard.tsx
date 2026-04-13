import { useProductStore, type Product } from "../store/useProductStore";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addToCart = useProductStore((state) => state.addToCart);
    return (
        <div className="border border-gray-200 rounded-lg p-4 text-center bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            <div className="h-30 w-full mb-4">
                <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="w-full h-full object-contain" 
                />
            </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.title}
                </h3>
                <p className="text-xl font-bold text-blue-600 mt-auto">
                    ${product.price}
                </p>

                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    Add to Cart
                </button>
        </div>
    );
};