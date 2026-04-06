import React, { useState } from 'react';
import Modal from './components/Modal';

// Fake data: Camping gear and their weights in grams
const CAMPING_GEAR = [
  { id: 1, name: 'Tent', weight: 3500 },
  { id: 2, name: 'Sleeping Bag', weight: 1200 },
  { id: 3, name: 'Camping Stove', weight: 800 }
];

export default function App() {
  // 1. State for the Modal's visibility (open/closed)
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false)

  // 2. Reduce math: 
  // The function calculates the accumulating sum and the current item together. Initial value is 0.
  const totalWeight = CAMPING_GEAR.reduce((sum, item) => sum + item.weight, 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Camping Trip Summary</h2>
      
      <p className="text-xl font-black text-blue-600 mb-4">
        Backpack weight: {totalWeight} g
      </p>

      {/* Button that changes the state to true and "opens" the window */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-zinc-800 text-white px-4 py-2 rounded shadow hover:bg-zinc-700"
      >
        View Equipment
      </button>

      <button
        onClick={() => setShowInfo(true)}
        className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mt-4"
      >
        Show Details
      </button>

      {/* 3. Conditional Rendering (&&) for the Modal 
          This black, full-screen background (fixed inset-0) is drawn 
          on the screen ONLY when the isOpen state is true! */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-80">
            <h3 className="text-xl font-bold mb-4">Packed Items</h3>
            <ul className="mb-6 space-y-2">
              {CAMPING_GEAR.map(item => (
                <li key={item.id} className="border-b pb-1 flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-gray-500">{item.weight} g</span>
                </li>
              ))}
            </ul>
            
            {/* Button that changes the state back to false and closes the window */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-full bg-gray-200 text-gray-800 font-bold py-2 rounded hover:bg-gray-300"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={showInfo} onClose={() => setShowInfo(false)}>
        <h3 className="text-xl font-bold mb-4">Modal test</h3>
        <p>This is the content of the modal!</p>
      </Modal>
    </div>

    
  );
}