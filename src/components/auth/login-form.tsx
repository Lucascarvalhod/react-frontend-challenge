import { ChevronRight } from 'lucide-react';
import { Brand } from '@/components/ui/brand';
import { useLoginForm } from '@/hooks/use-login-form';

export function LoginForm() {
  const { email, password, error, setEmail, setPassword, submit } = useLoginForm();

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Brand large />
        <p className="eyebrow">BEM-VINDO DE VOLTA</p>
        <h1>
          Sua próxima leitura
          <br />
          <em>começa aqui.</em>
        </h1>
        <p className="muted">Entre para descobrir livros e organizar sua estante pessoal.</p>
        <form onSubmit={submit}>
          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@email.com"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="•••••••"
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="primary full">
            Entrar <ChevronRight size={17} />
          </button>
        </form>
      </div>
    </main>
  );
}