import { useState, useEffect, useCallback } from 'react';
import { apiClient, UserWithoutPassword, LoginDto, RegisterDto } from '../lib/api';

interface AuthState {
  user: UserWithoutPassword | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginDto) => Promise<boolean>;
  register: (userData: RegisterDto) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): [AuthState, AuthActions] {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = apiClient.getAccessToken();
        if (token) {
          const response = await apiClient.getUser('me');
          if (response.success && response.data) {
            setState({
              user: response.data as UserWithoutPassword,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            const refreshResponse = await apiClient.refreshToken();
            if (refreshResponse.success) {
              const userResponse = await apiClient.getUser('me');
              if (userResponse.success && userResponse.data) {
                setState({
                  user: userResponse.data as UserWithoutPassword,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                });
              } else {
                apiClient.clearTokens();
                setState({
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,
                  error: null,
                });
              }
            } else {
              apiClient.clearTokens();
              setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            }
          }
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        apiClient.clearTokens();
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication check failed',
        });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginDto): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await apiClient.login(credentials);

      if (response.success && response.data) {
        setState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.error || 'Login failed',
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed',
      }));
      return false;
    }
  }, []);

  const register = useCallback(async (userData: RegisterDto): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await apiClient.register(userData);

      if (response.success && response.data) {
        setState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.error || 'Registration failed',
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed',
      }));
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiClient.clearTokens();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const actions: AuthActions = {
    login,
    register,
    logout,
    clearError,
  };

  return [state, actions];
}
