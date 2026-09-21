import { useBroken } from '@/hooks/use-broken';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  src: string | null;
  alt: string;
  className?: string;
};

export function BookCover({ src, alt, className }: Props) {
 
  const { broken, setBroken } = useBroken();

  if (!src || broken) {
    return (
      <div
        className={cn('book-cover-placeholder flex h-full w-full items-center justify-center bg-muted text-[(--color-text-subtle)] [&_svg]:h-[32%] [&_svg]:w-[32%]', className)}
        role="img"
        aria-label={alt}
      >
        <BookOpen />
      </div>
    );
  }

  return <img src={src} alt={alt} className={cn('h-full w-full object-fill', className)} onError={() => setBroken(true)} />;
}
