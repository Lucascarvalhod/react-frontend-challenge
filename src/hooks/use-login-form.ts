import { useForm } from '@tanstack/react-form';
import { useLogin } from '@/hooks/use-login';
import { credentialsSchema, type LoginCredentials } from '@/services/login-service';

export function useLoginForm() {
  const { error, signIn } = useLogin();

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