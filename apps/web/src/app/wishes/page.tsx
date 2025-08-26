'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { DataGrid, DataGridActions } from '@/components/common/data-grid';
import { StatusBadge } from '@/components/common/status-badge';
import { EmptyState } from '@/components/layout/page-layout';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { useDataFetching } from '@/hooks/use-data-fetching';
import { wishService } from '@/lib/data-service';
import { transformWishForGrid } from '@/lib/formatters';
import { Button } from '@repo/ui/components/button';
import { Gift, Plus } from 'lucide-react';
import type { IWish } from '@repo/schemas';

function WishesContent() {
  const { data: wishes, refetch } = useDataFetching<IWish[]>({
    fetchFn: wishService.getAll,
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this wish?')) {
      const response = await wishService.delete(id);
      if (response.success) {
        refetch();
      } else {
        alert(`Failed to delete wish: ${response.error}`);
      }
    }
  };

  const gridItems =
    wishes?.map(wish => ({
      ...transformWishForGrid(wish),
      status: <StatusBadge status={wish.status} />,
      actions: [
        DataGridActions.view(`/wishes/${wish.id}`),
        DataGridActions.edit(`/wishes/${wish.id}/edit`),
        DataGridActions.delete(() => handleDelete(wish.id)),
      ],
    })) || [];

  const emptyState = (
    <EmptyState
      icon={<Gift className='h-12 w-12' />}
      title='No wishes yet'
      description='Add your first wish to start building your wishlist.'
      action={
        <Button onClick={() => (window.location.href = '/wishes/new')}>
          <Plus className='mr-2 h-4 w-4' />
          Add Wish
        </Button>
      }
    />
  );

  return (
    <DashboardLayout>
      <PageLayout
        title='Wishes'
        description='Manage your wishes and track their status.'
        actions={
          <Button onClick={() => (window.location.href = '/wishes/new')}>
            <Plus className='mr-2 h-4 w-4' />
            New Wish
          </Button>
        }
      >
        <DataGrid items={gridItems} emptyState={emptyState} />
      </PageLayout>
    </DashboardLayout>
  );
}

export default function WishesPage() {
  return (
    <ProtectedRoute>
      <WishesContent />
    </ProtectedRoute>
  );
}
