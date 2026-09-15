import { BookCard } from '@/components/books/book-card';
import { ErrorState, LoadingState } from '@/components/ui/states';
import { Button } from '@/components/ui/button';
import type { Book } from '@/types/book';

type Props = {
  query: string;
  page: number;
  books?: Book[];
  isFetching: boolean;
  isError: boolean;
  error: unknown;
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
  onPreviousPage,
  onNextPage,
}: Props) {
  return (
    <>
      <div className="mr-auto text-[14px] font-bold text-foreground max-[760px]:w-full">{query ? `Resultados para “${query}”` : 'Sugestões para começar'}</div>
      {isFetching ? (
        <LoadingState message="Buscando na biblioteca..." />
      ) : isError ? (
        <ErrorState message={error instanceof Error ? error.message : undefined} />
      ) : (
        <div className="[mt-7.5] grid grid-cols-3 gap-6.75 max-[760px]:grid-cols-1">
          {books?.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      )}
      <div className="[mt-8.5] flex items-center justify-center gap-5 text-[13px] text-(--color-text-subtle)">
        <Button variant="outline" size="sm" disabled={page === 0} onClick={onPreviousPage}>
          Anterior
        </Button>
        <span>Página {page + 1}</span>
        <Button variant="outline" size="sm" disabled={!books || books.length < 10} onClick={onNextPage}>
          Próxima
        </Button>
      </div>
    </>
  );
}