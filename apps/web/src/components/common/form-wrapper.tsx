'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';

interface FormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading?: boolean;
  submitText?: string;
  cancelText?: string;
  mode?: 'create' | 'edit';
  className?: string;
}

export function FormWrapper({
  title,
  description,
  children,
  onSubmit,
  onCancel,
  loading = false,
  submitText,
  cancelText = 'Cancel',
  mode = 'create',
  className = '',
}: FormWrapperProps) {
  const defaultSubmitText = loading
    ? mode === 'create'
      ? 'Creating...'
      : 'Updating...'
    : mode === 'create'
      ? 'Create'
      : 'Update';

  return (
    <Card className={`mx-auto w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className='space-y-6'>
          {children}

          <div className='flex justify-end space-x-3 pt-6'>
            <Button type='button' variant='outline' onClick={onCancel} disabled={loading}>
              {cancelText}
            </Button>
            <Button type='submit' disabled={loading}>
              {submitText || defaultSubmitText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
