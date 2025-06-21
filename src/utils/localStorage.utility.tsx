export const persistLocalStorage = <T,>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
