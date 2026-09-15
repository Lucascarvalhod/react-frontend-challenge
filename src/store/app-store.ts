import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createHamburgerMenuSlice, type HamburgerMenuSlice } from '@/store/hamburger-menu-slice';
import { createLibrarySlice, type LibrarySlice } from '@/store/library-slice';
import { createThemeSlice, type ThemeSlice } from '@/store/theme-slice';

export type AppState = HamburgerMenuSlice & LibrarySlice & ThemeSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createHamburgerMenuSlice(...args),
      ...createLibrarySlice(...args),
      ...createThemeSlice(...args),
    }),
    {
      name: 'libris-library',
      partialize: (state) => ({ books: state.books, theme: state.theme }),
    },
  ),
);