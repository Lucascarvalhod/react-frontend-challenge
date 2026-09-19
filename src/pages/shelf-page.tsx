import { Header } from '@/components/header';
import { ShelfTable } from '@/components/books/shelf-table';
import { EmptyState } from '@/components/ui/states';
import { useLibraryShelf } from '@/hooks/use-library-shelf';
import type { Book } from '@/types/book';
import { NativeSelect } from '@/components/ui/native-select';

export function ShelfPage() {
  const { books, sortedBooks, sort, setSort, updateStatus, removeBook } = useLibraryShelf();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-275 px-8 pt-15 pb-20 max-[760px]:px-5 max-[760px]:pt-8.75">
        <div className="mb-9.5 flex items-end justify-between max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-5">
          <div>
            <p className="mb-3.75 flex items-center gap-1.75 text-[11px] font-bold tracking-[0.16em] text-(--color-accent-text)">SUA COLEÇÃO</p>
            <h1 className="font-serif text-[48px] leading-[1.04] tracking-[-0.04em] text-(--color-heading)">Minha estante</h1>
            <p className="text-[14px] text-(--color-text-subtle)">
              {books.length} {books.length === 1 ? 'livro guardado' : 'livros guardados'} para
              acompanhar sua jornada.
            </p>
          </div>
          <NativeSelect value={sort} onChange={(event) => setSort(event.target.value as keyof Book)}>
            <option value="title">Ordenar por título</option>
            <option value="status">Ordenar por status</option>
          </NativeSelect>
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