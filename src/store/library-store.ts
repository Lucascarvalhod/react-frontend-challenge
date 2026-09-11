import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, ReadingStatus } from '@/types/book';

type LibraryState = {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  updateStatus: (id: string, status: ReadingStatus) => void;
};
export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      books: [],
      addBook: (book) =>
        set((state) =>
          state.books.some((item) => item.id === book.id)
            ? state
            : { books: [...state.books, { ...book, status: 'Quero ler' }] },
        ),
      removeBook: (id) => set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
      updateStatus: (id, status) =>
        set((state) => ({
          books: state.books.map((book) => (book.id === id ? { ...book, status } : book)),
        })),
    }),
    { name: 'libris-library' },
  ),
);