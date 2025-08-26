import { useDataFetching } from '@/hooks/useDataFetching';
import { wishService } from '@/lib/data-service';
import { transformWishForGrid } from '@/lib/formatters';
import { DataGridActions } from '../common/data-grid';
import { StatusBadge } from '../common/status-badge';
import type { IWish } from '@repo/schemas';

interface UseWishesDataProps {
  onDelete?: (id: string) => Promise<void>;
}

export function useWishesData({ onDelete }: UseWishesDataProps = {}) {
  const {
    data: wishes,
    refetch,
    loading,
  } = useDataFetching<IWish[]>({
    fetchFn: wishService.getAll,
  });

  const handleDelete = async (id: string) => {
    if (onDelete) {
      await onDelete(id);
    } else {
      if (confirm('Are you sure you want to delete this wish?')) {
        const response = await wishService.delete(id);
        if (response.success) {
          refetch();
        } else {
          alert(`Failed to delete wish: ${response.error}`);
        }
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

  return {
    wishes,
    gridItems,
    loading,
    refetch,
    handleDelete,
  };
}
