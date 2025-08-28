import * as React from 'react';
import { cn } from '@repo/ui/lib/utils';
import { FormField, FormLabel, FormInput, FormErrorMessage } from '../form';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  className?: string;
}

export const FormFieldComponent = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      value = '',
      onChange,
      error,
      required = false,
      disabled = false,
      minLength,
      maxLength,
      className,
    },
    ref
  ) => {
    return (
      <FormField className={className}>
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
        <FormInput
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          required={required}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormField>
    );
  }
);

FormFieldComponent.displayName = 'FormFieldComponent';
