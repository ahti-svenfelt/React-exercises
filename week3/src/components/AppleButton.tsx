import React from 'react';
import { useStore } from '../store/useStore';

export function AppleButton() {
  const addApple = useStore((state) => state.addApple);
  
  return (
    <div className="flex gap-2 p-4 bg-gray-100 rounded-xl">
      <button 
        onClick={() => addApple('red')} 
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
      >
        Pick Red 🍎
      </button>
      <button 
        onClick={() => addApple('green')} 
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
      >
        Pick Green 🍏
      </button>
    </div>
  );
}