import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/session-service';

export function useLogout() {
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  return { signOut };
}

export const demoUser = { initials: 'LC', name: 'Lucas Carvalho', email: 'lucas@email.com' };