import { ChevronRight } from 'lucide-react';
import { Brand } from '@/components/ui/brand';
import { useLoginForm } from '@/hooks/use-login-form';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return String(error || '');
}

export function LoginForm() {
  const { form, error } = useLoginForm();

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field) => (
              <label>
                Email
                <input
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="voce@email.com"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="error">{getErrorMessage(field.state.meta.errors[0])}</p>
                )}
              </label>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <label>
                Senha
                <input
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="•••••••"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="error">{getErrorMessage(field.state.meta.errors[0])}</p>
                )}
              </label>
            )}
          />
          {error && <p className="error">{error}</p>}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit || isSubmitting} className="primary full">
                {isSubmitting ? 'Entrando...' : 'Entrar'} <ChevronRight size={17} />
              </button>
            )}
          />
        </form>
      </div>
    </main>
  );
}