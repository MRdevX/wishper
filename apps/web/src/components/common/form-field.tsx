import { Input } from '@repo/ui/components/input';
import { cn } from '@repo/ui/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  error,
  className = '',
}: FormFieldProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <label htmlFor={id} className='flex items-center gap-1 text-sm font-bold text-slate-700'>
        {label}
        {required && <span className='text-lg text-red-500'>*</span>}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={cn(
          'h-12 border-slate-300 text-base transition-all duration-200 focus:border-blue-500 focus:ring-blue-500',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500'
        )}
      />
      {error && (
        <p className='flex items-center gap-1 text-sm font-medium text-red-600'>
          <span className='h-1 w-1 rounded-full bg-red-500'></span>
          {error}
        </p>
      )}
    </div>
  );
}
