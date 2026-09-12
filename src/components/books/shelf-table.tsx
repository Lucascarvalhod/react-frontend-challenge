import { X } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types/book';
import { BookCover } from '@/components/books/book-cover';

type Props = {
  books: Book[];
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
};

export function ShelfTable({ books, onStatusChange, onRemove }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Autor</th>
            <th>Publicação</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <ShelfRow key={book.id} book={book} onStatusChange={onStatusChange} onRemove={onRemove} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShelfRow({ book, onStatusChange, onRemove }: { book: Book; onStatusChange: Props['onStatusChange']; onRemove: Props['onRemove'] }) {
  return (
    <tr>
      <td className="book-cell">
        <BookCover src={book.thumbnail} alt={`Capa de ${book.title}`} />
        <strong>{book.title}</strong>
      </td>
      <td>{book.authors.join(', ')}</td>
      <td>{book.publishedDate}</td>
      <td>
        <select
          className="status"
          value={book.status}
          onChange={(event) => onStatusChange(book.id, event.target.value as ReadingStatus)}
        >
          <option>Quero ler</option>
          <option>Lendo</option>
          <option>Concluído</option>
        </select>
      </td>
      <td>
        <button className="icon-button" onClick={() => onRemove(book.id)} aria-label={`Remover ${book.title}`}>
          <X size={17} />
        </button>
      </td>
    </tr>
  );
}