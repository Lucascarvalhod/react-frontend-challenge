import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';

export function useHamburger() {
  const isOpen = useAppStore((state) => state.isHamburgerMenuOpen);
  const closeMenu = useAppStore((state) => state.closeHamburgerMenu);
  const toggleMenu = useAppStore((state) => state.toggleHamburgerMenu);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu, isOpen]);

  return { isOpen, closeMenu, toggleMenu };
}