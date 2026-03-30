import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export function AppleBasket() {
  const apples = useStore((state) => state.apples);
  const [filter, setFilter] = useState<'all' | 'red' | 'green'>('all');

  // SAFETY CHECK: Ensure apples is an array
  if (!Array.isArray(apples)) {
    return <div className="text-red-500">Error: Store state 'apples' is not an array! Check useStore.ts.</div>;
  }

  // FILTERING LOGIC: Decide which items to show based on local filter state
  const displayedApples = filter === 'all' 
    ? apples 
    : apples.filter(a => a.color === filter);

  return (
    <div className="mt-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded border ${filter === 'all' ? 'bg-zinc-800 text-white' : 'bg-white'}`}>Show All</button>
        <button onClick={() => setFilter('red')} className={`px-3 py-1 rounded border text-red-500 ${filter === 'red' ? 'bg-red-50' : 'bg-white'}`}>Only Red</button>
        <button onClick={() => setFilter('green')} className={`px-3 py-1 rounded border text-green-600 ${filter === 'green' ? 'bg-green-50' : 'bg-white'}`}>Only Green</button>
      </div>

      <p className="font-bold text-gray-700 mb-4">Basket contains {displayedApples.length} items:</p>
      
      <div className="flex flex-wrap gap-2 min-h-[50px]">
        {displayedApples.map(a => (
          <span key={a.id} className="text-3xl animate-bounce">
            {a.color === 'red' ? '🍎' : '🍏'}
          </span>
        ))}
        {displayedApples.length === 0 && <span className="text-gray-300 italic">Basket is empty...</span>}
      </div>
    </div>
  );
}