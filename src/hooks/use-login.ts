import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, type LoginCredentials } from '@/services/login-service';

export function useLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const signIn = useCallback(
    (credentials: LoginCredentials) => {
      const result = login(credentials);
      if (!result.success) {
        setError(result.error);
        return false;
      }
      setError('');
      navigate('/');
      return true;
    },
    [navigate],
  );

  return { error, signIn };
}