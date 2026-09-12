import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createLibrarySlice, type LibrarySlice } from '@/store/library-slice';
import { createThemeSlice, type ThemeSlice } from '@/store/theme-slice';

export type AppState = LibrarySlice & ThemeSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createLibrarySlice(...args),
      ...createThemeSlice(...args),
    }),
    {
      name: 'libris-library',
      partialize: (state) => ({ books: state.books, theme: state.theme }),
    },
  ),
);