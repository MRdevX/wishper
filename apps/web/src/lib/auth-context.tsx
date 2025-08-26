'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { IUser, ILoginDto, IRegisterDto } from '@repo/schemas';

interface IAuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: ILoginDto) => Promise<boolean>;
  register: (userData: IRegisterDto) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [state, actions] = useAuth();

  const value: IAuthContextType = {
    ...state,
    ...actions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): IAuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
