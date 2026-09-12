import { BookCard } from '@/components/books/book-card';
import { ErrorState, FallbackNotice, LoadingState } from '@/components/ui/states';
import type { Book } from '@/types/book';

type Props = {
  query: string;
  page: number;
  books?: Book[];
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  isFallback?: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function BookSearchResults({
  query,
  page,
  books,
  isFetching,
  isError,
  error,
  isFallback,
  onPreviousPage,
  onNextPage,
}: Props) {
  return (
    <>
      <div className="results">{query ? `Resultados para “${query}”` : 'Sugestões para começar'}</div>
      {isFallback && !isFetching && !isError && <FallbackNotice />}
      {isFetching ? (
        <LoadingState message="Buscando na biblioteca..." />
      ) : isError ? (
        <ErrorState message={error instanceof Error ? error.message : undefined} />
      ) : (
        <div className="book-grid">
          {books?.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      )}
      <div className="pagination">
        <button disabled={page === 0} onClick={onPreviousPage}>
          Anterior
        </button>
        <span>Página {page + 1}</span>
        <button disabled={!books || books.length < 10} onClick={onNextPage}>
          Próxima
        </button>
      </div>
    </>
  );
}