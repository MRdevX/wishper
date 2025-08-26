import { PageCard } from '../layout/page-layout';
import { WishItem } from './wish-item';
import { WishStatus } from '@repo/schemas';

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
    <PageCard title='Recent Wishes' description='Your latest wishes across all wishlists'>
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
        <p className='text-sm text-slate-600'>No wishes yet. Add your first wish!</p>
      )}
    </PageCard>
  );
}
