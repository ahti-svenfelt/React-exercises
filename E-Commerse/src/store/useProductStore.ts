import { create } from "zustand";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface ProductStore {
    products: Product[];
    fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    fetchProducts: async () => {
        try {
            const res = await fetch("https://dummyjson.com/products");
            const data = await res.json();

            set({ products: data.products });
        } catch(error) {
            console.error("Failed to fetch products:", error);
        }
    },
}));