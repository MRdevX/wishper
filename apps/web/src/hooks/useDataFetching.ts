import { useState, useEffect, useCallback } from 'react';

interface UseDataFetchingOptions<T> {
  fetchFn: () => Promise<T>;
  dependencies?: any[];
  autoFetch?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UseDataFetchingReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
}

export function useDataFetching<T>({
  fetchFn,
  dependencies = [],
  autoFetch = true,
  onSuccess,
  onError,
}: UseDataFetchingOptions<T>): UseDataFetchingReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, onSuccess, onError]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData,
    setError,
  };
}

interface UseMutationOptions<T, R> {
  mutationFn: (data: T) => Promise<R>;
  onSuccess?: (data: R) => void;
  onError?: (error: string) => void;
}

interface UseMutationReturn<T, R> {
  mutate: (data: T) => Promise<R | null>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useMutation<T, R>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationOptions<T, R>): UseMutationReturn<T, R> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (data: T): Promise<R | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await mutationFn(data);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        onError?.(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    mutate,
    loading,
    error,
    reset,
  };
}
