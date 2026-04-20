import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface Props {
    children: React.ReactNode
}

export default function FridgeDoor({ children }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'fridge',
    })

    return (
        <div
            ref={setNodeRef}
            className={`relative w-full h-full border-4 rounded-lg transition-colors ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-400 bg-gray-100'}`}
        >
            {children}
        </div>
    )
}