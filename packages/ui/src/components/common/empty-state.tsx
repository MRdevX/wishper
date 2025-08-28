import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`py-12 text-center ${className}`}>
      {Icon && <Icon className='mx-auto h-12 w-12 text-slate-400' />}
      <h3 className='mt-2 text-sm font-medium text-slate-900'>{title}</h3>
      <p className='mt-1 text-sm text-slate-500'>{description}</p>
      {action && <div className='mt-6'>{action}</div>}
    </div>
  );
}
