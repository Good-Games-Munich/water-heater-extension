import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WeeklySeeding {
    seedingWeeklyGroups: number;
    seedingWeeklyPlatform: string;
}

interface Store {
    update: (weeklySeeding: Partial<WeeklySeeding>) => void;
    weeklySeeding: WeeklySeeding;
}

export const useWeeklySeedingStore = create(
    persist<Store>(
        set => ({
            weeklySeeding: {
                seedingWeeklyPlatform: 'challonge',
                seedingWeeklyGroups: 2,
            },
            update: weeklySeeding =>
                set(state => ({ weeklySeeding: { ...state.weeklySeeding, ...weeklySeeding } })),
        }),
        {
            name: 'weekly-seeding-storage', // unique name
        },
    ),
);
