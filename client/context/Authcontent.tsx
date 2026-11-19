"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import {
  getToken,
  getUser as getStoredUser,
  setToken,
  setUser as setStoredUser,
  logout as clearAuth,
  StoredUser,
} from "@/lib/auth";

export interface AuthUser extends StoredUser {
  createdAt?: string;
}

interface AuthResponse {
  token?: string;
  user?: AuthUser;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function normalizeUser(raw: Record<string, unknown>): AuthUser {
  const id = String(raw.id ?? raw._id ?? "");
  return {
    id,
    name: String(raw.name ?? ""),
    email: String(raw.email ?? ""),
    role: raw.role === "admin" ? "admin" : "student",
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const getPostAuthDestination = () => {
    if (typeof window === "undefined") return "/dashboard";
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      return next;
    }
    return "/dashboard";
  };

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const data = await apiRequest<AuthResponse>("/api/auth/login", {
          method: "POST",
          body: { email, password },
          skipAuth: true,
        });

        if (!data.token || !data.user) {
          throw new Error("Invalid login response from server.");
        }

        const normalized = normalizeUser(
          data.user as unknown as Record<string, unknown>
        );

        setToken(data.token);
        setStoredUser(normalized);
        setUser(normalized);
        setIsLoggedIn(true);

        router.push(getPostAuthDestination());
      } catch (error) {
        setIsLoggedIn(false);
        throw error;
      }
    },
    [router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      try {
        const data = await apiRequest<AuthResponse>("/api/auth/register", {
          method: "POST",
          body: { name, email, password },
          skipAuth: true,
        });

        if (!data.token || !data.user) {
          throw new Error("Invalid registration response from server.");
        }

        const normalized = normalizeUser(
          data.user as unknown as Record<string, unknown>
        );

        setToken(data.token);
        setStoredUser(normalized);
        setUser(normalized);
        setIsLoggedIn(true);

        router.push(getPostAuthDestination());
      } catch (error) {
        setIsLoggedIn(false);
        throw error;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    clearAuth();
    router.push("/");
  }, [router]);

  const refreshUser = useCallback(async (): Promise<void> => {
    const currentToken = getToken();

    if (!currentToken) {
      setUser(null);
      setIsLoggedIn(false);
      return;
    }

    try {
      const data = await apiRequest<{ user?: Record<string, unknown> }>(
        "/api/auth/me"
      );

      const rawUser = (data.user ?? data) as Record<string, unknown>;
      const currentUser = normalizeUser(rawUser);

      setStoredUser(currentUser);
      setUser(currentUser);
      setIsLoggedIn(true);
    } catch {
      clearAuth();
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        const cached = getStoredUser();
        if (cached && active) {
          setUser(cached);
          setIsLoggedIn(true);
        }
        await refreshUser();
      }

      if (active) {
        setIsLoading(false);
      }
    };

    const handleUnauthorized = () => {
      if (!active) return;
      setUser(null);
      setIsLoggedIn(false);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    void initializeAuth();

    return () => {
      active = false;
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
