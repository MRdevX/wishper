import { PageCard } from '../layout/page-layout';
import { WishItem } from './wish-item';
import { EmptyState } from '../common/empty-state';
import { WishStatus } from '@repo/schemas';
import { Gift } from 'lucide-react';

interface Wish {
  id: string;
  title: string;
  status: WishStatus;
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
              href={`/wishes/${wish.id}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Gift}
          description='No wishes yet. Add your first wish!'
          actionText='Add Wish'
          actionHref='/wishes/new'
        />
      )}
    </PageCard>
  );
}
