import { useDataService } from '@/hooks/useDataService';
import { wishlistService } from '@/lib/data-service';
import { transformWishlistForGrid } from '@/lib/formatters';
import type { IWishlist } from '@repo/schemas';

interface UseWishlistsDataProps {
  onDelete?: (id: string) => Promise<void>;
}

export function useWishlistsData({ onDelete }: UseWishlistsDataProps = {}) {
  return useDataService<IWishlist>({
    fetchFn: wishlistService.getAll,
    transformFn: transformWishlistForGrid,
    deleteFn: wishlistService.delete,
    onDelete,
    viewPath: id => `/wishlists/${id}`,
    editPath: id => `/wishlists/${id}/edit`,
    itemName: 'wishlist',
  });
}
