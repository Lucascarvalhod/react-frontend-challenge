import { z } from 'zod';
import { sessionKey } from '@/services/session-service';

export const credentialsSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(7, 'Senha deve ter mais de 6 caracteres'),
});

export type LoginCredentials = z.infer<typeof credentialsSchema>;

export function login(credentials: LoginCredentials) {
  const result = credentialsSchema.safeParse(credentials);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Validação falhou',
    };
  }

  localStorage.setItem(sessionKey, crypto.randomUUID());
  return { success: true, error: '' };
}

