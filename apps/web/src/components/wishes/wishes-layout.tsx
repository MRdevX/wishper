import { DashboardLayout } from '../layout/dashboard-layout';
import { PageLayout } from '../layout/page-layout';
import { DataGrid } from '../common/data-grid';
import { Button } from '@repo/ui/components/button';
import { Plus } from 'lucide-react';
import type { IWish } from '@repo/schemas';

interface WishesLayoutProps {
  wishes?: IWish[];
  loading?: boolean;
  onDelete?: (id: string) => Promise<void>;
  emptyState?: React.ReactNode;
  gridItems: any[];
}

export function WishesLayout({
  wishes,
  loading,
  onDelete,
  emptyState,
  gridItems,
}: WishesLayoutProps) {
  return (
    <DashboardLayout>
      <PageLayout
        title='Wishes'
        description='Manage your wishes and track their status.'
        actions={
          <Button asChild>
            <a href='/wishes/new'>
              <Plus className='mr-2 h-4 w-4' />
              New Wish
            </a>
          </Button>
        }
      >
        <DataGrid items={gridItems} emptyState={emptyState} />
      </PageLayout>
    </DashboardLayout>
  );
}
