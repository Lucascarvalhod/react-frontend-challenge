import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useBookSearch } from '@/hooks/use-book-search';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useBookSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('atualiza query com debounce após alterar o input', () => {
    const { result } = renderHook(() => useBookSearch(), {
      wrapper: createWrapper(),
    });

    expect(result.current.input).toBe('');
    expect(result.current.query).toBe('');

    act(() => {
      result.current.setInput('Duna');
    });

    expect(result.current.input).toBe('Duna');
    expect(result.current.query).toBe('');

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current.query).toBe('Duna');
  });

  it('atualiza a query imediatamente ao enviar o formulário', () => {
    const { result } = renderHook(() => useBookSearch(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setInput('Fundação');
    });

    expect(result.current.query).toBe('');

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    act(() => {
      result.current.submit(fakeEvent);
    });

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.query).toBe('Fundação');
  });
});
