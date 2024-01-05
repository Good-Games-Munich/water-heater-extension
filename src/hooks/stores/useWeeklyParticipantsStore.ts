import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Participant {
    id: string;
    tag: string;
}

interface Store {
    add: (tag: Participant['tag']) => void;
    bulkAdd: (tags: Array<Participant['tag']>) => void;
    participants: Participant[];
    remove: (id: string) => void;
    removeAll: () => void;
    reorder: (startIndex: number, endIndex: number) => void;
    update: (id: string, tag: Participant['tag']) => void;
}

export const useWeeklyParticipantsStore = create(
    persist<Store>(
        set => ({
            participants: [],
            reorder: (startIndex, endIndex) =>
                set(state => {
                    const result = Array.from(state.participants);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);
                    return { participants: result };
                }),
            update: (id, tag) =>
                set(state => {
                    const result = Array.from(state.participants);
                    const participant = result.find(checkItem => checkItem.id === id);
                    if (participant) {
                        participant.tag = tag;
                    }

                    return { participants: result };
                }),
            remove: id =>
                set(state => {
                    const result = Array.from(state.participants);
                    const index = result.findIndex(checkItem => checkItem.id === id);
                    if (index !== -1) {
                        result.splice(index, 1);
                    }

                    return { participants: result };
                }),
            removeAll: () => set({ participants: [] }),
            add: tag =>
                set(state => {
                    const result = Array.from(state.participants);
                    result.unshift({
                        id: uuidv4(),
                        tag,
                    });

                    return { participants: result };
                }),
            bulkAdd: tags =>
                set(state => {
                    const result = Array.from(state.participants);
                    tags.forEach(tag => {
                        result.unshift({
                            id: uuidv4(),
                            tag,
                        });
                    });

                    return { participants: result };
                }),
        }),
        {
            name: 'weekly-participants-storage', // unique name
        },
    ),
);
