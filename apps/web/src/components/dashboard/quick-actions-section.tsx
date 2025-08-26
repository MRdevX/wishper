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
          className='w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
        >
          Create New Wishlist
        </ActionButton>
        <ActionButton
          href='/wishes/new'
          icon={Gift}
          variant='default'
          className='w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-purple-800 hover:shadow-xl'
        >
          Add New Wish
        </ActionButton>
      </div>
    </PageCard>
  );
}
