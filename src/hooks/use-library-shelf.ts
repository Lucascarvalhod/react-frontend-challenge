import { useMemo, useState } from 'react';
import { useLibraryStore } from '@/store/library-store';
import type { Book } from '@/types/book';

export function useLibraryShelf() {
  const books = useLibraryStore((state) => state.books);
  const updateStatus = useLibraryStore((state) => state.updateStatus);
  const removeBook = useLibraryStore((state) => state.removeBook);
  const [sort, setSort] = useState<keyof Book>('title');
  const sortedBooks = useMemo(
    () => [...books].sort((a, b) => String(a[sort]).localeCompare(String(b[sort]))),
    [books, sort],
  );

  return { books, sortedBooks, sort, setSort, updateStatus, removeBook };
}