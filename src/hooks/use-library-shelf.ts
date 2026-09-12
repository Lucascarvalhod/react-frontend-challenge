import { useMemo, useState } from 'react';
import { useAppStore } from '@/store/app-store';
import type { Book } from '@/types/book';

export function useLibraryShelf() {
  const books = useAppStore((state) => state.books);
  const updateStatus = useAppStore((state) => state.updateStatus);
  const removeBook = useAppStore((state) => state.removeBook);
  const [sort, setSort] = useState<keyof Book>('title');
  const sortedBooks = useMemo(
    () => [...books].sort((a, b) => String(a[sort]).localeCompare(String(b[sort]))),
    [books, sort],
  );

  return { books, sortedBooks, sort, setSort, updateStatus, removeBook };
}