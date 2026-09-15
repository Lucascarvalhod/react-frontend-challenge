import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AccountMenu } from '@/components/auth/account-menu';
import { Button } from '@/components/ui/button';

type MobileMenuSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenuSidebar({ isOpen, onClose }: MobileMenuSidebarProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-19 bottom-0 z-10 min-[761px]:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/25"
        aria-label="Fechar menu"
        onClick={onClose}
      />
      <aside
        id="mobile-menu-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className="absolute top-0 right-0 flex h-full w-[min(340px,88vw)] flex-col bg-card p-5 shadow-raised"
      >
        <div className="flex items-center justify-between border-b border-[(--color-border-subtle)] pb-4">
          <p className="text-[12px] font-bold tracking-[0.12em] text-(--color-text-muted)">MENU</p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Fechar menu"
            title="Fechar menu"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </div>
        <div className="border-b border-[(--color-border-subtle)] py-4">
          <AccountMenu />
        </div>
        <nav className="pt-3">
          <Link
            to="/shelf"
            className="flex items-center gap-3 px-2 py-3 text-[14px] font-bold text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={onClose}
          >
            <Menu size={18} />
            Minha estante
          </Link>
        </nav>
      </aside>
    </div>
  );
}