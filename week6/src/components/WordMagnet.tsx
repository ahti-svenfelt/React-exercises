import React from "react";
import { type Magnet } from "../store/useMagnetStore"
import { useDraggable } from "@dnd-kit/core";

interface Props {
    magnet: Magnet
}

export default function WordMagnet({ magnet }: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: magnet.id,
        data: { magnet },
    })

    const isFridge = magnet.status === 'fridge'

    const style: React.CSSProperties = {
        position: isFridge ? 'absolute' : 'relative',
        left: isFridge ? magnet.x : undefined,
        top: isFridge ? magnet.y : undefined,
        transform:
            isFridge && transform
                ? `translate3d( ${transform.x}px, ${transform.y}px, 0)`
                : undefined,
    }

    return(
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="inline-block select-none cursor-grab rounded border border-neutral-800 bg-white px-2 py-1 text-sm shadow-sm active:cursor-grabbing"
        >
            {magnet.word}
        </div>
    )
}