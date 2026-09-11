import { Header } from '@/components/header';
import { ShelfTable } from '@/components/books/shelf-table';
import { EmptyState } from '@/components/ui/states';
import { useLibraryShelf } from '@/hooks/use-library-shelf';
import type { Book } from '@/types/book';

export function ShelfPage() {
  const { books, sortedBooks, sort, setSort, updateStatus, removeBook } = useLibraryShelf();

  return (
    <>
      <Header />
      <main className="shell shelf">
        <div className="page-heading">
          <div>
            <p className="eyebrow">SUA COLEÇÃO</p>
            <h1>Minha estante</h1>
            <p className="muted">
              {books.length} {books.length === 1 ? 'livro guardado' : 'livros guardados'} para
              acompanhar sua jornada.
            </p>
          </div>
          <select value={sort} onChange={(event) => setSort(event.target.value as keyof Book)}>
            <option value="title">Ordenar por título</option>
            <option value="status">Ordenar por status</option>
          </select>
        </div>
        {books.length ? (
          <ShelfTable books={sortedBooks} onStatusChange={updateStatus} onRemove={removeBook} />
        ) : (
          <EmptyState />
        )}
      </main>
    </>
  );
}