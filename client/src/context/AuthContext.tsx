// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("customerToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("customerToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("customerToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    console.error("useAuth called outside AuthProvider");
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};