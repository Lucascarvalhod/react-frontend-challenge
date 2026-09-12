import { useState } from 'react';
import { BookOpen } from 'lucide-react';

type Props = {
  src: string | null;
  alt: string;
  className?: string;
};

export function BookCover({ src, alt, className }: Props) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className={['book-cover-placeholder', className].filter(Boolean).join(' ')} role="img" aria-label={alt}>
        <BookOpen />
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setBroken(true)} />;
}
