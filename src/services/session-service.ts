const SESSION_KEY = 'libris-session';

export function hasSession() {
  return Boolean(localStorage.getItem(SESSION_KEY));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export const sessionKey = SESSION_KEY;