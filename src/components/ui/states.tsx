import { Library } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  return <div className="loading">{message}</div>;
}
export function ErrorState({ message = 'Não foi possível completar a requisição.' }: { message?: string }) {
  return (
    <div className="error-state">
      <h2>Algo deu errado</h2>
      <p>{message}</p>
    </div>
  );
}
export function EmptyState() {
  return (
    <div className="empty">
      <Library size={40} />
      <h2>Sua estante está vazia</h2>
      <p>Descubra um livro novo e guarde-o aqui.</p>
      <Link to="/" className="primary">
        Explorar livros
      </Link>
    </div>
  );
}