import { create } from "zustand"

export interface Magnet {
    id: string,
    word: string,
    status: 'bank' | 'fridge'
    x: number
    y: number
}

interface MagnetStore {
    magnets: Magnet[]
    updateMagnet: (id: string, updates: Partial<Magnet>) => void
    loadExpansionPack: () => Promise<void>
}

export const useMagnetStore = create<MagnetStore>((set) => ({
    magnets: [
        { id: '1', word: 'hello', status: 'bank', x: 0, y: 0 },
        { id: '2', word: 'hi', status: 'bank', x: 0, y: 0 },
    ] satisfies Magnet[],

    updateMagnet: (id, updates) =>
        set((state) => ({
            magnets: state.magnets.map((m) =>
                m.id === id ? { ...m, ...updates} : m
            ),
        })),

    loadExpansionPack: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800))

        const newWords = ['sun', 'moon', 'stars', 'galaxy']

        set((state) => ({
            magnets: [
                ...state.magnets,
                ...newWords.map((word): Magnet => ({
                    id: crypto.randomUUID(),
                    word,
                    status: 'bank',
                    x: 0,
                    y: 0,
                })),
            ],
        }))
    },
}))