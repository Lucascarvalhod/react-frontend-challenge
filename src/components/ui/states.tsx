import { Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  return <div className="p-20 text-center text-(--color-text-subtle)">{message}</div>;
}
export function ErrorState({ message = 'Não foi possível completar a requisição.' }: { message?: string }) {
  return (
    <div className="border border-dashed border-border bg-card px-5 py-17.5 text-center text-(--color-text-subtle)">
      <h2 className="mt-0 mb-1.25 font-serif text-[24px] text-(--color-heading)">Algo deu errado</h2>
      <p className="m-0 text-[14px]">{message}</p>
    </div>
  );
}
export function EmptyState() {
  return (
    <div className="rounded-[13px] border border-dashed border-border bg-card px-5 py-17.5 text-center text-(--color-text-subtle)">
      <Library size={40} className="mx-auto text-(--color-accent-text)" />
      <h2 className="mt-3.5 mb-1.25 font-serif text-[24px] text-(--color-heading)">Sua estante está vazia</h2>
      <p className="mb-5.5 text-[14px]">Descubra um livro novo e guarde-o aqui.</p>
      <Button asChild>
        <Link to="/">Explorar livros</Link>
      </Button>
    </div>
  );
}