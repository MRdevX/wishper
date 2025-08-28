import { Button } from '@repo/ui/components/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';

interface ListItemProps {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  variant?: 'default' | 'bordered';
}

export function ListItem({ id, title, subtitle, href, variant = 'default' }: ListItemProps) {
  const baseClasses =
    'flex items-center justify-between rounded-lg p-4 transition-all duration-200 group';
  const variantClasses =
    variant === 'bordered'
      ? 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      : 'bg-slate-50 hover:bg-slate-100';

  return (
    <div key={id} className={cn(baseClasses, variantClasses)}>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-semibold text-slate-900'>{title}</p>
        {subtitle && <p className='mt-1 text-xs text-slate-600'>{subtitle}</p>}
      </div>
      <Link href={href}>
        <Button
          size='sm'
          variant='ghost'
          className='opacity-0 transition-opacity duration-200 hover:bg-slate-200 group-hover:opacity-100'
        >
          <ArrowRight className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
}
