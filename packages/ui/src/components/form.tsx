import * as React from 'react';
import { cn } from '@repo/ui/lib/utils';

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

function FormField({ children, className }: FormFieldProps) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label ref={ref} className={cn('text-sm font-medium text-slate-700', className)} {...props}>
        {children}
        {required && <span className='ml-1 text-red-500'>*</span>}
      </label>
    );
  }
);
FormLabel.displayName = 'FormLabel';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900',
          'placeholder:text-slate-500',
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400',
          error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300',
          className
        )}
        {...props}
      />
    );
  }
);
FormInput.displayName = 'FormInput';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900',
          'placeholder:text-slate-500',
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-vertical',
          'dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400',
          error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300',
          className
        )}
        {...props}
      />
    );
  }
);
FormTextarea.displayName = 'FormTextarea';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900',
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-slate-600 dark:bg-slate-800 dark:text-white',
          error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
FormSelect.displayName = 'FormSelect';

interface FormErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

function FormErrorMessage({ children, className }: FormErrorMessageProps) {
  if (!children) return null;

  return <p className={cn('text-sm text-red-600', className)}>{children}</p>;
}

interface FormSuccessMessageProps {
  children: React.ReactNode;
  className?: string;
}

function FormSuccessMessage({ children, className }: FormSuccessMessageProps) {
  if (!children) return null;

  return <p className={cn('text-sm text-green-600', className)}>{children}</p>;
}

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
}

function FormActions({ children, className }: FormActionsProps) {
  return <div className={cn('flex gap-3 pt-4', className)}>{children}</div>;
}

export {
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormErrorMessage,
  FormSuccessMessage,
  FormActions,
};
