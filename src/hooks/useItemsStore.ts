import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Item {
    content: string;
    id: string;
}

interface Store {
    items: Item[];
    remove: (id: string) => void;
    reorder: (startIndex: number, endIndex: number) => void;
    update: (id: string, content: Item['content']) => void;
}

export const useItemsStore = create(
    persist<Store>(
        set => ({
            items: Array.from({ length: 100 }, (aba, abb) => ({
                id: `item-${abb}`,
                content: `Player ${abb}`,
            })),
            reorder: (startIndex, endIndex) =>
                set(state => {
                    const result = Array.from(state.items);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);
                    return { items: result };
                }),
            update: (id, content) =>
                set(state => {
                    const result = Array.from(state.items);
                    const item = result.find(checkItem => checkItem.id === id);
                    if (item) {
                        item.content = content;
                    }

                    return { items: result };
                }),
            remove: id =>
                set(state => {
                    const result = Array.from(state.items);
                    const index = result.findIndex(checkItem => checkItem.id === id);
                    if (index !== -1) {
                        result.splice(index, 1);
                    }

                    return { items: result };
                }),
        }),
        {
            name: 'items-storage', // unique name
        },
    ),
);
