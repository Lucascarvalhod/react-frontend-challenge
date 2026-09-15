import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, type LoginCredentials } from '@/services/login-service';

export function useAuth() {
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

  const signOut = useCallback(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  return { error, signIn, signOut };
}

export const demoUser = { initials: 'LC', name: 'Lucas Carvalho', email: 'lucas@email.com' };