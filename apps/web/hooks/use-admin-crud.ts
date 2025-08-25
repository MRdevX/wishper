import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type { ApiResponse, LoadingState } from '@/types';
import { ERROR_MESSAGES } from '@/constants';

interface AdminCrudState<T> extends LoadingState {
  items: T[];
  editingItem: T | null;
  showForm: boolean;
  formLoading: boolean;
}

interface AdminCrudActions<T> {
  fetchItems: () => Promise<void>;
  createItem: (data: any) => Promise<void>;
  updateItem: (id: string, data: any) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  showCreateForm: () => void;
  showEditForm: (item: T) => void;
  hideForm: () => void;
}

interface ApiMethods {
  get: () => Promise<ApiResponse<any>>;
  create: (data: any) => Promise<ApiResponse<any>>;
  update: (id: string, data: any) => Promise<ApiResponse<any>>;
  delete: (id: string) => Promise<ApiResponse<any>>;
}

export function useAdminCrud<T extends { id: string }>(
  apiMethods: ApiMethods
): [AdminCrudState<T>, AdminCrudActions<T>] {
  const [state, setState] = useState<AdminCrudState<T>>({
    items: [],
    editingItem: null,
    showForm: false,
    formLoading: false,
    isLoading: true,
    error: null,
  });

  const fetchItems = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await apiMethods.get();

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          items: Array.isArray(response.data) ? response.data : [response.data],
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

  const createItem = useCallback(
    async (data: any) => {
      try {
        setState(prev => ({ ...prev, formLoading: true }));
        const response = await apiMethods.create(data);

        if (response.success && response.data) {
          setState(prev => ({
            ...prev,
            items: [...prev.items, response.data],
            formLoading: false,
            showForm: false,
            editingItem: null,
          }));
        } else {
          throw new Error(response.error || 'Failed to create item');
        }
      } catch (error) {
        setState(prev => ({ ...prev, formLoading: false }));
        throw error;
      }
    },
    [apiMethods]
  );

  const updateItem = useCallback(
    async (id: string, data: any) => {
      try {
        setState(prev => ({ ...prev, formLoading: true }));
        const response = await apiMethods.update(id, data);

        if (response.success && response.data) {
          setState(prev => ({
            ...prev,
            items: prev.items.map(item => (item.id === id ? response.data : item)),
            formLoading: false,
            showForm: false,
            editingItem: null,
          }));
        } else {
          throw new Error(response.error || 'Failed to update item');
        }
      } catch (error) {
        setState(prev => ({ ...prev, formLoading: false }));
        throw error;
      }
    },
    [apiMethods]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      try {
        const response = await apiMethods.delete(id);

        if (response.success) {
          setState(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id),
          }));
        } else {
          throw new Error(response.error || 'Failed to delete item');
        }
      } catch (error) {
        throw error;
      }
    },
    [apiMethods]
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

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const actions: AdminCrudActions<T> = {
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    showCreateForm,
    showEditForm,
    hideForm,
  };

  return [state, actions];
}
