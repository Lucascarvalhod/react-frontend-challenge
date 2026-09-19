import { useForm } from '@tanstack/react-form';
import { useAuth } from '@/hooks/use-auth';
import { credentialsSchema, type LoginCredentials } from '@/services/login-service';

export function useLoginForm() {
  const { error, signIn } = useAuth();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginCredentials,
    validators: {
      onChange: credentialsSchema,
    },
    onSubmit: async ({ value }) => {
      signIn(value);
    },
  });

  return { form, error };
}