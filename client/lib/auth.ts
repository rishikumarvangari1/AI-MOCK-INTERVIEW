const TOKEN_KEY = "token";
const USER_KEY = "user";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  role?: "student" | "admin";
  createdAt?: string;
}

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
};

export const setUser = (user: StoredUser): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): StoredUser | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user) as StoredUser;
  } catch {
    return null;
  }
};

export const removeUser = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(USER_KEY);
};

export const logout = (): void => {
  if (typeof window === "undefined") return;

  removeToken();
  removeUser();
};
