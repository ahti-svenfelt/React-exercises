import { create } from "zustand";

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
    description: string;
}

interface ProductStore {
    products: Product[];
    isLoading: boolean;
    fetchProducts: () => Promise<void>;
    cart: Product[];
    addToCart: (product: Product) => void;
    clearCart: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    cart: [],
    isLoading: false,
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const res = await fetch("https://dummyjson.com/products");
            const data = await res.json();

            set({ products: data.products, isLoading: false });
        } catch(error) {
            console.error("Failed to fetch products:", error);
            set({ isLoading: false });
        }
    },

    addToCart: (product) =>
        set((state) => ({
            cart: [...state.cart, product],
        })),
    clearCart: () => set({ cart: [] }),
}));