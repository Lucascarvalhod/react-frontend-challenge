import { useParams } from 'react-router-dom';
import { Header } from '@/components/header';
import { BookDetailContent } from '@/components/books/book-detail-content';
import { ErrorState, LoadingState } from '@/components/ui/states';
import { useBookDetail } from '@/hooks/use-book-detail';
import { useAppStore } from '@/store/app-store';

export function BookDetailPage() {
  const { bookId } = useParams();
  const { data, isLoading, isError, error } = useBookDetail(bookId);
  const { books, addBook, removeBook } = useAppStore();
  if (isLoading) return <LoadingState message="Carregando detalhes..." />;
  if (isError) return <ErrorState message={error instanceof Error ? error.message : undefined} />;
  if (!data) return null;
  const { book } = data;
  const saved = books.some((item) => item.id === book.id);

  return (
    <>
      <Header />
      <BookDetailContent
        book={book}
        saved={saved}
        onToggleSaved={() => (saved ? removeBook(book.id) : addBook(book))}
      />
    </>
  );
}