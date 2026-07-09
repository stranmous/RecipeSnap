/**
 * Settings Store — Zustand state for app settings
 * Persisted to AsyncStorage
 */

import { create } from "zustand";

interface SettingsState {
  isLoaded: boolean;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  isLoaded: true, // We removed async storage for API key, so it's always loaded now
  loadSettings: async () => {
    // Boilerplate for future persisted settings
    set({ isLoaded: true });
  },
}));
