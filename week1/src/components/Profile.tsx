import React, { useState } from 'react';
// 1. TypeScript Interface: Defines what data (props) this component requires from the outside.
interface ProfileProps {
  name: string;
  role: string;
}

// 2. Component definition: We receive the props (name, role).
export function Profile({ name, role }: ProfileProps) {
  // 3. State: Create a variable 'likes' and a function 'setLikes' to modify it. Initial value is 0.
  const [likes, setLikes] = useState(0);

  return (
    // 4. Tailwind CSS: Style the card to be white, rounded, and shadowed.
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm border border-gray-100 text-center">
      {/* Display the data received as props */}
      <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
      <p className="text-slate-500 font-medium mb-6">{role}</p>     
      {/* 5. Button: When clicked (onClick), increment the likes value by one. */}
      <button
        onClick={() => setLikes((prev) => prev + 1)}
        className="w-full bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 flex justify-center gap-2 transition-colors"
      >
        <span>Like</span>
        <span>❤️ {likes}</span>
      </button>
    </div>
  );
}