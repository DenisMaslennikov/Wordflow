function getTokenExpirationTime(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null; // convert to ms
  } catch {
    return null;
  }
}

function getTokenFromLocalStorage(tokenKey: string): string | null {
  const token = localStorage.getItem(tokenKey);
  if (!token) return null;
  return JSON.parse(token);
}

export { getTokenExpirationTime, getTokenFromLocalStorage };
