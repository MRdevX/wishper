import { Button } from '@repo/ui/components/button';
import { Badge } from '@repo/ui/components/badge';
import { ArrowRight } from 'lucide-react';
import { WishStatus } from '@repo/schemas';
import Link from 'next/link';

interface WishItemProps {
  id: string;
  title: string;
  status: WishStatus;
  description?: string;
  price?: number;
  href: string;
}

export function WishItem({ id, title, status, description, price, href }: WishItemProps) {
  return (
    <div
      key={id}
      className='flex items-center justify-between rounded-lg border border-slate-200 p-4'
    >
      <div className='flex-1'>
        <div className='flex items-center gap-3'>
          <h4 className='font-medium'>{title}</h4>
          <Badge variant={status === WishStatus.ACHIEVED ? 'default' : 'secondary'}>{status}</Badge>
        </div>
        {description && <p className='mt-1 text-sm text-slate-600'>{description}</p>}
        {price && <p className='mt-1 text-sm text-slate-500'>${price}</p>}
      </div>
      <Link href={href}>
        <Button size='sm' variant='ghost'>
          <ArrowRight className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
}
