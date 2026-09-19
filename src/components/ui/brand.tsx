import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em]${large ? ' mb-12.5 text-[28]' : ''}`}
    >
      <span className={`grid place-items-center rounded-[10px] bg-primary text-primary-foreground${large ? ' size-10.5' : ' size-8.5'}`}>
        <BookOpen className={large ? 'size-5.75' : 'size-4.75'} />
      </span>
      <span>Libris</span>
    </Link>
  );
}