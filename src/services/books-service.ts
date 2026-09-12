import type { Book, BookResult, BookSearchResponse, BookSearchResult, GoogleVolume } from '@/types/book';
import { getFallbackBook, getFallbackBooks } from '@/services/books-fallback';

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
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') ?? null,
    previewLink: volumeInfo.previewLink,
  };
}

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const hasApiKey = () => Boolean(API_KEY);

function withKey(url: string) {
  return API_KEY ? `${url}&key=${API_KEY}` : url;
}

export async function searchBooks(
  query: string,
  printType = 'all',
  orderBy = 'relevance',
  startIndex = 0,
  signal?: AbortSignal,
): Promise<BookSearchResult> {
  const searchQuery = query.trim() || DEFAULT_SEARCH_QUERY;

  if (!hasApiKey()) {
    return { books: getFallbackBooks(), totalItems: getFallbackBooks().length, isFallback: true };
  }

  try {
    const response = await fetch(
      withKey(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&printType=${printType}&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=10`,
      ),
      { signal },
    );

    if (!response.ok) {
      throw new Error(`Google Books API: ${response.status}`);
    }

    const data = (await response.json()) as BookSearchResponse;
    const books = (data.items ?? []).map(mapVolumeToBook);

    return { totalItems: data.totalItems ?? 0, books, isFallback: false };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    return { books: getFallbackBooks(), totalItems: getFallbackBooks().length, isFallback: true };
  }
}

export async function getBook(id: string, signal?: AbortSignal): Promise<BookResult> {
  if (!hasApiKey()) {
    return { book: getFallbackBook(id), isFallback: true };
  }

  try {
    const response = await fetch(
      withKey(`https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}?`),
      { signal },
    );

    if (!response.ok) {
      throw new Error(`Google Books API: ${response.status}`);
    }

    const volume = (await response.json()) as GoogleVolume;

    return { book: mapVolumeToBook(volume), isFallback: false };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    return { book: getFallbackBook(id), isFallback: true };
  }
}

