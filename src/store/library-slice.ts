import type { StateCreator } from 'zustand';
import type { Book, ReadingStatus } from '@/types/book';

export type LibrarySlice = {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  updateStatus: (id: string, status: ReadingStatus) => void;
};

export const createLibrarySlice: StateCreator<LibrarySlice, [], [], LibrarySlice> = (set) => ({
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
});