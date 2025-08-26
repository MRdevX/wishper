import { EmptyState } from '../layout/page-layout';
import { Button } from '@repo/ui/components/button';
import { List, Plus } from 'lucide-react';

interface WishlistsEmptyStateProps {
  onCreateWishlist?: () => void;
}

export function WishlistsEmptyState({ onCreateWishlist }: WishlistsEmptyStateProps) {
  const handleCreateWishlist = () => {
    if (onCreateWishlist) {
      onCreateWishlist();
    } else {
      window.location.href = '/wishlists/new';
    }
  };

  return (
    <EmptyState
      icon={<List className='h-12 w-12' />}
      title='No wishlists yet'
      description='Create your first wishlist to start organizing your wishes.'
      action={
        <Button onClick={handleCreateWishlist}>
          <Plus className='mr-2 h-4 w-4' />
          Create Wishlist
        </Button>
      }
    />
  );
}
