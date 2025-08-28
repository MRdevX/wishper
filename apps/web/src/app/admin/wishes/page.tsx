'use client';

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@repo/ui/components/badge';
import { AdminPage } from '@repo/ui/components/admin';
import { WishForm } from '@repo/ui/components/admin/wish-form';
import { apiClient } from '@/lib/api-client';
import type { IWish } from '@repo/schemas';

const columns: ColumnDef<IWish>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className='font-medium'>{row.original.title}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'wishlist',
    header: 'Wishlist',
    cell: ({ row }) => (
      <div className='text-sm text-gray-500'>{row.original.wishlist?.name || 'No wishlist'}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <div className='text-sm text-gray-500'>
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
];

export default function WishesPage() {
  const apiMethods = useMemo(
    () => ({
      get: () => apiClient.getWishes(),
      create: (data: any) => apiClient.createWish(data),
      update: (id: string, data: any) => apiClient.updateWish(id, data),
      delete: (id: string) => apiClient.deleteWish(id),
    }),
    []
  );

  return (
    <AdminPage
      title='Wishes'
      description='Manage wish items'
      columns={columns}
      apiMethods={apiMethods}
      searchKey='title'
      searchPlaceholder='Search wishes...'
      FormComponent={WishForm}
    />
  );
}
