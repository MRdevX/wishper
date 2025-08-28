import { PageCard } from '../layout/page-layout';
import { Plus, List, Gift, Sparkles } from 'lucide-react';
import { ActionButton } from '../common/action-button';

export function QuickActionsSection() {
  return (
    <PageCard
      title='Quick Actions'
      description='Create new wishlists and wishes quickly'
      icon={<Sparkles className='h-5 w-5 text-pink-600' />}
    >
      <div className='space-y-4'>
        <ActionButton
          href='/wishlists/new'
          icon={List}
          variant='default'
          className='w-full justify-start bg-blue-600 text-white hover:bg-blue-700'
        >
          Create New Wishlist
        </ActionButton>
        <ActionButton
          href='/wishes/new'
          icon={Gift}
          variant='default'
          className='w-full justify-start bg-purple-600 text-white hover:bg-purple-700'
        >
          Add New Wish
        </ActionButton>
      </div>
    </PageCard>
  );
}
