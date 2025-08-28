import { EntityEmptyState } from '../common/entity-empty-state';
import { Gift } from 'lucide-react';

export function WishesEmptyState() {
  return (
    <EntityEmptyState
      icon={Gift}
      title='No wishes yet'
      description='Add your first wish to start building your wishlist.'
      actionText='Add Wish'
      actionHref='/wishes/new'
    />
  );
}
