import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AccountMenu } from '@/components/auth/account-menu';
import { MobileMenuSidebar } from '@/components/mobile-menu-sidebar';
import { Brand } from '@/components/ui/brand';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { useHamburger } from '@/hooks/use-hamburger';

export function Header() {
  const { isOpen, closeMenu, toggleMenu } = useHamburger();

  return (
    <>
      <header className="relative z-20 flex h-19 items-center justify-between border-b border-[(--color-border-subtle)] bg-card px-[6vw] max-[760px]:px-5">
        <Brand />
        <nav className="ml-25 flex gap-9.5 text-[14px] text-(--color-text-muted) max-[760px]:hidden">
          <Link to="/" className="font-bold text-foreground">Descobrir</Link>
          <Link to="/shelf">Minha estante</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="max-[760px]:hidden">
            <AccountMenu />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="min-[761px]:hidden"
            aria-label="Abrir menu"
            aria-controls="mobile-menu-sidebar"
            aria-expanded={isOpen}
            title="Abrir menu"
            onClick={toggleMenu}
          >
            <Menu size={20} />
          </Button>
        </div>
      </header>
      <MobileMenuSidebar isOpen={isOpen} onClose={closeMenu} />
    </>
  );
}