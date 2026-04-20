import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// --- A. DRAGGABLE ITEM ---
function Sticker({ id, emoji }: { id: string, emoji: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div 
      ref={setNodeRef} style={style} {...listeners} {...attributes} 
      className={`text-4xl p-2 cursor-grab active:cursor-grabbing transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {emoji}
    </div>
  );
}

// --- B. DROPPABLE AREA ---
function Canvas({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-area' });
  return (
    <div 
      ref={setNodeRef} 
      className={`w-full h-80 border-4 border-dashed rounded-3xl flex flex-wrap items-start p-8 transition-colors ${isOver ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}
    >
      {children}
    </div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [items, setItems] = useState<string[]>([]);

  // 1. DND LOGIC: Add item to state when dropped
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'canvas-area') {
      setItems(prev => [...prev, event.active.id as string]);
    }
  };

  // 2. EXTERNAL STATE: Overwrite local state with a "Community Set"
  const loadPreset = () => {
    const mockExternalSet = ['⭐', '💖', '🔥', '🚀']; // Simulated API data
    setItems(mockExternalSet);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-12 min-h-screen bg-slate-50 font-sans">
        
        {/* PRINT CSS: This UI is hidden when printing! */}
        <div className="bg-zinc-800 text-white p-6 mb-8 rounded-2xl flex justify-between items-center shadow-lg print:hidden">
          <div>
            <h1 className="text-xl font-bold">Sticker Sandbox</h1>
            <p className="text-xs text-gray-400 italic">Drag emojis to the box below</p>
          </div>
          <div className="flex gap-4">
             <button onClick={loadPreset} className="bg-amber-500 px-4 py-2 rounded-lg font-bold">Load Preset 📦</button>
             <button onClick={() => window.print()} className="bg-blue-600 px-4 py-2 rounded-lg font-bold">Print Creation 🖨️</button>
          </div>
        </div>

        <div className="flex gap-12 items-start">
          {/* Draggable Drawer (Hidden when printing) */}
          <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow print:hidden">
            <Sticker id="⭐" emoji="⭐" />
            <Sticker id="🚀" emoji="🚀" />
            <Sticker id="🔥" emoji="🔥" />
            <Sticker id="💖" emoji="💖" />
          </div>

          {/* Droppable Canvas (Only this part looks clean on paper) */}
          <div className="flex-1">
             <Canvas>
               {items.length === 0 ? <p className="text-gray-300 font-bold m-auto">Pudota tarroja tähän</p> : 
                items.map((emoji, idx) => <span key={idx} className="text-5xl m-2">{emoji}</span>)}
             </Canvas>
             <p className="text-xs text-gray-400 mt-4 text-center print:hidden">Tip: Press Ctrl+P to see the print view.</p>
          </div>
        </div>

      </div>
    </DndContext>
  );
}