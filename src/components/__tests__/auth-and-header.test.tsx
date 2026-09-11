import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from '@/components/header';
import { LoginForm } from '@/components/auth/login-form';

const loginFormState = {
  email: '',
  password: '',
  error: '',
  setEmail: vi.fn(),
  setPassword: vi.fn(),
  submit: vi.fn((event: React.FormEvent) => event.preventDefault()),
};
const signOut = vi.fn();

vi.mock('@/hooks/use-login-form', () => ({
  useLoginForm: () => loginFormState,
}));

vi.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({ signOut }),
  demoUser: { initials: 'LC', name: 'Lucas Carvalho', email: 'lucas@email.com' },
}));

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('autenticação e cabeçalho', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    loginFormState.email = '';
    loginFormState.password = '';
    loginFormState.error = '';
  });

  it('propaga mudanças dos campos e submete o formulário de login', () => {
    renderWithRouter(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'leitor@teste.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'segredo' } });
    fireEvent.submit(screen.getByRole('button', { name: /Entrar/ }).closest('form')!);

    expect(loginFormState.setEmail).toHaveBeenCalledWith('leitor@teste.com');
    expect(loginFormState.setPassword).toHaveBeenCalledWith('segredo');
    expect(loginFormState.submit).toHaveBeenCalled();
  });

  it('exibe o erro devolvido pelo hook de login', () => {
    loginFormState.error = 'Credenciais inválidas';
    renderWithRouter(<LoginForm />);

    expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
  });

  it('renderiza os links principais e dispara logout', () => {
    renderWithRouter(<Header />);

    expect(screen.getByRole('link', { name: 'Descobrir' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Minha estante' })).toHaveAttribute('href', '/shelf');
    expect(screen.getByText('Lucas Carvalho')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /LC/ }));
    expect(signOut).toHaveBeenCalledOnce();
  });
});