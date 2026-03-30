import { create } from 'zustand';

interface Apple {
  id: number;
  color: 'red' | 'green';
}

interface StoreState {
  apples: Apple[];
  addApple: (color: 'red' | 'green') => void;
}

export const useStore = create<StoreState>((set) => ({
  apples: [], 
  // Adding to an array: Copy old items and add new one
  addApple: (color) => set((state) => {
    const newApple = { id: Date.now(), color };
    console.log("Adding apple:", newApple); // Debug info
    return { apples: [...state.apples, newApple] };
  }),
}));