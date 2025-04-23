function getTokenFromLocalStorage(tokenKey: string): string | null {
  const token = localStorage.getItem(tokenKey);
  if (!token) return null;
  return JSON.parse(token);
}

export { getTokenFromLocalStorage };
