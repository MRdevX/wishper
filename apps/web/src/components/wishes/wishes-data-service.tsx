import { useDataFetching } from '@/hooks/useDataFetching';
import { WishService } from '@/lib/services/wish.service';
import { transformWishForGrid } from '@/lib/utils';
import { StatusBadge } from '../common/status-badge';
import type { IWish } from '@repo/schemas';

interface UseWishesDataProps {
  onDelete?: (id: string) => Promise<void>;
}

export function useWishesData({ onDelete }: UseWishesDataProps = {}) {
  const {
    data: wishes,
    loading,
    refetch,
  } = useDataFetching({
    fetchFn: WishService.getAll,
  });

  const handleDelete = async (id: string) => {
    if (onDelete) {
      await onDelete(id);
    } else {
      if (confirm('Are you sure you want to delete this wish?')) {
        const response = await WishService.delete(id);
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
        { label: 'View', href: `/wishes/${wish.id}` },
        { label: 'Edit', href: `/wishes/${wish.id}/edit` },
        { label: 'Delete', onClick: () => handleDelete(wish.id) },
      ],
    })) || [];

  return {
    items: wishes,
    gridItems,
    loading,
    refetch,
    handleDelete,
  };
}
