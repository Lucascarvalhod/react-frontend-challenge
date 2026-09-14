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
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06em] text-(--color-text-subtle) uppercase">Livro</th>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06em] text-(--color-text-subtle) uppercase">Autor</th>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06em] text-(--color-text-subtle) uppercase">Publicação</th>
            <th className="bg-muted [px-4.5] py-3.75 text-[11px] font-bold tracking-[0.06em] text-(--color-text-subtle) uppercase">Status</th>
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
  );
}

function ShelfRow({ book, onStatusChange, onRemove }: { book: Book; onStatusChange: Props['onStatusChange']; onRemove: Props['onRemove'] }) {
  return (
    <tr className="[&:last-child_td]:border-b-0 [&_td]:border-b [&_td]:border-(--color-border-subtle) [&_td]:[px-4.5] [&_td]:py-3.75">
      <td className="flex min-w-55 items-center gap-3.25">
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