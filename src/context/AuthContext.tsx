import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth";
import { authService } from "../services/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = authService.getToken();
    const savedUser = authService.getUser();

    if (token && savedUser) {
      setUser(savedUser);
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    authService.setToken(token);
    authService.setUser(userData);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (userData: User) => {
    authService.setUser(userData);
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
