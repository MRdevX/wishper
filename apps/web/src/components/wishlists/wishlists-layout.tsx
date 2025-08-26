import { DashboardLayout } from '../layout/dashboard-layout';
import { PageLayout } from '../layout/page-layout';
import { DataGrid } from '../common/data-grid';
import { Button } from '@repo/ui/components/button';
import { Plus } from 'lucide-react';
import type { IWishlist } from '@repo/schemas';

interface WishlistsLayoutProps {
  wishlists?: IWishlist[];
  loading?: boolean;
  onDelete?: (id: string) => Promise<void>;
  emptyState?: React.ReactNode;
  gridItems: any[];
}

export function WishlistsLayout({
  wishlists,
  loading,
  onDelete,
  emptyState,
  gridItems,
}: WishlistsLayoutProps) {
  return (
    <DashboardLayout>
      <PageLayout
        title='Wishlists'
        description='Manage your wishlists and organize your wishes.'
        actions={
          <Button onClick={() => (window.location.href = '/wishlists/new')}>
            <Plus className='mr-2 h-4 w-4' />
            New Wishlist
          </Button>
        }
      >
        <DataGrid items={gridItems} emptyState={emptyState} />
      </PageLayout>
    </DashboardLayout>
  );
}
