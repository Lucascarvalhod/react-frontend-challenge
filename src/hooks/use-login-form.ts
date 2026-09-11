import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/use-auth';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signIn } = useAuth();

  function submit(event: FormEvent) {
    event.preventDefault();
    signIn({ email, password });
  }

  return { email, password, error, setEmail, setPassword, submit };
}