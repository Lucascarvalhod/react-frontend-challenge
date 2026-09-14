import type { Book, BookResult, BookSearchResponse, BookSearchResult, GoogleVolume } from '@/types/book';

const FALLBACK_AUTHORS = ['Autor desconhecido'];
const DEFAULT_SEARCH_QUERY = 'subject:fiction';
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

function mapVolumeToBook({ id, volumeInfo }: GoogleVolume): Book {
  return {
    id,
    title: volumeInfo.title ?? 'Sem título',
    authors: volumeInfo.authors ?? FALLBACK_AUTHORS,
    publishedDate: volumeInfo.publishedDate ?? '—',
    description: volumeInfo.description ?? 'Sinopse indisponível.',
    publisher: volumeInfo.publisher ?? '—',
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') ?? null,
    previewLink: volumeInfo.previewLink,
  };
}

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

function createApiUrl(path = '') {
  const url = new URL(`${GOOGLE_BOOKS_API_URL}${path}`);

  if (API_KEY) {
    url.searchParams.set('key', API_KEY);
  }

  return url;
}

function getApiError(status: number) {
  if (status === 404) return new Error('Livro não encontrado.');
  if (status === 429) return new Error('Limite de requisições da Google Books API atingido. Tente novamente em instantes.');
  if (status >= 500) return new Error('A Google Books API está indisponível. Tente novamente em instantes.');

  return new Error('Não foi possível buscar os livros solicitados.');
}

export async function searchBooks(
  query: string,
  printType = 'all',
  orderBy = 'relevance',
  startIndex = 0,
  signal?: AbortSignal,
): Promise<BookSearchResult> {
  const searchQuery = query.trim() || DEFAULT_SEARCH_QUERY;

  try {
    const url = createApiUrl();
    url.searchParams.set('q', searchQuery);
    url.searchParams.set('printType', printType);
    url.searchParams.set('orderBy', orderBy);
    url.searchParams.set('startIndex', String(startIndex));
    url.searchParams.set('maxResults', '10');
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw getApiError(response.status);
    }

    const data = (await response.json()) as BookSearchResponse;
    const books = (data.items ?? []).map(mapVolumeToBook);

    return { totalItems: data.totalItems ?? 0, books };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    if (error instanceof TypeError) throw new Error('Não foi possível conectar à Google Books API.');
    if (error instanceof Error) throw error;
    throw new Error('Não foi possível conectar à Google Books API.');
  }
}

export async function getBook(id: string, signal?: AbortSignal): Promise<BookResult> {
  try {
    const response = await fetch(createApiUrl(`/${encodeURIComponent(id)}`), { signal });

    if (!response.ok) {
      throw getApiError(response.status);
    }

    const volume = (await response.json()) as GoogleVolume;

    return { book: mapVolumeToBook(volume) };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    if (error instanceof TypeError) throw new Error('Não foi possível conectar à Google Books API.');
    if (error instanceof Error) throw error;
    throw new Error('Não foi possível conectar à Google Books API.');
  }
}

