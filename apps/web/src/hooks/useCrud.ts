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
  autoFetch?: boolean;
}

interface IUseCrudState<T> extends LoadingState {
  data: T | null | undefined;
  items: T[];
  editingItem: T | null;
  showForm: boolean;
  formLoading: boolean;
}

interface IUseCrudActions<T> {
  create: (data: Record<string, unknown>) => Promise<boolean>;
  update: (id: string, data: Record<string, unknown>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  fetchItems: () => Promise<void>;
  showCreateForm: () => void;
  showEditForm: (item: T) => void;
  hideForm: () => void;
  reset: () => void;
}

interface ApiMethods {
  get: () => Promise<IApiResponse<any>>;
  create: (data: any) => Promise<IApiResponse<any>>;
  update: (id: string, data: any) => Promise<IApiResponse<any>>;
  delete: (id: string) => Promise<IApiResponse<any>>;
}

export function useCrud<T extends { id: string }>(
  apiMethods: ApiMethods,
  options: IUseCrudOptions<T> = {}
): [IUseCrudState<T>, IUseCrudActions<T>] {
  const [state, setState] = useState<IUseCrudState<T>>({
    data: undefined,
    items: [],
    editingItem: null,
    showForm: false,
    formLoading: false,
    isLoading: false,
    error: null,
  });

  const fetchItems = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await apiMethods.get();

      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [response.data];
        setState(prev => ({
          ...prev,
          items,
          isLoading: false,
          error: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.error || ERROR_MESSAGES.unknown,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: ERROR_MESSAGES.unknown,
      }));
    }
  }, [apiMethods]);

  const create = useCallback(
    async (data: Record<string, unknown>): Promise<boolean> => {
      try {
        setState(prev => ({ ...prev, formLoading: true, error: null }));

        const response = await apiMethods.create(data);

        if (response.success && response.data) {
          setState(prev => ({
            ...prev,
            data: response.data,
            items: [...prev.items, response.data],
            formLoading: false,
            showForm: false,
            editingItem: null,
            error: null,
          }));
          options.onSuccess?.(response.data);
          return true;
        }

        const errorMessage = response.error || ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          formLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      } catch (error) {
        const errorMessage = ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          formLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      }
    },
    [apiMethods, options]
  );

  const update = useCallback(
    async (id: string, data: Record<string, unknown>): Promise<boolean> => {
      try {
        setState(prev => ({ ...prev, formLoading: true, error: null }));

        const response = await apiMethods.update(id, data);

        if (response.success && response.data) {
          setState(prev => ({
            ...prev,
            data: response.data,
            items: prev.items.map(item => (item.id === id ? response.data : item)),
            formLoading: false,
            showForm: false,
            editingItem: null,
            error: null,
          }));
          options.onSuccess?.(response.data);
          return true;
        }

        const errorMessage = response.error || ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          formLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      } catch (error) {
        const errorMessage = ERROR_MESSAGES.unknown;
        setState(prev => ({
          ...prev,
          formLoading: false,
          error: errorMessage,
        }));
        options.onError?.(errorMessage);
        return false;
      }
    },
    [apiMethods, options]
  );

  const deleteItem = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await apiMethods.delete(id);

        if (response.success) {
          setState(prev => ({
            ...prev,
            data: null,
            items: prev.items.filter(item => item.id !== id),
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
    [apiMethods, options]
  );

  const showCreateForm = useCallback(() => {
    setState(prev => ({
      ...prev,
      showForm: true,
      editingItem: null,
    }));
  }, []);

  const showEditForm = useCallback((item: T) => {
    setState(prev => ({
      ...prev,
      showForm: true,
      editingItem: item,
    }));
  }, []);

  const hideForm = useCallback(() => {
    setState(prev => ({
      ...prev,
      showForm: false,
      editingItem: null,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      items: [],
      editingItem: null,
      showForm: false,
      formLoading: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const actions: IUseCrudActions<T> = {
    create,
    update,
    delete: deleteItem,
    fetchItems,
    showCreateForm,
    showEditForm,
    hideForm,
    reset,
  };

  return [state, actions];
}
