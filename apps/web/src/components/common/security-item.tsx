import { Button } from '@repo/ui/components/button';
import { LucideIcon } from 'lucide-react';

interface SecurityItemProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

export function SecurityItem({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon,
  disabled = false,
  className = '',
}: SecurityItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-slate-200 p-4 ${className}`}
    >
      <div className='flex items-center gap-3'>
        {Icon && <Icon className='h-5 w-5 text-slate-600' />}
        <div>
          <h4 className='font-medium'>{title}</h4>
          <p className='text-sm text-slate-600'>{description}</p>
        </div>
      </div>
      <Button variant='outline' size='sm' onClick={onAction} disabled={disabled}>
        {actionLabel}
      </Button>
    </div>
  );
}
