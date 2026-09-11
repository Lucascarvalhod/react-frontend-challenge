import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BookCard } from '@/components/books/book-card';
import { BookDetailContent } from '@/components/books/book-detail-content';
import { BookSearchResults } from '@/components/books/book-search-results';
import { ShelfTable } from '@/components/books/shelf-table';
import type { Book } from '@/types/book';

const navigate = vi.fn();
const libraryState = { books: [] as Book[] };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => navigate };
});

vi.mock('@/store/library-store', () => ({
  useLibraryStore: (selector: (state: typeof libraryState) => unknown) => selector(libraryState),
}));

const book: Book = {
  id: 'duna',
  title: 'Duna',
  authors: ['Frank Herbert'],
  publishedDate: '1965',
  description: '<strong>Uma história</strong><script>alert(1)</script>',
  publisher: 'Editora Aleph',
  thumbnail: '/duna.jpg',
  previewLink: 'https://example.com/preview',
  status: 'Quero ler',
};

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('componentes de livros', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    libraryState.books = [];
  });

  it('renderiza BookCard e navega ao clicar no card ou no botão de detalhes', () => {
    renderWithRouter(<BookCard book={book} />);

    expect(screen.getByRole('img', { name: 'Capa de Duna' })).toHaveAttribute('src', '/duna.jpg');
    expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('article'));
    expect(navigate).toHaveBeenCalledWith('/book/duna');

    fireEvent.click(screen.getByRole('button', { name: 'Ver detalhes' }));
    expect(navigate).toHaveBeenCalledTimes(2);
  });

  it('exibe o marcador quando o livro está salvo', () => {
    libraryState.books = [book];
    renderWithRouter(<BookCard book={book} />);

    expect(screen.getByText('Na estante')).toBeInTheDocument();
  });

  it('sanitiza a descrição e controla o estado de salvamento do detalhe', () => {
    const onToggleSaved = vi.fn();
    renderWithRouter(<BookDetailContent book={book} saved={false} onToggleSaved={onToggleSaved} />);

    expect(screen.getByText('Uma história')).toBeInTheDocument();
    expect(screen.queryByText('alert(1)')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar à estante' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver prévia' })).toHaveAttribute('href', book.previewLink);
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar à estante' }));
    expect(onToggleSaved).toHaveBeenCalledOnce();

    renderWithRouter(<BookDetailContent book={book} saved onToggleSaved={onToggleSaved} />);
    expect(screen.getByRole('button', { name: 'Remover da estante' })).toBeInTheDocument();
  });

  it('renderiza loading, erro, resultados e regras de paginação', () => {
    const onPreviousPage = vi.fn();
    const onNextPage = vi.fn();
    const tenBooks = Array.from({ length: 10 }, (_, index) => ({ ...book, id: `book-${index}`, title: `Livro ${index}` }));

    const { rerender } = renderWithRouter(
      <BookSearchResults
        query="Duna"
        page={1}
        isFetching
        isError={false}
        error={null}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />,
    );
    expect(screen.getByText('Resultados para “Duna”')).toBeInTheDocument();
    expect(screen.getByText('Buscando na biblioteca...')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <BookSearchResults
          query="Duna"
          page={1}
          isFetching={false}
          isError
          error={new Error('Serviço indisponível')}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Serviço indisponível')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <BookSearchResults
          query=""
          page={0}
          books={tenBooks}
          isFetching={false}
          isError={false}
          error={null}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Sugestões para começar')).toBeInTheDocument();
    expect(screen.getByText('Página 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(onNextPage).toHaveBeenCalledOnce();
  });

  it('altera status e remove livros da estante', () => {
    const onStatusChange = vi.fn();
    const onRemove = vi.fn();
    render(<ShelfTable books={[book]} onStatusChange={onStatusChange} onRemove={onRemove} />);

    const status = screen.getByRole('combobox');
    fireEvent.change(status, { target: { value: 'Lendo' } });
    fireEvent.click(screen.getByRole('button', { name: 'Remover Duna' }));

    expect(onStatusChange).toHaveBeenCalledWith('duna', 'Lendo');
    expect(onRemove).toHaveBeenCalledWith('duna');
    expect(screen.getByRole('columnheader', { name: 'Livro' })).toBeInTheDocument();
  });
});