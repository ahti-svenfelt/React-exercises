import React from "react"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if(!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-2xl shadow-xl w-96 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {children}

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-gray-200 text-gray-800 font-bold py-2 rounded hover:bg-gray-300"
                >
                    Close
                </button>
            </div>
        </div>
    )
}