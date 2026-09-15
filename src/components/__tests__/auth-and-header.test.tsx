import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from '@/components/header';
import { LoginForm } from '@/components/auth/login-form';
import * as authHook from '@/hooks/use-auth';
import { useAppStore } from '@/store/app-store';

const signInMock = vi.fn();
const signOutMock = vi.fn();

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('autenticação e cabeçalho', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.setState({ theme: 'light', isHamburgerMenuOpen: false });
    vi.spyOn(authHook, 'useAuth').mockReturnValue({
      signIn: signInMock,
      signOut: signOutMock,
      error: '',
    });
  });

  it('exibe mensagens de validação ao preencher dados inválidos', async () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument();
      expect(screen.getByText('Senha deve ter mais de 6 caracteres')).toBeInTheDocument();
    });

    expect(signInMock).not.toHaveBeenCalled();
  });

  it('submete o formulário com dados válidos e aciona signIn', async () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(emailInput, { target: { value: 'leitor@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: 'segredo123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith({
        email: 'leitor@teste.com',
        password: 'segredo123',
      });
    });
  });

  it('exibe erro retornado pela autenticação global', () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({
      signIn: signInMock,
      signOut: signOutMock,
      error: 'Credenciais inválidas',
    });

    renderWithRouter(<LoginForm />);

    expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
  });

  it('renderiza os links principais e dispara logout', () => {
    renderWithRouter(<Header />);

    expect(screen.getByRole('link', { name: 'Descobrir' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Minha estante' })).toHaveAttribute('href', '/shelf');
    expect(screen.getByText('Lucas Carvalho')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /LC/ }));
    expect(signOutMock).toHaveBeenCalledOnce();
  });

  it('alterna o tema pelo cabeçalho e disponibiliza o controle no login', () => {
    const { unmount } = renderWithRouter(<Header />);

    const themeToggle = screen.getByRole('button', { name: 'Ativar tema escuro' });
    fireEvent.click(themeToggle);
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument();

    unmount();
    renderWithRouter(<LoginForm />);
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument();
  });

  it('abre e fecha a sidebar mobile pelo botão, clique externo, Escape e navegação', () => {
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole('button', { name: 'Abrir menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    const sidebar = screen.getByRole('dialog', { name: 'Menu de navegação' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(within(sidebar).getByText('Lucas Carvalho')).toBeInTheDocument();
    expect(within(sidebar).getByRole('link', { name: 'Minha estante' })).toHaveAttribute('href', '/shelf');

    fireEvent.click(screen.getAllByRole('button', { name: 'Fechar menu' })[0]);
    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'Minha estante' }));
    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();
  });
});