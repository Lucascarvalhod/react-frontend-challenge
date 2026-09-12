import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLoginForm } from '@/hooks/use-login-form';
import * as authHook from '@/hooks/use-auth';

function createWrapper() {
  return ({ children }: { children: ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;
}

describe('useLoginForm', () => {
  const signInMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(authHook, 'useAuth').mockReturnValue({
      signIn: signInMock,
      signOut: vi.fn(),
      error: '',
    });
  });

  it('inicializa o formulário com valores vazios', () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper() });

    expect(result.current.form.state.values).toEqual({
      email: '',
      password: '',
    });
  });

  it('valida erro de email inválido', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.form.setFieldValue('email', 'email-invalido');
      result.current.form.validate('change');
    });

    expect(result.current.form.state.fieldMeta.email?.errors.length).toBeGreaterThan(0);
  });

  it('valida erro de senha curta (menos de 7 caracteres)', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.form.setFieldValue('password', '123456');
      result.current.form.validate('change');
    });

    expect(result.current.form.state.fieldMeta.password?.errors.length).toBeGreaterThan(0);
  });

  it('submete dados válidos e aciona signIn', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.form.setFieldValue('email', 'usuario@teste.com');
      result.current.form.setFieldValue('password', 'senha123');
      await result.current.form.handleSubmit();
    });

    expect(signInMock).toHaveBeenCalledWith({
      email: 'usuario@teste.com',
      password: 'senha123',
    });
  });
});
