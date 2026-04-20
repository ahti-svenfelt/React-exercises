import React from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useMagnetStore } from "./store/useMagnetStore";
import WordMagnet from "./components/WordMagnet";
import FridgeDoor from "./components/FridgeDoor";

export default function FridgeApp() {
  const magnets = useMagnetStore((s) => s.magnets);
  const updateMagnet = useMagnetStore((s) => s.updateMagnet);
  const loadExpansionPack = useMagnetStore((s) => s.loadExpansionPack);

  // --- Handle dropping words onto the fridge ---
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (over.id === "fridge") {
      const magnetRect = active.rect.current.translated;
      const fridgeRect = over.rect;

      if (!magnetRect) return;

      const x = magnetRect.left - fridgeRect.left;
      const y = magnetRect.top - fridgeRect.top;

      updateMagnet(active.id as string, {
        status: "fridge",
        x,
        y,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-8 min-h-screen bg-slate-100 font-sans flex flex-col gap-6">

        {/* --- Header Bar --- */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
          <h1 className="text-xl font-bold">Magnetic Fridge Poetry</h1>

          <div className="flex gap-4">
            <button
              onClick={loadExpansionPack}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Load extra words
            </button>

            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Print the poem
            </button>
          </div>
        </div>

        <div className="flex gap-8">

          {/* --- Word Bank --- */}
          <div className="w-48 bg-white p-4 rounded-xl shadow h-fit">
            <h2 className="text-sm font-bold text-gray-600 mb-3">WORD BANK</h2>

            <div className="flex flex-col gap-2">
              {magnets
                .filter((m) => m.status === "bank")
                .map((magnet) => (
                  <WordMagnet key={magnet.id} magnet={magnet} />
                ))}
            </div>
          </div>

          {/* --- Fridge Canvas --- */}
          <div className="flex-1 h-[700px]">
            <FridgeDoor>
              {magnets.filter((m) => m.status === "fridge").length === 0 ? (
                <p className="text-gray-400 font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  Drop words here
                </p>
              ) : (
                magnets
                  .filter((m) => m.status === "fridge")
                  .map((magnet) => (
                    <WordMagnet key={magnet.id} magnet={magnet} />
                  ))
              )}
            </FridgeDoor>
          </div>

        </div>
      </div>
    </DndContext>
  );
}