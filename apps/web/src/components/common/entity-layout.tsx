import { DashboardLayout } from '../layout/dashboard-layout';
import { PageLayout } from '../layout/page-layout';
import { DataGrid } from '../common/data-grid';
import { Button } from '@repo/ui/components/button';
import { Plus } from 'lucide-react';

interface IEntityLayoutProps {
  title: string;
  description: string;
  newItemHref: string;
  newItemText: string;
  gridItems: any[];
  emptyState?: React.ReactNode;
}

export function EntityLayout({
  title,
  description,
  newItemHref,
  newItemText,
  gridItems,
  emptyState,
}: IEntityLayoutProps) {
  return (
    <DashboardLayout>
      <PageLayout
        title={title}
        description={description}
        actions={
          <Button asChild>
            <a href={newItemHref}>
              <Plus className='mr-2 h-4 w-4' />
              {newItemText}
            </a>
          </Button>
        }
      >
        <DataGrid items={gridItems} emptyState={emptyState} />
      </PageLayout>
    </DashboardLayout>
  );
}
