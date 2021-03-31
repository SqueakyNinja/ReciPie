import create, { State } from 'zustand';
import { UserObj } from '../../common';

interface StoreState extends State {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  expandedSidebar: boolean;
  setExpandedSidebar: (expandedSidebar: boolean) => void;
  snackbar: {
    message: string;
    type: 'error' | 'success' | 'info' | 'warning' | undefined;
  };
  setSnackbar: (
    type: string,
    text: 'error' | 'success' | 'info' | 'warning' | undefined
  ) => void;
  currentUser: UserObj;
  setCurrentUser: (currentUserObj: UserObj) => void;
  height: number;
  setHeight: (height: number) => void;
  query: string;
  setQuery: (query: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  expandedSidebar: false,
  setExpandedSidebar: (expandedSidebar: boolean) => set({ expandedSidebar }),
  darkMode: false,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
  snackbar: {
    message: '',
    type: undefined,
  },
  setSnackbar: (
    message: string,
    type: 'error' | 'success' | 'info' | 'warning' | undefined
  ) => {
    set(({ snackbar }) => {
      return {
        snackbar: {
          message,
          type,
        },
      };
    });
  },
  currentUser: JSON.parse(
    localStorage.getItem('currentUser') || `{"username": "", "id": ""}`
  ),
  setCurrentUser: (currentUserObj: UserObj) =>
    set(() => {
      localStorage.setItem('currentUser', JSON.stringify(currentUserObj));
      return { currentUser: currentUserObj };
    }),
  height: window.innerWidth >= 1024 ? 420 : 0,
  setHeight: (height: number) => set({ height }),
  query: '',
  setQuery: (query: string) => set({ query }),
}));
