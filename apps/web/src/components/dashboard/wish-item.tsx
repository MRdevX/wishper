import { Button } from '@repo/ui/components/button';
import { Badge } from '@repo/ui/components/badge';
import { ArrowRight, DollarSign } from 'lucide-react';
import { WishStatus } from '@repo/schemas';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';

interface WishItemProps {
  id: string;
  title: string;
  status: WishStatus;
  description?: string;
  price?: number;
  href: string;
}

export function WishItem({ id, title, status, description, price, href }: WishItemProps) {
  const statusStyles = {
    [WishStatus.ACHIEVED]: 'bg-green-100 text-green-800 border-green-200',
    [WishStatus.ACTIVE]: 'bg-orange-100 text-orange-800 border-orange-200',
  }[status] || 'bg-slate-100 text-slate-800 border-slate-200';

  const statusIcons = {
    [WishStatus.ACHIEVED]: '🎉',
    [WishStatus.ACTIVE]: '⏳',
  }[status] || '📝';

  return (
    <div
      key={id}
      className='group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md'
    >
      <div className='min-w-0 flex-1'>
        <div className='mb-2 flex items-center gap-3'>
          <h4 className='truncate font-semibold text-slate-900'>{title}</h4>
          <Badge variant='outline' className={cn('text-xs font-medium', statusStyles)}>
            <span className='mr-1'>{statusIcons}</span>
            {status}
          </Badge>
        </div>
        {description && <p className='mb-2 line-clamp-2 text-sm text-slate-600'>{description}</p>}
        {price && (
          <div className='flex items-center gap-1 text-sm font-medium text-slate-700'>
            <DollarSign className='h-4 w-4 text-green-600' />
            <span>{price.toFixed(2)}</span>
          </div>
        )}
      </div>
      <Link href={href}>
        <Button
          size='sm'
          variant='ghost'
          className='opacity-0 transition-opacity duration-200 hover:bg-slate-100 group-hover:opacity-100'
        >
          <ArrowRight className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
}
