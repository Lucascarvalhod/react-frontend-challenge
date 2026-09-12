import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useTheme } from '@/hooks/use-theme';
import { useAppStore } from '@/store/app-store';

describe('useTheme', () => {
  beforeEach(() => {
    useAppStore.setState({ theme: 'light' });
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  });

  afterEach(() => {
    useAppStore.setState({ theme: 'light' });
  });

  it('sincroniza o tema da store com o elemento raiz do documento', async () => {
    renderHook(() => useTheme());

    act(() => useAppStore.getState().setTheme('dark'));

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
      expect(document.documentElement.style.colorScheme).toBe('dark');
    });
  });
});