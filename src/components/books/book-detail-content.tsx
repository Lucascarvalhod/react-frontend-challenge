import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import type { Book } from '@/types/book';
import { BookCover } from '@/components/books/book-cover';
import { Button } from '@/components/ui/button';

type Props = {
  book: Book;
  saved: boolean;
  onToggleSaved: () => void;
};

export function BookDetailContent({ book, saved, onToggleSaved }: Props) {
  return (
    <main className="mx-auto max-w-275 [px-8] pt-25 pb-20 max-[760px]:px-5 max-[760px]:pt-18.75">
      <Link to="/" className="text-[13px] text-(--color-accent-text)">
        ← Voltar para descoberta
      </Link>
      <div className="mx-auto my-14 grid max-w-205 grid-cols-[270px_1fr] gap-18 max-[760px]:mt-8.75 max-[760px]:grid-cols-1 max-[760px]:gap-8.75">
        <div className="h-97.5 w-67.5 overflow-hidden rounded-lg shadow-[14px_18px_25px_var(--shadow-cover)] max-[760px]:h-72.5 max-[760px]:w-50">
          <BookCover src={book.thumbnail} alt={`Capa de ${book.title}`} />
        </div>
        <div>
          <p className="mb-3.75 flex items-center gap-1.75 text-[11px] font-bold tracking-[0.16em] text-(--color-accent-text)">DETALHES DO LIVRO</p>
          <h1 className="mb-3.25 font-serif text-[52px] leading-[1.04] tracking-[-0.04em] text-(--color-heading) max-[760px]:text-[40px]">{book.title}</h1>
          <p className="text-[18px] text-(--color-accent-text)">{book.authors.join(', ')}</p>
          <div className="mb-6.25 flex gap-5 border-b border-(--color-border-subtle) pb-5.5 text-[12px] text-(--color-text-subtle)">
            <span>{book.publishedDate}</span>
            <span>{book.publisher}</span>
          </div>
          <p className="text-[15px] leading-[1.8] text-(--color-text-muted)" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.description) }} />
          <div className="mt-7.5 flex gap-2.5">
            <Button variant={saved ? 'outline' : 'default'} onClick={onToggleSaved}>
              {saved ? 'Remover da estante' : 'Adicionar à estante'}
            </Button>
            {book.previewLink && (
              <Button asChild variant="outline">
                <a href={book.previewLink} target="_blank" rel="noreferrer">Ver prévia</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}