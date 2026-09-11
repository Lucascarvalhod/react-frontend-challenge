import type { Book, BookSearchResponse, GoogleVolume } from '@/types/book';

const FALLBACK_AUTHORS = ['Autor desconhecido'];
const DEFAULT_SEARCH_QUERY = 'subject:fiction';

function mapVolumeToBook({ id, volumeInfo }: GoogleVolume): Book {
  return {
    id,
    title: volumeInfo.title ?? 'Sem título',
    authors: volumeInfo.authors ?? FALLBACK_AUTHORS,
    publishedDate: volumeInfo.publishedDate ?? '—',
    description: volumeInfo.description ?? 'Sinopse indisponível.',
    publisher: volumeInfo.publisher ?? '—',
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') ?? '',
    previewLink: volumeInfo.previewLink,
  };
}

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GOOGLE_BOOKS_API_KEY ausente');
}


export async function searchBooks(
  query: string,
  printType = 'all',
  orderBy = 'relevance',
  startIndex = 0,
  signal?: AbortSignal,
): Promise<{ books: Book[]; totalItems: number }> {
  const searchQuery = query.trim() || DEFAULT_SEARCH_QUERY;

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&printType=${printType}&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=10&key=${API_KEY}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Google Books API: ${response.status}`);
  }

  const data = (await response.json()) as BookSearchResponse;

  const books = (data.items ?? []).map(mapVolumeToBook);

  return {
    totalItems: data.totalItems ?? 0,
    books,
  };
}

export async function getBook(id: string, signal?: AbortSignal): Promise<Book> {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}?key=${API_KEY}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Google Books API: ${response.status}`);
  }

  const volume = (await response.json()) as GoogleVolume;

  return mapVolumeToBook(volume);
}
