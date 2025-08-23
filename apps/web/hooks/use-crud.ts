import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';

interface CrudState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  formLoading: boolean;
  showForm: boolean;
  editingItem: T | null;
}

interface CrudActions<T> {
  fetchItems: () => Promise<void>;
  createItem: (data: any) => Promise<void>;
  updateItem: (id: string, data: any) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  showCreateForm: () => void;
  showEditForm: (item: T) => void;
  hideForm: () => void;
  setItems: (items: T[]) => void;
}

export function useCrud<T extends { id: string }>(apiMethods: {
  get: () => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}): [CrudState<T>, CrudActions<T>] {
  const [state, setState] = useState<CrudState<T>>({
    items: [],
    loading: true,
    error: null,
    formLoading: false,
    showForm: false,
    editingItem: null,
  });

  const fetchItems = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiMethods.get();
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          items: response.data as T[],
          loading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.error || 'Failed to fetch items',
          loading: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch items',
        loading: false,
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
            items: [...prev.items, response.data as T],
            formLoading: false,
            showForm: false,
            editingItem: null,
          }));
        } else {
          throw new Error(response.error || 'Failed to create item');
        }
      } catch (error) {
        console.error('Error creating item:', error);
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
            items: prev.items.map(item => (item.id === id ? (response.data as T) : item)),
            formLoading: false,
            showForm: false,
            editingItem: null,
          }));
        } else {
          throw new Error(response.error || 'Failed to update item');
        }
      } catch (error) {
        console.error('Error updating item:', error);
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
        console.error('Error deleting item:', error);
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

  const setItems = useCallback((items: T[]) => {
    setState(prev => ({ ...prev, items }));
  }, []);

  const actions: CrudActions<T> = {
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    showCreateForm,
    showEditForm,
    hideForm,
    setItems,
  };

  return [state, actions];
}
