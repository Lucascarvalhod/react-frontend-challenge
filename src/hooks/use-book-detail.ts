import { useQuery } from '@tanstack/react-query';
import { getBook } from '@/services/books-service';

export function useBookDetail(bookId: string | undefined) {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: ({ signal }) => getBook(bookId ?? '', signal),
    enabled: Boolean(bookId),
  });
}