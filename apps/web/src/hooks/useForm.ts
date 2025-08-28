import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<boolean>;
  onError?: (error: string) => void;
  onSuccess?: () => void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  onError,
  onSuccess,
  validate,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const validateForm = useCallback(() => {
    if (!validate) return {};
    return validate(values);
  }, [validate, values]);

  const handleChange = useCallback(
    (field: keyof T) => (value: any) => {
      setValues(prev => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleInputChange = useCallback(
    (field: keyof T) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        handleChange(field)(e.target.value);
      },
    [handleChange]
  );

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setSubmitError(undefined);
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    clearErrors();
  }, [initialValues, clearErrors]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setSubmitError(undefined);

      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      try {
        const success = await onSubmit(values);
        if (success) {
          onSuccess?.();
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setSubmitError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [values, onSubmit, onSuccess, onError, validateForm]
  );

  return {
    values,
    errors,
    isLoading,
    submitError,
    handleChange,
    handleInputChange,
    setFieldError,
    clearErrors,
    reset,
    handleSubmit,
  };
}
