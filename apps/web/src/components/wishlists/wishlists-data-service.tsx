import { useDataFetching } from '@/hooks/useDataFetching';
import { WishlistService } from '@/lib/services/wishlist.service';
import { transformWishlistForGrid } from '@/lib/utils';
import type { IWishlist } from '@repo/schemas';

interface UseWishlistsDataProps {
  onDelete?: (id: string) => Promise<void>;
}

export function useWishlistsData({ onDelete }: UseWishlistsDataProps = {}) {
  const {
    data: wishlists,
    loading,
    refetch,
  } = useDataFetching({
    fetchFn: WishlistService.getAll,
  });

  const handleDelete = async (id: string) => {
    if (onDelete) {
      await onDelete(id);
    } else {
      if (confirm('Are you sure you want to delete this wishlist?')) {
        const response = await WishlistService.delete(id);
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
        { label: 'View', href: `/wishlists/${wishlist.id}` },
        { label: 'Edit', href: `/wishlists/${wishlist.id}/edit` },
        { label: 'Delete', onClick: () => handleDelete(wishlist.id) },
      ],
    })) || [];

  return {
    items: wishlists,
    gridItems,
    loading,
    refetch,
    handleDelete,
  };
}
