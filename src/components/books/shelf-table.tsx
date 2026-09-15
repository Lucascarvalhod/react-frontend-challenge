import { X } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types/book';
import { BookCover } from '@/components/books/book-cover';
import { Button } from '@/components/ui/button';
import { NativeSelect } from '@/components/ui/native-select';
import { Table, TableContainer } from '@/components/ui/table';

type Props = {
  books: Book[];
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
};

export function ShelfTable({ books, onStatusChange, onRemove }: Props) {
  return (
    <>
      <div className="max-[760px]:hidden">
        <TableContainer>
      <Table>
        <thead>
          <tr>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">Livro</th>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">Autor</th>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">Publicação</th>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <ShelfRow key={book.id} book={book} onStatusChange={onStatusChange} onRemove={onRemove} />
          ))}
        </tbody>
      </Table>
        </TableContainer>
      </div>
      <div className="hidden divide-y divide-(--color-border-subtle) overflow-hidden rounded-lg border border-border bg-card max-[760px]:block">
        {books.map((book) => (
          <ShelfMobileCard key={book.id} book={book} onStatusChange={onStatusChange} onRemove={onRemove} />
        ))}
      </div>
    </>
  );
}

function ShelfRow({ book, onStatusChange, onRemove }: { book: Book; onStatusChange: Props['onStatusChange']; onRemove: Props['onRemove'] }) {
  return (
    <tr className="[&:last-child_td]:border-b-0 [&_td]:border-b [&_td]:border-(--color-border-subtle) [&_td]:[px-4.5] [&_td]:py-3.75">
      <td className="flex min-w-32 items-center gap-4">
        <BookCover src={book.thumbnail} alt={`Capa de ${book.title}`} className="h-12.75 w-9 rounded-[3px] object-cover" />
        <strong>{book.title}</strong>
      </td>
      <td>{book.authors.join(', ')}</td>
      <td>{book.publishedDate}</td>
      <td>
        <NativeSelect
          className="rounded-md border border-border bg-muted px-2 py-1.5 text-[12px] text-(--color-accent-text)"
          value={book.status}
          onChange={(event) => onStatusChange(book.id, event.target.value as ReadingStatus)}
        >
          <option>Quero ler</option>
          <option>Lendo</option>
          <option>Concluído</option>
        </NativeSelect>
      </td>
      <td>
        <Button variant="ghost" size="icon-sm" onClick={() => onRemove(book.id)} aria-label={`Remover ${book.title}`} title={`Remover ${book.title}`}>
          <X size={17} />
        </Button>
      </td>
    </tr>
  );
}

function ShelfMobileCard({ book, onStatusChange, onRemove }: { book: Book; onStatusChange: Props['onStatusChange']; onRemove: Props['onRemove'] }) {
  return (
    <article className="p-4">
      <div className="flex items-start gap-3">
        <BookCover src={book.thumbnail} alt={`Capa de ${book.title}`} className="h-16 w-11 shrink-0 rounded-[3px] object-cover" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">Livro</p>
          <h2 className="mt-1 break-words text-[14px] font-bold text-(--color-heading)">{book.title}</h2>
          <p className="mt-2 text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">Autor</p>
          <p className="mt-1 break-words text-[13px]">{book.authors.join(', ')}</p>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={() => onRemove(book.id)} aria-label={`Remover ${book.title}`} title={`Remover ${book.title}`}>
          <X size={17} />
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-(--color-border-subtle) pt-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">Publicação</p>
          <p className="mt-1 text-[13px]">{book.publishedDate}</p>
        </div>
        <label className="min-w-0 text-[11px] font-bold tracking-[0.06rem] text-(--color-text-subtle) uppercase">
          Status
          <NativeSelect
            className="mt-1 w-full rounded-md border border-border bg-muted px-2 py-1.5 text-[12px] font-normal normal-case tracking-normal text-(--color-text)"
            value={book.status}
            onChange={(event) => onStatusChange(book.id, event.target.value as ReadingStatus)}
          >
            <option>Quero ler</option>
            <option>Lendo</option>
            <option>Concluído</option>
          </NativeSelect>
        </label>
      </div>
    </article>
  );
}