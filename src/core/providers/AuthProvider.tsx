import React, { createContext, ReactNode, useContext } from "react";
import { User } from "../../domain/entities/User";
import useAuth from "../../presentation/state/useAuth";

interface AuthContextType {
  user: User | null;
  error: string | null;
  loading: boolean;
  setLoading: (loading: boolean) => void; // ✅ added
  login: (credentials: any) => Promise<any>;
  register: (credentials: any) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={{ ...auth, setLoading: auth.setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
