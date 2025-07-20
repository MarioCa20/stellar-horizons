export const persistLocalStorage = <T,>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const AUTH_KEY = 'auth';

export const loadAuthState = () => {
  try {
    const serialized = localStorage.getItem(AUTH_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

export const saveAuthState = (state: unknown) => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  } catch {}
};

export const clearAuthState = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {}
};
