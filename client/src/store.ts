import create, { State } from "zustand";

interface StoreState extends State {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  expandedSidebar: boolean;
  setExpandedSidebar: (expandedSidebar: boolean) => void;
  snackbar: {
    message: string;
    type: "error" | "success" | "info" | "warning" | undefined;
  };
  setSnackbar: (
    type: string,
    text: "error" | "success" | "info" | "warning" | undefined
  ) => void;
  currentUser: string;
  setCurrentUser: (currentUser: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  expandedSidebar: false,
  setExpandedSidebar: (expandedSidebar: boolean) => set({ expandedSidebar }),
  darkMode: false,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
  snackbar: {
    message: "",
    type: undefined,
  },
  setSnackbar: (
    message: string,
    type: "error" | "success" | "info" | "warning" | undefined
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
  currentUser: "",
  setCurrentUser: (currentUser: string) => set({ currentUser }),
}));
