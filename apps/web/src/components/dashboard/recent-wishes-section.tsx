import { PageCard } from '../layout/page-layout';
import { WishItem } from './wish-item';
import { WishStatus } from '@repo/schemas';
import { Gift, Plus } from 'lucide-react';
import Link from 'next/link';

interface Wish {
  id: string;
  title: string;
  status: WishStatus;
  details?: {
    description?: string;
    price?: number;
  };
}

interface RecentWishesSectionProps {
  recentWishes?: Wish[];
}

export function RecentWishesSection({ recentWishes }: RecentWishesSectionProps) {
  return (
    <PageCard
      title='Recent Wishes'
      description='Your latest wishes across all wishlists'
      icon={<Gift className='h-5 w-5 text-purple-600' />}
    >
      {recentWishes && recentWishes.length > 0 ? (
        <div className='space-y-4'>
          {recentWishes.map(wish => (
            <WishItem
              key={wish.id}
              id={wish.id}
              title={wish.title}
              status={wish.status}
              description={wish.details?.description}
              price={wish.details?.price}
              href={`/wishes/${wish.id}`}
            />
          ))}
        </div>
      ) : (
        <div className='py-8 text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100'>
            <Gift className='h-6 w-6 text-slate-400' />
          </div>
          <p className='mb-4 text-sm text-slate-600'>No wishes yet. Add your first wish!</p>
          <Link href='/wishes/new'>
            <button className='inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700'>
              <Plus className='h-4 w-4' />
              Add Wish
            </button>
          </Link>
        </div>
      )}
    </PageCard>
  );
}
