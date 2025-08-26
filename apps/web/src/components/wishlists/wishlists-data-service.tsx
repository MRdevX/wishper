import { useDataFetching } from '@/hooks/useDataFetching';
import { wishlistService } from '@/lib/data-service';
import { transformWishlistForGrid } from '@/lib/formatters';
import { DataGridActions } from '../common/data-grid';
import type { IWishlist } from '@repo/schemas';

interface UseWishlistsDataProps {
  onDelete?: (id: string) => Promise<void>;
}

export function useWishlistsData({ onDelete }: UseWishlistsDataProps = {}) {
  const {
    data: wishlists,
    refetch,
    loading,
  } = useDataFetching<IWishlist[]>({
    fetchFn: wishlistService.getAll,
  });

  const handleDelete = async (id: string) => {
    if (onDelete) {
      await onDelete(id);
    } else {
      if (confirm('Are you sure you want to delete this wishlist?')) {
        const response = await wishlistService.delete(id);
        if (response.success) {
          refetch();
        } else {
          alert(`Failed to delete wishlist: ${response.error}`);
        }
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

  return {
    wishlists,
    gridItems,
    loading,
    refetch,
    handleDelete,
  };
}
