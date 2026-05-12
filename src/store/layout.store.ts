import { create } from 'zustand';

interface ILayoutState {
  isNavbarOpen: boolean;
  setIsNavbarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export const useLayoutStore = create<ILayoutState>((set) => ({
  isNavbarOpen: false,
  setIsNavbarOpen: (value: boolean) => {
    set({ isNavbarOpen: value });
  },
  isSidebarOpen: false,
  setIsSidebarOpen: (value: boolean) => {
    set({ isSidebarOpen: value });
  },
}));
