import { Button } from '@repo/ui/components/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

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
      className={cn(
        'flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md',
        className
      )}
    >
      <div className='flex items-center gap-4'>
        {Icon && (
          <div className='rounded-xl bg-slate-100 p-3 shadow-sm'>
            <Icon className='h-6 w-6 text-slate-600' />
          </div>
        )}
        <div className='space-y-1'>
          <h4 className='text-lg font-bold text-slate-900'>{title}</h4>
          <p className='max-w-md text-sm text-slate-600'>{description}</p>
        </div>
      </div>
      <Button
        variant='outline'
        size='lg'
        onClick={onAction}
        disabled={disabled}
        className='border-slate-300 bg-white px-6 py-2.5 font-semibold transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-700'
      >
        {actionLabel}
      </Button>
    </div>
  );
}
