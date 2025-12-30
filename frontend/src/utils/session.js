export function getTokenPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = getTokenPayload(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

export function getAuthSession() {
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('auth_user');

  if (!token || !user) return null;
  if (isTokenExpired(token)) return 'expired';

  return { token, user: JSON.parse(user) };
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  window.location.href = '/auth';
}

