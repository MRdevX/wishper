import { ReactNode } from 'react';
import { Button } from '../button';
import { FormErrorMessage } from '../form';

interface BaseFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  submitLabel: string;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export function BaseForm({
  onSubmit,
  children,
  submitLabel,
  isLoading = false,
  error,
  className = 'space-y-4',
}: BaseFormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}

      <FormErrorMessage>{error}</FormErrorMessage>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Loading...' : submitLabel}
      </Button>
    </form>
  );
}
