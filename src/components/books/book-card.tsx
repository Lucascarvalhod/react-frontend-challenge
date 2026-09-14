import { Bookmark, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '@/types/book';
import { useAppStore } from '@/store/app-store';
import { BookCover } from '@/components/books/book-cover';
import { Button } from '@/components/ui/button';

export function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();
  const saved = useAppStore((state) => state.books.some((item) => item.id === book.id));
  return (
    <article className="flex min-w-0 gap-[4.25px] rounded-[14px] border border-transparent p-3.25 transition-[background-color,border-color,box-shadow] hover:border-border hover:bg-card hover:shadow-soft" onClick={() => navigate(`/book/${book.id}`)}>
      <div className="relative h-[164px] w-[112px] shrink-0 overflow-hidden rounded-md bg-muted shadow-cover">
        <BookCover src={book.thumbnail} alt={`Capa de ${book.title}`} />
        <Button
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/book/${book.id}`);
          }}
          aria-label="Ver detalhes"
          variant="secondary"
          size="icon-sm"
          className="absolute right-1.75 bottom-1.75 rounded-full bg-card text-[(--color-accent-text)]"
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="min-w-0 pt-2">
        <h3 className="mb-2.25 font-serif text-[18px] leading-[1.18] text-[(--color-heading)]">{book.title}</h3>
        <p className="mb-2.5 text-[12px] text-[(--color-text-muted)]">{book.authors.join(', ')}</p>
        <span className="text-[11px] text-[(--color-text-subtle)]">{book.publishedDate}</span>
        {saved && (
          <small className="mt-4.5 flex gap-1 text-[10px] text-[(--color-accent-text)]">
            <Bookmark size={12} /> Na estante
          </small>
        )}
      </div>
    </article>
  );
}