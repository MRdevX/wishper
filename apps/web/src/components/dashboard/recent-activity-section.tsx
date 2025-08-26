import { PageCard } from '../layout/page-layout';
import { ListItem } from '../common/list-item';

interface Wishlist {
  id: string;
  name: string;
}

interface RecentActivitySectionProps {
  recentWishlists?: Wishlist[];
}

export function RecentActivitySection({ recentWishlists }: RecentActivitySectionProps) {
  return (
    <PageCard title='Recent Activity' description='Your latest wishlists and wishes'>
      {recentWishlists && recentWishlists.length > 0 ? (
        <div className='space-y-3'>
          {recentWishlists.map(wishlist => (
            <ListItem
              key={wishlist.id}
              id={wishlist.id}
              title={wishlist.name}
              subtitle='Wishlist'
              href={`/wishlists/${wishlist.id}`}
            />
          ))}
        </div>
      ) : (
        <p className='text-sm text-slate-600'>No wishlists yet. Create your first one!</p>
      )}
    </PageCard>
  );
}
