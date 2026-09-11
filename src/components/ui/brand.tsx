import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <Link to="/" className={`brand${large ? ' large' : ''}`}>
      <span className="brand-mark">
        <BookOpen />
      </span>
      <span>Libris</span>
    </Link>
  );
}