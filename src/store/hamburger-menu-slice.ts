import type { StateCreator } from 'zustand';

export type HamburgerMenuSlice = {
  isHamburgerMenuOpen: boolean;
  openHamburgerMenu: () => void;
  closeHamburgerMenu: () => void;
  toggleHamburgerMenu: () => void;
};

export const createHamburgerMenuSlice: StateCreator<HamburgerMenuSlice, [], [], HamburgerMenuSlice> = (set) => ({
  isHamburgerMenuOpen: false,
  openHamburgerMenu: () => set({ isHamburgerMenuOpen: true }),
  closeHamburgerMenu: () => set({ isHamburgerMenuOpen: false }),
  toggleHamburgerMenu: () => set((state) => ({ isHamburgerMenuOpen: !state.isHamburgerMenuOpen })),
});