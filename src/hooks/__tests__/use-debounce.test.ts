import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from '@/hooks/use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('retorna o valor inicial imediatamente', () => {
    const { result } = renderHook(() => useDebounce('inicial', 400));
    expect(result.current).toBe('inicial');
  });

  it('adia a atualização do valor até o tempo estipulado', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'inicial' },
    });

    rerender({ value: 'novo valor' });
    expect(result.current).toBe('inicial');

    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(result.current).toBe('inicial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('novo valor');
  });
});
