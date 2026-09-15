import { ChevronRight } from 'lucide-react';
import { Brand } from '@/components/ui/brand';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLoginForm } from '@/hooks/use-login-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
    <main className="grid min-h-screen place-items-center bg-[(--color-page-muted)]">
      <Card className="w-[min(430px,calc(100%-34px))] p-12 max-[760px]:p-8">
        <div className="flex items-start justify-between gap-5">
          <Brand large />
          <ThemeToggle />
        </div>
        <p className="mb-3.75 flex items-center gap-1.75 text-[11px] font-bold tracking-[0.16em] text-(--color-accent-text)">BEM-VINDO DE VOLTA</p>
        <h1 className="font-serif text-[38px] leading-[1.04] tracking-[-0.04em] text-(--color-heading)">
          Sua próxima leitura
          <br />
          <em>começa aqui.</em>
        </h1>
        <p className="my-4 mb-7 text-[14px] text-(--color-text-subtle)">Entre para descobrir livros e organizar sua estante pessoal.</p>
        <form className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field) => (
              <label className="flex flex-col gap-1.75 text-[12px] font-bold text-(--color-text-muted)">
                Email
                <Input
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="voce@email.com"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="m-0 text-[12px] text-destructive">{getErrorMessage(field.state.meta.errors[0])}</p>
                )}
              </label>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <label className="flex flex-col gap-1.75 text-[12px] font-bold text-(--color-text-muted)">
                Senha
                <Input
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="•••••••"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="m-0 text-[12px] text-destructive">{getErrorMessage(field.state.meta.errors[0])}</p>
                )}
              </label>
            )}
          />
          {error && <p className="m-0 text-[12px] text-destructive">{error}</p>}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="mt-2 w-full">
                {isSubmitting ? 'Entrando...' : 'Entrar'} <ChevronRight size={17} />
              </Button>
            )}
          />
        </form>
      </Card>
    </main>
  );
}