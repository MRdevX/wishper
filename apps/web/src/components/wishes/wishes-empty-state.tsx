import { EmptyState } from '../layout/page-layout';
import { Button } from '@repo/ui/components/button';
import { Gift, Plus } from 'lucide-react';

interface WishesEmptyStateProps {
  onCreateWish?: () => void;
}

export function WishesEmptyState({ onCreateWish }: WishesEmptyStateProps) {
  const handleCreateWish = () => {
    if (onCreateWish) {
      onCreateWish();
    } else {
      window.location.href = '/wishes/new';
    }
  };

  return (
    <EmptyState
      icon={<Gift className='h-12 w-12' />}
      title='No wishes yet'
      description='Add your first wish to start building your wishlist.'
      action={
        <Button onClick={handleCreateWish}>
          <Plus className='mr-2 h-4 w-4' />
          Add Wish
        </Button>
      }
    />
  );
}
