import { EntityEmptyState } from '../common/entity-empty-state';
import { List } from 'lucide-react';

export function WishlistsEmptyState() {
  return (
    <EntityEmptyState
      icon={List}
      title='No wishlists yet'
      description='Create your first wishlist to start organizing your wishes.'
      actionText='Create Wishlist'
      actionHref='/wishlists/new'
    />
  );
}
