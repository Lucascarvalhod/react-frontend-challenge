import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';

export function useTheme() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
}