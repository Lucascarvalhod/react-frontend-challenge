import type { Book } from '@/types/book';

const FALLBACK_BOOKS: Book[] = [
  {
    id: 'fallback-duna',
    title: 'Duna',
    authors: ['Frank Herbert'],
    publishedDate: '1965',
    description: 'Em um futuro distante, o jovem Paul Atreides luta pelo controle do planeta deserto Arrakis.',
    publisher: 'Editora Aleph',
    thumbnail: '',
    previewLink: undefined,
  },
  {
    id: 'fallback-1984',
    title: '1984',
    authors: ['George Orwell'],
    publishedDate: '1949',
    description: 'Um retrato sombrio de um estado totalitário que vigia e controla todos os aspectos da vida.',
    publisher: 'Companhia das Letras',
    thumbnail: '',
    previewLink: undefined,
  },
  {
    id: 'fallback-hobbit',
    title: 'O Hobbit',
    authors: ['J.R.R. Tolkien'],
    publishedDate: '1937',
    description: 'Bilbo Bolseiro é convocado para uma aventura inesperada rumo à Montanha Solitária.',
    publisher: 'HarperCollins',
    thumbnail: '',
    previewLink: undefined,
  },
];

export function getFallbackBooks(): Book[] {
  return FALLBACK_BOOKS;
}

export function getFallbackBook(id: string): Book {
  return FALLBACK_BOOKS.find((book) => book.id === id) ?? FALLBACK_BOOKS[0];
}
