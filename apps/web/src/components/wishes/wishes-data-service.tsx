import { useDataService } from '@/hooks/useDataService';
import { wishService } from '@/lib/data-service';
import { transformWishForGrid } from '@/lib/formatters';
import { StatusBadge } from '../common/status-badge';
import type { IWish } from '@repo/schemas';

interface UseWishesDataProps {
  onDelete?: (id: string) => Promise<void>;
}

export function useWishesData({ onDelete }: UseWishesDataProps = {}) {
  return useDataService<IWish>({
    fetchFn: wishService.getAll,
    transformFn: transformWishForGrid,
    deleteFn: wishService.delete,
    onDelete,
    statusComponent: wish => <StatusBadge status={wish.status} />,
    viewPath: id => `/wishes/${id}`,
    editPath: id => `/wishes/${id}/edit`,
    itemName: 'wish',
  });
}
