import { PageCard } from '../layout/page-layout';
import { ListItem } from '../common/list-item';
import { List, Plus } from 'lucide-react';
import Link from 'next/link';

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
        <div className='py-8 text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100'>
            <List className='h-6 w-6 text-slate-400' />
          </div>
          <p className='mb-4 text-sm text-slate-600'>No wishlists yet. Create your first one!</p>
          <Link href='/wishlists/new'>
            <button className='inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700'>
              <Plus className='h-4 w-4' />
              Create Wishlist
            </button>
          </Link>
        </div>
      )}
    </PageCard>
  );
}
