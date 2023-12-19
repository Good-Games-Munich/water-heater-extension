import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Participant {
    id: string;
    tag: string;
}

interface Store {
    add: (tag: Participant['tag']) => void;
    participants: Participant[];
    remove: (id: string) => void;
    reorder: (startIndex: number, endIndex: number) => void;
    update: (id: string, tag: Participant['tag']) => void;
}

export const useParticipantsStore = create(
    persist<Store>(
        set => ({
            participants: Array.from({ length: 100 }, (aba, abb) => ({
                id: `participant-${abb}`,
                tag: `Player ${abb}`,
            })),
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
            add: tag =>
                set(state => {
                    const result = Array.from(state.participants);
                    result.unshift({
                        id: `participant-${result.length}`,
                        tag,
                    });

                    return { participants: result };
                }),
        }),
        {
            name: 'participants-storage', // unique name
        },
    ),
);
