import { useState, useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import Modal from '../components/Modal';

export function StorePage() {
	const { products, isLoading, fetchProducts, cart } = useProductStore();
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

	const categoryList: string[] = products.map((product) => {
		return product.category;
	});

	// remove duplicates with Set
	const uniqueCategoriesSet = new Set(categoryList);

	// Set to Array
	const uniqueCategories: string[] = Array.from(uniqueCategoriesSet);

	// sort for alphabetic sorting
	const categories = uniqueCategories.sort();

	const filteredProducts = selectedCategory === 'all' 
		? products 
		: products.filter((p) => p.category === selectedCategory);

	if (isLoading && products.length === 0) {
    return <div className="p-8 text-center text-gray-500 font-medium">Loading products...</div>;
	}

	return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
		<h1>Product Store</h1>

		<CategoryFilter 
			categories={categories}
			selected={selectedCategory}
			onSelect={setSelectedCategory}
		/>

		{!isLoading && filteredProducts.length === 0 ? (
			<div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
			<p className="text-gray-500 text-lg">No products found in this category</p>
			</div>
		) : (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{filteredProducts.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
			</div>
		)}

        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-4 px-6 shadow-lg flex justify-between items-center">
            <div>
                <span className="text-lg font-semibold">
                    Cart: {cart.length} item{cart.length !== 1 ? 's' : ''}
                </span>
                <span> </span>
                <span className="ml-auto text-lg font-semibold">
                    Total: ${totalPrice.toFixed(2)}
                </span>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-100 transition"
            >
                Checkout
            </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-2xl font-bold mb-4 text-center">Receipt</h2>

            <div className="space-y-2 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between border-b pb-1">
                        <span>{item.title}</span>
                        <span>${item.price}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-xl font-bold text-center">
                Total: ${totalPrice.toFixed(2)}
            </div>
        </Modal>
	</div>
	);
};