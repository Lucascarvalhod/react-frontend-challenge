import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, demoUser } from '@/hooks/use-auth';
import { Brand } from '@/components/ui/brand';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  const { signOut } = useAuth();
  return (
    <header className="flex h-19 items-center justify-between border-b border-[(--color-border-subtle)] bg-card px-[6vw] max-[760px]:px-5">
      <Brand />
      <nav className="ml-25 flex gap-9.5 text-[14px] text-(--color-text-muted) max-[760px]:hidden">
        <Link to="/" className="font-bold text-foreground">Descobrir</Link>
        <Link to="/shelf">Minha estante</Link>
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="gap-2.5 text-[13px] text-(--color-text-muted)" onClick={signOut}>
          {demoUser.initials} <span>{demoUser.name}</span>
          <LogOut size={15} />
        </Button>
      </div>
    </header>
  );
}