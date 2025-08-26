import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type { IApiResponse } from '@repo/schemas';
import { ERROR_MESSAGES } from '@/lib';

interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

interface IUseCrudOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface IUseCrudState<T> extends LoadingState {
  data: T | null | undefined;
}

interface IUseCrudActions<T> {
  create: (data: Record<string, unknown>) => Promise<boolean>;
  update: (id: string, data: Record<string, unknown>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  reset: () => void;
}

export function useCrud<T>(
  endpoint: string,
  options: IUseCrudOptions<T> = {}
): [IUseCrudState<T>, IUseCrudActions<T>] {
  const [state, setState] = useState<IUseCrudState<T>>({
    data: undefined,
    isLoading: false,
    error: null,
  });

  const create = useCallback(
    async (data: Record<string, unknown>): Promise<boolean> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await apiClient.request<T>(endpoint, {
          method: 'POST',
          body: JSON.stringify(data),
        });

        if (response.success && response.data) {
          setState(prev => ({
            ...prev,
            data: response.data,
            isLoading: false,
            error: null,
          }));
          options.onSuccess?.(response.data);
          return true;
        }

        const errorMessage = response.error || ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      } catch (error) {
        const errorMessage = ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      }
    },
    [endpoint, options]
  );

  const update = useCallback(
    async (id: string, data: Record<string, unknown>): Promise<boolean> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await apiClient.request<T>(`${endpoint}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        });

        if (response.success && response.data) {
          setState(prev => ({
            ...prev,
            data: response.data,
            isLoading: false,
            error: null,
          }));
          options.onSuccess?.(response.data);
          return true;
        }

        const errorMessage = response.error || ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      } catch (error) {
        const errorMessage = ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      }
    },
    [endpoint, options]
  );

  const deleteItem = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await apiClient.request<void>(`${endpoint}/${id}`, {
          method: 'DELETE',
        });

        if (response.success) {
          setState(prev => ({
            ...prev,
            data: null,
            isLoading: false,
            error: null,
          }));
          return true;
        }

        const errorMessage = response.error || ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      } catch (error) {
        const errorMessage = ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      }
    },
    [endpoint, options]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const actions: IUseCrudActions<T> = {
    create,
    update,
    delete: deleteItem,
    reset,
  };

  return [state, actions];
}
