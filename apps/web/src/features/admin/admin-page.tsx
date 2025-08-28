'use client';

import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, LoadingState, ErrorState, DataTableWrapper, useToast } from '@repo/ui';
import { useCrud } from '@/hooks/useCrud';
import { ColumnDef } from '@tanstack/react-table';

interface IAdminPageProps<T extends { id: string }> {
  title: string;
  description: string;
  columns: ColumnDef<T>[];
  apiMethods: {
    get: () => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    delete: (id: string) => Promise<any>;
  };
  searchKey: string;
  searchPlaceholder: string;
  FormComponent: React.ComponentType<{
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
    loading: boolean;
    initialData?: any;
    mode: 'create' | 'edit';
  }>;
  onDeleteConfirm?: (item: T) => boolean;
}

export function AdminPage<T extends { id: string }>({
  title,
  description,
  columns,
  apiMethods,
  searchKey,
  searchPlaceholder,
  FormComponent,
  onDeleteConfirm,
}: IAdminPageProps<T>) {
  const [state, actions] = useCrud<T>(apiMethods);
  const { showToast } = useToast();

  useEffect(() => {
    actions.fetchItems();
  }, [actions]);

  const handleDelete = async (item: T) => {
    const shouldDelete = onDeleteConfirm
      ? onDeleteConfirm(item)
      : confirm(`Are you sure you want to delete this ${title.toLowerCase()}?`);
    if (!shouldDelete) return;

    try {
      await actions.delete(item.id);
      showToast(`${title} deleted successfully`, 'success');
    } catch (error) {
      showToast(`Failed to delete ${title.toLowerCase()}`, 'error');
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (state.editingItem) {
        await actions.update(state.editingItem.id, data);
        showToast(`${title} updated successfully`, 'success');
      } else {
        await actions.create(data);
        showToast(`${title} created successfully`, 'success');
      }
    } catch (_error) {
      showToast(`Failed to save ${title.toLowerCase()}`, 'error');
      throw _error;
    }
  };

  const handleAdd = () => {
    actions.showCreateForm();
  };

  const handleEdit = (item: T) => {
    actions.showEditForm(item);
  };

  if (state.isLoading) {
    return <LoadingState title={title} description={description} />;
  }

  if (state.error) {
    return (
      <ErrorState
        title={title}
        description={description}
        error={state.error}
        onRetry={actions.fetchItems}
      />
    );
  }

  const enhancedColumns = [
    ...columns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: any }) => (
        <div className='flex space-x-2'>
          <button
            onClick={() => handleEdit(row.original)}
            className='text-blue-600 hover:text-blue-800'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className='text-red-600 hover:text-red-800'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-6'>
      <PageHeader
        title={title}
        description={description}
        action={{
          label: `Add ${title}`,
          icon: Plus,
          onClick: handleAdd,
        }}
      />

      <DataTableWrapper
        title={`All ${title}`}
        description={`A list of all ${title.toLowerCase()} in your application`}
        columns={enhancedColumns}
        data={state.items}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
      />

      {state.showForm && (
        <FormComponent
          onSubmit={handleSave}
          onCancel={actions.hideForm}
          loading={state.formLoading}
          initialData={state.editingItem}
          mode={state.editingItem ? 'edit' : 'create'}
        />
      )}
    </div>
  );
}
