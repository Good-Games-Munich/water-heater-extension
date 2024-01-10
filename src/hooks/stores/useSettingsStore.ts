import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Settings {
    fillerTag: string;
    guildId: string;
}

interface Store {
    settings: Settings;
    update: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create(
    persist<Store>(
        set => ({
            settings: {
                guildId: '667124403695517741',
                fillerTag: 'Bye',
            },
            update: settings => set(state => ({ settings: { ...state.settings, ...settings } })),
        }),
        {
            name: 'settings-storage', // unique name
        },
    ),
);
