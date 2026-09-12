import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, demoUser } from '@/hooks/use-auth';
import { Brand } from '@/components/ui/brand';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  const { signOut } = useAuth();
  return (
    <header>
      <Brand />
      <nav>
        <Link to="/">Descobrir</Link>
        <Link to="/shelf">Minha estante</Link>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button className="user-pill" onClick={signOut}>
          {demoUser.initials} <span>{demoUser.name}</span>
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}