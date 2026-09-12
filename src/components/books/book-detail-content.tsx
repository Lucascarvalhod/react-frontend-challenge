import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import type { Book } from '@/types/book';
import { BookCover } from '@/components/books/book-cover';

type Props = {
  book: Book;
  saved: boolean;
  onToggleSaved: () => void;
};

export function BookDetailContent({ book, saved, onToggleSaved }: Props) {
  return (
    <main className="shell detail">
      <Link to="/" className="back">
        ← Voltar para descoberta
      </Link>
      <div className="detail-grid">
        <div className="detail-cover">
          <BookCover src={book.thumbnail} alt={`Capa de ${book.title}`} />
        </div>
        <div>
          <p className="eyebrow">DETALHES DO LIVRO</p>
          <h1>{book.title}</h1>
          <p className="author">{book.authors.join(', ')}</p>
          <div className="meta">
            <span>{book.publishedDate}</span>
            <span>{book.publisher}</span>
          </div>
          <p className="description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.description) }} />
          <div className="actions">
            <button className={saved ? 'secondary' : 'primary'} onClick={onToggleSaved}>
              {saved ? 'Remover da estante' : 'Adicionar à estante'}
            </button>
            {book.previewLink && (
              <a href={book.previewLink} target="_blank" rel="noreferrer" className="secondary">
                Ver prévia
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}