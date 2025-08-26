'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { DataGrid, DataGridActions } from '@/components/common/data-grid';
import { EmptyState } from '@/components/layout/page-layout';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { useDataFetching } from '@/hooks/useDataFetching';
import { wishlistService } from '@/lib/data-service';
import { transformWishlistForGrid } from '@/lib/formatters';
import { Button } from '@repo/ui/components/button';
import { List, Plus } from 'lucide-react';
import type { IWishlist } from '@repo/schemas';

function WishlistsContent() {
  const { data: wishlists, refetch } = useDataFetching<IWishlist[]>({
    fetchFn: wishlistService.getAll,
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this wishlist?')) {
      const response = await wishlistService.delete(id);
      if (response.success) {
        refetch();
      } else {
        alert(`Failed to delete wishlist: ${response.error}`);
      }
    }
  };

  const gridItems =
    wishlists?.map(wishlist => ({
      ...transformWishlistForGrid(wishlist),
      actions: [
        DataGridActions.view(`/wishlists/${wishlist.id}`),
        DataGridActions.edit(`/wishlists/${wishlist.id}/edit`),
        DataGridActions.delete(() => handleDelete(wishlist.id)),
      ],
    })) || [];

  const emptyState = (
    <EmptyState
      icon={<List className='h-12 w-12' />}
      title='No wishlists yet'
      description='Create your first wishlist to start organizing your wishes.'
      action={
        <Button onClick={() => (window.location.href = '/wishlists/new')}>
          <Plus className='mr-2 h-4 w-4' />
          Create Wishlist
        </Button>
      }
    />
  );

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

export default function WishlistsPage() {
  return (
    <ProtectedRoute>
      <WishlistsContent />
    </ProtectedRoute>
  );
}
