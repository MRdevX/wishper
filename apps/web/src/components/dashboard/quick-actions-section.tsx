import { PageCard } from '../layout/page-layout';
import { Plus, List, Gift } from 'lucide-react';
import { ActionButton } from '../common/action-button';

export function QuickActionsSection() {
  return (
    <PageCard
      title='Quick Actions'
      description='Create new wishlists and wishes quickly'
      icon={<Plus className='h-5 w-5' />}
    >
      <div className='space-y-3'>
        <ActionButton href='/wishlists/new' icon={List}>
          Create New Wishlist
        </ActionButton>
        <ActionButton href='/wishes/new' icon={Gift}>
          Add New Wish
        </ActionButton>
      </div>
    </PageCard>
  );
}
