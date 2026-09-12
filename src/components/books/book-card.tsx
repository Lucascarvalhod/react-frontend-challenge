import { Bookmark, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '@/types/book';
import { useLibraryStore } from '@/store/library-store';
import { BookCover } from '@/components/books/book-cover';

export function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();
  const saved = useLibraryStore((state) => state.books.some((item) => item.id === book.id));
  return (
    <article className="book-card" onClick={() => navigate(`/book/${book.id}`)}>
      <div className="cover">
        <BookCover src={book.thumbnail} alt={`Capa de ${book.title}`} />
        <button
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/book/${book.id}`);
          }}
          aria-label="Ver detalhes"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.authors.join(', ')}</p>
        <span>{book.publishedDate}</span>
        {saved && (
          <small>
            <Bookmark size={12} /> Na estante
          </small>
        )}
      </div>
    </article>
  );
}