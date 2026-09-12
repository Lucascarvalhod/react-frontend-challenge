import { useEffect, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '@/services/books-service';
import { useDebounce } from '@/hooks/use-debounce';

export function useBookSearch() {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const [printType, setPrintType] = useState('all');
  const [orderBy, setOrderBy] = useState('relevance');
  const [page, setPage] = useState(0);

  const debouncedInput = useDebounce(input, 400);

  useEffect(() => {
    setPage(0);
    setQuery(debouncedInput);
  }, [debouncedInput]);

  const search = useQuery({
    queryKey: ['books', query, printType, orderBy, page],
    queryFn: ({ signal }) => searchBooks(query, printType, orderBy, page * 10, signal),
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    setPage(0);
    setQuery(input);
  }

  function changePrintType(value: string) {
    setPrintType(value);
    setPage(0);
  }

  function changeOrderBy(value: string) {
    setOrderBy(value);
    setPage(0);
  }

  return {
    ...search,
    query,
    input,
    printType,
    orderBy,
    page,
    setInput,
    submit,
    changePrintType,
    changeOrderBy,
    previousPage: () => setPage((current) => Math.max(0, current - 1)),
    nextPage: () => setPage((current) => current + 1),
  };
}