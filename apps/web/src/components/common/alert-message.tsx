import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface AlertMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  className?: string;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    classes: 'bg-green-50 text-green-700 border-green-200',
    iconClasses: 'text-green-600',
  },
  error: {
    icon: XCircle,
    classes: 'bg-red-50 text-red-700 border-red-200',
    iconClasses: 'text-red-600',
  },
  warning: {
    icon: AlertCircle,
    classes: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    iconClasses: 'text-yellow-600',
  },
  info: {
    icon: Info,
    classes: 'bg-blue-50 text-blue-700 border-blue-200',
    iconClasses: 'text-blue-600',
  },
};

export function AlertMessage({ type, message, className = '' }: AlertMessageProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-lg border p-4 text-sm font-medium shadow-sm',
        config.classes,
        className
      )}
    >
      <div className='flex items-center gap-3'>
        <Icon className={cn('h-5 w-5', config.iconClasses)} />
        <span className='font-semibold'>{message}</span>
      </div>
    </div>
  );
}
