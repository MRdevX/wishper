import { Button } from '@repo/ui/components/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ListItemProps {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  variant?: 'default' | 'bordered';
}

export function ListItem({ id, title, subtitle, href, variant = 'default' }: ListItemProps) {
  const baseClasses = 'flex items-center justify-between rounded-lg p-3';
  const variantClasses = variant === 'bordered' ? 'border border-slate-200 p-4' : 'bg-slate-50 p-3';

  return (
    <div key={id} className={`${baseClasses} ${variantClasses}`}>
      <div>
        <p className='text-sm font-medium'>{title}</p>
        {subtitle && <p className='text-xs text-slate-600'>{subtitle}</p>}
      </div>
      <Link href={href}>
        <Button size='sm' variant='ghost'>
          <ArrowRight className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
}
