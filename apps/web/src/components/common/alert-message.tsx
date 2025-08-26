import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  className?: string;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    classes: 'bg-green-50 text-green-600 border-green-200',
    iconClasses: 'text-green-600',
  },
  error: {
    icon: XCircle,
    classes: 'bg-red-50 text-red-600 border-red-200',
    iconClasses: 'text-red-600',
  },
  warning: {
    icon: AlertCircle,
    classes: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    iconClasses: 'text-yellow-600',
  },
  info: {
    icon: Info,
    classes: 'bg-blue-50 text-blue-600 border-blue-200',
    iconClasses: 'text-blue-600',
  },
};

export function AlertMessage({ type, message, className = '' }: AlertMessageProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div className={`rounded-md border p-3 text-sm ${config.classes} ${className}`}>
      <div className='flex items-center gap-2'>
        <Icon className={`h-4 w-4 ${config.iconClasses}`} />
        <span>{message}</span>
      </div>
    </div>
  );
}
