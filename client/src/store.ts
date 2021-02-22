import create, { State } from "zustand";

interface StoreState extends State {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  expandedSidebar: boolean;
  setExpandedSidebar: (expandedSidebar: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  expandedSidebar: false,
  setExpandedSidebar: (expandedSidebar: boolean) => set({ expandedSidebar }),
  darkMode: false,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
}));
