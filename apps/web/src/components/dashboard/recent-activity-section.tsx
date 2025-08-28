import { PageCard } from '../layout/page-layout';
import { ListItem } from '../common/list-item';
import { EmptyState } from '../common/empty-state';
import { List } from 'lucide-react';

interface Wishlist {
  id: string;
  name: string;
}

interface RecentActivitySectionProps {
  recentWishlists?: Wishlist[];
}

export function RecentActivitySection({ recentWishlists }: RecentActivitySectionProps) {
  return (
    <PageCard
      title='Recent Activity'
      description='Your latest wishlists and wishes'
      icon={<List className='h-5 w-5 text-green-600' />}
    >
      {recentWishlists && recentWishlists.length > 0 ? (
        <div className='space-y-3'>
          {recentWishlists.map(wishlist => (
            <ListItem
              key={wishlist.id}
              id={wishlist.id}
              title={wishlist.name}
              subtitle='Wishlist'
              href={`/wishlists/${wishlist.id}`}
              variant='bordered'
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={List}
          title='No Wishlists'
          description='No wishlists yet. Create your first one!'
          actionText='Create Wishlist'
          actionHref='/wishlists/new'
        />
      )}
    </PageCard>
  );
}
