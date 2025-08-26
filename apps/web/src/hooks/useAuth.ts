import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type { IUser, ILoginDto, IRegisterDto } from '@repo/schemas';
import { ERROR_MESSAGES } from '@/lib';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: ILoginDto) => Promise<boolean>;
  register: (userData: IRegisterDto) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export function useAuth(): [AuthState, AuthActions] {
  const [state, setState] = useState<AuthState>(initialState);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = apiClient.getAccessToken();
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const response = await apiClient.getUser('me');
      if (response.success && response.data) {
        setState({
          user: response.data as IUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return;
      }

      const refreshResponse = await apiClient.refreshToken();
      if (refreshResponse.success) {
        const userResponse = await apiClient.getUser('me');
        if (userResponse.success && userResponse.data) {
          setState({
            user: userResponse.data as IUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return;
        }
      }

      apiClient.clearTokens();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      apiClient.clearTokens();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: ERROR_MESSAGES.unknown,
      });
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(async (credentials: ILoginDto): Promise<boolean> => {
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
      }

      // Handle specific error cases
      let errorMessage = response.error || ERROR_MESSAGES.unknown;

      if (response.error?.includes('Invalid credentials')) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (response.error?.includes('User with this email already exists')) {
        errorMessage = 'An account with this email already exists.';
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES.network,
      }));
      return false;
    }
  }, []);

  const register = useCallback(async (userData: IRegisterDto): Promise<boolean> => {
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
      }

      // Handle specific error cases
      let errorMessage = response.error || ERROR_MESSAGES.unknown;

      if (response.error?.includes('User with this email already exists')) {
        errorMessage = 'An account with this email already exists. Please try logging in instead.';
      } else if (response.error?.includes('validation')) {
        errorMessage = 'Please check your input and try again.';
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES.network,
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
