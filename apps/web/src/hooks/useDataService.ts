import { useDataFetching } from '@/hooks/useDataFetching';
import { DataGridActions } from '@/components/common/data-grid';
import type { IApiResponse } from '@repo/schemas';

interface UseDataServiceOptions<T> {
  fetchFn: () => Promise<T[]>;
  transformFn: (item: T) => any;
  deleteFn?: (id: string) => Promise<IApiResponse<any>>;
  onDelete?: (id: string) => Promise<void>;
  statusComponent?: (item: T) => React.ReactNode;
  viewPath?: (id: string) => string;
  editPath?: (id: string) => string;
  itemName?: string;
}

type DataGridAction =
  | ReturnType<typeof DataGridActions.view>
  | ReturnType<typeof DataGridActions.edit>
  | ReturnType<typeof DataGridActions.delete>;

export function useDataService<T extends { id: string }>({
  fetchFn,
  transformFn,
  deleteFn,
  onDelete,
  statusComponent,
  viewPath,
  editPath,
  itemName = 'item',
}: UseDataServiceOptions<T>) {
  const {
    data: items,
    refetch,
    loading,
  } = useDataFetching<T[]>({
    fetchFn,
  });

  const handleDelete = async (id: string) => {
    if (onDelete) {
      await onDelete(id);
    } else if (deleteFn) {
      if (confirm(`Are you sure you want to delete this ${itemName}?`)) {
        const response = await deleteFn(id);
        if (response.success) {
          refetch();
        } else {
          alert(`Failed to delete ${itemName}: ${response.error}`);
        }
      }
    }
  };

  const gridItems =
    items?.map(item => {
      const transformed = transformFn(item);
      const actions: DataGridAction[] = [];

      if (viewPath) {
        actions.push(DataGridActions.view(viewPath(item.id)));
      }
      if (editPath) {
        actions.push(DataGridActions.edit(editPath(item.id)));
      }
      actions.push(DataGridActions.delete(() => handleDelete(item.id)));

      return {
        ...transformed,
        ...(statusComponent && { status: statusComponent(item) }),
        actions,
      };
    }) || [];

  return {
    items,
    gridItems,
    loading,
    refetch,
    handleDelete,
  };
}
