import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '@/store/app-store';
import type { Book } from '@/types/book';

const book: Book = {
  id: 'duna',
  title: 'Duna',
  authors: ['Frank Herbert'],
  publishedDate: '1965',
  description: 'Uma história.',
  publisher: 'Editora Aleph',
  thumbnail: null,
};

describe('useAppStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAppStore.setState({ books: [], theme: 'light' });
  });

  afterEach(() => {
    localStorage.clear();
    useAppStore.setState({ books: [], theme: 'light' });
  });

  it('persiste biblioteca e tema na mesma entrada de storage', () => {
    useAppStore.getState().addBook(book);
    useAppStore.getState().setTheme('dark');

    expect(JSON.parse(localStorage.getItem('libris-library') ?? '{}')).toMatchObject({
      state: { books: [{ id: 'duna', status: 'Quero ler' }], theme: 'dark' },
    });
  });

  it('rehidrata estantes persistidas antes da inclusão do tema', async () => {
    localStorage.setItem('libris-library', JSON.stringify({ state: { books: [book] }, version: 0 }));

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().books).toEqual([book]);
    expect(useAppStore.getState().theme).toBe('light');
  });
});